import { Project } from "@amaizing-inc/perpendicular-core";
import { AssetsPlugin } from "@amaizing-inc/perpendicular-plugin-assets";
import {
  EmailPlugin,
  type EmailPluginOpts,
} from "@amaizing-inc/perpendicular-plugin-email";

@Project({
  server: {
    port: 3000,
  },

  srcDir: "src/",
  distDir: "dist/",
  pagesMetaFile: "",

  transpiler: {
    sourceMaps: !!process.env.DEBUG,
  },

  plugins: [
    {
      plugin: EmailPlugin,
      opts: {
        templateEngine: "ac-mustachio",
        globalStyles: [
          "global.css" as unknown as P.StyleInjection,
          {
            type: "stylesheet",
            lang: "css",
            sourceFile: "./responsive.css",
            inline: false,
            when: "all",
          },
          {
            type: "stylesheet",
            lang: "css",
            sourceFile: "./overrides-non-inline.css",
            inline: false,
            when: "all",
          },
          {
            type: "stylesheet",
            lang: "css",
            sourceFile: "./overrides-non-inline.css",
            inline: false,
            when: "all",
          },
        ],

        dev: {
          transport: "postmark",
          token: async (ctx: P.Context) => ctx.config.env.PMT_DEV,
          aliasResolver: async (_: P.Context, m: P.PageMeta) => m.slug,
          defaults: (ctx: P.Context) => ({
            from: ctx?.config?.env?.DE_FROM || "",
            to: ctx?.config?.env?.DE_TO || "",
          }),
        },
      } satisfies EmailPluginOpts,
    },
    {
      plugin: AssetsPlugin,
      opts: {
        dir: "assets/",
        include: ["**/*.png", "**/*.svg", "**/*.css", "**/*.html"],
        exclude: ["*.html"],
        replacePattern: (propName) =>
          new RegExp(`\\{\\{\\s*@asset\\s+${propName}\\s*\\}\\}`, "g"),
        drive: async (ctx: P.Context) =>
          ctx.mode === "dev"
            ? {
                type: "local",
                opts: "plugin-web",
              }
            : {
                type: "s3",
                basePath: "/public/etr",
                opts: {
                  endpoint: "https://sfo3.digitaloceanspaces.com",
                  region: "sfo3",
                  visibility: "public",
                  bucket: "amaizing",
                  credentials: {
                    accessKeyId: process.env.DO_ACCESS_KEY_ID || "",
                    secretAccessKey: process.env.DO_ACCESS_KEY_SECRET || "",
                  },
                },
              },
      } satisfies AssetsPluginOpts,
    },
    getMetaPlugin(),
  ],
})
export class AmaizingEmailTempaltes {
  title = "";
}

function getMetaPlugin(): {
  plugin: P.Plugin;
  opts: unknown;
} {
  return {
    plugin: {
      id: "metaTransform",

      async setup(ctx) {
        if (!ctx["s|p"]) throw new Error("Context not initialized!");
        if (!ctx["s|p"]?.page)
          ctx["s|p"].page = { map: new Map(), injections: [], meta: new Map() };
        if (!ctx["s|p"]?.page.metaTransformers)
          ctx["s|p"].page.metaTransformers = new Map();

        ctx["s|p"].page.slugFactory = async (o) =>
          o.slug
            ?.replaceAll("/", "-")
            .replace("dist-", "")
            .replace("templates-", "") // remove templates- prefix
            .replace("amaizing-", "") // remove amaizing- prefix
            .replace("examples-", "")
            .replace(".html", "") || "";

        ctx["s|p"].page?.metaTransformers?.set(
          "amaizing-email-templates",
          async (m) => {
            m.name = m.name || m.subject;
            return m;
          },
        );

        return ctx;
      },
    },
    opts: undefined,
  };
}
