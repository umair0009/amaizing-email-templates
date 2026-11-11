import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  framework: "none",
  overrides: {
    name: "New ASINs Added",
    slug: "new-asin-added",
  },
})
export class ASINAdded {
  @data()
  title = "New ASINs Added";

  @data()
  name = "Foobar";

  @data()
  base_url = "http://localhost:3000";

  @data()
  trackpack_id = 0;

  @data()
  trackpack_name = "Amaizing Example Trackpack";

  @data()
  asins = "abcdedfhij";

  @data()
  multiple_asins_without_issues = {
    asins_without_issues_count: 1,
  };

  @data()
  only_1_asin_without_issues = false;

  @data()
  asins_without_issues = [
    { asin_without_issues: "abcdedfhij" },
    { asin_without_issues: "klmnopqrst" },
    { asin_without_issues: "uvwxyzabcd" },
  ];
}
