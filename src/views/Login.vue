<template>
  <div class="container mt-4 mx-auto ">
    <app-message />
    <div class="bg-white">
      <div class="flex min-h-screen bg-white">
        <div class="md:w-1/2 max-w-lg mx-auto my-24 px-4 py-5 shadow-none">
          <div class="text-left p-0 font-sans">
            <h1 class=" text-gray-800 text-3xl font-medium text-center">
              Sign in
            </h1>
          </div>
          <form @submit.prevent="onSubmit" class="p-0">
            <div :class="['mt-5', { invalid: eError }]">
              <input
                name="email"
                type="email"
                id="email"
                v-model="email"
                class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                placeholder="Email"
                @blur="eBlur"
              />
              <small class="text-red-500" v-if="eError">{{ eError }}</small>
            </div>

            <div :class="['mt-5', { invalid: pError }]">
              <input
                name="password"
                type="password"
                id="password"
                v-model="password"
                class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                placeholder="Password"
                @blur="pBlur"
              />
              <small class="text-red-500" v-if="pError">{{ pError }}</small>
            </div>

            <div class="wrapper-btn flex">
              <div class="mt-10 m-auto">
                <button
                  type="submit "
                  class=" focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg "
                >
                  Sign in
                </button>
              </div>
            </div>
            <div class="hr mt-5">
              <hr />
            </div>
          </form>
          <p class="text-center mt-5">
            Don't have an account?
            <router-link class="router text-yellow-400" to="/register">
              Register
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { values } from "lodash";
import { useLoginForm } from "../use/loginForm";
import AppMessage from "../components/ui/AppMessage.vue";

export default {
  setup() {
    return { ...useLoginForm() };
  },
  components: { AppMessage },
};
</script>
