<template>
    <div>
        <el-form ref="form" :inline="true" :model="queryParams" size="small">
            <el-form-item label="数据来源:" prop="name">
                <el-input v-model.trim="queryParams.name" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="button-query" type="primary" :loading="queryingShowLoading" @click="onQuery">查询
                </el-button>
            </el-form-item>

        </el-form>
        <div>
            <el-table :data="tBody" border style="width: 100%" size="small" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column align="center" v-for="item in tHead" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
                    :formatter="item.formatter">
                </el-table-column>
                <el-table-column align="center" label="操作" width="">
                    <template slot-scope="scope">

                        <el-tooltip effect="dark" content="设备详情" placement="bottom">
                            <el-button type="text" @click="_checkSchoolInfo(scope.row)" class="iconfont icon-chakan"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="数据详情" placement="bottom">
                            <el-button type="text" @click="_editSchoolInfo(scope.row)" class="iconfont icon-biji"></el-button>
                        </el-tooltip>
                        
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page=currentPage :page-size=pageSize layout="total, prev, pager, next, jumper"
                :total=total background class="page" v-show="total > 0" :disabled="queryingShowLoading">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { dateFormat, checkDateValid } from '@/tools/utils';
import {jsGetCookie} from '@/tools/utils';
import env from '@/common/env';
import downloadWitha from'../../mixins/downloadWitha'


export default {
    components:{
    },
    mixins: ['downloadWitha'],
    props:[],
    data(){
        return {
            queryingShowLoading: false,
            importingShowLoading: false,
            queryParams: {
                pageSize: 10,
                pageNo: 1,
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
                    prop: 'merchantId',
                    label: '序号',
                    width: ''
                },
                {
                    prop: 'merchantName',
                    label: '角色名称',
                    width: ''
                },
                {
                    prop: 'createTime',
                    label: '创建时间',
                    width: '',
                    formatter: (row, column,cellValue) => {
                        return dateFormat("yyyy-MM-dd",new Date(cellValue*1000));
                    }
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
            tBody:[]
        }
    },
    watch:{
    },
    computed:{
        templateURL: function() {
            return this.$urlApi.schoolImport;
        }
    },
    created(){
    },
    mounted(){
        this.queryMerchantsList();
    },
    methods:{
        onQuery(){
            this.queryParams.pageNo = 1;
            this.queryMerchantsList();
        },
        addNew(){
            this.$router.push({
                path: '/addNewMerchant'
            })
        },
        _checkSchoolInfo(info){
            this.$router.push({
                path: '/merchantDetail',
                query: {
                    merchantId: info.merchantId
                }
            })
        },
        handleCurrentChange(page) {
            this.queryParams.pageNo = page;
            this.queryMerchantsList();
        },
        async queryMerchantsList(){
            let message = checkDateValid(this.queryParams.startTime,this.queryParams.endTime);
            if (message) {
                this.$message.warning(message);
                return;
            }
            const response = await this.$http.post(this.$urlApi.queryMerchantsList,this.queryParams); 
            this.tBody = response.data.rows;
            this.total = response.data.total;
            this.queryParams.pageNo = response.data.pageNo;
        },
        _editSchoolInfo(info){
            
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        uploadSuccess(response, file, fileList) {
            this.importingShowLoading = false;
            if (response.status == 0) {
                this.dialogPrompt = true;
                this.importPromptInfo = response.data;
                this.checkParams();
            }else{
                this.$message({
                    showClose: true,
                    message: response.message,
                    type: "error"
                });
            }
        },
        beforeUpload(file) {
            this.importingShowLoading = true;
        },
    
        uploadFailure(err, file, fileList) {
            this.importingShowLoading = false;
            this.$message({
            showClose: true,
            message: "导入失败",
            type: "error"
            });
        },
        downloadSchoolImportModel(){
            this.download(this.$urlApi.downloadSchoolTemplate);
        },
    }
}
</script>
<style lang="scss" scoped>
.input-info{
    width: 200px;
}
</style>


