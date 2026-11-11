import { data } from "@amaizing-inc/perpendicular-core";
import { asset } from "@amaizing-inc/perpendicular-plugin-assets";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  overrides: {
    name: "Verify your email · Nuanced Media",
    slug: "nuanced-media-verification",
  },
})
@Page("email")
export class Verification {
  @asset("../../../assets/NM_wordmark_medium_rgb_rev.png")
  nuancedMediaLogo = "";

  @data()
  title = "Verify your email · Nuanced Media";

  @data()
  first_name = "Barry";
  
}
