import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    member: Object,
  },
  getters: {},
  mutations: {
    JOIN_MEMBER(state, member) {
      state.member = member;
    },
  },
  actions: {
    joinMember({ commit }, member) {
      axios
        .post("http://localhost:8079/member/join", member)
        .then((response) => {
          console.log(response.data.response.body.items.item);
          commit('JOIN_MEMBER', response.data.response.body.items.item);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },
});
