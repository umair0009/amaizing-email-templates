import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  overrides: {
    name: "ASIN not found",
    slug: "revup-asin-not-found",
    deps: [
      "../../../components/Section.ts",
      "../../../components/AdvHeader.ts",
      "../../../components/Paragraph.ts",
      "../../../components/CTAComponent.ts",
      "../../../components/FooterComponent.ts",
    ],
  },
})
export class ASINNotFound {
  @data()
  title = "ASIN not found";

  @data()
  uuid = "d1493d5b-a9cb-49ec-ab89-8c8cd1cd4bb";

  @data()
  app_subdomain_suffix = "-stg";

  @data()
  first_name = "Barry";

  @data()
  client_asin = "B0FDPWFHQ4";

  @data()
  amazon_tld = "com";
}
