import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  framework: "foundation",
  overrides: {
    styles: {
      type: "stylesheet",
      lang: "css",
      sourceFile: "./foundation.css",
      inline: true,
      when: "all",
    },
  },
  previewOverrides: true,
})
export class FoundationEmail {
  @data()
  __example_only__ = true;
}
