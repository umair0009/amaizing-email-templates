import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  overrides: {
    deps: ["../../components/AmaizingText.ts"],
    styles: [
      `.subtitle {
          color: gray !important;
        }
      `,
      "./preset.css",
    ],
  },
})
export class Example {
  @data()
  title = "MJML";

  @data()
  subtitle = "the responsive email framework";

  @data()
  caps = "Big";

  @data()
  __example_only__ = true;
}
