import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  overrides: {
    name: "No competitors found",
    slug: "revup-no-competitors",
    deps: [
      "../../../components/Section.ts",
      "../../../components/AdvHeader.ts",
      "../../../components/Paragraph.ts",
      "../../../components/CTAComponent.ts",
      "../../../components/FooterComponent.ts",
    ],
  },
})
export class NoCompetitorsFound {
  @data()
  title = "We didn’t find rivals for your ASIN – let’s take a closer look";

  @data()
  uuid = "d1493d5b-a9cb-49ec-ab89-8c8cd1cd4bb3";

  @data()
  client_asin = "B08LH9XZP9";

  @data()
  amazon_tld = "com";

  @data()
  app_subdomain_suffix = "-stg";

  @data()
  first_name = "Barry";
}
