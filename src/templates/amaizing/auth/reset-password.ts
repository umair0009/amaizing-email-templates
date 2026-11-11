import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  framework: "none",
  overrides: {
    name: "Reset Password - Verify Email",
    slug: "password-request-verification-email",
  },
})
export class ResetPassword {
  @data()
  title = "Amaizing - Reset Password";

  @data()
  name = "Foobar";

  @data()
  token = "abcde-ghij-klmn-opqr";

  @data()
  base_url = "http://localhost:3000";
}
