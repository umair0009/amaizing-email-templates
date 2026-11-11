import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  framework: "none",
  overrides: {
    name: "No listing changes but things are still happening",
    slug: "market-worth-checking",
  },
})
export class MarketCheck {
  @data()
  title = "No listing changes but things are still happening";

  @data()
  name = "Foobar";

  @data()
  base_url = "http://localhost:3000";

  @data()
  duration = "7 days";
}
