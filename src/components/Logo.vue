<template>
  <v-row>
    <v-col style="text-align: right; padding-right: 3px;">
      <img src="@/assets/logo-gray.png" alt="Logo" class="image-logo" />
    </v-col>
    <v-col style="min-height: 50px; min-width:100px; text-align: center; margin-top: 11px;">
      <v-row style="vertical-align: text-bottom;">
        <logo-text>Lelis</logo-text>
      </v-row>
      <v-row style="margin-top: 0px;">
        <logo-sub-text >DEV</logo-sub-text>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped>
  .image-logo {
    max-width: 4vw;
  }

  logo-text {
    font-family: 'Bungee Inline', cursive;
    font-size: 2vw;
    color: #878e88;
  }

  logo-sub-text {
    font-family: 'Bungee Inline', cursive;
    font-size: 3vw;
    color: #878e88;
  } 
</style>