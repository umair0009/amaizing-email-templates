import { MJMLComponent } from "@amaizing-inc/perpendicular-plugin-email";
import { attr, Comp } from "@amaizing-inc/perpendicular-plugin-web";

@Comp({
  lang: "mjml",
  selector: "para",
  templatePath: "./Paragraph.mjml",
})
export class ParagraphComponent extends MJMLComponent {
  allowChilds: string[] = ["mj-raw", "mj-text", "mj-image", "mj-wrapper"];
  childOf: string[] = ["mj-wrapper"];

  @attr("string")
  classes = "";
}
