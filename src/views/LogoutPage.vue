<template>
  <div class="Login">
    <Login />
  </div>
</template>

<script>
import Login from "../components/Login.vue";
export default {
  name: "LogoutPage",
  components: {
    Login
  },
  created (){
    this.$store.dispatch('LOGOUT_USER')
        .then(() => { this.$router.push('/') })
  }
};
</script>

<style>
</style>