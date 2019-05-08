<template>
	<div>
		<el-form ref="form" :inline="true" :model="queryParams" size="small">
            <el-form-item label="指标类型:" prop="name">
				<el-select v-model="queryParams.configerId" placeholder="请选择" class="input-search fl mr10" clearable size="small">
					<el-option v-for="item in configerList" :key="item.validue" :label="item.des" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="指标名称:" prop="name">
				<el-input v-model.trim="queryParams.name" clearable class="input-search" size="small" placeholder="请输入">
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button class="button-query" type="primary" :loading="queryingShowLoading" @click="onQuery">查询
				</el-button>
			</el-form-item>

		</el-form>
		<div class="use-table">
			<div class="clear-fix mb10">
				<el-button class="button-query fr" type="primary" @click="addNew" size="small" v-if="this.$permissionShow('equipment_create')">新增</el-button>
				<el-button class="button-query fr mr10" type="warning" @click="deleteEquipment" size="small" v-if="this.$permissionShow('equipment_delete')">删除
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

						<!-- <el-tooltip effect="dark" content="查看" placement="bottom">
							<el-button type="text" @click="_checkSchoolInfo(scope.row)" class="iconfont icon-chakan">
							</el-button>
						</el-tooltip> -->
						<el-tooltip effect="dark" content="编辑" placement="bottom" v-if="editShow">
							<el-button type="text" @click="_editSchoolInfo(scope.row)" class="iconfont icon-biji">
							</el-button>
						</el-tooltip>

					</template>
				</el-table-column>
			</el-table>
			<el-pagination @current-change="handleCurrentChange" :current-page="queryParams.pageNumber" :page-size=pageSize
				layout="total, prev, pager, next, jumper" :total="total" class="page" v-show="total > 0"
				:disabled="queryingShowLoading">
			</el-pagination>
		</div>

		<el-dialog v-if="dialogAdd" :title="equipmentInfo.id ? '编辑' : '新增'" :visible.sync="dialogAdd" width="60%">
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
                :on-success="uploadSuccess()" :on-error="uploadFailure" :before-upload="beforeUpload"
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
                configerList: [],
                equList: [],
				queryParams: {
                    configerId: '',
                    name: '',
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
						prop: 'equipTypeName',
						label: '设备类别',
						width: ''
					},
					{
						prop: 'name',
						label: '指标名称',
						width: ''
					},
                    {
						prop: 'code',
						label: '编码',
						width: '',
                    },
                    {
						prop: 'type',
						label: '指标类型',
						width: '',
                        formatter: (row, column, cellValue) => {
                            return cellValue;
						}
					},
					{
						prop: 'unit',
						label: '单位',
						width: ''
					},
					{
						prop: 'maxValue',
						label: '最大值',
						width: ''
					},
					{
						prop: 'minValue',
						label: '最小值',
						width: ''
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
            },
            editShow: function() {
                return this.$permissionShow('equipment_edit')
            },
		},
		created() {},
		mounted() {
            this.token = jsGetCookie('_TOKEN_');
            this.getEquipmentConfiger();
			this.queryEquipmentList();
		},
		methods: {
			onQuery() {
				this.queryParams.pageNumber = 1;
				this.queryEquipmentList();
			},

			addNew() {
				this.dialogAdd = true;
            },
            async getEquipmentConfiger(){
                const response = await this.$http.get(this.$equApi.getEquipmentConfiger);
                this.configerList = response.data;
            },
			async deleteEquipment() {
				let selectArr = [];
				if (this.multipleSelection.length <= 0) {
					return;
				} else {
					this.multipleSelection.forEach(item => {
						selectArr.push(item.id);
					});
				}
				const response = await this.$http.post(this.$equApi.indexDelete, selectArr);

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
                        this.uploadAndDownload = false;
                        this.refreshData();
					} else {
						this.$message({
							showClose: true,
							message: '导入失败',
							type: "error"
						});
					}
				};
			},
			uploadFailure(err, file, fileList) {
				this.importingShowLoading = false;
				this.$message({
					showClose: true,
					message: "导入失败",
					type: "error"
				});
			},
			handleCurrentChange(page) {
				this.queryParams.pageNumber = page;
				this.queryEquipmentList();
			},
			async queryEquipmentList() {
				const response = await this.$http.post(this.$equApi.indexList, this.queryParams);
				this.tBody = response.data.content;
				this.total = parseInt(response.data.equipmentCount);
				// this.queryParams.pageNumber = response.data.pageNumber;
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
		}
	}

</script>
<style lang="scss" scoped>
	.input-info {
		width: 200px;
	}

    .use-table >>> .el-checkbox__inner,
    .use-table /deep/ .el-checkbox__inner{
        border: 1px solid #666 !important;
    }

</style>
