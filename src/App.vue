<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div class="container">
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <Waterfall/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Waterfall from './components/Waterfall.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
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
  margin-top: 60px;
  height: 100%;
  width: 100%;
  background-color: black;
}
</style>
