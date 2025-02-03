import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import store from "./store/index.js";

// Import Bootstrap CSS and optionally JavaScript
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap"; // Optional: if you need Bootstrap's JavaScript components

// Add FontAwesome icons to the library
library.add(fas);

// FormKit imports
import { plugin as formKitPlugin, defaultConfig } from "@formkit/vue";
import { createMultiStepPlugin } from "@formkit/addons";
import "@formkit/themes/genesis"; // FormKit theme
import "@formkit/addons/css/multistep"; // Multi-step CSS

// Create and configure the Vue app
const app = createApp(App);

// Register FontAwesome component
app.component("font-awesome-icon", FontAwesomeIcon);

// Use router, store, and FormKit plugins
app.use(router);
app.use(store);
app.use(
  formKitPlugin,
  defaultConfig({
    plugins: [createMultiStepPlugin()],
  })
);

// Mount the app
app.mount("#app");
