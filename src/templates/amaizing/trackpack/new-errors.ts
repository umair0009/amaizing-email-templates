import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  framework: "none",
  overrides: {
    name: "New Trackpack Errors",
    slug: "new-trackpack-errors",
  },
})
export class NewErrors {
  @data()
  title = "New Trackpack Errors";

  @data()
  name = "Foobar";

  @data()
  base_url = "http://localhost:3000";

  @data()
  trackpack_id = 0;

  @data()
  trackpack_name = "Amaizing Example Trackpack";

  @data()
  multiple_asins_without_issues = true;

  @data()
  asins_without_issues_count = 10;

  @data()
  only_1_asins_with_issues = true;

  @data()
  multiple_asins_with_issues = false;

  @data()
  asins_issues_count = 1;

  @data()
  asins_with_issues = [
    {
      asin_with_issues: "abcdedfghi",
      issue: "some thing is wrong",
    },
  ];
}
