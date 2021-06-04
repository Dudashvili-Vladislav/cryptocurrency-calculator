<template>
  <div id="app">
    <h1 class="font-bold mx-auto px-10 text-left text-xl font-sans mt-5 ml-14">
      Calculator. Hedge
    </h1>
    <!-- Tabs -->
    <div class="container with-nav ml-4">
      <ul class="list-reset flex border-b mt-5 ml-20">

        <li class="-mb-px mr-1 pr-2">
          <router-link to="/recommended" class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-dark font-semibold ">Recommended</router-link>
        </li>

        <li class="mr-1 pr-2 ">
          <router-link to="/CustomPro" class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-dark font-semibold">Custom Pro</router-link>
        </li>

        <li class="mr-1 pr-2">
          <router-link to="/CustomQA" class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-dark font-semibold">Custom QA</router-link>
        </li>

      </ul>
    </div>
    <router-view></router-view>
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
