<template>
  <the-navbar></the-navbar>
  <router-view class="router"></router-view>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";
export default {
  name: "App",
  components: {
    TheNavbar,
  },
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: #fffdef; */
}
html,
body {
  height: 100%;
  margin: 0;
  overflow-x: hidden; /* Prevent horizontal scrolling */
  background-color: #f5f5f5;
}
.router {
  margin-top: 60px;
}
</style>
