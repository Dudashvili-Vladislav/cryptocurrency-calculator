<template>
  <div class="auth-body">
    <h4 class="display-4 mb-5">Register</h4>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="name">Name</label>
        <div>
            <input class="form-control" id="name" type="text" v-model="name" required autofocus>
        </div>
      </div>

      <div class="mb-3">
        <label for="email" >E-Mail Address</label>
        <div>
            <input class="form-control" id="email" type="email" v-model="email" required>
        </div>
      </div>

      <div class="mb-3">
        <label for="password">Password</label>
        <div>
            <input class="form-control" id="password" type="password" v-model="password" required>
        </div>
      </div>

      <div class="mb-3">
        <label for="password-confirm">Confirm Password</label>
        <div>
            <input class="form-control" id="password-confirm" type="password" v-model="password_confirmation" required>
        </div>
      </div>
      
      <div>
        <button class="btn btn-success" type="submit">Register</button>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        name : "",
        email : "",
        password : "",
        password_confirmation : "",
        is_admin : null
      }
    },
    methods: {
      register: function () {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password,
          is_admin: this.is_admin
        }
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
  }
</script>
