import { promises } from "node:fs";
import { constants } from "node:fs/promises";
import { join } from "node:path";
import {
  createTemplateService,
  getTemplateService,
  getTemplatesAllService,
  type TemplateListItem,
  updateTemplateService,
  validateTemplateService,
} from "@amaizing-inc/apis-postmark";
import { AmaizingFetchSingleton } from "@amaizing-inc/leafs-fetch";
import { safeParse, safeStringify } from "@amaizing-inc/leafs-underscore";
import {
  BaseWorkflow,
  readUTF8,
  step,
  Workflow,
  writeUTF8,
} from "@amaizing-inc/perpendicular-core";
import stableStringify from "json-stable-stringify";
import {
  type CIInfo,
  type ExtendedPageMata,
  getCIInfo,
} from "./deploy/index.js";
import { Logger } from "./deploy/logger.js";

const { CI, POSTMARK_SERVER_TOKEN, SYNC_TEMPLATES } = process.env;

AmaizingFetchSingleton.getInstance({
  baseUrl: "https://api.postmarkapp.com",
  fetchOpts: {
    headers: {
      Accept: "application/json",
      "X-Postmark-Server-Token": POSTMARK_SERVER_TOKEN || "",
    },
  },
});

@Workflow({
  lang: "js",
  when: "immedate",
})
export class Deploy extends BaseWorkflow {
  name = `${Deploy.name}:`;
  private logger = new Logger(this.name);
  private validateOnly = true;
  ciInfo: CIInfo | undefined = undefined;
  meta: P.PageMeta[] | undefined;
  existingMeta: P.PageMeta[] | undefined;
  status = {
    newTemplates: [] as P.PageMeta[],
    updatedTemplates: [] as P.PageMeta[],
    removedTemplates: [] as P.PageMeta[],
    toBeValidated: [] as ExtendedPageMata[],
    toBeCreated: [] as ExtendedPageMata[],
    toBeUpdated: [] as ExtendedPageMata[],
    invalidTemplates: [] as ExtendedPageMata[],
  };

  private pmTemplates: TemplateListItem[] = [];
  private pmt = String(POSTMARK_SERVER_TOKEN || "");
  private metaFile = ".templates.json";

  @step({
    after: "drain",
  })
  async preConditions() {
    this.logger.log("info", "checking pre-conditions");
    if (!this.ctx.config.env.CI) {
      this.logger.log("info", "Skipping, non-CI env!");
      return this.resolveToTeardown(0);
    }

    this.logger.log("info", "Collecting new meta...");
    this.meta = this.ctx["s|p"]?.page?.meta?.values()?.toArray();

    if (!this.meta) {
      const msg = "Page meta not available!";
      this.logger.log("error", msg);
      return this.resolveToTeardown(1);
    }

    this.logger.log("info", "Collecting environment info");
    const ci = CI && CI !== "dev";

    if (ci) {
      this.ciInfo = getCIInfo();

      if (this.ciInfo.targetBranch === "main") {
        this.metaFile = "test.templates.json";
      } else if (this.ciInfo.targetBranch === "prod") {
        this.metaFile = "prod.templates.json";
      }

      this.validateOnly = !this.ciInfo.isCommitted;

      this.logger.log(
        "info",
        `CI '${this.ciInfo.targetBranch}' detected, will use: ${this.metaFile || "<NONE>"}`,
      );

      this.logger.log("info", `Also removing example templates from pipeline!`);

      this.existingMeta =
        this.existingMeta?.filter(
          (i) => !(i.data as ExampleOnlyData).__example_only__,
        ) || [];

      this.meta = this.meta.filter(
        (i) => !(i.data as { __example_only__: boolean }).__example_only__,
      );
    } else {
      this.metaFile = process.env.METAFILE || ".templates.json";
      this.validateOnly = !!process.env.VALIDATE_ONLY;

      this.logger.log("info", `Local run detected, will use: ${this.metaFile}`);
    }

    try {
      this.logger.log("info", "Collecting exising meta...");
      const metaFilePath = join(process.cwd(), this.metaFile);
      await promises.access(metaFilePath, constants.R_OK);

      const content = safeParse(
        await readUTF8(metaFilePath),
        [],
      ) as P.PageMeta[];

      if (!content) {
        throw "Error parsing the content of existing metadata!";
      }

      this.existingMeta = content;
    } catch (msg) {
      this.logger.log(
        "error",
        typeof msg === "string"
          ? msg
          : "Unable to parse exising meta, does file exists?",
      );
    }

    try {
      this.logger.log("info", "Checking Postmark Connectivity!");
      const allTemplates = await getTemplatesAllService({});
      if (allTemplates.type !== "success") throw allTemplates.data;
      this.pmTemplates = allTemplates.data.templates;

      this.logger.log(
        "info",
        `Active Templates on Postmark: ${this.pmTemplates.length}`,
      );
    } catch (code) {
      this.logger.log(
        "error",
        "Unable to connect to postmark!",
        `Status Code: ${Number.isNaN(code) ? "Unknown" : code}`,
        `Token: ${this.pmt.length ? "*".repeat(this.pmt.length) : "Missing"}`,
      );

      return this.resolveToTeardown(1);
    }
  }

