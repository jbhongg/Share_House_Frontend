<template>
    <div class="row mt-5">
        <div class="col-6">
            <img id="logo-img-mobile" src="@/assets/house.jpg"  alt="The house" style="width: 60%; height: 400px; overflow: hidden;" />
        </div>
        <div class="col-4">
        <h2 class="title">주택 정보</h2>
        <b-table stacked id="aptdetail_table" :items="apt" :fields="fields" >
	  </b-table>
        </div>
    </div>
</template>

<script>

import { mapState } from "vuex";

export default {
    name: "AptInfoDetail",
    data() {
        return {
            fields: [
                { label: "No.", key: "no" },
                { label: "이름.", key: "houseName" },
                { label: "주소", key: "address" },
                { label: "면적", key: "area" },
                { label: "층", key: "floor" },
                { label: "설립년도", key: "buildYear" },
                { label: "전세", key: "deposit" },
                { label: "월세", key: "monthlyRent" },
            ],
        }
    },
        computed: {
        ...mapState(["apt"]),
    },
    methods: {
        
    },
}
</script>

<style>

</style>