import { MJMLComponent } from "@amaizing-inc/perpendicular-plugin-email";
import { Comp } from "@amaizing-inc/perpendicular-plugin-web";

@Comp({
  lang: "mjml",
  selector: "amaizing-text",
  templatePath: "./AmaizingText.mjml",
})
export class AmaizingText extends MJMLComponent {
  childOf = ["mj-body", "mj-column", "mj-text", "mj-wrapper", "mj-raw", "para"];
  allowChilds: string[] = ["mj-text", "mj-raw"];
}
