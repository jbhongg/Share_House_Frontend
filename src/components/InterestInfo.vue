<template>
<div class="container" align="center">
	  <div class="col-lg-8" align="center">
	  <h2>관심 지역 확인</h2>
	  <br>
      <!-- userinfo == null -->
	  <h3>관심 지역이 없습니다.</h3>

      <!-- userinfo != null -->
	  <div id="map" class="map"
					style="width: 100%; height: 600px; margin: auto; position: relative; overflow: hidden;">
					<!-- <div
						style="height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; background-color: rgb(229, 227, 223);">
						<div class="gm-err-container">
							<div class="gm-err-content">
								<div class="gm-err-icon">
									<GmapMap ref="mapRef" :center="center" :zoom="16" style="width:100vw; height:100vh"></GmapMap>
								</div>
							</div>
						</div>
					</div> -->
				</div>
	   <table border="1">
                    <th>No.</th>
                    <th>주택 명(상세보기)</th>
                    <th>지역</th>
                    <th>추천 거주 인원</th>
                    <th>현재 찜한 인원</th>
                    <th>예상 전/월세</th>
                    <th>찜하기</th>
                    <tr v-for="(item, i) in apts" :key="i">
                        <td>{{item.no}}</td>
                        <td><button @click="detailinfo(item.houseName)">{{item.houseName}}</button></td>
                        <td>{{item.dong}}</td>
                        <td>{{item.residentsNum}}</td>
                        <td>1</td>
                        <td v-if="item.monthlyRent == 0">{{item.deposit}}(전)</td>
                        <td v-else>{{item.monthlyRent}}(월)</td>
                        <td><button @click="registinterestapt(item.no, member.data.id)">찜하기</button></td>
                    </tr>
        </table>
	  </div>
	</div>
</template>

<script>

import { mapActions, mapState } from "vuex";

export default {
    name: "InterestInfo",
	data() {
		return {
			
		};
	},
	computed: {
		...mapState(["apts", "member"]),
	},
	mounted() {
		window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
	},
	created() {
		this.getdata();
	},
	methods: {
		...mapActions(["getAptListByGu"]),
		getdata(){
			this.getAptListByGu(this.member.data.area);
		},
		addScript() {
      		const script = document.createElement('script');
      		script.onload = () => kakao.maps.load(this.initMap);
      		script.src = "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=899e04a2203a1978625b8dbbeef42184&libraries=services";
      		document.head.appendChild(script);
		},
		initMap() {
      		var container = document.getElementById('map'); 
      		var options = {
        		center: new kakao.maps.LatLng(33.450701, 126.570667), 
        		level: 3 
      		};

      		var map = new kakao.maps.Map(container, options); 
			var geocoder = new kakao.maps.services.Geocoder();

			for (var i = 0; i < this.apts.length; i++) {
                let title = this.apts[i].houseName;
				geocoder.addressSearch(this.apts[i].address, function(result, status) {

     			if (status === kakao.maps.services.Status.OK) {

        			var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        			var marker = new kakao.maps.Marker({
						map: map,
            			position: coords
        			});
        			var infowindow = new kakao.maps.InfoWindow({
            			content: `<div style="width:150px;text-align:center;padding:6px 0;">${title}</div>`
        			});
        			infowindow.open(map, marker);
        			map.setCenter(coords);
    			}
				}); 
			}
    	},
	},
}
</script>

<style>

</style>