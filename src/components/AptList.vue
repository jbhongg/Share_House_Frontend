<template>
		<div class="col-8">
				<!-- 지도 띄우는 부분 start -->
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
		
				<!-- 지도 띄우는 부분 end -->
               <h2>주택 정보</h2>
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
                        <td>{{item.houseName}}</td>
                        <td>{{item.dong}}</td>
                        <td>{{item.residentsNum}}</td>
                        <td>1</td>
                        <td v-if="item.monthlyRent == 0">{{item.deposit}}(전)</td>
                        <td v-else>{{item.monthlyRent}}(월)</td>
                        <td><button @click="registinterestapt(item.no, member.data.id)">찜하기</button></td>
                    </tr>
        </table>
		</div>
</template>

<script>

import { mapActions, mapState } from "vuex";

export default {
    name: "AptList",
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
    methods: {
        ...mapActions(["registInterest"]),
        addScript() {
      		const script = document.createElement('script');
      		/* global kakao */
      		script.onload = () => kakao.maps.load(this.initMap);
      		script.src = "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=899e04a2203a1978625b8dbbeef42184&libraries=services";
      		document.head.appendChild(script);
		},
        initMap() {
      		var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      		var options = {
        		//지도를 생성할 때 필요한 기본 옵션
        		center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        		level: 3 //지도의 레벨(확대, 축소 정도)
      		};

      		var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
			/*var marker = new kakao.maps.Marker({ 
				position: map.getCenter() 
			}); */
			//marker.setMap(map);
			var geocoder = new kakao.maps.services.Geocoder();

			for (var i = 0; i < this.apts.length; i++) {
                let title = this.apts[i].houseName;
    			// 마커를 생성합니다
				geocoder.addressSearch(this.apts[i].address, function(result, status) {

    			// 정상적으로 검색이 완료됐으면 
     			if (status === kakao.maps.services.Status.OK) {

        			var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        			// 결과값으로 받은 위치를 마커로 표시합니다
        			var marker = new kakao.maps.Marker({
						map: map,
            			position: coords
        			});

        			// 인포윈도우로 장소에 대한 설명을 표시합니다
        			var infowindow = new kakao.maps.InfoWindow({
            			content: `<div style="width:150px;text-align:center;padding:6px 0;">${title}</div>`
        			});
        			infowindow.open(map, marker);

        			// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        			map.setCenter(coords);
    			}
				}); 
			}
    	},
        registinterestapt(no, userid){
            let param = userid + "/" + no
            console.log(userid);
            this.registInterest(param);
        }
    },
}
</script>

<style>

</style>