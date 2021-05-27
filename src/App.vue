<template>
  <div id="app">
    <h1 class="font-bold mx-auto px-10 text-left text-xl font-sans">Calculator. Hedge</h1>
    <!-- Tabs -->
    
    <v-recommended />
    <!-- Custom Pro -->
    <!-- Custom QA -->

    <!-- Tabs end-->
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
</style>
