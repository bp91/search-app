import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchInput: "",
    errorMessage: "",
    disableSend: true,
    indices: [
        {
            "id": 1,
            "value": "categories"
        }, 
        {
            "id": 2, 
            "value": "psychographics"
        }
    ],
    selectedIndex: "categories",
    results: {}
  },
  mutations: {},
  actions: {}
});
