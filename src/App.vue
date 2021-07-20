<template>
  <div class="container mx-auto">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
};
</script>

<style>
.auth-body {
  max-width: 400px;
  margin: 50px auto;
}

#app {
  min-height: 100vh;
  background: radial-gradient(123.22% 129.67% at 100.89% -5.6%, #2C1D47 0%, #18153A 100%)
}

#app .container {
  max-width: 1280px;
}

.icon {
  display: inline-block;
}

.user-icon {
  width: 23px;
  height: 24px;
  background: url('assets/images/user-icon.svg');
}
</style>
