<template>
  <div>
    <b-container v-if="boards.length" class="container">
      <b-table id="board_table" :items="boards" :fields="fields" />
      <b-pagination
        v-model="boardPageNav.currentPage"
        :total-rows="boardPageNav.totalPageCount"
        :per-page="boardPageNav.naviSize"
        aria-controls="board_table"
        align="center"
        @page-move="pageMove"
      />
    </b-container>
    <b-container v-else class="container">
      <h3>글 많이 써주세요</h3>
    </b-container>
    <h3>안녕</h3>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ArticleList",
  data() {
    return {
      fields: [
        { label: "글 번호", key: "articleno" },
        { label: "ID", key: "userid" },
        { label: "제목", key: "subject" },
        { label: "내용", key: "content" },
        { label: "작성 일자", key: "regtime" },
      ],
    };
  },
  computed: {
    ...mapState(["boards", "boardPageNav", "key", "word"]),
  },
  created() {
    this.getArticleList(this.$store.getters.requestParams);
  },
  methods: {
    ...mapActions("getArticleList"),
    pageMove: function (button, page) {
      const params = { key: this.key, word: this.word, pg: page };
      this.getArticleList(params);
    },
  },
};
</script>

<style></style>