import { MJMLComponent } from "@amaizing-inc/perpendicular-plugin-email";
import { attr, Comp } from "@amaizing-inc/perpendicular-plugin-web";

@Comp({
  lang: "mjml",
  selector: "ai-button",
  templatePath: "./Button.mjml",
})
export class ButtonComponent extends MJMLComponent {
  childOf: string[] = ["mj-wrapper", "mj-column", "mj-text", "para"];
  allowChilds: string[] = ["mj-text"];

  @attr("string")
  href = "";

  @attr("string")
  classes = "";
}
