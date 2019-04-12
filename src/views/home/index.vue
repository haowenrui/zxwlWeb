<template>
	<div class="home-bg">
		<el-row :gutter="16" style="height: 100%;">
			<el-col :span="6" style="height: 100%;">
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
			<el-col :span="12" style="height: 100%;">
				<div class="item-block"  style="height: calc(100% - 28px)">
					<div class="item-title">
						监控中心
					</div>
					<div class="item-cont">
						<div id="monitorCenter">
							<el-amap vid="amapAlarm" :center="map.center" :mapStyle="mapStyle" :amap-manager="amapManager" :zoom="map.zoom" class="amap-demo">
                                <el-amap-marker v-for="(marker, index) in markers" :key="index + 'a'" :position="marker.position" :events="marker.events" :visible="marker.visible" :vid="index"></el-amap-marker>
                                <el-amap-marker v-for="(marker, index) in markersFire" :key="index + 'b'" :position="marker.position" :events="marker.events" :visible="marker.visible" :vid="index" :icon="pointFireIcon" ></el-amap-marker>
                            </el-amap>
						</div>
                        <div class="alrm-list" v-if="alarmList.length > 0">
                            <ul>
                                <li v-for="(item,index) in alarmList" :key="index">
                                    <div>
                                        <span>{{item.deviceName}}</span>
                                        <span class="color-red">代处理</span>
                                        <span class="ml10 color-orange" style="cursor: pointer" @click="resolve(item)">处理</span>
                                        <span class="ml10 color-orange" style="cursor: pointer" @click="transmit(item)">转发</span>
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
				<!-- <div class="item-block">
					<div class="item-title">
						月度报警数量统计
					</div>
					<div class="item-cont">
						<div id="monthAlarm"></div>
					</div>
				</div> -->
			</el-col>
			<el-col :span="6" style="height: 100%;">
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
						月度报警数量统计
					</div>
					<div class="item-cont">
						<div id="monthAlarm"></div>
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


        <el-dialog v-if="resolveAlarmVisible" title="报警处理" :visible.sync="resolveAlarmVisible" width="30%">
			<resolveAlarm :show.sync="resolveAlarmVisible" :alrmInfo="alrmInfo" @closePopup="closePopup" @resolveAlarm="resolveAlarm">
			</resolveAlarm>
		</el-dialog>

        <el-dialog v-if="transmitAlarmVisible" title="报警转发" :visible.sync="transmitAlarmVisible" width="30%">
			<transmitAlarm :show.sync="transmitAlarmVisible" :alrmInfo="alrmInfo" @closePopup="closePopup">
			</transmitAlarm>
		</el-dialog>
	</div>
</template>

