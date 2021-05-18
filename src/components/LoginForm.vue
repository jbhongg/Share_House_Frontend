<template>
  <div class="container" align="center">
	<div class="col-lg-6" align="center">
		<form id="loginform" method="post" action="">
		<input type="hidden" name="act" id="act" value="login">
			<div class="form-group" align="left">
				<label for="">아이디</label>
				<input type="text" class="form-control" id="userid" name="userid" placeholder="" value="">
			</div>
			<div class="form-group" align="left">
				<label for="">비밀번호</label>
				<input type="password" class="form-control" id="userpwd" name="userpwd" placeholder="" @keyup.enter="login()">
			</div>
			<div class="form-group" align="center">
				<button type="button" class="btn btn-warning" @click="login();">로그인</button>
				<button type="button" class="btn btn-primary" @click="$router.push({name: 'Join'})">회원가입</button>
			</div>
		</form>
	</div>
</div>
</template>

<script>
export default {
    name: "LoginForm"
}
</script>

<style>

</style>