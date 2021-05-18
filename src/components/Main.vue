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
					<select class="form-control mr-2" name="sido" id="sido">
						<option value="0">도/광역시</option>
					</select>
				</div>
				<div class="form-group mr-2 md-1">
					<select class="form-control" name="gugun" id="gugun">
						<option value="0">시/구/군</option>
					</select>
				</div>
				<div class="form-group md-1">
					<select class="form-control" name="dong" id="dong">
						<option value="0">동</option>
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
				<div id="map"
					style="width: 100%; height: 600px; margin: auto; position: relative; overflow: hidden;">
					<div
						style="height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; background-color: rgb(229, 227, 223);">
						<div class="gm-err-container">
							<div class="gm-err-content">
								<div class="gm-err-icon">
									<GmapMap ref="mapRef" :center="center" :zoom="16" style="width:100vw; height:100vh"></GmapMap>
								</div>
							</div>
						</div>
					</div>
				</div>
		
				<!-- 지도 띄우는 부분 end -->
			</div>
	</div>
</div>
</template>

<script>
export default {
    name: "Main",
	data() {
		return {
			center: {
				lat: 37.500131499999995,
				lng: 127.03242579999998,
			}
		}
	},
}
</script>

<style>

</style>