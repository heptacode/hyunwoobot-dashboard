import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "G-70PGH3D2QT" },
});

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default-dark.css";
import { MdButton, MdCheckbox, MdRipple, MdTooltip } from "vue-material/dist/components";

Vue.use(MdButton);
Vue.use(MdCheckbox);
Vue.use(MdRipple);
Vue.use(MdTooltip);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
