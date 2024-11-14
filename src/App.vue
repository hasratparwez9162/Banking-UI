<template>
  <the-navbar></the-navbar>
  <the-sppiner :is-loading="isLoading" :size="size"></the-sppiner>
  <router-view class="router"></router-view>
</template>

<script>
import TheSppiner from "./components/TheSppiner.vue";
import TheNavbar from "./components/TheNavbar.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    TheNavbar,
    TheSppiner,
  },
  data() {
    return {
      size: "100px",
    };
  },
  computed: {
    ...mapState(["isLoading"]),
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
  margin-top: 5rem;
}
</style>
