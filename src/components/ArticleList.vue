<template>
  <div>
    <b-container v-if="typeof(boards) !='undefined'" class="container">
	<table class="table table-borderless">
	  	<tr>
	  		<td align="right"><button type="button" id="mvWriteBtn" class="btn btn-link" v-if="login !== '1'" @click="$router.push({name: 'ArticleWrite'})">글쓰기</button></td>
	  	</tr>
	  </table>
      <b-table id="board_table" :items="boards" :fields="fields" >
	   <template #cell(update)="articleno">
        <b-button v-if="articleno.item.userid === member.data.id" size="sm" @click="$router.push({name: 'ArticleUpdate', params: {no: articleno.item.articleno}})" class="mr-2">수정
        </b-button>
      </template>
	  	<template #cell(delete)="articleno">
        <b-button v-if="articleno.item.userid === member.data.id" size="sm" @click="deleteBoard(articleno)" class="mr-2">삭제
        </b-button>
      </template>
	  </b-table>
	  
      <b-pagination v-if="typeof(boardPageNav) != 'undefined'" 
        v-model="boardPageNav.currentPage"
        :total-rows="boardPageNav.totalPageCount"
        :per-page="boardPageNav.naviSize"
        aria-controls="board_table"
        align="center"
        @page-move="pageMove"
      />
    </b-container>
    <b-container v-else class="container">
      <table class="table table-borderless">
	  	  <tr>
	  		  <td align="right"><button type="button" id="mvWriteBtn" class="btn btn-link" v-if="login !== '1'" @click="$router.push({name: 'ArticleWrite'})">글쓰기</button></td>
	  	  </tr>
	    </table>
      <h3>글 많이 써주세요</h3>
    </b-container>
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
		{ label: "수정", key: "update" },
		{ label: "삭제", key: "delete" },
      ],
    };
  },
  computed: {
    ...mapState(["boards", "boardPageNav", "key", "word", "login", "member"]),
  },
  created() {
    console.log(this.boards);
    this.getdata();
  },
    watch: {
    '$route': 'getdata'
  },
  methods: {
    ...mapActions(["getArticleList"]),
	...mapActions(["deleteArticle"]),
	getdata(){
		this.getArticleList(this.$store.getters.requestParams);
	},
    pageMove: function (button, page) {
      const params = { key: this.key, word: this.word, pg: page };
      this.getArticleList(params);
    },
	deleteBoard(articleno){
		this.deleteArticle(articleno);
    this.$router.go();
	}
  },
};
</script>

<style></style>
