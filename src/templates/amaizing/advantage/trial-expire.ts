import { data } from "@amaizing-inc/perpendicular-core";
import { asset } from "@amaizing-inc/perpendicular-plugin-assets";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  overrides: {
    name: "Advantage report trial expire",
    slug: "advantage-trial-expire",
    deps: [
      "../../../components/Section.ts",
      "../../../components/Paragraph.ts",
      "../../../components/AdvHeader",
      "../../../components/Section.ts",
      "../../../components/Paragraph.ts",
      "../../../components/AdvFooter.ts",
    ],
  },
})
@Page("email")
export class TrialExpire {
  @data()
  title = "Your market visibility goes dark TOMORROW!!!";

  @data()
  first_name = "Barry";

  @data()
  product_link = "https://amazon.co.uk/dp/ABCDEFGHIJ";

  @data()
  product_title = "Dell Latitude 1470";

  @data()
  stripe_link = "Dell Latitude 1470";

  @asset("../../../assets/amaizing-footer-logo.svg")
  advFooterLogo = "";
}
