<template>
	<div>
		<el-form ref="form" :model="form" :inline="true" label-width="140px" size="mini">
			<el-form-item label="主机编码:">
                <span>{{form.hostQRCode}}</span>
            </el-form-item>
            <el-form-item label="主机名称:">
                <span>{{form.hostName}}</span>
            </el-form-item>
            <el-form-item label="主机类型:">
                <span>{{form.hostTypeName}}</span>
            </el-form-item>
            <el-form-item label="主机小类型:">
                <span>{{form.hostTypeMiniName}}</span>
            </el-form-item>
             <el-form-item label="安装人员:">
				<span>{{form.insUserName}}</span>
			</el-form-item>
            <el-form-item label="安装人员电话:">
				<span>{{form.insUserTel}}</span>
			</el-form-item>
            <!-- <el-form-item label="安装人id:">
                <span>{{form.insUserId}}</span>
            </el-form-item>
            <el-form-item label="安装位置:">
                <span>{{form.insLocation}}</span>
            </el-form-item>
            <el-form-item label="安装日期:">
                <span>{{form.insDate | dateFormatFilter('yyyy-MM-dd hh:mm:ss')}}</span>
            </el-form-item>
            <el-form-item label="CCID:">
                <span>{{form.ccid}}</span>
            </el-form-item>
            <el-form-item label="使用状况:">
                <span>{{form.useStatus}}</span>
            </el-form-item>
            <el-form-item label="传输方式:">
                <span>{{form.transferMethod}}</span>
            </el-form-item>
            <el-form-item label="是否模拟:">
                <span>{{form.isSimulate}}</span>
            </el-form-item>
            <el-form-item label="通信协议:">
                <span>{{form.letterAgreement}}</span>
            </el-form-item> -->
            <el-form-item label="版本号:">
                <span>{{form.version}}</span>
            </el-form-item>
            <!-- <el-form-item label="厂家编码:">
                <span>{{form.proComCode}}</span>
            </el-form-item>
            <el-form-item label="生产商:">
                <span>{{form.proComName}}</span>
            </el-form-item>
            <el-form-item label="产品类型:">
                <span>{{form.proType}}</span>
            </el-form-item>
            <el-form-item label="所属企业标识号:">
                <span>{{form.opeCompany}}</span>
            </el-form-item> -->
            <el-form-item label="所属服务器标识号:">
                <span>{{form.opeService}}</span>
            </el-form-item>
            <el-form-item label="巡检频次:">
                <span>{{form.insFrequency}}</span>
            </el-form-item>
            <el-form-item label="过保时间:">
                <span>{{form.overTime | dateFormatFilter('yyyy-MM-dd hh:mm:ss')}}</span>
            </el-form-item>
            <!-- <el-form-item label="消防设施:">
                <span>{{form.fireFacility}}</span>
            </el-form-item>
            <el-form-item label="片区id:">
                <span>{{form.companyId}}</span>
            </el-form-item>
            <el-form-item label="片区编码:">
                <span>{{form.companyCode}}</span>
            </el-form-item>
            <el-form-item label="新增设备用户名Id:">
                <span>{{form.addHostUserId}}</span>
            </el-form-item>
            <el-form-item label="新增设备用户编码:">
                <span>{{form.addHostUserCode}}</span>
            </el-form-item>
            <el-form-item label="新增设备用户名:">
                <span>{{form.addHostUserName}}</span>
            </el-form-item>
            <el-form-item label="是否在线:">
                <span>{{form.hostOnline}}</span>
            </el-form-item>
            <el-form-item label="设备配置编码:">
                <span>{{form.equipmentConfigerCode}}</span>
            </el-form-item> -->
		</el-form>
		<div class="dialog-footer text-right pb20">
			<el-button type="primary" @click="cancel" size="small">关 闭</el-button>
		</div>
	</div>
</template>

<script>
import { dateFormat } from '@/tools/utils';
import ECharts from 'echarts';
	export default {
		components: {},
		mixins: [],
		props: ['equipmentInfo'],
		data() {
			return {
				queryingShowLoading: false,
                form: {},
                typeList: [],
                queryingShowLoading: false,
				queryParams: {
					itemCode: '',
					equipmentId: this.equipmentInfo.deviceId,
					startTime: '',
					endTime: ''
				}
			}
		},
		watch: {},
		computed: {},
		created() {},
		mounted() {
            this.queryEquipmentInfo();
            // this.queryEquTypeList();
			// this.equHistoryCharts();
		},
		methods: {
			cancel() {
				this.$emit("update:show", false);
			},
			queryClick() {
                this.queryingShowLoading = true;
				this.equHistoryCharts();
			},
			async queryEquipmentInfo() {
				const response = await this.$http.get(this.$equApi.findByHostId, {
					hostId: this.equipmentInfo.hostId
				});
				this.form = response.data;
            },
            async queryEquTypeList(){
                const response = await this.$http.get(this.$equApi.findEquipmentModleItem, {
					typeCode: this.equipmentInfo.deviceTypeMini
                });
                this.typeList = response.data;
            },
			async equHistoryCharts() {
				let _self = this;
				let ele = document.getElementById("equHistory");
				let xData = [];
				let seriesData = [];
				const res = await this.$http.post(this.$equApi.findEquipmentItemHistory, this.queryParams)
				res.data.forEach(item => {
					xData.push(dateFormat('yyyy-MM-dd hh:mm:ss', new Date(item.time)));
					seriesData.push(item.value)
				})
                this._renderLineCharts(ele, xData, seriesData);
                if(res){
                    this.queryingShowLoading =false;
                }
			},
			_renderLineCharts(ele, xData, seriesData) {
				
				let _self = this;
				let charts = ECharts.init(ele);
				let option = {
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
								color: '#ddd'
							}
						},
						axisLabel: {
							color: '#333',
							fontSize: 10
						},
						data: xData.map(function (str) {
							return str.replace(' ', '\n')
						})
					},
					yAxis: {
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#ddd'
							}
						},
						axisLabel: {
                            show: true,
							color: '#333',
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
		}
	}

</script>
<style lang="scss" scoped>
	#equHistory {
		width: 100%;
		height: 300px;
	}

</style>
