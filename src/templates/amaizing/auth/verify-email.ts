import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  framework: "none",
  overrides: {
    name: "Signup - Verify Email",
    slug: "signup-verify-email",
  },
})
export class VerifyEmail {
  @data()
  title = "Welcome to Amaizing - Verify your email";

  @data()
  name = "Foobar";

  @data()
  token = "abcde-ghij-klmn-opqr";

  @data()
  base_url = "http://localhost:3000";
}
