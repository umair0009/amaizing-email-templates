import { data } from "@amaizing-inc/perpendicular-core";
import { asset } from "@amaizing-inc/perpendicular-plugin-assets";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  overrides: {
    slug: "example",
    deps: ["../../components/AmaizingText.ts"],
    styles: [
      `
	.head * {
	  color: green !important;
	  font-weight: bold;
	}
      `,
      `
	.body * {
	}
      `,
    ],
  },
})
export class Example {
  @data()
  title = "MJML Email";

  @data()
  subtitle = "The Responsive Email Framework";

  @data()
  __example_only__ = true;

  @asset("../../assets/revup-logo.svg")
  file = "";

  @asset("../../assets/amaizing-footer-logo.svg")
  footerLogo = "";
}
