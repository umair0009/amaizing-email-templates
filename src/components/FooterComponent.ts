import { MJMLComponent } from "@amaizing-inc/perpendicular-plugin-email";
import { attr, Comp } from "@amaizing-inc/perpendicular-plugin-web";

@Comp({
  lang: "mjml",
  selector: "footer",
  templatePath: "./FooterComponent.mjml",
})
export class FooterComponent extends MJMLComponent {
  childOf: string[] = ["mj-body", "mj-wrapper", "mj-column"];
  endingTag: boolean = false;

  @attr("string")
  classes: string = "";
}
