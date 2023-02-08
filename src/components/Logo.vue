<template>
  <v-row>
    <v-col style="text-align: right; padding-right: 3px;">
      <img v-show="$vuetify.theme.isDark" src="@/assets/logo-white-and-pink.webp" alt="Pink Logo" class="image-logo"/>
      <img v-show="!$vuetify.theme.isDark" src="@/assets/logo-gray.webp" alt="Gray Logo" class="image-logo"/>
    </v-col>
    <v-col style="min-height: 50px; min-width:100px; text-align: center; margin-top: 11px;">
      <v-row style="vertical-align: text-bottom;">
        <p v-show="$vuetify.theme.isDark" class="logo-text" style="margin-bottom: 0px">Lelis</p>
        <p v-show="!$vuetify.theme.isDark" class="logo-text" style="margin-bottom: 0px; color: #878e88">Lelis</p>
      </v-row>
      <v-row style="margin-top: 0px;vertical-align: text-top;">
        <p v-show="$vuetify.theme.isDark" class="logo-sub-text" style="margin-bottom: 0px;">DEV</p>
        <p v-show="!$vuetify.theme.isDark"  class="logo-sub-text" style="margin-bottom: 0px; color: #878e88">DEV</p>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'Logo',
    props: {
      //
    },
    data () {
      return {
        //
      }
    },
    computed: {
      //
    },
    methods: {
      //
    }
  }
</script>

<style>
  .image-logo {
    max-width: 40px;
  }

  .logo-text {
    font-family: 'Bungee Inline', cursive;
    font-size: 20px;
  }

  .logo-sub-text {
    font-family: 'Bungee Inline', cursive;
    font-size: 31px;
  } 
</style>