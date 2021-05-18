<template>
  <div class="container" align="center">
    <div class="col-lg-6" align="center">
      <div id="userform">
        <div class="form-group" align="left">
          <label for="name">이름</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            v-model="member.name"
            ref="member.name"
          />
        </div>
        <div class="form-group" align="left">
          <label for="">아이디</label>
          <input
            type="text"
            class="form-control"
            id="id"
            name="id"
            v-model="member.id"
            ref="member.id"
          />
        </div>
        <div class="form-group" align="left">
          <label for="">비밀번호</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            v-model="member.password"
            ref="member.password"
          />
        </div>
        <div class="form-group" align="left">
          <label for="">비밀번호재입력</label>
          <input
            type="password"
            class="form-control"
            id="pwdcheck"
            name="pwdcheck"
            v-model="pwdcheck"
            ref="pwdcheck"
          />
        </div>
        <div class="form-group" align="left">
          <label for="email">이메일</label><br />
          <div id="emailid" class="custom-control-inline">
            <input
              type="text"
              class="form-control"
              id="emailid"
              name="emailid"
              v-model="emailid"
              ref="emailid"
              size="25"
            />
            @
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
            </select>
            _
            <input
              type="text"
              class="form-control"
              id="tel2"
              name="tel2"
              v-model="tel2"
              ref="tel2"
            />
            _
            <input
              type="text"
              class="form-control"
              id="tel3"
              name="tel3"
              v-model="tel3"
              ref="tel3"
            />
          </div>
        </div>
        <div class="form-group" align="left">
          <label for="">주소</label><br />
          <div id="addressdiv" class="custom-control-inline">
            <button
              type="button"
              id="zipcode"
              name="zipcode"
              style="background-color: rgb(228, 222, 222)"
              class="btn"
              @click="searchaddr"
            >
              주소 찾기
            </button>
          </div>
          <input
            type="text"
            class="form-control"
            name="addr"
            id="addr"
            v-model="addr"
            ref="addr"
            readonly="readonly"
          />
          <input
            type="text"
            class="form-control"
            id="address_detail"
            name="address_detail"
            v-model="address_detail"
            ref="address_detail"
          />
        </div>
        <div class="form-group" align="center">
          <button type="button" class="btn btn-primary" id="registerBtn" @click="checkValue">
            회원가입
          </button>
          <button type="reset" class="btn btn-warning">초기화</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "JoinForm",
  data() {
    return {
      member: {
        name: "",
        id: "",
        joindate: "",
        password: "",
        email: "",
        phone: "",
        address: "",
      },
      // name: "",
      // id: "",
      // password: "",
      pwdcheck: "",
      // email: "",
      emailid: "",
      emaildomain: "",
      // tel: "",
      tel1: "",
      tel2: "",
      tel3: "",
      // address: "",
      addr: "",
      address_detail: "",
    };
  },
  methods: {
    ...mapActions(["joinMember"]),
    checkValue() {
      let err = true;
      let msg = "";
      !this.member.name &&
        ((msg = "이름 입력해주세요"), (err = false), this.$refs.member.name.focus());
      err &&
        !this.member.id &&
        ((msg = "아이디 입력해주세요"), (err = false), this.$refs.member.id.focus());
      err &&
        !this.member.password &&
        ((msg = "비빌번호 입력해주세요"), (err = false), this.$refs.member.password.focus());
      err &&
        !this.pwdcheck &&
        ((msg = "비빌번호를 다시 한번 입력해주세요"), (err = false), this.$refs.pwdcheck.focus());
      err &&
        this.pwdcheck !== this.member.password &&
        ((msg = "비빌번호가 일치하지 않습니다"), (err = false), this.$refs.pwdcheck.focus());
      err &&
        !this.emailid &&
        ((msg = "이메일 입력해주세요"), (err = false), this.$refs.emailid.focus());
      err &&
        (!this.tel1 || !this.tel2 || !this.tel3) &&
        ((msg = "전화번호 입력해주세요"), (err = false), this.$refs.tel1.focus());
      err &&
        !this.address_detail &&
        ((msg = "주소 입력해주세요"), (err = false), this.$refs.address_detail.focus());
      this.member.phone = this.tel1 + "-" + this.tel2 + "-" + this.tel3;
      this.member.email = this.emailid + "@" + this.emaildomain;
      this.member.address = this.addr + this.address_detail;
      if (!err) alert(msg);
      else this.regitstEmp();
    },
    regitstEmp() {
      this.joinMember(this.member);
	  this.$router.push({name: 'Login'});
    },
    searchaddr() {},
  },
};
</script>

<style></style>
