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
/* Import Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

/* Apply font styles globally */
body {
  font-family: "Open Sans", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
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
.custom-btn-primary {
  background-color: #20b757 !important;
  color: white !important;
  border: none !important;
}
.custom-bg-primary {
  /* background-color: #4371e9 !important; */
  background-color: #20b757 !important;
}
.custom-bg-primary-5 {
  background-color: #20b7570d !important;
}
.custom-text-primary {
  color: #20b757 !important;
}

.custom-card {
  margin-bottom: 20px !important;
  background-color: #ffffff !important;
  padding: 20px !important;
  border-radius: 10px !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) !important;
}
.custom-btn-primary:hover {
  border-color: #20b757 !important;
  background-color: transparent !important;
  color: #20b757 !important;
  border: 2px solid !important;
}
.btn-primary {
  background-color: #20b757 !important;
  color: white !important;
  border: 1px solid transparent !important;
  border-radius: 20px !important;
  font-size: 1.25rem !important;
  line-height: 1.7rem !important;
}
.btn-primary:hover {
  border-color: #20b757 !important;
  background-color: transparent !important;
  color: #20b757 !important;
  border: 1px solid !important;
}
.btn-secondary {
  background-color: #4371e9 !important;
  color: white !important;
  border-color: transparent !important;
  border: 1px solid !important;
}
.btn-secondary:hover {
  border-color: #4371e9 !important;
  background-color: transparent !important;
  color: #4371e9 !important;
  border: 1px solid !important;
}
.text-primary {
  color: #20b757 !important;
}
/* Custom width utility classes */
.w-5 {
  width: 5%;
}
.w-10 {
  width: 10%;
}
.w-12 {
  width: 12%;
}
.w-15 {
  width: 15%;
}
.w-20 {
  width: 20%;
}
.w-25 {
  width: 25%;
}
.w-30 {
  width: 30%;
}
.w-35 {
  width: 35%;
}
.w-40 {
  width: 40%;
}
.w-45 {
  width: 45%;
}
.w-50 {
  width: 50%;
}
.w-55 {
  width: 55%;
}
.w-60 {
  width: 60%;
}
.w-65 {
  width: 65%;
}
.w-70 {
  width: 70%;
}
.w-75 {
  width: 75%;
}
.w-80 {
  width: 80%;
}
.w-85 {
  width: 85%;
}
.w-90 {
  width: 90%;
}
.w-95 {
  width: 95%;
}
.w-100 {
  width: 100%;
}

/* formkit CSS */
select.formkit-input {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1.25rem;
  border-radius: 0.25rem;
  background-color: #f0f8f1;
  border: none;
  border-radius: 30px;
  padding-left: 50px;
}
button.formkit-input {
  background-color: #20b757 !important;
  color: white !important;
  border: 1px solid transparent !important;
  padding-left: 0 !important;
  padding: 0.375rem 0.75rem !important;
}
button.formkit-input:hover {
  border-color: #20b757 !important;
  background-color: transparent !important;
  color: #20b757 !important;
  border: 1px solid !important;
}

select.formkit-input:disabled {
  background-color: #f8f9fa;
}
select.formkit-input:focus {
  box-shadow: none;
  border: 1px solid #28a745 !important;
}
.formkit-input {
  width: 100% !important;
  padding: 0.5rem 0.75rem !important;
  font-size: 1.25rem !important;
  border-radius: 0.25rem !important;
  background-color: #f0f8f1 !important;
  border: 1px solid transparent !important;
  border-radius: 20px !important;
  padding-left: 0.8rem !important;
  line-height: 1.7rem !important;
  text-align: left !important;
  color: #000 !important;
}
.formkit-label {
  text-align: left;
  margin-left: 0.8rem !important;
  font-size: 1.25rem !important;
  font-weight: 400 !important;
}
.formkit-inner {
  box-shadow: none !important;
}

.formkit-input:disabled {
  background-color: #f8f9fa;
}
.formkit-input:focus {
  box-shadow: none;
  border: 1px solid #28a745 !important;
}
.formkit-wrapper {
  max-width: 100% !important;
}
.formkit-outer .formkit-steps {
  border: none !important;
}
.formkit-messages {
  text-align: left;
  margin-left: 0.8rem !important;
}
ul.formkit-options {
  display: flex;
}
ul.formkit-options li {
  margin-right: 0.8rem !important;
}
.formkit-fieldset {
  border: none !important;
}

/* .router {
  margin-top: 5rem;
} */
</style>
