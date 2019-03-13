<template>
    <div>
        <el-form ref="form" :inline="true" :model="queryParams" size="small">
            <el-form-item label="设备名称:" prop="name">
                <el-input v-model.trim="queryParams.name" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="button-query" type="primary" :loading="queryingShowLoading" @click="onQuery">查询
                </el-button>
            </el-form-item>

        </el-form>
        <div>
            <div class="clear-fix mb10">
                <el-button class="button-query fr" type="primary" @click="addNew" size="small">新增设备</el-button>
                <el-button class="button-query fr mr10" type="warning" @click="deleteEquipment" size="small">删除设备</el-button>
                <el-upload class="button-query fr" :action='templateURL' :on-success="uploadSuccess" :on-error="uploadFailure" :before-upload="beforeUpload" :disabled="importingShowLoading" :show-file-list="false">
                    <el-button size="small" class="button-query" :loading="importingShowLoading" type="success">导入设备</el-button>
                </el-upload>
                <el-button class="button-query fr mr10" type="primary" size="small" @click="downloadEquTemplate">下载模板</el-button>
            </div>
            <el-table :data="tBody" border style="width: 100%" size="small" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column align="center" v-for="item in tHead" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
                    :formatter="item.formatter">
                </el-table-column>
                <el-table-column align="center" label="操作" width="">
                    <template slot-scope="scope">

                        <el-tooltip effect="dark" content="查看" placement="bottom">
                            <el-button type="text" @click="_checkSchoolInfo(scope.row)" class="iconfont icon-chakan"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="编辑" placement="bottom">
                            <el-button type="text" @click="_editSchoolInfo(scope.row)" class="iconfont icon-biji"></el-button>
                        </el-tooltip>
                        
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page=currentPage :page-size=pageSize layout="total, prev, pager, next, jumper"
                :total=total background class="page" v-show="total > 0" :disabled="queryingShowLoading">
            </el-pagination>
        </div>

        <el-dialog v-if="dialogAdd" :title="equipmentInfo.deviceId ? '编辑' : '新增'" :visible.sync="dialogAdd" width="60%">
			<dialogAdd :show.sync="dialogAdd" @refreshData="refreshData" :equipmentInfo="equipmentInfo">
			</dialogAdd>
		</el-dialog>
    </div>
</template>

<script>
import { dateFormat, checkDateValid } from '@/tools/utils';
import dialogAdd from './component/dialogAdd';
import download from '@/mixins/downloadWitha'

export default {
    components:{
        dialogAdd
    },
    props:[],
    data(){
        return {
            dialogAdd: false,
            queryingShowLoading: false,
            importingShowLoading: false,
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
            },
            total: 0,
            pageSize: 10,
            currentPage: 1,
            multipleSelection: [],
            pickerOptions1: {
                disabledDate(time) {
                return time.getTime() > Date.now();
                }
            },
            tHead: [
                {
                    prop: 'deviceCode',
                    label: '设备编号',
                    width: ''
                },
                {
                    prop: 'deviceName',
                    label: '设备名称',
                    width: ''
                },
                {
                    prop: 'merchantName',
                    label: '角色名称',
                    width: ''
                },
                {
                    prop: 'createTime',
                    label: '修改时间',
                    width: '',
                    formatter: (row, column,cellValue) => {
                        return dateFormat("yyyy-MM-dd",new Date(cellValue*1000));
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
                    formatter: (row, column, cellValue) => {
                        return merchantTypeFilter(cellValue);
                    }
                },
            ],
            tBody:[],
            equipmentInfo: {}
        }
    },
    watch:{
    },
    computed:{
        templateURL: function(){
            return this.$equApi.importDevice;
        }
    },
    created(){
    },
    mounted(){
        this.queryEquipmentList();
    },
    methods:{
        onQuery(){
            this.queryParams.pageNo = 1;
            this.queryEquipmentList();
        },
        
        addNew(){
             this.dialogAdd = true;
        },
        deleteEquipment(){

        },
        _checkSchoolInfo(info){
             
        },
        beforeUpload(file) {
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
        async queryEquipmentList(){
            let message = checkDateValid(this.queryParams.startTime,this.queryParams.endTime);
            if (message) {
                this.$message.warning(message);
                return;
            }
            const response = await this.$http.get(this.$equApi.equipmentList,this.queryParams); 
            this.tBody = response.data.rows;
            this.total = response.data.total;
            this.queryParams.pageNo = response.data.pageNo;
        },
        _editSchoolInfo(info){
            this.equipmentInfo = info;
            this.addNew = true;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        refreshData(){
            this.onQuery();
        },
        async downloadEquTemplate(){
            // const response = await this.$http.get(this.$urlApi.downloadSchoolImportModel); 
            // this.download(url)
            
        }
    }
}
</script>
<style lang="scss" scoped>
.input-info{
    width: 200px;
}
</style>


