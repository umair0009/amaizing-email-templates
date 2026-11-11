import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  overrides: {
    name: "Advantage Rival Report Confirmation",
    slug: "advantage-trial-confirmation",
    deps: [
      "../../../components/AdvHeader",
      "../../../components/Section.ts",
      "../../../components/Paragraph.ts",
      "../../../components/AdvFooter.ts",
    ],
  },
})
@Page("email")
export class Report {
  @data()
  title = "You’re in the queue — here’s what we’re building for you";

  @data()
  app_subdomain_suffix = "-stg";

  @data()
  first_name = "Barry";

  @data()
  product_link = "https://amazon.co.uk/dp/ABCDEFGHIJ";

  @data()
  product_title = "Dell Latitude 1470";
}
