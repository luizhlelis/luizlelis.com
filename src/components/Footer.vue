<template>
  <v-footer dark padless>
    <v-card flat tile class="secondary white--text text-center">
      <v-card-text>
        <v-btn
          v-for="(icon, i) in icons"
          :key="i"
          class="mx-4 white--text"
          :href="icon.link"
          target="_blank"
          icon
        >
          <v-icon size="24px">{{ icon.text }}</v-icon>
        </v-btn>
      </v-card-text>

      <!-- <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum.
      </v-card-text> -->

      <v-divider></v-divider>

      <v-card-text :class="fontSizeBody" class="white--text">
        {{ new Date().getFullYear() }}, <strong>Luiz Lelis</strong> — work in progress...
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<style scoped>
.v-card {
  width: 100%;
}
</style>

<script>
export default {
  data: () => ({
    icons: [
      {
        text: "mdi-github",
        link: "https://github.com/luizhlelis",
      },
      {
        text: "mdi-linkedin",
        link: "https://linkedin.com/in/luizhlelis",
      },
      {
        text: "mdi-dev-to",
        link: "https://dev.to/luizhlelis",
      },
      {
        text: "mdi-stack-overflow",
        link: "https://stackoverflow.com/users/5610329/luiz-lelis",
      },
    ],
  }),
  computed: {
    fontSizeBody () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'font-body-xs'
        case 'sm': return 'font-body-sm'
        case 'md': return 'font-body-md'
        case 'lg': return 'font-body-lg'
        case 'xl': return 'font-body-xl'
      }
      return ''
    }
  },
};
</script>
