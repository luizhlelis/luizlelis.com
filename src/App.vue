<template>
  <v-app>
    <Navigation :color="color" :flat="flat" />
    <router-view></router-view>
    <v-main>
      <Blog />
    </v-main>
    <v-scale-transition>
      <v-btn fab v-show="fab" v-scroll="onScroll" fixed bottom right color="#ff0266" @click="toTop">
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-scale-transition>
    <Footer />
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Blog from "./components/Blog.vue";

export default {
  name: 'App',

  components: {
    Navigation,
    Footer,
    Blog
  },

  data: () => ({
    fab: null,
    color: "",
    flat: null,
  }),

  created() {
    const top = window.pageYOffset || 0;
    this.$vuetify.theme.isDark = true;
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

html,
body {
  font-family: 'Roboto', sans-serif;
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
</style>
