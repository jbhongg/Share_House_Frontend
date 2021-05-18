<template>
<nav class="navbar navbar-expand-lg navbar-light"
		id="mainNav">
		<div class="container">
            <router-link to="/"><img id="logo-img-mobile"
				src="@/assets/logo.jpg" width="150" alt="The SSAFY"></router-link>
			<button class="navbar-toggler navbar-toggler-right" type="button"
				data-toggle="collapse" data-target="#navbarResponsive"
				aria-controls="navbarResponsive" aria-expanded="false"
				aria-label="Toggle navigation">
				Menu <i class="fas fa-bars"></i>
			</button>

			<div class="collapse navbar-collapse" id="navbarResponsive">
				<ul class="navbar-nav ml-auto">
                    <!-- userinfo === null -->
					<li class="nav-item" id="login" v-if="member === '1'" > <router-link class="nav-link"
							id="login" to="/login">로그인</router-link></li>
					<li class="nav-item" id="signup" v-if="member === '1'"><router-link class="nav-link" to="/join">회원가입</router-link></li>
                            
                    <!-- userinfo != null -->
                    <li v-if="member !== '1'"><a class="nav-link" href="#" @click="logout()">로그아웃</a></li>
					<li class="nav-item" v-if="member !== '1'"><router-link class="nav-link" to="/interest">관심지역</router-link></li>
					<li class="nav-item" id="mypage" v-if="member !== '1'"><router-link class="nav-link" to="/mypage">마이 페이지</router-link></li>
                    
                    <!-- userinfo.id=='admin' -->
					<li class="nav-item" id="admin" v-if="member.id === 'admin'"><router-link class="nav-link" to="/">회원 관리</router-link></li>
                    
					<li class="nav-item" id="article"><router-link class="nav-link" to="/article">공지사항</router-link></li>
					<li class="nav-item" id="home"><router-link class="nav-link" to="/">Home</router-link></li>
				</ul>
			</div>
		</div>
        
	</nav>
</template>

<script>

import { mapActions } from "vuex";
import { mapState } from 'vuex';

export default {
    name: 'Nav',
	computed: {
    	...mapState(['member']),
  	},
	  methods: {
		  ...mapActions(["logoutMember"]),
		  logout(){
			this.logoutMember();
			this.$router.push({name: 'Main'});
		  }
	  },
}
</script>

<style>

</style>