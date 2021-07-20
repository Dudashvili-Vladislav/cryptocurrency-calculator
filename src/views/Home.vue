<template>
  <div class="home">
    <div class="header-wrapper flex">
      <h1 class="logo font-bold text-xl">
        Calculator
      </h1>

      <div class="user-panel ml-auto">
        <div class="swicher">
          switch
        </div>

        <vSelect :options="langList" class="lang-select"></vSelect>

        <div class="user-panel-wrap">

          <div class="user-avatar">
            <i class="icon user-icon"></i>
          </div>

          <div class="user-info">
            <div class="user-name">Иванов П.И.</div>
            <div class="user-type">пользователь</div>
          </div>
        </div>

        <a
          @click.prevent="loguot"
          class="btn"
        >
          Выйти
        </a>
      </div>

      <div class="divider"></div>

      <v-header-forms />
    </div>
    <!-- Tabs -->
    <!-- <div class="container with-nav ml-4">
      <ul class="list-reset flex border-b mt-5 ml-20">
        <li class="-mb-px mr-1 pr-2">
          <a
            @click="activeTab = 1"
            class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-dark font-semibold "
            >Recommended</a
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
    </div> -->
  </div>
</template>

<script>
import VRecommended from "@/components/v-recommended.vue";
import VCustomPro from "@/components/v-customPro.vue";
import vCustomQa from "@/components/v-customQA.vue";
import vSelect from "@/components/header/forms/v-select";
import vHeaderForms from "@/components/header/v-header-forms";
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
    vSelect,
    vHeaderForms,
    vCustomQa,
    VCustomPro,
    VRecommended,
  },

  data() {
    return {
      activeTab: 1,
      langList: ['RU', 'ENG']
    };
  },
};
</script>

<style>
a{
  cursor: pointer;
}

.logo {
  text-transform: uppercase;
  color: #ffffff;
}

.header-wrapper {
  flex-wrap: wrap;
  align-items: center;
  padding: 48px 48px 24px;
  background: linear-gradient(210.96deg, rgba(55, 36, 88, 0.61) 0.01%, rgba(43, 35, 83, 0.7) 42.05%, rgba(63, 59, 115, 0) 104.81%);
  filter: drop-shadow(0px 48px 69px rgba(23, 18, 43, 0.845335));
  backdrop-filter: blur(20px);
  border-radius: 0px 0px 18px 18px;
}

.user-panel {
  display: flex;
  align-items: center;
}

.user-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid rgba(65, 54, 241, 1);
}

.user-info {
  display: flex;
  flex-direction: column;
  margin-left: 18px;
}

.user-name {
  font-size: 18px;
  line-height: 21px;
  color: #fff;
  margin-bottom: 3px;
}

.user-type {
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #FFFFFF;
  opacity: 0.5;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
}

.user-panel-wrap {
  display: flex;
  align-items: center;
  margin-left: 48px;
  margin-right: 48px;
}

.lang-select {
  margin-left: 48px;
  min-width: 70px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 48px;
  min-width: 120px;
  background: linear-gradient(270deg, #8743FF 0%, #4136F1 100%);
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #FFFFFF;
}

.divider {
  width: 100%;
  background: linear-gradient(270deg, #8743FF 0%, #4136F1 100%);
  height: 1px;
  margin: 28px 0 20px;
}
</style>
