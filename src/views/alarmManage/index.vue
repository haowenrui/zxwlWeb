<template>
    <div>
        <el-form ref="form" :inline="true" :model="queryParams" size="small">
            <el-form-item label="设备名称:" prop="name">
                <el-input v-model.trim="queryParams.name" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="类型:" prop="type">
                <el-select placeholder="请选择" class="select-method" v-model="queryParams.type">
                    <el-option key="" label="全部" value=""></el-option>
                    <el-option v-for="item in this.$constants.merchantTypeList" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button class="button-query" type="primary" :loading="queryingShowLoading" @click="onQuery">查询
                </el-button>
            </el-form-item>

        </el-form>
        <div>
            <div class="clear-fix mb10">
                <el-button class="button-query fr mr10" type="warning" @click="deleteRole" size="small">导出报警详情</el-button>
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
                        <el-tooltip effect="dark" content="报警处理" placement="bottom">
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

export default {
    components:{
    },
    props:[],
    data(){
        return {
            queryingShowLoading: false,
            queryParams: {
                startTime: '',
                endTime: '',
                merchantName: '',
                provinceCode: '',
                cityCode: '',
                merchantType: '',
                status: '',
                auditStatus: '',
                contact: '',
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
    }
}
</script>
<style lang="scss" scoped>
.input-info{
    width: 200px;
}
</style>


