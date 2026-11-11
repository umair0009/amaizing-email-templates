import { MJMLComponent } from "@amaizing-inc/perpendicular-plugin-email";
import { attr, Comp } from "@amaizing-inc/perpendicular-plugin-web";

@Comp({
  lang: "mjml",
  selector: "ai-btn-ico",
  templatePath: "./ButtonWithIcon.mjml",
})
export class ButtonwithIconComponent extends MJMLComponent {
  childOf: string[] = ["mj-wrapper", "mj-column", "mj-text", "para"];
  allowChilds: string[] = ["mj-text"];

  @attr("string")
  href = "";

  @attr("string")
  classes = "";

  @attr("string")
  iconSrc = "https://app-stg.amaizing.io/pngs/check-circle-broken.png";
}
