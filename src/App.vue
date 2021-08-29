<template>
  <!-- <Waterfall /> -->
  <v-app>
    <Header :color="color" :flat="flat" />
    <v-main class="pt-0">
      <Home />
      <About />
      <Posts />
      <Pricing />
    </v-main>
    <v-scale-transition>
      <v-btn
        fab
        v-show="fab"
        v-scroll="onScroll"
        dark
        fixed
        bottom
        right
        color="secondary"
        @click="toTop">
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-scale-transition>
    <Footer />
  </v-app>
</template>

<script>
// import Waterfall from './components/Waterfall.vue'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Posts from "./components/Posts";
import Pricing from "./components/Pricing";

export default {
  name: 'App',

  components: {
    // Waterfall,
    Header,
    Footer,
    Home,
    About,
    Posts,
    Pricing
  },

  data: () => ({
    fab: null,
    color: "",
    flat: null,
  }),

  created() {
    const top = window.pageYOffset || 0;
    if (top <= 60) {
      this.color = "transparent";
      this.flat = true;
    }
  },

  watch: {
    fab(value) {
      if (value) {
        this.color = "secondary";
        this.flat = false;
      } else {
        this.color = "transparent";
        this.flat = true;
      }
    },
  },

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  background-color: black;
}

body {
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
} */

.v-main {
  background-image: url("~@/assets/bgMain.png");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>
