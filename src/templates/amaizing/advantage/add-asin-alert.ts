import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  overrides: {
    name: "Add ASINs Alert",
    deps: [
      "../../../components/Paragraph.ts",
      "../../../components/AdvHeader.ts",
      "../../../components/AdvFooter.ts",
      "../../../components/AmaizingText.ts",
      "../../../components/Link.ts",
    ],
  },
})
export class Report {
  @data()
  title = "Your other products are flying blind";

  @data()
  first_name = "Barry";

  @data()
  product_link = "https://amazon.co.uk/dp/ABCDEFGHIJ";

  @data()
  product_title = "Dell Latitude 1470";
}
