<template>
  <div class="auth-body">
    <form class="login" @submit.prevent="login">
      <h1 class="display-4 mb-5">Sign in</h1>
      
      <div class="mb-3">
        <label>Email</label>
        <input required v-model="email" type="email" class="form-control" placeholder="Name" />
      </div>

      <div class="mb-3">
        <label>Password</label>
        <input
          required
          v-model="password"
          type="password"
          placeholder="Password"
          class="form-control"
        />
      </div>
      <hr />
      <button class="btn btn-success" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>
