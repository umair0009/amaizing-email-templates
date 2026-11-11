import { data, inlineCSS } from "@amaizing-inc/perpendicular-core";
import {
  asset,
  assetAsUTF8,
  resolveAssetPath,
} from "@amaizing-inc/perpendicular-plugin-assets";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

const buildCopyOpts = (
  name: string,
  overrides?: Partial<P.PageOpts>,
): P.PageOpts => {
  const alias = name.replaceAll(" ", "-").toLowerCase();
  return {
    lang: ["mjml", "ac-mustachio"],
    name,
    slug: alias,
    copySuffix: `-${alias}`,
    ...overrides,
  };
};

const buildCopies = (opts: [string, overrides?: Partial<P.PageOpts>][]) => {
  return opts.map((i) => buildCopyOpts(i[0], i[1]));
};

@Page("email", {
  overrides: {
    name: "Markdown Layout",
    slug: "markdown-layout",
    deps: ["../../components/Section.ts", "../../components/Paragraph.ts"],
  },

  copies: buildCopies([
    ["Nurture Email 1"],
    ["Nurture Email 2"],
    ["Nurture Email 3"],
    ["Test Email A"],
    ["Test Email B"],
    ["Client Outreach"],
    ["Advantage Report Layout"],
    ["Deep Dive Report"],
    ["Deep Dive Report Auto"],
    ["Deep Dive Report Requested"],
    [
      "Market Map (Amaizing)",
      {
        slug: "rival-report",
        outputPath: "dist/templates/amaizing/market-map-amaizing.html",
      },
    ],
    [
      "Market Map (NM)",
      {
        slug: "market-map-nm",
        outputPath: "dist/templates/amaizing/market-map-nm.html",
      },
    ],
    ["Market Position Report"],
    ["Strategic Roadmap"],
  ]),
})
export class MarkdownMail {
  @data()
  title = "{{ subject }}";

  @data()
  uuid = "d1493d5b-a9cb-49ec-ab89-8c8cd1cd4bb3";

  // NOTE: these getters must NEVER throw. The framework only substitutes the
  // `{{ @asset ... }}` marker when the getter returns a value; on a throw the
  // literal marker leaks into the template and the `ac-mustachio` pass (used by
  // the copies) dies on the invalid `@asset ...` path, producing a truncated
  // `<body></body>` shell. So we read assets defensively and fall back to "".
  @asset("../../assets/stylesheets/markdown.css", {
    transform: async (ctx, _content, disk, job) => {
      if (ctx.mode !== "dev") return "";
      try {
        const cssPath = await resolveAssetPath(
          ctx,
          "../../assets/stylesheets/markdown.css",
          job.extras.path,
        );
        return await assetAsUTF8(disk, cssPath);
      } catch {
        return "";
      }
    },
  })
  _markdownCssSrc = "";

  @asset("../../assets/html/test-content.html", {
    transform: async (ctx, _content, disk, job) => {
      if (ctx.mode !== "dev") return "{{{ content }}}";

      const read = async (relativePath: string) => {
        try {
          const path = await resolveAssetPath(
            ctx,
            relativePath,
            job.extras.path,
          );
          return await assetAsUTF8(disk, path);
        } catch {
          return "";
        }
      };

      const markdownCSS = await read("../../assets/stylesheets/markdown.css");
      const html = await read("../../assets/html/test-content.html");

      return inlineCSS(`
<html>
  <head>
    <style>
      ${markdownCSS}
    </style>
  </head>

  <body>
    ${html}
  </body>
</html>
`);
    },
  })
  content = "";
}
