<template>
		<div class="col-8">
				<div id="map" class="map" v-if="typeof(apts) != 'undefined'"
					style="width: 100%; height: 600px; margin: auto; position: relative; overflow: hidden;">
				</div>
                <h2>주택 정보</h2>
                <table border="1" v-if="typeof(apts) != 'undefined'">
                    <th>No.</th>
                    <th>주택 명(상세보기)</th>
                    <th>지역</th>
                    <th>추천 거주 인원</th>
                    <th>현재 찜한 인원</th>
                    <th>예상 전/월세</th>
                    <th>찜하기</th>
                    <th>채팅방</th>
                    <tr v-for="(item, i) in apts" :key="i">
                        <td>{{item.no}}</td>
                        <td><button @click="detailinfo(item.houseName)">{{item.houseName}}</button></td>
                        <td>{{item.dong}}</td>
                        <td>{{item.residentsNum}}</td>
                        <td>1</td>
                        <td v-if="item.monthlyRent == 0">{{item.deposit}}(전)</td>
                        <td v-else>{{item.monthlyRent}}(월)</td>
                        <td><button @click="registinterestapt(item.no, member.data.id)">찜하기</button></td>
                        <td><button @click="enterchat(item.no)">채팅방 입장하기</button></td>
                    </tr>
        </table>
        <h3 v-if="typeof(apts) == 'undefined'">주택 정보가 없습니다</h3>
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
        ...mapState(["apts", "member", "room", "roomInfo"]),
    },
    watch: {
        apts: function(){
            window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
        }
    },
    mounted() {
		window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
	},
    methods: {
        ...mapActions(["registInterest"]),
        ...mapActions(["getAptDetail"]),
        ...mapActions(["getRoom"]),
        ...mapActions(["registRoom"]),
        addScript() {
      		const script = document.createElement('script');
      		script.onload = () => window.kakao.maps.load(this.initMap);
      		script.src = "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=899e04a2203a1978625b8dbbeef42184&libraries=services";
      		document.head.appendChild(script);
		},
        initMap() {
            if(typeof(this.apts) != 'undefined'){
            var container = document.getElementById('map'); 
      		var options = {
        		center: new window.kakao.maps.LatLng(33.450701, 126.570667), 
        		level: 3 
      		};

      		var map = new window.kakao.maps.Map(container, options); 
			var geocoder = new window.kakao.maps.services.Geocoder();

			for (var i = 0; i < this.apts.length; i++) {
                let title = this.apts[i].houseName;
				geocoder.addressSearch(this.apts[i].address, function(result, status) {

     			if (status === window.kakao.maps.services.Status.OK) {

        			var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        			var marker = new window.kakao.maps.Marker({
						map: map,
            			position: coords
        			});
        			var infowindow = new window.kakao.maps.InfoWindow({
            			content: `<div style="width:150px;text-align:center;padding:6px 0;">${title}</div>`
        			});
        			infowindow.open(map, marker);
        			map.setCenter(coords);
    			}
				}); 
			}
            }

    	},
        registinterestapt(no, userid){
            let param = userid + "/" + no
            this.registInterest(param);
        },
        detailinfo(name){
            this.getAptDetail(name);
            this.$router.push({name: 'AptInfo'});
        },
        enterchat(no){
            this.getRoom(no);
            if(this.room == 1){
                this.createRoom(no);
                this.$router.push({name: 'Messege', params: {name: this.roomInfo.roomName, id: this.roomInfo.roomId}});
            }
            else{
                this.$router.push({name: 'Messege', params: {name: this.roomInfo.roomName, id: this.roomInfo.roomId}});
            }
        },
        createRoom(no){
            this.registRoom(no);
        },
    },
}
</script>

<style>

</style>