  @step()
  async categorize() {
    this.logger.log("info", "categorizing templates");

    this.status.newTemplates =
      this.meta?.filter(
        (m) => !this.existingMeta?.find((e) => m.slug === e.slug),
      ) || ([] as P.PageMeta[]);

    this.logger.log(
      "info",
      `${this.status.newTemplates.length} new templates added!`,
    );

    this.status.updatedTemplates =
      (SYNC_TEMPLATES
        ? this.meta?.filter((i) =>
            this.ciInfo?.targetBranch !== "prod"
              ? true
              : !(i.data as { __example_only__: boolean }).__example_only__,
          )
        : this.meta?.filter((m) =>
            this.existingMeta?.find(
              (e) =>
                m.slug === e.slug &&
                (m.md5sum !== e.md5sum ||
                  m.name !== e.name ||
                  m.subject !== e.subject),
            ),
          )) || ([] as P.PageMeta[]);

    this.logger.log(
      "info",
      `${this.status.updatedTemplates.length} templates updated!`,
    );

    this.status.removedTemplates =
      this.existingMeta?.filter(
        (m) => !this.meta?.find((e) => m.slug === e.slug),
      ) || ([] as P.PageMeta[]);

    this.logger.log(
      "info",
      `${this.status.removedTemplates.length} templates deleted!`,
    );
  }

  @step()
  async validateTemplates() {
    const targets: ExtendedPageMata[] = this.status.newTemplates
      .map((i) => ({ ...i, __create__: true }) as ExtendedPageMata)
      .concat(
        this.status.updatedTemplates.map(
          (i) => ({ ...i, __update__: true }) as ExtendedPageMata,
        ),
      );

    if (!targets.length) {
      this.logger.log("info", "No template found to be created or updated!");
      return this.resolveToTeardown(0);
    }

    this.logger.log("info", `Validating ${targets.length} templates!`);
    for (const target of targets) {
      try {
        this.logger.log(
          "info",
          `Validating ${target.subject} (${target.slug})`,
        );

        const content = await readUTF8(
          join(this.ctx.config.distDir, target.outputPath),
        );

        const validation = await validateTemplateService({
          body: {
            Subject: target.subject,
            HtmlBody: content,
            TextBody: "",
            TestRenderModel: target.data,
          },
        });

        if (validation.type !== "success") throw validation.data;
        const ok = validation.data.AllContentIsValid;
        const found = await getTemplateService({
          params: {
            templateIdOrAlias: target?.slug || "__undefined__",
          },
        })
          .then((resp) => resp?.type === "success")
          .catch(() => false);

        if (ok) {
          if (!found) {
            this.status.toBeCreated.push({ ...target, __content__: content });
            this.logger.log(
              "info",
              `Template "${target.subject}" doesn't exist on Postmark - will be created!`,
            );
          } else {
            this.status.toBeUpdated.push({ ...target, __content__: content });
            this.logger.log(
              "info",
              `Template "${target.subject}" is valid to be updated!`,
            );
          }
        }
      } catch (err) {
        this.status.invalidTemplates.push({ ...target, __invalid__: true });

        this.logger.log(
          "info",
          `Template ${target.slug} validation failed, will not be ${target.__create__ ? "created" : "updated"}!`,
          `Reason: ${err}`,
        );
      }
    }
  }

  @step()
  async create() {
    if (!this.status.toBeCreated.length || this.validateOnly) {
      this.logger.log(
        "info",
        `${this.validateOnly ? "Validation Only detected:" : ""} - Nothing to be created, skipping...`,
      );

      return {
        result: 0,
      };
    }

    this.logger.log("info", "Creating new templates on Postmark");

    for (const target of this.status.toBeCreated) {
      try {
        this.logger.log("info", `Creating "${target.subject}"`);

        const created = await createTemplateService({
          body: {
            Name: target.name ?? "",
            Subject: target.subject,
            HtmlBody: target.__content__,
            Alias: target.slug,
          },
        });

        if (created.type !== "success") throw created.data;
        this.logger.log("info", `Created "${target.subject}"`);
        target.__created__ = true;
      } catch (err) {
        const e = err as Error & { Message?: string };
        target.__created__ = false;
        target.error = e?.message || e?.Message || "Unknown";

        this.logger.log(
          "info",
          `Error creating "${target.subject}"`,
          e?.message || safeStringify(e),
        );
      }
    }
  }

