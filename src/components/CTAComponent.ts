import { MJMLComponent } from "@amaizing-inc/perpendicular-plugin-email";
import { attr, Comp } from "@amaizing-inc/perpendicular-plugin-web";

@Comp({
  lang: "mjml",
  selector: "ai-cta",
  templatePath: "./CTAComponent.mjml",
})
export class CTASectionComponent extends MJMLComponent {
  childOf: string[] = ["mj-body", "mj-wrapper"];

  @attr("string")
  link: string = "";

  @attr("string")
  text: string = "";

  @attr("string")
  classes: string = "";
}
