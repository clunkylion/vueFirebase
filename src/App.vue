<template>
  <div id="app">
    <notifications group="foo" />
    <sala/>
  </div>
</template>

<script>
import Sala from './components/Sala.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld
    Sala
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
}
</style>
