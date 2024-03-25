import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Article from "./components/Article.vue";
import NotFound from "./components/NotFound.vue";
import VueYoutube from "vue-youtube";
import VueMeta from 'vue-meta'

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(VueYoutube);
Vue.use(VueMeta)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/blog/dotnet-docker-images-deleted",
      name: "dotnet-docker-images-deleted",
      component: Article,
      props: {
        articleId: "dotnet-docker-images-deleted",
        imgRef:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--SEo8hwIp--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5lpakyzl6myzgo4eoiby.png",
        metaTitle: ".NET Core 2.1 container images were deleted from Docker Hub!",
        metaDescription: ".NET Core 2.1 container images were deleted from Docker Hub!",
      },
    },
    {
      path: "/blog/tracecontext",
      name: "tracecontext",
      component: Article,
      props: {
        articleId: "tracecontext",
        imgRef:
          "https://raw.githubusercontent.com/luizhlelis/trace-context-w3c/main/doc/trace-context-cover-image.webp",
        metaTitle: "Using W3C Trace Context standard in distributed tracing",
        metaDescription: "Using W3C Trace Context standard in distributed tracing",
      },
    },
    {
      path: "/blog/tracecontext-dotnet",
      name: "tracecontext-dotnet",
      component: Article,
      props: {
        articleId: "tracecontext-dotnet",
        imgRef:
          "https://raw.githubusercontent.com/luizhlelis/dotnet-trace-context/main/doc/trace-context-cover-image.webp",
        metaTitle: "[c#] Using W3C Trace Context standard in distributed tracing",
        metaDescription: "[c#] Using W3C Trace Context standard in distributed tracing",
      },
    },
    {
      path: "/blog/typesense",
      name: "typesense",
      component: Article,
      props: {
        articleId: "typesense",
        imgRef:
          "https://raw.githubusercontent.com/luizhlelis/typesense-playground/main/doc/article-hero.webp",
        metaTitle: "⚡ 🔍 Typesense search engine: an easier-to-use alternative to ElasticSearch",
        metaDescription: "⚡ 🔍 Typesense search engine: an easier-to-use alternative to ElasticSearch",
      },
    },
    {
      path: "/blog/go-lang-self-signed",
      name: "go-lang-self-signed",
      component: Article,
      props: {
        articleId: "go-lang-self-signed",
        imgRef:
          "https://raw.githubusercontent.com/luizhlelis/go-lang-https-self-signed/main/docs/article-hero.webp",
        metaTitle: "🔐 Building a self signed server in golang",
        metaDescription: "🔐 Building a self signed server in golang",
      },
    },
    {
      path: "/blog/outbox-pattern",
      name: "outbox-pattern",
      component: Article,
      props: {
        articleId: "outbox-pattern",
        imgRef:
          "https://raw.githubusercontent.com/luizhlelis/cap-playground/main/assets/outbox.webp",
        metaTitle: "📦 Data consistency, outbox pattern and idempotency in a microservice architecture",
        metaDescription: "📦 Data consistency, outbox pattern and idempotency in a microservice architecture",
      },
    },
    {
      path: "/blog/open-telemetry-00",
      name: "open-telemetry-00",
      component: Article,
      props: {
        articleId: "open-telemetry-00",
        imgRef:
          "https://raw.githubusercontent.com/luizhlelis/luizlelis.com/main/src/assets/open-telemetry-00.webp",
        metaTitle: "🔭 OpenTelemetry Journey #00 - Introduction to OpenTelemetry",
        metaDescription: "🔭 OpenTelemetry Journey #00 - Introduction to OpenTelemetry",
      },
    },
    {
      path: "/blog/open-telemetry-01",
      name: "open-telemetry-01",
      component: Article,
      props: {
        articleId: "open-telemetry-01",
        imgRef:
          "https://raw.githubusercontent.com/luizhlelis/luizlelis.com/main/src/assets/open-telemetry-00.webp",
        metaTitle: "🔭 OpenTelemetry Journey #01 - Important concepts",
        metaDescription: "🔭 OpenTelemetry Journey #01 - Important concepts",
      },
    },
    {
      path: "*",
      name: "Not Found",
      component: NotFound,
    },
  ],
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");