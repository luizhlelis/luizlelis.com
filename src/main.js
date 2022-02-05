import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueYouTubeEmbed from 'vue-youtube-embed'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Article from './components/Article.vue'
import NotFound from './components/NotFound.vue'

Vue.use(VueYouTubeEmbed)
Vue.config.productionTip = false

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '*',
      name: 'Not Found',
      component: NotFound
    }
  ]
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
