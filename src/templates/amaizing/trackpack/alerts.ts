import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  framework: "none",
  overrides: {
    name: "Change Summary Emails",
    slug: "change-summary-emails",
  },
})
export class Alerts {
  @data()
  title = "You’ve got alerts!";

  @data()
  name = "Foobar";

  @data()
  base_url = "http://localhost:3000";

  @data()
  trackpack_count = 3;

  @data()
  listing_count = 3;

  @data()
  duration = "7 days";

  @data()
  asins_gr_one = true;
}
