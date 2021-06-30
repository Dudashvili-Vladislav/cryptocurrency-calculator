<template>
  <div class="home">
    <div class="header-wrapper flex">
    <h1 class="font-bold mx-auto px-10 text-left text-xl font-sans mt-5 ml-14">
      Calculator. Hedge
    </h1>
    <a
    @click.prevent="loguot"
    class="text-red-500 mt-5 mr-10 font-medium"
     >
      Loguot
    </a>
    </div>
    <!-- Tabs -->
    <div class="container with-nav ml-4">
      <ul class="list-reset flex border-b mt-5 ml-20">
        <li class="-mb-px mr-1 pr-2">
          <a
            @click="activeTab = 1"
            class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-dark font-semibold "
            >Recommended</a
          >
        </li>

        <li class="mr-1 pr-2 ">
          <a
            @click="activeTab = 2"
            class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-dark font-semibold"
            >Custom Pro</a
          >
        </li>

        <li class="mr-1 pr-2">
          <a
            @click="activeTab = 3"
            class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-dark font-semibold"
            >Custom QA</a
          >
        </li>
      </ul>

      <!-- Tab content -->
      <div class="tab-content">
        <div class="tab-item" v-if="activeTab === 1">
          <v-recommended></v-recommended>
        </div>
        <div class="tab-item" v-if="activeTab === 2">
          <v-customPro></v-customPro>
        </div>
        <div class="tab-item" v-if="activeTab === 3">
          <vCustomQa></vCustomQa>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VRecommended from "@/components/v-recommended.vue";
import VCustomPro from "@/components/v-customPro.vue";
import vCustomQa from "@/components/v-customQA.vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    return {
      loguot: () => {
        store.dispatch('auth/signOut')
        router.push('/Login')
      }
    }
  },

  name: "Home",

  components: {
    vCustomQa,
    VCustomPro,
    VRecommended,
  },

  data() {
    return {
      activeTab: 1,
    };
  },
};
</script>

<style>
a{
  cursor: pointer;
}
</style>
