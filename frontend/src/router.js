import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Search from "./views/Search.vue";

const routes = [
  {
    path: "/", 
    component: Home
  },
  {
    path: "/search", 
    component: Search
  }

];



Vue.use(Router);

let Instance = new Router({
  routes
});


Instance.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start();
  }
  next()
})

Instance.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
})

export default Instance;
