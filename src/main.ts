import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueGtag from "vue-gtag";
import "@iconify/iconify";

Vue.use(VueGtag, {
  config: { id: "G-70PGH3D2QT" },
});

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default-dark.css";
import { MdCheckbox } from "vue-material/dist/components";

Vue.use(MdCheckbox);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
