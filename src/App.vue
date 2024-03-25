<template>
  <v-app>
    <Navigation :color="color" :flat="flat" />
    <router-view></router-view>
    <v-main>
      <Blog v-show="isHomePage" />
      <Videos v-show="isHomePage" />
      <Badges v-show="isHomePage" />
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
import Videos from "./components/Videos.vue";
import Badges from "./components/Badges.vue";

export default {
  name: 'App',

  components: {
    Navigation,
    Footer,
    Blog,
    Videos,
    Badges
  },

  metaInfo() {
    return {
      title: this.metaTitle,
      meta: [
      {
        vmid: "description",
        name: "description",
        content: this.metaDescription,
      },
      {
        vmid: "og:title",
        property: "og:title",
        content: this.metaTitle,
      },
      {
        vmid: "og:description",
        property: "og:description",
        content: this.metaDescription,
      },
      {
        vmid: "og:url",
        property: "og:url",
        content: "https://luizlelis.com/",
      },
      {
        vmid: "og:image",
        property: "og:image",
        content: this.metaImgRef,
      },
    ]
    }
  },

  data: () => ({
    fab: null,
    color: "",
    flat: null,
    metaTitle: "👨🏽‍💻 Luiz Lelis · Developer",
    metaDescription: "Software Engineer currently working with back-end development (C#, AWS, Azure)",
    metaImgRef: "https://raw.githubusercontent.com/luizhlelis/luizlelis.com/main/src/assets/open-graph-hero.webp"
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
    }
  },

  computed: {
    isHomePage() {
      return this.$route.path == "/";
    }
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
