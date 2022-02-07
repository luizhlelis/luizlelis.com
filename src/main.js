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
      path: '/blog/dotnet-docker-images-deleted',
      name: 'dotnet-docker-images-deleted',
      component: Article,
      props: { articleId: 'dotnet-docker-images-deleted', imgRef: 'https://res.cloudinary.com/practicaldev/image/fetch/s--SEo8hwIp--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5lpakyzl6myzgo4eoiby.png' }
    },
    {
      path: '/blog/tracecontext',
      name: 'tracecontext',
      component: Article,
      props: { articleId: 'tracecontext', imgRef: 'https://raw.githubusercontent.com/luizhlelis/trace-context-w3c/main/doc/trace-context-cover-image.png' }
    },
    {
      path: '/blog/tracecontext-dotnet',
      name: 'tracecontext-dotnet',
      component: Article,
      props: { articleId: 'tracecontext-dotnet', imgRef: 'https://raw.githubusercontent.com/luizhlelis/dotnet-trace-context/main/doc/trace-context-cover-image.png' }
    },
    {
      path: '/blog/typesense',
      name: 'typesense',
      component: Article,
      props: { articleId: 'typesense', imgRef: 'https://raw.githubusercontent.com/luizhlelis/typesense-playground/main/doc/article-hero.png' }
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
