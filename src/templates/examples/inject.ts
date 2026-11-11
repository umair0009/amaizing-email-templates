import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  overrides: {
    styles: {
      type: "stylesheet",
      lang: "css",
      sourceFile: "./inject.css",
      inline: true,
    } as P.PageStyles,
  },
})
export class Inject {
  @data()
  title = "Style Inject Test";

  @data()
  __example_only__ = true;
}
