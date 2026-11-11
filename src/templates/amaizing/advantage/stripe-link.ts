import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  overrides: {
    slug: "advantage-stripe-link",
    name: "Advantage Rival Stripe Payment Link",
    deps: [
      "../../../components/AdvHeader",
      "../../../components/Section.ts",
      "../../../components/Paragraph.ts",
      "../../../components/AdvFooter.ts",
    ],
  },
})
export class stripeLink {
  @data()
  title = "Your Amaizing subscription is ready to activate";

  @data()
  first_name = "Barry";

  @data()
  product_link = "https://amazon.co.uk/dp/ABCDEFGHIJ";

  @data()
  product_title = "Dell Latitude 1470";

  @data()
  number_of_asins = "2";

  @data()
  stripe_link =
    "https://checkout.stripe.com/c/pay/cs_test_a1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2?client_reference_id=advantage_trial_expire_email";

  @data()
  plan_name = "Amaizing Advantage";

  @data()
  plan_price = "60";
}
