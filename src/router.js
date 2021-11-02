import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'

Vue.use(Router)

const DEFAULT_TITLE = 'Luiz Lelis · Developer';

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: '' }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { title: '' }
    }
  ]
})

router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});

export default router;