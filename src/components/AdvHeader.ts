import { asset } from "@amaizing-inc/perpendicular-plugin-assets";
import { MJMLComponent } from "@amaizing-inc/perpendicular-plugin-email";
import { Comp } from "@amaizing-inc/perpendicular-plugin-web";

@Comp({
  lang: "mjml",
  selector: "adv-header",
  templatePath: "./AdvHeader.mjml",
})
export class AdvHeaderComponent extends MJMLComponent {
  childOf: string[] = ["mj-wrapper", "mj-body"];

  @asset("../assets/amaizing-advantage-beta.png")
  advBetaLogo = "";
}
