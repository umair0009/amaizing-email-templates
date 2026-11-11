import { asset } from "@amaizing-inc/perpendicular-plugin-assets";
import { MJMLComponent } from "@amaizing-inc/perpendicular-plugin-email";
import { attr, Comp } from "@amaizing-inc/perpendicular-plugin-web";

@Comp({
  lang: "mjml",
  selector: "adv-footer",
  templatePath: "./AdvFooter.mjml",
})
export class AdvFooterComponent extends MJMLComponent {
  childOf: string[] = ["mj-wrapper"];

  @attr("string")
  classes: string = "";

  @asset("../assets/amaizing-footer-logo.svg")
  advFooterLogo = "";
}
