<template>
  <div id="app">
    <h1 class=" font-bold containet mx-auto px-10  text-left text-xl font-sans ">Calculator. Hedge</h1>
    <v-recommended />
  </div>
</template>

<script>
import vRecommended from "./components/v-recommended";

export default {
  name: "App",
  components: {
    vRecommended,
  },
};
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
