<template>
	<div class="home-bg">
		<el-row :gutter="16">
			<el-col :span="6">
				<div class="item-block">
					<div class="item-title">
						报警类型统计
					</div>
					<div class="item-cont">
						<div id="alarmType"></div>
					</div>
				</div>
				<div class="item-block">
					<div class="item-title">
						设备故障率
					</div>
					<div class="item-cont">
						<div id="equError"></div>
					</div>
				</div>
				<div class="item-block">
					<div class="item-title">
						设备型号统计
					</div>
					<div class="item-cont">
						<div id="equType"></div>
					</div>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="item-block">
					<div class="item-title">
						监控中心
					</div>
					<div class="item-cont">
						<div id="monitorCenter">
							<baidu-map class="bm-view" :theme="mapTheme" :center="map.center" :zoom="map.zoom" @ready="readyMap" :scroll-wheel-zoom="true">
                            </baidu-map>
						</div>
                        <div class="alrm-list" v-if="alarmList.length > 0">
                            <ul>
                                <li v-for="(item,index) in alarmList" :key="index">
                                    <div>
                                        <span>{{item.deviceName}}</span>
                                        <span class="color-red">{{item.alarmStatus}}</span>
                                    </div>
                                    <div>
                                        {{item.companyName}}
                                    </div>
                                    <div>
                                        {{item.companyAddress}}
                                    </div>
                                </li>
                            </ul>
                        </div>
					</div>
				</div>
				<div class="item-block">
					<div class="item-title">
						月度报警数量统计
					</div>
					<div class="item-cont">
						<div id="monthAlarm"></div>
					</div>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="item-block">
					<div class="item-title">
						片区新增设备
					</div>
					<div class="item-cont">
						<div id="newEqu"></div>
					</div>
				</div>
				<div class="item-block">
					<div class="item-title">
						片区新增用户
					</div>
					<div class="item-cont">
						<div id="newUser"></div>
					</div>
				</div>
				<div class="item-block">
					<div class="item-title">
						片区设备故障次数
					</div>
					<div class="item-cont">
						<div id="alarmCenter"></div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
    import ECharts from 'echarts';
    import { jsGetCookie } from '@/tools/utils';
	export default {
		components: {
		},
		mixins: [],
		props: [],
		data() {
			return {
				map: {
					center: {
						lng: 116.404,
						lat: 39.915
					},
					zoom: 15
				},
				colorPalette: [
					'#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
					'#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
					'#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
					'#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
				],
				mapTheme: [
                    {
                        "featureType": "land",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#091220ff"
                        }
                    }, {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#113549ff"
                        }
                    }, {
                        "featureType": "green",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#0e1b30ff"
                        }
                    }, {
                        "featureType": "building",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "building",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#ddd"
                        }
                    }, {
                        "featureType": "building",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#dadadab3"
                        }
                    }, {
                        "featureType": "subwaystation",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#b15454B2"
                        }
                    }, {
                        "featureType": "education",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#e4f1f1ff"
                        }
                    }, {
                        "featureType": "medical",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#f0dedeff"
                        }
                    }, {
                        "featureType": "scenicspots",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#e2efe5ff"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "weight": 4
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#f7c54dff"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#fed669ff"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#8f5a33ff"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#ffffffff"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "labels.icon",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "weight": 2
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#d8d8d8ff"
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#ffeebbff"
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#525355ff"
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#ffffffff"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "weight": 1
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#d8d8d8ff"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#ffffffff"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#979c9aff"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#ffffffff"
                        }
                    }, {
                        "featureType": "railway",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "weight": 1
                        }
                    }, {
                        "featureType": "railway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#123c52ff"
                        }
                    }, {
                        "featureType": "railway",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#12223dff"
                        }
                    }, {
                        "featureType": "subway",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "weight": 1
                        }
                    }, {
                        "featureType": "subway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#d8d8d8ff"
                        }
                    }, {
                        "featureType": "subway",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#ffffff00"
                        }
                    }, {
                        "featureType": "subway",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "subway",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#979c9aff"
                        }
                    }, {
                        "featureType": "subway",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#ffffffff"
                        }
                    }, {
                        "featureType": "continent",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "continent",
                        "elementType": "labels.icon",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "continent",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#333333ff"
                        }
                    }, {
                        "featureType": "continent",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#ffffffff"
                        }
                    }, {
                        "featureType": "city",
                        "elementType": "labels.icon",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "city",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "city",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#454d50ff"
                        }
                    }, {
                        "featureType": "city",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#ffffffff"
                        }
                    }, {
                        "featureType": "town",
                        "elementType": "labels.icon",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "town",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "town",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#454d50ff"
                        }
                    }, {
                        "featureType": "town",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#ffffffff"
                        }
                    }, {
                        "featureType": "road",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#12223dff"
                        }
                    }, {
                        "featureType": "poilabel",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "districtlabel",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    }, {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "road",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    }, {
                        "featureType": "road",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#ffffff00"
                        }
                    }, {
                        "featureType": "district",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    }, {
                        "featureType": "poilabel",
                        "elementType": "labels.icon",
                        "stylers": {
                            "visibility": "off"
                        }
                    }, {
                        "featureType": "poilabel",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#2dc4bbff"
                        }
                    }, {
                        "featureType": "poilabel",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#ffffff00"
                        }
                    }, {
                        "featureType": "manmade",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#12223dff"
                        }
                    }, {
                        "featureType": "districtlabel",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#ffffffff"
                        }
                    }, {
                        "featureType": "entertainment",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#ffffffff"
                        }
                    }, {
                        "featureType": "shopping",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#12223dff"
                        }
                    }
                ],
                points: [],
                websock: null,
                areaCode: '',
                alarmList: [],
                connectFlag: true
			}
		},
		watch: {},
		computed: {},
		created() {
            this.initWebSocket();
        },
        destroyed(){
            this.connectFlag = false;
            this.websocketclose();
        },
		mounted() {
            this.areaCode = jsGetCookie('_CURRENT_COMPANY_AREA_');
			this.alarmTypeChart();
			this.equErrorCharts();
			this.equTypeCharts();
			this.monthAlarmCharts();
			this.newEquCharts();
			this.newUserCharts();
            this.alarmCenterCharts();
		},
		methods: {
			readyMap({BMap,map}) {
                var myIcon = new BMap.Icon("/static/favicon.ico", new BMap.Size(30,15));
                this.addPoints(BMap,map,myIcon);
                this.addPoints(BMap,map)
            },
            addPoints (BMap,map,myIcon) {
                // 随机向地图添加25个标注
                var bounds = map.getBounds();
                var sw = bounds.getSouthWest();
                var ne = bounds.getNorthEast();
                var lngSpan = Math.abs(sw.lng - ne.lng);
                var latSpan = Math.abs(ne.lat - sw.lat);
                for (var i = 0; i < 25; i ++) {
                    var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
                    this.addMarker(BMap,map,point,myIcon);
                }
            },
            addMarker(BMap,map,point,myIcon){
                let _self = this;
                var marker = new BMap.Marker(point,{icon:myIcon});
                marker.addEventListener("click", function(e){   
                    var p = marker.getPosition();  //获取marker的位置
                    _self.map.center.lng = p.lng;
                    _self.map.center.lat = p.lat;
                    var content = p.lng + '---' + p.lat;
                    _self.openInfo(BMap,map,e,content);
                });
                map.addOverlay(marker);
            },
            openInfo(BMap,map,e,content){
                var opts = {
                    width : 250,     // 信息窗口宽度
                    height: 80,     // 信息窗口高度
                    title : "当前信息" , // 信息窗口标题
                    enableMessage:true//设置允许信息窗发送短息
                };
                var p = e.target;
                var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
                map.openInfoWindow(infoWindow,point); //开启信息窗口
            },
			async alarmTypeChart(data) {
                let ele = document.getElementById("alarmType");
                const res = await this.$http.post(this.$equApi.alarmStatistics,{
                    areaCode: this.areaCode,
                    isSubArea: true
                })
                let legendData = [];
                res.data.forEach(item => {
                    legendData.push(item.name);
                });
				let seriesName = '报警类型统计';
				let seriesData = res.data;
				this._renderPieCharts(ele, legendData, seriesName, seriesData)
			},
			_renderPieCharts(ele, legendData, seriesName, seriesData) {
				let _self = this;
				let charts = ECharts.init(ele);
				let option = {
					color: _self.colorPalette,
					title: {
						show: false,
						x: 'center'
					},
					grid: {
						top: 0,
						left: 0,
						bottom: 0,
						right: 0
					},
					tooltip: {
						show: true,
						position: ['20%', '0'],
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						show: true,
						orient: 'vertical',
						left: 'left',
						data: legendData,
						textStyle: {
							color: '#fff',
							fontSize: 10
						}
					},
					series: [{
						name: seriesName,
						type: 'pie',
						radius: '70%',
						center: ['50%', '60%'],
						data: seriesData,
						label: {
							normal: {
								show: true
							}
						},
						labelLine: {
							length: 0
						},
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				charts.setOption(option);
			},
			async equErrorCharts() {
                let ele = document.getElementById("equError");
                const res = await this.$http.post(this.$equApi.failureRateStatistics,{
                    areaCode: this.areaCode,
                    isSubArea: true
                })
                let seriesName = '设备故障率';
                let legendData = [];
                res.data.forEach(item => {
                    legendData.push(item.name);
                });
                let seriesData = res.data;
				this._renderCircleCharts(ele,seriesName,seriesData,legendData);
			},
			async equTypeCharts() {
                let ele = document.getElementById("equType");
                const res = await this.$http.post(this.$equApi.deviceTypeStatistics,{
                    areaCode: this.areaCode,
                    isSubArea: true
                })
                let seriesName = '设备型号统计';
                let legendData = [];
                res.data.forEach(item => {
                    legendData.push(item.name);
                });
                let seriesData = res.data;
				this._renderCircleCharts(ele,seriesName,seriesData,legendData);
			},
			_renderCircleCharts(ele,seriesName,seriesData,legendData) {
				let _self = this;
				let charts = ECharts.init(ele);
				let option = {
					color: _self.colorPalette,
					tooltip: {
						trigger: 'item',
						position: ['20%', '0'],
						formatter: "{a} <br/>{b}: {c} ({d}%)",
					},
					grid: {
						top: 0,
						left: 0,
						bottom: 0,
						right: 0
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: legendData,
						textStyle: {
							color: '#fff',
							fontSize: 10
						}
					},
					series: [{
						name: seriesName,
						type: 'pie',
						radius: ['25%', '65%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: false,
								textStyle: {
									fontSize: '20',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: seriesData
					}]
				};
				charts.setOption(option);
			},
			async newEquCharts() {
				let ele = document.getElementById("newEqu");
                const res = await this.$http.post(this.$equApi.devicesStatistics,{
                    areaCode: this.areaCode,
                    isSubArea: true
                })

                let xData = [];
                let seriesData = [];

                res.data.forEach(item => {
                    xData.push(item.name);
                    seriesData.push(item.value)
                });
                
				this._renderBarCharts(ele, xData, seriesData);
			},
			async alarmCenterCharts() {
				let ele = document.getElementById("alarmCenter");
                
                const res = await this.$http.post(this.$equApi.failureCountStatistics,{
                    areaCode: this.areaCode,
                    isSubArea: true
                })

                let xData = [];
                let seriesData = [];

                res.data.forEach(item => {
                    xData.push(item.name);
                    seriesData.push(item.value)
                });
                
				this._renderBarCharts(ele, xData, seriesData);
			},
			_renderBarCharts(ele, xData, seriesData) {
				let _self = this;
				let charts = ECharts.init(ele);
				let option = {
					color: _self.colorPalette,
					grid: {
						top: '10px',
						left: '10px',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					tooltip: {
						show: true,
						axisPointer: {
							type: 'shadow'
						}
					},
					xAxis: {
						type: 'category',
						axisLine: {
							lineStyle: {
								color: '#666'
							}
						},
						axisLabel: {
							color: '#fff',
							fontSize: 10
						},
						data: xData
					},
					yAxis: {
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#666'
							}
						},
						axisLabel: {
							color: '#fff',
							fontSize: 10
						},
						splitLine: {
							show: false
						}
					},
					series: [{
						data: seriesData,
						type: 'bar'
					}]
				};
				charts.setOption(option);
			},
			newUserCharts() {
				let ele = document.getElementById("newUser");
				let yData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
				let seriesData = [{
						name: 'City Alpha',
						type: 'bar',
						data: [165, 170, 30],
					},
					{
						name: 'City Beta',
						type: 'bar',
						data: [150, 105, 110]
					},
					{
						name: 'City Gamma',
						type: 'bar',
						data: [220, 82, 63]
					}
				];
				this._renderUserBarCharts(ele, yData, seriesData);
			},
			_renderUserBarCharts(ele, yData, seriesData) {
				let _self = this;
				let charts = ECharts.init(ele);
				let option = {
					color: _self.colorPalette,
					grid: {
						top: '10px',
						left: '10px',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					tooltip: {
						show: true,
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					xAxis: {
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#666'
							}
						},
						axisLabel: {
							color: '#fff',
							fontSize: 10
						},
						splitLine: {
							show: false
						}
					},
					yAxis: {
						type: 'category',
						axisLine: {
							lineStyle: {
								color: '#666'
							}
						},
						axisLabel: {
							color: '#fff',
							fontSize: 10
						},
						data: yData
					},
					series: seriesData
				};
				charts.setOption(option);
			},
			monthAlarmCharts() {
				let ele = document.getElementById("monthAlarm");
				let xData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
				let seriesData = [{
						name: '邮件营销',
						type: 'line',
						stack: '总量',
						data: [120, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '联盟广告',
						type: 'line',
						stack: '总量',
						data: [220, 182, 191, 234, 290, 330, 310]
					},
					{
						name: '视频广告',
						type: 'line',
						stack: '总量',
						data: [150, 232, 201, 154, 190, 330, 410]
					},
					{
						name: '直接访问',
						type: 'line',
						stack: '总量',
						data: [320, 332, 301, 334, 390, 330, 320]
					},
					{
						name: '搜索引擎',
						type: 'line',
						stack: '总量',
						data: [820, 932, 901, 934, 1290, 1330, 1320]
					}
				];
				this._renderLineCharts(ele, xData, seriesData);
			},
			_renderLineCharts(ele, xData, seriesData) {
				let _self = this;
				let charts = ECharts.init(ele);
				let option = {
					color: _self.colorPalette,
					grid: {
						top: '10px',
						left: '10px',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					tooltip: {
						show: true,
						trigger: 'axis',
					},
					xAxis: {
						type: 'category',
						axisLine: {
							lineStyle: {
								color: '#666'
							}
						},
						axisLabel: {
							color: '#fff',
							fontSize: 10
						},
						data: xData
					},
					yAxis: {
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#666'
							}
						},
						axisLabel: {
							color: '#fff',
							fontSize: 10
						},
						splitLine: {
							show: false
						}
					},
					series: seriesData
				};
				charts.setOption(option);
            },
            initWebSocket(){ //初始化weosocket
                const wsuri = 'ws://192.168.1.105:9001/alarm.ws?token=' + jsGetCookie('_TOKEN_')  + '&loginType=WEB&company=' + jsGetCookie('_CURRENT_COMPANY_AREA_')  + '&userName=' + decodeURI(jsGetCookie('_CURRENT_COMPANY_NAME_'));        
                // const wsuri = 'ws://39.98.173.65:9001/alarm.ws?token=' + jsGetCookie('_TOKEN_')  + '&loginType=WEB&company=' + jsGetCookie('_CURRENT_COMPANY_AREA_')  + '&userName=' + decodeURI(jsGetCookie('_CURRENT_COMPANY_NAME_'));        
                console.log(wsuri);
                this.websock = new WebSocket(wsuri);        
                this.websock.onmessage = this.websocketonmessage;        
                this.websock.onopen = this.websocketonopen;        
                this.websock.onerror = this.websocketonerror;        
                this.websock.onclose = this.websocketclose;
            },
            websocketonopen(){ //连接建立之后执行send方法发送数据
                console.log("WebSocket连接成功");
                this.websocketsend('111');
            },
            websocketonerror(){//连接建立失败重连
                console.log("WebSocket连接发生错误");
                this.initWebSocket();
            },
            websocketonmessage(e){ //数据接收
                console.log('数据接收',e);
                if(e.data.alarmId){
                    const redata = JSON.parse(e.data)
                    this.alarmList.forEach(item => {
                        if(item.alarmId == redata.alarmId){
                            return;
                        }
                    })
                    if(this.alarmList.length > 1){
                        this.alarmList.splice(2);
                    }
                    this.alarmList.push(redata)
                }

            },
            websocketsend(Data){//数据发送
                this.websock.send(Data);
            },
            websocketclose(e){  //关闭
                console.log('断开连接',e);
                // if(this.connectFlag){
                //     console.log('重新连接');
                //     this.initWebSocket();
                // }
            },
		}
	}

</script>
<style lang="scss" scoped>
	.home-bg {
		padding: 0 10px 10px 10px;
		min-width: 1400px;
		height: 100%;
		background: #081b3e;
	}

	.item-block {
		margin-top: 20px;
		padding: 10px;
		color: #fff;
		border: 1px solid #034c6a;
		box-shadow: 0px 0px 10px #034c6a inset;
		position: relative;
	}

    .alrm-list{
        position: absolute;
        top: 20px;
        left: 0px;
        width: 180px;
        height: 280px;
        overflow: hidden;
        
        li{
            padding: 10px;
            background: rgba(0,0,0,.6);
            margin-bottom: 20px;
            border: 1px solid #333;
            width: 100%;
            max-height: 100px;
        }
    }

    .item-cont{
        position: relative;
    }

	.item-title {
		color: #e7c93d;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		line-height: 1.6;
		padding: 0 10px;
		background-color: #034c6a;
		border-radius: 16px;
		position: absolute;
		top: -12px;
		left: 50%;
		transform: translate(-50%, 0);
	}

	.bm-view {
		width: 100%;
		height: 100%;
	}

	#monitorCenter {
		height: 492px;
	}

	#alarmType,
	#equType,
	#monthAlarm,
	#newEqu,
	#alarmCenter {
		width: 100%;
		height: 200px;
	}

	#equError,
	#newUser {
		width: 100%;
		height: 250px;
	}

</style>
