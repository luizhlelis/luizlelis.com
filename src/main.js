import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueYouTubeEmbed from 'vue-youtube-embed'
import router from './router'
import VueMeta from 'vue-meta'

Vue.use(VueYouTubeEmbed)
Vue.config.productionTip = false

Vue.use(VueMeta)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
