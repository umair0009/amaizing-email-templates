// src/global.d.ts
import "@amaizing-inc/perpendicular-plugin-web";
import "@amaizing-inc/perpendicular-plugin-email";
import "@amaizing-inc/perpendicular-plugin-assets";

declare global {
  namespace P {
    interface Env {
      CI: boolean;
      DO_ACCESS_KEY_ID: string;
      DO_ACCESS_KEY_SECRET: string;
    }
  }
}
