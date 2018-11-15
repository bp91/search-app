import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

const routes = [
  {
    path: "/", 
    component: Home}
];

Vue.use(Router);

export default new Router({
  routes
});
