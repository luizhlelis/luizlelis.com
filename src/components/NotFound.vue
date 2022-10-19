<template>
  <center style="margin: auto; width: -webkit-fill-available; max-width: 800px;">
    <h1 :class="fontSizeH1">Not Found!</h1>
    <p>
      <a style="color: rgb(135, 142, 136)" href="/">
        <h2 :class="fontSizeH2">Bring me back to home</h2>
      </a>
    </p>
    <img alt="404" src="https://illustatus.herokuapp.com/?title=&fill=%234f86ed" />
  </center>
</template>

<script>

export default {
  name: 'NotFound',
  computed: {
    fontSizeH1() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'font-h1-xs'
        case 'sm': return 'font-h1-sm'
        case 'md': return 'font-h1-md'
        case 'lg': return 'font-h1-lg'
        case 'xl': return 'font-h1-xl'
      }
      return ''
    },
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
  }
}

</script>

<style scoped>
center {
  margin: 15vw;
  padding-top: 150px;
}
</style>