<script>
    import ECharts from 'echarts';
    import { jsGetCookie, dateFormat } from '@/tools/utils';
    import { AMapManager } from 'vue-amap';

    import VueAMap from 'vue-amap';

    import resolveAlarm from './components/resolveAlarm.vue';
    import transmitAlarm from './components/transmitAlarm.vue';

	export default {
		components: {
            resolveAlarm,
            transmitAlarm
		},
		mixins: [],
		props: [],
		data() {
			return {
                resolveAlarmVisible: false,
                transmitAlarmVisible: false,
                alrmInfo: {},
				map: {
					center: [116.404,39.915],
					zoom: 13
                },
                amapManager: null,
                mapStyle: 'amap://styles/2daab02a809fa46d3675bb16d22b771c',
                pointFireIcon: null,
				markers: [],
                markersFire: [],
                websock: null,
                areaCode: '',
                alarmList: [],
                connectFlag: true,

                conpanyPositionList: [],
                alarmPositionList: [],

                BMapGet: null,
                mapGet: null,
                myIcongGet: null,

                colorPalette: [
                    '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                    '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                    '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                    '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                ]
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
			// this.newUserCharts();
            this.alarmCenterCharts();

            this.getCompanyPositionList();
            this.getAlarmList();

            let _self = this;
            setTimeout(function(){
                _self.pointFireIcon = new AMap.Icon({
                    size: new AMap.Size(40, 40),    // 图标尺寸
                    image: require('../../assets/images/fire.png'),  // Icon的图像
                    imageSize: new AMap.Size(40, 40)   // 根据所设置的大小拉伸或压缩图片
                });
            },1000);
            
		},
		methods: {
            async getCompanyPositionList(){
                let self = this;
                const res = await this.$http.get(this.$urlApi.getCompanyPosition);
                if(!res.status){
                    this.conpanyPositionList = res.data;

                    this.map.center = [this.conpanyPositionList[0].lon,this.conpanyPositionList[0].lat]
                    this.conpanyPositionList.forEach(item => {
                        if(item.lon && item.lat){
                            self.markers.push({
                                position: [item.lon,item.lat],
                                visible: true,
                                events: {
                                    click() {
                                        alert(item.name + '-' + item.address)
                                    }
                                }
                            })
                        }
                    })
                }
            },
            async getAlarmList(){
                let self = this;
                const res = await this.$http.post(this.$equApi.alarmList,{
                    pageNumber: 1,
                    pageSize: 3,
                    alarmStatus: 'unprocessed'
                });
                if(res.result == 'SUCCESS'){
                    this.alarmPositionList = [];
                    this.alarmList = [];
                    this.alarmPositionList = res.data;
                    this.alarmList = res.data.content;

                    this.alarmPositionList.content.forEach(item => {
                        if(item.lng && item.lat){
							
                            self.markersFire.push({
                                id: item.alarmId,
                                position: [item.lng,item.lat],
                                visible: true,
                                events: {
                                    click() {
                                        alert(item.deviceName + '于' +  dateFormat('yyyy-MM-dd hh:mm:ss',new Date(item.alarmDate)) + '发生报警\n地址：' + item.companyName + '-' + item.companyAddress)
                                    }
                                }
                            })
                        }
                    })
                }
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
			async monthAlarmCharts() {
                let _self = this;
                let ele = document.getElementById("monthAlarm");
				let xData = [];
                let seriesData = [];
                const res = await this.$http.post(this.$equApi.monthlyAlarmStatistics,{
                    areaCode: this.areaCode,
                    isSubArea: true
                })
                res.data.forEach(item => {
                    xData.push(item.name);
                    seriesData.push(item.value)
                })
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
					series: [{
						data: seriesData,
						type: 'line'
					}]
				};
				charts.setOption(option);
            },
            initWebSocket(){ //初始化weosocket
                // const wsuri = 'ws://192.168.1.105:9001/alarm.ws?token=' + jsGetCookie('_TOKEN_')  + '&loginType=WEB&company=' + jsGetCookie('_CURRENT_COMPANY_AREA_')  + '&userName=' + decodeURI(jsGetCookie('_CURRENT_COMPANY_NAME_'));        
                const wsuri = 'ws://39.98.173.65:9001/alarm.ws?token=' + jsGetCookie('_TOKEN_')  + '&loginType=WEB&company=' + jsGetCookie('_CURRENT_COMPANY_AREA_')  + '&userName=' + decodeURI(jsGetCookie('_CURRENT_COMPANY_NAME_'));        
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

                    this.markersFire.push({
                        id: redata.alarmId,
                        position: [redata.lng,redata.lat],
                        visible: true,
                        events: {
                            click() {
                                alert(redata.name + '-' + redata.address)
                            }
                        }
                    })
                }

            },
            websocketsend(Data){//数据发送
                this.websock.send(Data);
            },
            websocketclose(e){  //关闭
                console.log('断开连接',e);
                if(this.connectFlag){
                    console.log('重新连接');
                    this.initWebSocket();
                }
            },

            resolve(info){
                this.alrmInfo = info;
                this.resolveAlarmVisible = true;
            },

            transmit(info){
                this.alrmInfo = info;
                this.transmitAlarmVisible = true;
            },

            closePopup(){
                this.resolveAlarmVisible = false;
                this.transmitAlarmVisible = false;
            },

            resolveAlarm(){
                let _self = this;
                const pointIndex = this.markersFire.findIndex(item => {
                    return item.id == this.alrmInfo.alarmId;
                });

                const alarmIndex = this.alarmList.findIndex(item => {
                    return item.id == this.alrmInfo.alarmId;
                })

                this.alarmList.splice(alarmIndex,1)
                this.markersFire.splice(pointIndex,1)
                this.resolveAlarmVisible = false;
            }
		}
	}

</script>

<style lang="scss" scoped>
	.home-bg {
		padding: 0 10px 10px 10px;
		min-width: 1400px;
		height: 100vh;
		background: #081b3e;
	}

	.item-block {
		margin-top: 20px;
		padding: 10px;
		color: #fff;
		border: 1px solid #034c6a;
		box-shadow: 0px 0px 10px #034c6a inset;
        position: relative;
        height: calc(33% - 20px)
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
            border: 1px solid #bba225;
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
		height: 93vh;
	}

    #equError,
	#equType{
		width: 100%;
		height: calc(33vh - 20px);
    }
    

    #newEqu,
	#alarmCenter,
	#alarmType,
    #monthAlarm,
	#newUser {
		width: 100%;
		height: calc(33vh - 40px);
	}

</style>
