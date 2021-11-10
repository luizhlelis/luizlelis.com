import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
  options: {
    customProperties: true
  },
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      isDark: true,
      light: {
        primary: "#1F1B24",
        secondary: "#1F1B24",
        accent: "#ff0266",
        info: "#ffffff"
      },
      dark: {
        primary: "#119DA4",
        secondary: "#171b34",
        accent: "3D87E4",
        background: "#121212",
        surface: "ff0266"
      }    
    }
  }
});