  @step()
  async update() {
    if (!this.status.toBeUpdated.length || this.validateOnly) {
      this.logger.log(
        "info",
        `${this.validateOnly ? "Validation Only detected:" : ""} - Nothing to be updated, skipping...`,
      );

      return {
        result: 0,
      };
    }

    this.logger.log("info", "Updating updated templates on Postmark");

    for (const target of this.status.toBeUpdated) {
      try {
        this.logger.log("info", `Updating "${target.subject}"`);
        const updated = await updateTemplateService({
          params: {
            templateIdOrAlias: target.slug || "",
          },
          body: {
            Name: target.name ?? "",
            Subject: target.subject ?? "",
            HtmlBody: target.__content__,
            Alias: target.slug,
          },
        });
        if (updated.type !== "success") throw updated.data;
        target.__updated__ = true;
        this.logger.log("info", `Updated "${target.subject}"`);
      } catch (err) {
        const e = err as Error & { Message?: string };
        target.__updated__ = false;
        target.error = e?.message || e?.Message || "Unknown";

        this.logger.log(
          "info",
          `Error updating "${target.subject}"`,
          e?.message || safeStringify(e),
        );
      }
    }
  }

  @step()
  async teardown() {
    await this.logger.flush();
    const validTemplates =
        this.meta?.filter(
          (m) => !this.status.invalidTemplates.some((i) => m.slug === i.slug),
        ) || [],
      toBeCreatedTemplates = this.status.toBeCreated,
      toBeUpdatedTemplates = this.status.toBeUpdated,
      createdTemplates = this.status.toBeCreated.filter((i) => i.__created__),
      createFailedTemplates = this.status.toBeCreated.filter(
        (i) => !i.__created__ && i.error,
      ),
      updatedTemplates = this.status.toBeUpdated.filter((i) => i.__updated__),
      updateFailedTemplates = this.status.toBeUpdated.filter(
        (i) => !i.__updated__ && i.error,
      );

    const getData = (i: P.PageMeta) => `
#### Example Data
\`\`\`json
${JSON.stringify(i.data, null, 2)}
\`\`\`
`;

    const summary = `
# Email Templates Summary

${
  this.validateOnly
    ? `##   To be created: ${toBeCreatedTemplates.length}
${toBeCreatedTemplates.map((i) => `### ${i.name} (${i.slug})${getData(i)}`).join("\n")}

## 󰚰 To be updated: ${toBeUpdatedTemplates.length}
${toBeUpdatedTemplates
  .map((i) => `### ${i.name} (${i.slug})${getData(i)}`)
  .join("\n")}`
    : /*****************************************************************************/
      `##   Created: ${createdTemplates.length}
${createdTemplates.map((i) => `### ${i.name} (${i.slug})${getData(i)}`).join("\n")}

## ❌ Create Failed: ${createFailedTemplates.length}
${createFailedTemplates
  .map(
    (i) => `### ${i.name} (${i.slug})
#### Error Info
${i.error}
${getData(i)}`,
  )
  .join("\n")}

## 󰁡 Updated: ${updatedTemplates.length}
${updatedTemplates
  .map((i) => `### ${i.name} (${i.slug})${getData(i)}`)
  .join("\n")}

## ❌ Update Failed: ${updateFailedTemplates.length}
${updateFailedTemplates
  .map(
    (i) => `### ${i.name} (${i.slug})
#### Error Info
${i.error}
${getData(i)}`,
  )
  .join("\n")}`
}

## ✅ Valid: ${validTemplates.length}
${validTemplates.map((i) => `${this.validateOnly ? "###" : "-"} ${i.name} (${i.slug})${this.validateOnly ? getData(i) : ""}`).join("\n")}

## ❌ Invalid: ${this.status.invalidTemplates.length}
${this.status.invalidTemplates.map((i) => `${this.validateOnly ? "###" : "-"} ${i.name} (${i.slug})${this.validateOnly ? getData(i) : ""}`).join("\n")}
`;

    if (!this.ciInfo) {
      console.log(summary);
    } else if (this?.ciInfo?.stepSummaryFile) {
      await promises.appendFile(this.ciInfo.stepSummaryFile, summary, "utf-8");
    }

    if (
      this.ctx?.["s|p"]?.page?.meta &&
      (this.ciInfo?.isCommitted || !this.validateOnly)
    ) {
      const meta = Array.from(this.ctx["s|p"].page.meta.values()).sort(
        (a, b) => a?.slug?.localeCompare(b?.slug || "") || 0,
      );

      await writeUTF8(this.metaFile, stableStringify(meta) || "[]");
    }
  }

  private resolveToTeardown(result: unknown) {
    return {
      result: result,
      next: "teardown" as unknown as P.WorkflowStepNext,
    };
  }
}

type ExampleOnlyData = {
  __example_only__: boolean;
};
