import { data } from "@amaizing-inc/perpendicular-core";
import { asset } from "@amaizing-inc/perpendicular-plugin-assets";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  overrides: {
    slug: "website-verify-email",
    name: "Website Verify Email",
    deps: [
      "../../../components/AdvHeader.ts",
      "../../../components/Section.ts",
      "../../../components/Paragraph.ts",
      "../../../components/AdvFooter.ts",
    ],
  },
})
export class WebsiteVerifyEmail {
  @asset("../../../assets/Amaizing-Logo-3D-header.png")
  AmaizingLogo3DHeader = "";

  @asset("../../../assets/Amaizing-icon-3D-footer.png")
  AmaizingIcon3DFooter = "";

  @data()
  title = "Amaizing Advantage • Verify your email to unlock your Market Map";

  @data()
  name = "Barry";

  @data()
  token = "abcdefgh";

  @data()
  base_url = "";
}
