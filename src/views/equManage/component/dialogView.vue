<template>
	<div>
		<el-form ref="form" :model="form" :inline="true" label-width="100px" size="mini">
			<el-form-item label="设备名称:">
				<span>{{form.deviceName}}</span>
			</el-form-item>
			<el-form-item label="设备编码:">
				<span>{{form.deviceQRCode}}</span>
			</el-form-item>
			<el-form-item label="通信编号:">
				<span>{{form.letterCode}}</span>
			</el-form-item>
			<el-form-item label="生产商:">
				<span>{{form.proComName}}</span>
			</el-form-item>
			<el-form-item label="厂家编码:">
				<span>{{form.proComCode}}</span>
			</el-form-item>
			<el-form-item label="产品类型:">
				<span>{{form.proType}}</span>
			</el-form-item>
			<el-form-item label="最小值:">
				<span>{{form.minValue}}</span>
			</el-form-item>
			<el-form-item label="最大值:">
				<span>{{form.maxValue}}</span>
			</el-form-item>
			<el-form-item label="通信协议:">
				<span>{{form.letterAgreement}}</span>
			</el-form-item>
			<el-form-item label="传输方式:">
				<span>{{form.traMethod}}</span>
			</el-form-item>
			<el-form-item label="是否模拟:">
				<span>{{form.isSimulate}}</span>
			</el-form-item>
			<el-form-item label="版本号:">
				<span>{{form.version}}</span>
			</el-form-item>
			<el-form-item label="巡检频次:">
				<span>{{form.insFrequency}}</span>
			</el-form-item>
			<el-form-item label="过保时间:">
				<span>{{form.overTime}}</span>
			</el-form-item>
			<el-form-item label="消防设施:">
				<span>{{form.fireFacility}}</span>
			</el-form-item>
		</el-form>
		<div>
			<div class="charts-head text-right">
				<el-select v-model="queryParams.itemCode" placeholder="请选择" size="small">
					<el-option v-for="item in typeList" :key="item.code" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
				<el-date-picker class="school-manage-date" v-model="queryParams.startTime" type="date"
					placeholder="开始日期" size="small" format="yyyy-MM-dd" :editable="false" value-format="yyyy-MM-dd">
				</el-date-picker>
				<el-date-picker class="school-manage-date" v-model="queryParams.endTime" type="date" placeholder="结束日期"
					size="small" :editable="false" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
				</el-date-picker>
				<el-button class="button-query" type="primary" :loading="queryingShowLoading" @click="queryClick"
					size="small">查询</el-button>
			</div>
			<div id="equHistory"></div>
		</div>
		<div class="dialog-footer text-right pb20">
			<el-button type="primary" @click="cancel" size="small">关 闭</el-button>
		</div>
	</div>
</template>

<script>
import { dateFormat } from '@/tools/utils';
	export default {
		components: {},
		mixins: [],
		props: ['equipmentInfo'],
		data() {
			return {
                form: {},
                typeList: [],
                queryingShowLoading: false,
				queryParams: {
					itemCode: '',
					equipmentId: this.equipmentInfo.id,
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
            this.queryEquTypeList();
			this.equHistoryCharts();
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
				const response = await this.$http.get(this.$equApi.queryEquipmentInfo, {
					equipmentId: this.equipmentInfo.deviceId
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
					xData.push(dateFormat('yyyy-MM-dd hh-mm-ss', new Date(item.time)));
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
		}
	}

</script>
<style lang="scss" scoped>
	#equHistory {
		width: 100%;
		height: 300px;
	}

</style>
