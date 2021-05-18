<template>
<div class="container" align="center">
	  <div class="col-lg-8" align="center">
	  <h2>관심 지역 확인</h2>
	  <br>
      <!-- userinfo == null -->
	  <h3>관심 지역이 없습니다.</h3>

      <!-- userinfo != null -->
	  <table class="table table-active" id="result">
	    <tbody>
        
	    <!-- <c:forEach var="deal" items="${interest}" varStatus="status"> -->
    	<tr class="table-info" no="${deal.no}" data-id="${deal.no}">
	        <td colsapn = "4">동 : </td>
	        <td colsapn = "4">아파트 이름 : </td>
	        <td>매매가 : </td>
	        <td><p id="deleteBtn">삭제</p></td>
	    </tr>
	    </tbody>
	  </table>
	  </div>
	</div>
</template>

<script>
export default {
    name: "InterestInfo"
}
</script>

<style>

</style>