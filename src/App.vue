<template>
  <!-- <Waterfall /> -->
  <v-app>
    <Navigation :color="color" :flat="flat" />
    <v-main class="pt-0">
      <Home />
      <About v-show="false" />
      <Posts v-show="false" />
      <Contact v-show="false" />
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
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Posts from "./components/Posts";
import Contact from "./components/Contact";

export default {
  name: 'App',

  components: {
    // Waterfall,
    Navigation,
    Footer,
    Home,
    About,
    Posts,
    Contact
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
@import url('https://fonts.googleapis.com/css2?family=Bungee&family=Bungee+Inline&family=Roboto&display=swap');

html, body {
  font-family: 'Roboto', sans-serif;
  font-size: 1.5vw
}

h1 {
  font-family: 'Bungee', cursive;
  font-size: 4vw;
}

h2 {
  font-family: 'Bungee', cursive;
  font-size: 2vw;
}

h3 {
  font-family: 'Bungee', cursive;
  font-size: 1.3vw;
}

#app {
  font-family: 'Roboto', sans-serif;
}

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
