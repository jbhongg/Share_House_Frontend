<template>
<div class="container">
		<!-- <%@ include file="./house/selectAreaCondition.jsp"%> -->
		<div class="dark-bg section">
	<div class="container-fluid">
		<!-- filters start -->
		<div
			class="sorting-filters text-center mb-20 d-flex justify-content-center">
			<form class="form-inline" id="frm" method="get" action="">
				<input type="hidden" id="act" name="act" value="searchAreas" />
				<div class="form-group md">
					<select class="form-control mr-2" name="sido" id="sido" v-model="si">
						<option value="">도/광역시</option>
						<option v-for="(item, i) in sido.data" :key="i" :value="item.sidoCode">{{item.sidoName}}</option>
					</select>
				</div>
				<div class="form-group mr-2 md-1">
					<select class="form-control" name="gugun" id="gugun" v-model="gu">
						<option value="">시/구/군</option>
						<option v-for="(item, i) in gugun.data" :key="i" :value="item.gugunCode">{{item.gugunName}}</option>
					</select>
				</div>
				<div class="form-group md-1">
					<select class="form-control" name="dong" id="dong" v-model="dong_code">
						<option value="">동</option>
						<option v-for="(item, i) in dong.data" :key="i" :value="item.dongCode">{{item.dongName}}</option>
					</select>
				</div>

			</form>
			<form class="form-inline" method="get"
				action="${root}/house/apartment" id="aptSearchForm">
				<input type="hidden" id="searchDong" name="searchDong" value="">
				<input type="text" class="form-control" id="aptName" name="aptName"
					placeholder="아파트 이름"> 
					<button type="button" class="btn btn-outline-primary btn-sm" id="aptSearch" name="aptSearch">search</button>
			</form>
		</div>
		<!-- filters end -->

	</div>
		</div>
	<div class="row mt-5" style="justify-content: center;">
		<div class="col-4" id="col-houseinfo" style="display: none;">
			<!-- 거래 정보 출력 start-->
			<div class="sidebar">
				<div class="block clearfix" id="houseInfo">
					<h3 class="title">거래 정보</h3>
					<hr>
					<div class="separator-2"></div>
				</div>
				<form name="pageform" id="pageform" method="GET" action=""
					style="display: none;">
				<input type="hidden" name="pg" id="pg" value=""> <input
						type="hidden" name="dong" id="dong" value="${dong}"> <input
						type="hidden" name="aptName" id="aptName" value="${aptName}">
				</form>

				<table>
					<tr>
						<td>${navigation.navigator }</td>
					</tr>
				</table>
			</div>
				<!-- 거래 정보 출력 end -->
		</div>
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
			</div>
	</div>
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "Main",
	data() {
		return {
			si: "",
			gu: "",
			dong_code: "",
			pos: [
				{
					name : '제주특별자치도 제주시 첨단로 241'
				},
				{
					name : '제주특별자치도 제주시 첨단로 242'
				},
				{
					name : '제주특별자치도 제주시 첨단로 245-2'	
				},
				{
					name : '제주특별자치도 제주시 첨단로 245-13'
				}
			]
		}
	},
	computed:{
		...mapState(["sido", "gugun", "dong"]),
	},
	mounted() {
		window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
	},
	created() {
		this.getdata();
	},
	watch:{
		si: function(newval){
			this.getgugundata(newval);
		},
		gu: function(newval){
			this.getdongdate(newval);
		},
		dong_code: function(newval){
			this.getapt(newval);
		}
	},
	methods: {
		...mapActions(["getSidoList"]),
		...mapActions(["getGugunList"]),
		...mapActions(["getDongList"]),
		...mapActions(["getAptList"]),
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

			for (var i = 0; i < this.pos.length; i++) {
    			// 마커를 생성합니다
				geocoder.addressSearch(this.pos[i].name, function(result, status) {

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
            			content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
        			});
        			infowindow.open(map, marker);

        			// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        			map.setCenter(coords);
    			}
				}); 
			}
    	},
		getdata(){
			this.getSidoList();
		},
		getgugundata(code){
			this.getGugunList(code);
		},
		getdongdate(code){
			this.getDongList(code);
		},
		getapt(code){
			this.getAptList(code);
			this.$router.push({name: 'Apt'});
		}
	}
}
</script>

<style>
.map {
  width: 100%;
  height: 400px;
}
</style>