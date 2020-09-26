<template>
  <div id="app">
    <NavBar v-if="isAuthenticated" />
    <router-view v-if="isAuthenticated" />
    <Login v-if="!isAuthenticated" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import NavBar from "@/components/NavBar";
import Login from "@/components/Login";
export default {
  name: 'App',
  components: {
    NavBar,
    Login
  },
  computed: mapGetters(['isAuthenticated', 'isAdmin', 'user']),
  mounted() {
    console.log(localStorage.getItem('apollo-token'))
    this.$store.dispatch('GET_CURRENT_USER')
    console.log(this.user)
  }
}
</script>

<style>
#app {
  font-family: "Ubuntu", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
