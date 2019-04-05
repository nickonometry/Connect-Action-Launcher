import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import AnotherPage from "./pages/AnotherPage.vue";
import DummyLink from "./pages/DummyLink.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/anotherpage",
      name: "anotherpage",
      component: AnotherPage
    },
    {
      path: "/dummylink",
      name: "dummylink",
      component: DummyLink
    },
  ]
});
