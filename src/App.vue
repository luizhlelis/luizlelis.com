<template>
  <Waterfall />
</template>

<script>
import Waterfall from './components/Waterfall.vue'

export default {
  name: 'App',
  components: {
    Waterfall
  }
}
</script>

<style>
#app {
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
}

</style>
