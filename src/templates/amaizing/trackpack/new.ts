import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  framework: "none",
  overrides: {
    name: "New Trackpack Success!",
    slug: "new-trackpack-success",
  },
})
export class New {
  @data()
  title = "New Trackpack Success!";

  @data()
  name = "Foobar";

  @data()
  base_url = "http://localhost:3000";

  @data()
  trackpack_id = 0;

  @data()
  trackpack_name = "Amaizing Example Trackpack";
}
