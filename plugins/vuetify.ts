import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { components, directives } from "vuetify/dist/vuetify";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            onBackground: '#011936', // TextDark (رنگ متن برای پس‌زمینه)
            background: '#FBF9EF', // TextLight (برای پس‌زمینه)
            secondary: '#CCEBFF', // AccentBlue
            success: '#4fe825', // AccentOrange
            primary: '#3792D5', // MainBlue
            accent: '#E89325', // AccentOrange
            error: '#FB8C00', // Warning
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
