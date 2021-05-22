import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate"


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
    sido: [],
    gugun: [],
    dong: [],
    apts: [],
    apt: Object,
    wishs: [],
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
      console.log(member)
      if (member.data.length !== 0) {
        state.login = "2";
        state.member = member;
      }
      else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    },
    LOGOUT_MEMBER(state) {
      state.login = "1";
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
    DELETE_ARTICLE(state) {
      state.boards;
    },
    UPDATE_ARTICLE(state, article) {
      state.article= article;
    },
    DELETE_USER(state) {
      state.login = "1";
    },
    UPDATE_MEMBER(state, member) {
      state.member = member;
    },
    SET_SIDO(state, sido) {
      state.sido = sido;
      console.log(state.sido);
    },
    SET_GUGUN(state, gugun) {
      state.gugun = gugun;
      console.log(state.gugun);
    },
    SET_DONG(state, dong) {
      state.dong = dong;
      console.log(state.dong);
    },
    SET_APTS(state, apts) {
      state.apts = apts;
      console.log(state.apts);
    },
    SET_WISH(state) {
      console.log(state.wishs);
    },
    SET_WISHS(state, wishs) {
      console.log("w : " + wishs);
      state.wishs = wishs;
      console.log(state.wishs);
    },
    DELETE_WISH(state) {
      console.log(state.wishs);
    }
  },
  actions: {
    joinMember({ commit }, member) {
      console.log(member);
      axios
        .post("http://localhost:8092/user/join", member)
        .then((response) => {
          console.log(response);
          commit("JOIN_MEMBER", response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    registInterest({ commit }, param) {
      console.log(param);
      axios
        .post("http://localhost:8092/wish/" + param)
        .then((response) => {
          console.log(response);
          commit("SET_WISH", response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    loginMember({ commit }, member) {
      axios
        .post("http://localhost:8092/user/login", member)
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
        .get("http://localhost:8092/board", { params })
        .then((response) => {
          console.log(response.data.list);
          commit("SET_BOARDS", response.data.list);
          commit("SET_BOARDPAGENAV", response.data.navigation);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getWishList({ commit }, userid) {
      console.log(userid + 111);
      axios
        .get("http://localhost:8092/wish/" + userid)
        .then((response) => {
          console.log(response);
          commit("SET_WISHS", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteWishList({ commit }, param) {
      console.log(param);
      axios
        .delete("http://localhost:8092/wish/" + param)
      .then((response) => {
        console.log(response);
        commit("DELETE_WISH", response);
      })
      .catch((error) => {
        console.dir(error);
      });
    },
    getSidoList({ commit }) {
      axios
        .get("http://localhost:8092/house/area")
        .then((response) => {
          console.log(response);
          commit("SET_SIDO", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGugunList({ commit }, code) {
      axios
        .get("http://localhost:8092/house/sido/" + code)
        .then((response) => {
          console.log(response);
          commit("SET_GUGUN", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDongList({ commit }, code) {
      axios
        .get("http://localhost:8092/house/gugun/" + code)
        .then((response) => {
          console.log(response);
          commit("SET_DONG", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAptList({ commit }, code) {
      axios
        .get("http://localhost:8092/house/dong/" + code)
        .then((response) => {
          console.log(response.data.list);
          commit("SET_APTS", response.data.list);
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
      .post("http://localhost:8092/board", article)
      .then((response) => {
        console.log(response);
        commit("WRITE_ARTICLE", response);
      })
      .catch((error) => {
        console.dir(error);
      });
    },
    deleteArticle({ commit }, articleno) {
      axios
        .delete("http://localhost:8092/board/" + articleno.item.articleno )
      .then((response) => {
        console.log(response);
        commit("DELETE_ARTICLE", response);
      })
      .catch((error) => {
        console.dir(error);
      });
    },
    updateArticle({ commit }, article) {
      axios
      .put("http://localhost:8092/board/" + article.articleno, article)
    .then((response) => {
      console.log(response);
      commit("UPDATE_ARTICLE", response);
    })
    .catch((error) => {
      console.dir(error);
    });
    },
    deleteUser({ commit }, userid) {
      axios
        .delete("http://localhost:8092/user/" + userid )
      .then((response) => {
        console.log(response);
        commit("DELETE_USER", response);
      })
      .catch((error) => {
        console.dir(error);
      });
    },
    updateMember({ commit }, member) {
      console.log(member.data);
      axios
      .put("http://localhost:8092/user/" + member.id, member)
    .then((response) => {
      console.log(22);
      commit("UPDATE_MEMBER", response);
    })
    .catch((error) => {
      console.dir(error);
    });
    },
  },
  plugins: [createPersistedState()],
});
