<template>
  <div>
    <v-navigation-drawer v-model="drawer" app temporary dark src="@/assets/navigation.png">
      <v-list>
        <v-list-item>
          <Logo />
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense>
        <v-list-item v-for="([icon, text, link], i) in items" :key="i" link @click="$vuetify.goTo(link)" to="/">
          <v-list-item-icon class="justify-center">
            <v-icon class="text-border-black">{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">
              <h2 :class="fontSizeH2" class="text-border-black navigation-item">{{text}}</h2>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-show="showBasedOnRoute()" v-on:click="$vuetify.theme.isDark=!$vuetify.theme.isDark">
          <v-list-item-icon class="justify-center">
            <v-icon v-show="$vuetify.theme.isDark" class="text-border-black">mdi-lightbulb-off</v-icon>
            <v-icon v-show="!$vuetify.theme.isDark" class="text-border-black">mdi-lightbulb-on</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">
              <h2 :class="fontSizeH2" class="text-border-black navigation-item">Change Theme</h2>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app height="80vw" :color="color" :flat="flat" class="px-15" :style="headerPaddingSize"
      :class="{ expand: flat }">
      <v-toolbar-title>
        <Logo />
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="mr-4" v-if="isXs" />
      <div v-else>
        <v-btn style="color: transparent;" text v-on:click="$vuetify.goTo('#hero')" to="/">
          <span class="mr-2">
            <h3 class="accent--text text-border-white">Home</h3>
          </span>
        </v-btn>
        <v-btn v-show="false" text @click="$vuetify.goTo('#about')">
          <span class="mr-2">
            <h3 class="accent--text text-border-white">About</h3>
          </span>
        </v-btn>
        <v-btn text v-show="false" @click="$vuetify.goTo('#blog')">
          <span class="mr-2">
            <h3 class="accent--text text-border-white">Blog</h3>
          </span>
        </v-btn>
        <v-btn text v-show="false" @click="$vuetify.goTo('#contact')">
          <span class="mr-2">
            <h3 class="accent--text text-border-white">Contact</h3>
          </span>
        </v-btn>
        <v-btn v-show="showBasedOnRoute()" text v-on:click="$vuetify.theme.isDark=!$vuetify.theme.isDark">
          <span class="mr-2">
            <v-icon v-show="$vuetify.theme.isDark" class="accent--text text-border-white">mdi-lightbulb-off</v-icon>
            <v-icon v-show="!$vuetify.theme.isDark" class="accent--text text-border-white">mdi-lightbulb-on</v-icon>
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

.navigation-item {
  height: 20px;
  align-items: center;
  display: flex;
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

.font-h2-xs {
  font-size: 4vw;
}

.font-h2-sm {
  font-size: 2vw;
}

.font-h2-md {
  font-size: 1.5vw;
}

.font-h2-lg {
  font-size: 1.5vw;
}

.font-h2-xl {
  font-size: 1.5vw;
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
      // ["mdi-information-outline", "About", "#about"],
      // ["mdi-book-edit-outline", "Blog", "#blog"],
      // ["mdi-email-outline", "Contact", "#contact"]
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
    showBasedOnRoute() {
      switch (this.$route.name) {
        case 'home':
          return true;
        // case 'blog':
        //   return true;
        default:
          true;
      }
    }
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
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  computed: {
    fontSizeH2() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'font-h2-xs'
        case 'sm': return 'font-h2-sm'
        case 'md': return 'font-h2-md'
        case 'lg': return 'font-h2-lg'
        case 'xl': return 'font-h2-xl'
      }
      return ''
    },
    headerPaddingSize() {
      if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
        return 'padding-left: 20px !important; padding-right: 20px !important;'
      }
      return ''
    },
  },
};
</script>
