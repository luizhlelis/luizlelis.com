<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      dark
      src="@/assets/navigation.png"
    >
      <v-list>
        <v-list-item>
          <Logo />
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense>
        <v-list-item
          v-for="([icon, text, link], i) in items"
          :key="i"
          link
          @click="$vuetify.goTo(link)"
        >
          <v-list-item-icon class="justify-center">
            <v-icon class="text-border-black">{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">
              <h2 class="text-border-black">{{text}}</h2>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      height="80vw"
      :color="color"
      :flat="flat"
      dark
      class="px-15"
      :class="{ expand: flat }"
    >
      <v-toolbar-title>
        <Logo />
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="isXs"
      />
      <div v-else>
        <v-btn text @click="$vuetify.goTo('#hero')">
          <span class="mr-2">
            <h3 class="accent--text text-border-white">Home</h3>
          </span>
        </v-btn>
        <v-btn text @click="$vuetify.goTo('#about')">
          <span class="mr-2">
            <h3 class="accent--text text-border-white">About</h3>
          </span>
        </v-btn>
        <v-btn text @click="$vuetify.goTo('#posts')">
          <span class="mr-2">
            <h3 class="accent--text text-border-white">Posts</h3>
          </span>
        </v-btn>
        <v-btn text @click="$vuetify.goTo('#contact')">
          <span class="mr-2">
            <h3 class="accent--text text-border-white">Contact</h3>
          </span>
        </v-btn>
        <v-btn text v-on:click="this.$vuetify.theme.isDark=!this.$vuetify.theme.isDark">
          <span class="mr-2">
            <v-icon v-show="this.$vuetify.theme.isDark" class="accent--text text-border-white">mdi-lightbulb-off</v-icon>
            <v-icon v-show="!this.$vuetify.theme.isDark" class="accent--text text-border-white">mdi-lightbulb-off</v-icon>
          </span>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<style scoped>
.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px;
  padding-top: 10px;
}

.text-border-white {
  text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
}

.text-border-black {
  text-shadow: 0.7px 0 0 #ff0266, -0.7px 0 0 #ff0266, 0 0.7px 0 #ff0266, 0 -0.7px 0 #ff0266, 0.7px 0.7px #ff0266, -0.7px -0.7px 0 #ff0266, 0.7px -0.7px 0 #ff0266, -0.7px 0.7px 0 #ff0266;
}
</style>

<script>
import Logo from "./Logo";

export default {

  components: {
    Logo
  },

  data: () => ({
    drawer: null,
    isXs: false,
    items: [
      ["mdi-home", "Home", "#hero"],
      ["mdi-information-outline", "About", "#about"],
      ["mdi-book-edit-outline", "Posts", "#posts"],
      ["mdi-email-outline", "Contact", "#contact"]
    ],
  }),
  props: {
    color: String,
    flat: Boolean,
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
  },

  watch: {
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false;
        }
      }
    },
  },
  mounted() {
    console.log(this.$vuetify.theme.isDark);
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
};
</script>
