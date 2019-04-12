<template>
	<div>
		<el-form ref="form" :inline="true" :model="queryParams" size="small">
			<el-form-item label="设备名称:" prop="name">
				<el-input v-model.trim="queryParams.name" clearable class="input-search" size="small" placeholder="请输入">
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button class="button-query" type="primary" :loading="queryingShowLoading" @click="onQuery">查询
				</el-button>
			</el-form-item>

		</el-form>
		<div>
			<div class="clear-fix mb10">
				<el-button class="button-query fr" type="primary" @click="addNew" size="small" v-if="this.$permissionShow('equipment_create')">新增设备</el-button>
				<el-button class="button-query fr mr10" type="warning" @click="deleteEquipment" size="small" v-if="this.$permissionShow('equipment_delete')">删除设备
				</el-button>
                <el-button size="small" class="button-query fr mr10" type="success" @click="uploadAndDownload = !uploadAndDownload" v-if="this.$permissionShow('equipment_import')">导入设备
					</el-button>
				<el-button class="button-query fr mr10" type="primary" size="small" @click="uploadAndDownload = !uploadAndDownload" v-if="this.$permissionShow('equipment_import')">下载模板
				</el-button>
			</div>
			<el-table :data="tBody" border style="width: 100%" size="small" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column align="center" v-for="item in tHead" :key="item.prop" :prop="item.prop"
					:label="item.label" :width="item.width" :formatter="item.formatter">
				</el-table-column>
				<el-table-column align="center" label="操作" width="">
					<template slot-scope="scope">

						<el-tooltip effect="dark" content="查看" placement="bottom">
							<el-button type="text" @click="_checkSchoolInfo(scope.row)" class="iconfont icon-chakan">
							</el-button>
						</el-tooltip>
						<el-tooltip effect="dark" content="编辑" placement="bottom" v-if="editShow">
							<el-button type="text" @click="_editSchoolInfo(scope.row)" class="iconfont icon-biji">
							</el-button>
						</el-tooltip>

					</template>
				</el-table-column>
			</el-table>
			<el-pagination @current-change="handleCurrentChange" :current-page=currentPage :page-size=pageSize
				layout="total, prev, pager, next, jumper" :total=total background class="page" v-show="total > 0"
				:disabled="queryingShowLoading">
			</el-pagination>
		</div>

		<el-dialog v-if="dialogAdd" :title="equipmentInfo.deviceId ? '编辑' : '新增'" :visible.sync="dialogAdd" width="60%">
			<dialogAdd :show.sync="dialogAdd" @refreshData="refreshData" :equipmentInfo="equipmentInfo">
			</dialogAdd>
		</el-dialog>

        <el-dialog v-if="dialogView" title="查看" :visible.sync="dialogView" width="60%">
			<dialogView :show.sync="dialogView" :equipmentInfo="equipmentInfo">
			</dialogView>
		</el-dialog>


		<el-dialog v-if="uploadAndDownload" title="上传与下载" :visible.sync="uploadAndDownload" width="60%">
			<div class="clearfix mt10 mb10 pl30">
				<el-select v-model="uploadType" placeholder="请选择" class="fl mr10" size="small" style="width: 50%">
					<el-option v-for="item in this.$constants.equType" :key="item.value" :label="item.name" :value="item.value">
					</el-option>
				</el-select>
                <el-button size="small" class="button-query fl mr10" @click="downloadEquTemplate" :loading="importingShowLoading" type="primary">下载模板
                </el-button>
                <el-upload class="button-query fl" :action='templateURL' :headers="{'X-Access-Token': token}" :data="{deviceName: uploadType}"
                :on-success="uploadSuccess" :on-error="uploadFailure" :before-upload="beforeUpload"
                :disabled="importingShowLoading" :show-file-list="false">
                    <el-button size="small" class="button-query" :loading="importingShowLoading" type="success">导入设备
                    </el-button>
                </el-upload>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="uploadAndDownload = false" size="small">关闭</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	import {
		dateFormat,
        checkDateValid,
        downloadFile,
        jsGetCookie
	} from '@/tools/utils';
    import dialogAdd from './component/dialogAdd';
    import dialogView from './component/dialogView';
    import download from '@/mixins/downloadWitha';
    import { deviceStatus } from '@/filters/index';
	export default {
		components: {
            dialogAdd,
            dialogView
		},
		props: [],
		data() {
			return {
                dialogAdd: false,
                dialogView: false,
				queryingShowLoading: false,
				importingShowLoading: false,
                uploadAndDownload: false,
                uploadType: 'nbSmoke',
                equList: [],
                editShow: this.$permissionShow('equipment_edit'),
				queryParams: {
					pageSize: 10,
					pageNumber: 1,
				},
				token: '',
				total: 0,
				pageSize: 10,
				currentPage: 1,
				multipleSelection: [],
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				tHead: [{
						prop: 'deviceQRCode',
						label: '设备编号',
						width: ''
					},
					{
						prop: 'deviceName',
						label: '设备名称',
						width: ''
					},
                    {
						prop: 'deviceOnline',
						label: '状态',
						width: '',
                        formatter: (row, column, cellValue) => {
                            return deviceStatus(cellValue);
						}
					},
					{
						prop: 'proComName',
						label: '厂家名称',
						width: ''
					},
					{
						prop: 'proType',
						label: '产品类型',
						width: ''
					},
					{
						prop: 'insFrequency',
						label: '巡检频次',
						width: ''
					},
					{
						prop: 'overTime',
						label: '过保时间',
						width: '',
						formatter: (row, column, cellValue) => {
							return dateFormat("yyyy-MM-dd", new Date(cellValue));
						}
					},
					{
						prop: 'districtName',
						label: '创建者',
						width: '',
					},
					{
						prop: 'merchantType',
						label: '修改者',
						width: '',
					},
				],
				tBody: [],
				equipmentInfo: {}
			}
		},
		watch: {},
		computed: {
			templateURL: function () {
				return this.$equApi.importDevice;
			}
		},
		created() {},
		mounted() {
			this.token = jsGetCookie('_TOKEN_');
			this.queryEquipmentList();
		},
		methods: {
			onQuery() {
				this.queryParams.pageNo = 1;
				this.queryEquipmentList();
			},

			addNew() {
				this.dialogAdd = true;
			},
			async deleteEquipment() {
				let selectArr = [];
				if (this.multipleSelection.length <= 0) {
					return;
				} else {
					this.multipleSelection.forEach(item => {
						selectArr.push(item.deviceId);
					});
				}
				const response = await this.$http.post(this.$equApi.deleteEquipment, selectArr);

				if (response.result == "SUCCESS") {
					this.$message({
						showClose: true,
						message: '删除成功',
						type: "success"
					});
					this.multipleSelection = [];
					this.onQuery();
				} else {
					this.$message({
						showClose: true,
						message: response.message,
						type: "error"
					});
				}
			},
			_checkSchoolInfo(info) {
                this.equipmentInfo = info;
				this.dialogView = true;
			},
			beforeUpload(file) {
				this.token = jsGetCookie('_TOKEN_');
				this.importingShowLoading = true;
			},
			uploadSuccess(item) {
				this.importingShowLoading = false;
				return (response, file, fileList) => {
					if (response.result == "SUCCESS") {
						this.$message({
							showClose: true,
							message: '导入成功',
							type: "success"
						});
					} else {
						this.$message({
							showClose: true,
							message: response.message,
							type: "error"
						});
					}
				};
			},
			uploadFailure(err, file, fileList) {
				this.importingShowLoading = false;
				this.$message({
					showClose: true,
					message: "上传失败",
					type: "error"
				});
			},
			handleCurrentChange(page) {
				this.queryParams.pageNo = page;
				this.queryEquipmentList();
			},
			async queryEquipmentList() {
				// let message = checkDateValid(this.queryParams.startTime,this.queryParams.endTime);
				// if (message) {
				//     this.$message.warning(message);
				//     return;
				// }
				const response = await this.$http.get(this.$equApi.equipmentList, this.queryParams);
				this.tBody = response.data.equipmentList;
				this.total = response.data.total;
				this.queryParams.pageNo = response.data.pageNo;
			},
			_editSchoolInfo(info) {
				this.equipmentInfo = info;
				this.dialogAdd = true;
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			refreshData() {
				this.onQuery();
			},
			async downloadEquTemplate() {
				// const response = await this.$http.get(this.$equApi.downloadTemplate, {
				// 	deviceName: this.uploadType
				// });
				downloadFile('http://39.98.173.65:9001/equipment/downloadTemplatezxwl?deviceName=' + this.uploadType)
			}
		}
	}

</script>
<style lang="scss" scoped>
	.input-info {
		width: 200px;
	}

</style>
