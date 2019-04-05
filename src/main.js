import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import OmnibarSideNavs from "./components/OmnibarSideNavs";
import LeftNavigation from "./components/LeftNavigation";
import RightNavigation from "./components/RightNavigation";
import ModalOne from "./components/ModalOne";
import ModalTwo from "./components/ModalTwo";
import ModalThree from "./components/ModalThree";
import ModalFour from "./components/ModalFour";

Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

Vue.component('OmnibarSideNavs', OmnibarSideNavs);
Vue.component('LeftNavigation', LeftNavigation);
Vue.component('RightNavigation', RightNavigation);
Vue.component('ModalOne', ModalOne);
Vue.component('ModalTwo', ModalTwo);
Vue.component('ModalThree', ModalThree);
Vue.component('ModalFour', ModalFour);


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
