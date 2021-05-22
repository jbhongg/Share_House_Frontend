<template>
<div class="container" align="center">
	<div class="col-lg-6" align="center">
		<form id="modifyform" method="post" action="">
		<input type="hidden" name="id" id="id" v-model="user.id">
		<input type="hidden" name="password" id="password" v-model="user.password">
			<div class="form-group" align="left">
				<label for="name">이름</label>
				<input type="text" class="form-control" id="name" name="name" v-model="user.name" ref="name">
			</div>
            <div class="form-group" align="left">
          <label for="">생년월일</label>
          <div id="bir_yy">
              <span class="box">
                  <input type="text" id="yy" class="form-control" name="yy" maxlength="4" v-model="yy" ref="yy" placeholder="년(4자)">
              </span>
          </div>
          <div id="bir_mm">
              <span class="box">
                  <select id="mm" class="form-control" name="mm" v-model="mm" ref="mm">
                      <option value="">월</option>
                      <option value="01">1</option>
                      <option value="02">2</option>
                      <option value="03">3</option>
                      <option value="04">4</option>
                      <option value="05">5</option>
                      <option value="06">6</option>
                      <option value="07">7</option>
                      <option value="08">8</option>
                      <option value="09">9</option>                                    
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                  </select>
              </span>
        </div>
        <!-- BIRTH_DD -->
        <div id="bir_dd">
            <span class="box">
                <input type="text" id="dd" class="form-control" name="dd" v-model="dd" ref="dd" maxlength="2" placeholder="일">
            </span>
        </div>
        </div>
        <div class="form-group" align="left">
          <label for="">성별 선택</label>
          <select type="text" id="gender" name="gender" class="form-control" v-model="user.gender" ref="gender">
            <option value="">성별 선택</option>
            <option value="M">남</option>
            <option value="F">여</option>
          </select>
        </div>
			<div class="form-group" align="left">
				<label for="email">이메일</label><br>
				<div id="email" class="custom-control-inline">
				<input type="text" class="form-control" id="emailid" name="emailid" v-model="emailid" ref="emailid" size="25"> @
				<select class="form-control" id="emaildomain" name="emaildomain" v-model="emaildomain">
					<option value="naver.com">naver.com</option>
					<option value="google.com">google.com</option>
					<option value="daum.net">daum.net</option>
					<option value="nate.com">nate.com</option>
					<option value="hanmail.net">hanmail.net</option>
				</select>
				</div>
			</div>
			<div class="form-group" align="left">
				<label for="tel">전화번호</label>
				<div id="tel" class="custom-control-inline">
				<select class="form-control" id="tel1" name="tel1" v-model="tel1" ref="tel1">
					<option value="010">010</option>
					<option value="02">02</option>
					<option value="031">031</option>
					<option value="032">032</option>
					<option value="041">041</option>
					<option value="051">051</option>
					<option value="061">061</option>
				</select> _
				<input type="text" class="form-control" id="tel2" name="tel2" v-model="tel2" ref="tel2"> _
				<input type="text" class="form-control" id="tel3" name="tel3" v-model="tel3" ref="tel3">
				</div>
			</div>
			<div class="form-group" align="left">
				<label for="">주소</label><br>
				<div id="addressdiv" class="custom-control-inline">
					<button type="button" style="background-color: rgb(228, 222, 222);" class="btn" id="zipcode" name="zipcode" @click="searchaddr">주소 찾기</button>
				</div>
				<input type="text" class="form-control" name="addr" id="addr" v-model="addr" ref="addr" readonly="readonly">
				<input type="text" class="form-control" id="address_detail" name="address_detail" v-model="address_detail" ref="address_detail">
			</div>
			<div class="form-group" align="center">
			<button type="button" class="btn btn-primary" @click="checkValue">수정</button>
			<button type="button" class="btn btn-warning" @click="$router.push({name: 'MyPage'})">취소</button>
			</div>
		</form>
	</div>
</div>
</template>

<script>

import { mapActions, mapState } from 'vuex';

export default {
    name: "MyInfoUpdateForm",
      data() {
    return {
      user: {
        name: "",
        id: "",
        password: "",
        email: "",
        phone: "",
        address: "",
        area: "1114016200",
        birth: "",
        gender: "",
      },
      emailid: "",
      emaildomain: "",
      tel1: "",
      tel2: "",
      tel3: "",
      addr: "",
      address_detail: "",
      yy: "",
      mm: "",
      dd: "",
    };
  },
    computed: {
    	...mapState(['member']),
  	},
      methods: {
          ...mapActions(["updateMember"]),
          checkValue() {
      let err = true;
      let msg = "";
      !this.user.name &&
        ((msg = "이름 입력해주세요"), (err = false), this.$refs.name.focus());
      err &&
        (!this.yy || !this.mm || !this.dd) &&
        ((msg = "생년월일 입력해주세요"), (err = false), this.$refs.yy.focus());
      err &&
        !this.user.gender &&
        ((msg = "성별 입력해주세요"), (err = false), this.$refs.gender.focus());  
      err &&
        !this.emailid &&
        ((msg = "이메일 입력해주세요"), (err = false), this.$refs.emailid.focus());
      err &&
        (!this.tel1 || !this.tel2 || !this.tel3) &&
        ((msg = "전화번호 입력해주세요"), (err = false), this.$refs.tel1.focus());
      err &&
        !this.addr &&
        ((msg = "주소 입력해주세요"), (err = false), this.$refs.addr.focus());
      err &&
        !this.address_detail &&
        ((msg = "상세주소 입력해주세요"), (err = false), this.$refs.address_detail.focus());
      if(this.dd.length == 1){
        this.dd = 0 + this.dd;
      }
      console.log(this.member.data.id);
      this.user.id = this.member.data.id;
      this.user.password = this.member.data.password;
      this.user.phone = this.tel1 + "-" + this.tel2 + "-" + this.tel3;
      this.user.email = this.emailid + "@" + this.emaildomain;
      this.user.address = this.addr + " " + this.address_detail;
      this.user.birth = this.yy + this.mm + this.dd
      if (!err) alert(msg);
      else this.modifyinfo();
    },
    modifyinfo() {
        this.updateMember(this.user);
	    this.$router.push({name: 'MyPage'});
    },
    searchaddr() {
      new window.daum.Postcode({ 
        oncomplete: (data) => { 
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분. 
          // 도로명 주소의 노출 규칙에 따라 주소를 조합한다. 
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다. 
          let fullRoadAddr = data.roadAddress; // 도로명 주소 변수 
          let extraRoadAddr = ''; // 도로명 조합형 주소 변수 
          // 법정동명이 있을 경우 추가한다. (법정리는 제외) 
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다. 
          if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){ 
            extraRoadAddr += data.bname; 
          } // 건물명이 있고, 공동주택일 경우 추가한다. 
          if(data.buildingName !== '' && data.apartment === 'Y'){ 
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName); 
          } 
          // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다. 
          if(extraRoadAddr !== ''){ 
            extraRoadAddr = ' (' + extraRoadAddr + ')'; 
          } 
          // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다. 
          if(fullRoadAddr !== ''){ 
            fullRoadAddr += extraRoadAddr; 
          } 
          this.addr = fullRoadAddr;
        } 
      }).open()
    },
      },
}
</script>

<style>

</style>