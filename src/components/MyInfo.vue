<template>
    <div class="container" align="center">
	  <div class="col-lg-8" align="center">
	  <h2>회원 정보 확인</h2>
	  <table class="table table-active">
	    <tbody>
	      <tr class="table-info">
	        <td>아이디 : </td>
	      </tr>
	      <tr class="table-info">
	        <td>이름 : </td>
	        <td align="right">이메일 :</td>
	      </tr>
	      <tr class="table-info">
	        <td colspan="2">주소: </td>
	      </tr>
	      <tr>
	        <td colspan="2">
	        <div class="form-group" align="center">
	        	<button type="button" class="btn btn-warning" @click="movemodify();">수정</button>
				<button type="button" class="btn btn-primary" @click="movedelete();">삭제</button>
				</div>
			</td>
	      </tr>
	    </tbody>
	  </table>
	  </div>
	</div>
</template>

<script>
export default {
    name: "MyInfo"
}
</script>

<style>

</style>