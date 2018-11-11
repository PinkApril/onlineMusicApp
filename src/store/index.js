import Vue from "vue";
import Vuex from "vuex";

import state from "./qqmusic/state.js";
import mutations from "./qqmusic/mutations.js";
import actions from "./qqmusic/actions.js";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        ...state
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    }
});
export default store
