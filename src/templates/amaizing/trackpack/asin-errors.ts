import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  framework: "none",
  overrides: {
    name: "Errors with new ASIN",
    slug: "error-with-asin",
  },
})
export class ASINErrors {
  @data()
  title = "Errors with new ASIN";

  @data()
  name = "Foobar";

  @data()
  base_url = "http://localhost:3000";

  @data()
  trackpack_id = 0;

  @data()
  trackpack_name = "Amaizing Example Trackpack";

  @data()
  only_1_asins_with_issues = true;

  @data()
  multiple_asins_with_issues = false;

  @data()
  asins_issues_count = 2;

  @data()
  asins_with_issues = [
    {
      asin_with_issues: "abcdedfghi",
      issue: "some thing is wrong",
    },
    {
      asin_with_issues: "jklmnopqrs",
      issue: "some thing is wrong again",
    },
  ];

  @data()
  asins = "abcdedfghi,jklmnopqrs";
}
