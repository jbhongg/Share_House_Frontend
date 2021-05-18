<template>
    <div>
<form name="pageform" id="pageform" method="GET" action="">
		<input type="hidden" name="pg" id="pg" value="">
		<input type="hidden" name="key" id="key" value="">
		<input type="hidden" name="word" id="word" value="">
	</form>
	<form id="downform">
		<input type="hidden" name="sfolder">
		<input type="hidden" name="ofile">
		<input type="hidden" name="sfile">
	</form>
	<div class="container" align="center">
	  <div class="col-lg-8" align="center">
	  <h2>공지사항</h2>
	  <table class="table table-borderless">
	  	<tr>
	  		<td align="right"><button type="button" id="mvWriteBtn" class="btn btn-link" v-if="login !== '1'" @click="$router.push({name: 'ArticleWrite'})">글쓰기</button></td>
	  	</tr>
	  </table>
	  <form id="searchform" method="get" class="form-inline" action="">
	  <input type="hidden" name="pg" id="pg" value="1">
	  <table class="table table-borderless">
	  	<tr>
	  		<td align="right">
		  	  <select class="form-control" name="key" id="skey">
			    <option value="userid" selected="selected">아이디</option>
			    <option value="articleno">글번호</option>
			    <option value="subject">제목</option>
			  </select>
			  <input type="text" class="form-control" placeholder="검색어 입력." name="word" id="sword">
			  <button type="button" id="searchBtn" class="btn btn-primary">검색</button>
			</td>
	  	</tr>
	  </table>
	  </form>
	  <div v-if="articles.length != 0">
		  <div v-for="(art,i) in articles" :key="i">
	  <table class="table table-active">
	    <tbody>
	      <tr class="table-info">
	        <td>작성자 : </td>
	        <td align="right">작성일 : </td>
	      </tr>
	      <tr>
	        <td colspan="2" class="table-danger"><strong>${article.articleno}. ${article.subject}</strong></td>
	      </tr>
	      <tr>
	        <td colspan="2">${article.content}</td>
	      </tr>
	      <c:if test="${!empty article.fileInfos}">
	      <tr>
	        <td colspan="2">
			<ul>
				<div v-for="(file, i) in article.data.fileInfos" :key="i">
				<li>${file.originFile} <a href="#" class="filedown" sfolder="${file.saveFolder}" sfile="${file.saveFile}" ofile="${file.originFile}">[다운로드]</a></li>
				</div>
			</ul>
			</td>
	      </tr>
	      </c:if>
	      <div v-if="member.data.id === article.data.id">
	      <tr>
	        <td colspan="2">
			<a href="#">수정</a>
			<a href="#">삭제</a>
			</td>
	      </tr>
	      </div>
	    </tbody>
	  </table>
	  </div>
	  	<table>
	  	<tr>
	  	<td>
	  	${navigation.navigator}
	  	</td>
	  	</tr>
	  	</table>
		  </div>
		  <div v-if="articles.length == 0">
	  <table class="table table-active">
	    <tbody>
	      <tr class="table-info" align="center">
	        <td>작성된 글이 없습니다.</td>
	      </tr>
	    </tbody>
	  </table>
	  </div>
	  </div>
	</div>
    </div>
</template>

<script>

import { mapState } from 'vuex';
import { mapActions } from "vuex";

export default {
    name: "ArticleList",
	computed: {
    	...mapState(['login']),
		...mapState(['member']),
		...mapState(['articles']),
  	},
}
</script>

<style>

</style>