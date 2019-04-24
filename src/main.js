import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import OmnibarSideNavs from "./components/OmnibarSideNavs";
import LeftNavigation from "./components/LeftNavigation";
import RightNavigation from "./components/RightNavigation";
import Modal from "./components/Modal";

Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

Vue.component('OmnibarSideNavs', OmnibarSideNavs);
Vue.component('LeftNavigation', LeftNavigation);
Vue.component('RightNavigation', RightNavigation);
Vue.component('Modal', Modal);


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
