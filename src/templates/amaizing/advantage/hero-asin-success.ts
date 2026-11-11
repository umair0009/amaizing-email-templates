import { data } from "@amaizing-inc/perpendicular-core";
import { asset } from "@amaizing-inc/perpendicular-plugin-assets";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  overrides: {
    slug: "hero-asin-success",
    name: "Hero ASIN Success",
    deps: [
      "../../../components/AdvHeader",
      "../../../components/Section.ts",
      "../../../components/Paragraph.ts",
      "../../../components/AdvFooter.ts",
    ],
  },
})
export class heroAsinSuccess {
  @asset("../../../assets/Amaizing-Logo-3D-header.png")
  AmaizingLogo3DHeader = "";

  @asset("../../../assets/Amaizing-icon-3D-footer.png")
  AmaizingIcon3DFooter = "";

  @data()
  title = "Amaizing Advantage • {{brand_name}} – your Market Map is on its way";

  @data()
  first_name = "Barry";

  @data()
  brand_name = "fasion brand";
}
