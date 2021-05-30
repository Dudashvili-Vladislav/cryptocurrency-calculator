<template>
  <div id="app">
    <h1 class="font-bold mx-auto px-10 text-left text-xl font-sans">
      Calculator. Hedge
    </h1>
    <!-- Tabs -->
    <div class="container with-nav">
      <router-view></router-view>
      <ul class="list-reset flex border-b mt-5 ml-20">
        <li class="-mb-px mr-1">
          <router-link to="/">Recommended</router-link>
        </li>
        <li class="mr-1">
          <!--      <router-link to="/CustomPro">Custom Pro</router-link> -->
        </li>
        <li class="mr-1">
          <!--   <router-link to="/CustomQA">Custom QA</router-link> -->
        </li>
      </ul>
    </div>

    <!-- Custom Pro -->
    <!-- Custom QA -->

    <!-- Tabs end-->
  </div>
</template>

<script>
import vRecommended from "./components/v-recommended";
import vCustomQA from "./components/v-customQA";
import vCustomPro from "./components/v-customPro";

export default {
  name: "App",
  components: {
    vRecommended,
    vCustomQA,
    vCustomPro,
  },
};
</script>

<style></style>
