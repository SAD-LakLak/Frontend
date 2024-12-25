import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { FALSE } from "openapi-typescript";

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-ignore
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "light",
      themes: {
        dark: FALSE,
        colors: {
          primary: "#3792D5", // MainBlue
          secondary: "#CCEBFF", // AccentBlue
          success: "#4fe825", // AccentOrange
          accent: "#E89325", // AccentOrange
          error: "#FB8C00", // Warning
          background: "#FBF9EF", // TextLight (برای پس‌زمینه)
          onBackground: "#011936", // TextDark (رنگ متن برای پس‌زمینه)
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
