import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: "1",
    member: Object,
    article: Object,
    boards: [],
    boardPageNav: {},
    word: "",
    key: "",
  },
  getters: {
    requestParams(state) {
      return {
        key: state.key,
        word: state.word,
        pg: state.boardPageNav.currentPage ?? 1,
      };
    },
  },
  mutations: {
    JOIN_MEMBER(state, member) {
      state.member = member;
    },
    LOGIN_MEMBER(state, member) {
      state.member = member;
      state.login = "2";
      console.log(state.member);
    },
    LOGOUT_MEMBER(state) {
      state.login = "1";
      console.log(state.login);
    },
    WRITE_ARTICLE(state, article) {
      state.article= article;
    },
    SET_BOARDS(state, payload) {
      state.boards = payload;
    },
    SET_KEY(state, payload) {
      state.key = payload;
    },
    SET_WORD(state, payload) {
      state.word = payload;
    },
    SET_BOARDPAGENAV(state, payload) {
      state.boardPageNav = payload;
    },
  },
  actions: {
    joinMember({ commit }, member) {
      console.log(member);
      axios
        .post("http://localhost:8079/member/join", member)
        .then((response) => {
          console.log(response);
          commit("JOIN_MEMBER", response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    loginMember({ commit }, member) {
      axios
        .post("http://localhost:8079/member/login", member)
        .then((response) => {
          console.log(response);
          commit("LOGIN_MEMBER", response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    getArticleList({ commit }, params) {
      console.log(params);
      commit("SET_KEY", params.key);
      commit("SET_WORD", params.word);
      axios
        .get("http://localhost:8079/board", { params })
        .then((response) => {
          console.log(response.data.list);
          commit("SET_BOARDS", response.data.list);
          commit("SET_BOARDPAGENAV", response.data.navigation);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logoutMember({ commit }) {
      commit("LOGOUT_MEMBER");
    },
    writeArticle({ commit }, article) {
      axios
      .post("http://localhost:8079/board", article)
      .then((response) => {
        console.log(response);
        commit("WRITE_ARTICLE", response);
      })
      .catch((error) => {
        console.dir(error);
      });
    }
  },
});
