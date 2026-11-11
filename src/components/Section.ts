import { MJMLComponent } from "@amaizing-inc/perpendicular-plugin-email";
import { Comp } from "@amaizing-inc/perpendicular-plugin-web";

@Comp({
  lang: "mjml",
  selector: "ai-section",
  templatePath: "./Section.mjml",
})
export class SectionComponent extends MJMLComponent {
  childOf: string[] = ["mj-wrapper", "mj-body", "ai-cta"];
  allowChilds: string[] = [
    "button",
    "mj-wrapper",
    "mj-text",
    "mj-button",
    "ai-section",
  ];
  endingTag: boolean = true;
}
