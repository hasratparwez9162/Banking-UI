import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import store from "./store/index.js";

// Import Bootstrap CSS and optionally JavaScript
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"; // Optional: if you need Bootstrap's JavaScript components

// Add FontAwesome icons to the library
library.add(fas);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .mount("#app");
