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
    dongnum: "",
    rooms: [],
    room: "1",
    roomInfo: Object,
    popular: [],
    msg: [],
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
    },
    SET_GUGUN(state, gugun) {
      state.gugun = gugun;
    },
    SET_DONG(state, dong) {
      state.dong = dong;
    },
    SET_APT(state, apt) {
      state.apt = apt;
    },
    SET_APTS(state, apts) {
      state.apts = apts;
    },
    SET_DONGNUM(state, code) {
      state.dongnum = code
    },
    SET_WISH(state) {
      console.log(state.wishs);
    },
    SET_WISHS(state, wishs) {
      state.wishs = wishs;
    },
    DELETE_WISH(state) {
      console.log(state.wishs);
    },
    SET_ROOMS(state, rooms) {
      state.rooms = rooms;
    },
    SET_ROOM(state, room) {
      if (room.data + 1 == '1') {
        state.room = "1";
      }
      else {
        state.room = "2";
        state.roomInfo = room.data;
      }
    },
    SET_CHAT(state, room) {
      state.roomInfo = room.data;
    },
    SET_POPULAR(state, popular) {
      state.popular = popular;
    },
    SET_MSG(state, msg) {
      state.msg = msg;
    }
  },
  actions: {
    joinMember({ commit }, member) {
      axios
        .post("http://localhost:8092/user/join", member)
        .then((response) => {
          commit("JOIN_MEMBER", response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    registInterest({ commit }, param) {
      axios
        .post("http://localhost:8092/wish/" + param)
        .then((response) => {
          commit("SET_WISH", response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    registRoom({ commit }, name) {
      axios
        .post("http://localhost:8092/chat/room/" + name)
        .then((response) => {
          alert(response.data.roomMame + "번 방 개설에 성공하였습니다.");
          commit("SET_CHAT", response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    loginMember({ commit }, member) {
      axios
        .post("http://localhost:8092/user/login", member)
        .then((response) => {
          commit("LOGIN_MEMBER", response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    getArticleList({ commit }, params) {
      commit("SET_KEY", params.key);
      commit("SET_WORD", params.word);
      axios
        .get("http://localhost:8092/board", { params })
        .then((response) => {
          commit("SET_BOARDS", response.data.list);
          commit("SET_BOARDPAGENAV", response.data.navigation);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getWishList({ commit }, userid) {
      axios
        .get("http://localhost:8092/wish/" + userid)
        .then((response) => {
          commit("SET_WISHS", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteWishList({ commit }, param) {
      axios
        .delete("http://localhost:8092/wish/" + param)
      .then((response) => {
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
          commit("SET_APTS", response.data.list);
          commit("SET_DONGNUM", code);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAptListByGu({ commit }, code) {
      console.log(code);
      axios
        .get("http://localhost:8092/house/interest/" + code)
        .then((response) => {
          commit("SET_APTS", response.data.list);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAptDetail(context, name) {
      let dong = context.state.dongnum
      axios
        .get("http://localhost:8092/house/search/" + name, { params: { dong } })
        .then((response) => {
          context.commit("SET_APT", response.data.list);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRooms({ commit }) {
      axios
        .get("http://localhost:8092/chat/rooms")
        .then((response) => {
          commit("SET_ROOMS", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRoom({ commit }, no) {
      axios
        .get("http://localhost:8092/chat/room/" + no)
        .then((response) => {
          commit("SET_ROOM", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPopular({ commit }) {
      axios
        .get("http://localhost:8092/house/popular")
        .then((response) => {
          commit("SET_POPULAR", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMsg({ commit }, no) {
      axios
        .get("http://localhost:8092/chat/room/" + no)
        .then((response) => {
          console.log("getMsg");
          console.log(response);
          commit("SET_MSG", response);
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
        commit("DELETE_USER", response);
      })
      .catch((error) => {
        console.dir(error);
      });
    },
    updateMember({ commit }, member) {
      axios
      .put("http://localhost:8092/user/" + member.id, member)
    .then((response) => {
      commit("UPDATE_MEMBER", response);
    })
    .catch((error) => {
      console.dir(error);
    });
    },
  },
  plugins: [createPersistedState()],
});
