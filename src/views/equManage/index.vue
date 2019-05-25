<template>
	<div>
		<el-form ref="form" :inline="true" :model="queryParams" size="small">
			<el-form-item label="设备名称:" prop="name">
				<el-input v-model.trim="queryParams.name" clearable class="input-search" size="small" placeholder="请输入">
				</el-input>
			</el-form-item>
            <el-form-item label="在线状态:" prop="name">
                <el-select v-model="queryParams.deviceOnline" placeholder="请选择" class="input-search" size="small">
                    <el-option label="全部" value=""></el-option>
					<el-option v-for="item in this.$constants.equStateList" :key="item.code" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button class="button-query" type="primary" :loading="queryingShowLoading" @click="onQuery">查询
				</el-button>
			</el-form-item>

		</el-form>
		<div class="use-table">
			<div class="clear-fix mb10">
				<el-button class="fr" type="primary" @click="addNew" size="small" v-if="this.$permissionShow('equipment_create')">新增设备</el-button>
				<el-button class="fr mr10" type="primary" @click="transfer" size="small" :disabled="multipleSelection.length == 0" v-if="this.$permissionShow('equipment_create')">变更安装人员</el-button>
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
			<el-pagination @current-change="handleCurrentChange" :current-page="queryParams.pageNumber" :page-size=pageSize
				layout="total, prev, pager, next, jumper" :total="total" class="page" v-show="total > 0"
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
				<el-select v-model="uploadForm.deviceName" placeholder="请选择" class="fl mr10" size="small" style="width: 200px" @change="changeEqu">
					<el-option v-for="item in hostList" :key="item.code" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
                <el-select v-model="uploadForm.equipmentConfigerCode" placeholder="请选择" class="fl mr10" size="small" style="width: 200px">
					<el-option v-for="item in companyList" :key="item.id" :label="item.des" :value="item.code">
					</el-option>
				</el-select>
                <el-button size="small" class="button-query fl mr10" @click="downloadEquTemplate" :loading="importingShowLoading" type="primary">下载模板
                </el-button>
                <el-upload class="button-query fl" :action='templateURL' :headers="{'X-Access-Token': token}" :data="uploadForm"
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


        <el-dialog v-if="multipleChange" title="批量迁移" :visible.sync="multipleChange" width="550px">
            <div class="dialog-cont">
                <div class="select-agent-list clearfix">
                    <div style="display: inline-block">
                        安装人员：
                    </div>
                    <div style="display: inline-block">
                        <el-select v-model="selectInsuser" placeholder="请选择安装人员" filterable clearable size="small">
                            <el-option v-for="(item,index) in insUserList" :key="index" :label="item.name" :value="item.companyUserId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="dialog-footer text-right pb20">
                <el-button size="small" @click="cancleMultipleChange">取 消</el-button>
                <el-button type="primary" @click="submitMultipleChange" size="small">确 定</el-button>
            </div>
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
                multipleChange: false,
                uploadType: 'nbSmoke',
                equList: [],
                uploadForm: {
                    deviceName: '',
                    equipmentConfigerCode: ''
                },
                selectHostName: '',
				queryParams: {
                    name: '',
                    deviceOnline: '',
					pageSize: 10,
					pageNumber: 1,
                },
                insUserList: [],
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
						prop: 'createTime',
						label: '新增时间',
						width: '',
                        formatter: (row, column, cellValue) => {
                            return dateFormat("yyyy-MM-dd hh:mm:ss", new Date(cellValue));
						}
					},
					{
						prop: 'proComName',
						label: '厂家名称',
						width: ''
					},
					{
						prop: 'insUserName',
						label: '安装人员',
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
						prop: 'addDeviceUserName',
						label: '创建者',
						width: '',
					},
				],
				tBody: [],
                equipmentInfo: {},
                hostList: [],
                companyList: [],
                selectInsuser: ''
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
            this.queryEquipmentList();
            this.queryHostType();
            this.queryUserList();
		},
		methods: {
			onQuery() {
				this.queryParams.pageNumber = 1;
				this.queryEquipmentList();
            },
            
            async queryHostType(){
				const response = await this.$http.get(this.$equApi.findMiniTypeByNoteAndParentCode, {
                    note: '无线设备'
                });
                this.hostList = response.data;
                this.uploadForm.deviceName = response.data[0].code;
                this.selectHostName = response.data[0].name;
                this.changeEqu();
            },
            async changeEqu(){
                let _self = this;
                this.hostList.forEach(item => {
                    if(item.code == _self.uploadForm.deviceName){
                        _self.selectHostName = item.name;
                    }
                });
                const response = await this.$http.get(this.$equApi.getEquipmentConfiger,{
                    miniTypeCode: this.uploadForm.deviceName
                });
                this.companyList = response.data;
            },

			addNew() {
                this.equipmentInfo = {};
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
				// let message = checkDateValid(this.queryParams.startTime,this.queryParams.endTime);
				// if (message) {
				//     this.$message.warning(message);
				//     return;
				// }
				const response = await this.$http.get(this.$equApi.equipmentList, this.queryParams);
				this.tBody = response.data.equipmentList;
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


            async queryUserList(){
                const response = await this.$http.post(this.$urlApi.getUserList,{
                    type: 'INSTALLER',
                    pageSize: 10000000,
                    pageNumber: 1,
                }); 
                this.insUserList = response.data.content;
            },

            transfer(){
                if (this.multipleSelection.length > 0) {
                    this.multipleChange = true;
                } else {
                    return;
                }
            },
            
            cancleMultipleChange() {
                this.multipleChange = false;
                this.selectInsuser = '';
            },

            async submitMultipleChange() {
                let equNoList = [];
                this.multipleSelection.forEach(item => {
                    equNoList.push(item.deviceId);
                })
                if (!this.selectInsuser) {
                    this.$message({
                        showClose: true,
                        message: '请选择安装人员',
                        type: "error"
                    });
                    return false;
                }
                const res = await this.$http.post(this.$equApi.changeEqupInsUser, {
                    type: 'equipment',
                    equipIds: equNoList,
                    companyUserId: this.selectInsuser
                });
                this.multipleChange = false;
                if (!res.status) {
                    this.$message({
                        showClose: true,
                        message: "操作成功",
                        type: "success"
                    });
                    this.onQuery();
                } else {
                    this.$message({
                        showClose: true,
                        message: res.message,
                        type: "error"
                    });
                }
                this.selectInsuser = '';
            },
			refreshData() {
				this.onQuery();
			},
			async downloadEquTemplate() {
				// const response = await this.$http.get(this.$equApi.downloadTemplate, {
				// 	deviceName: this.uploadType
                // });
                
				downloadFile('http://39.98.173.65:9001/equipment/downloadTemplatezxwl?deviceMiniTypeCode=' + this.uploadForm.deviceName)
			}
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
