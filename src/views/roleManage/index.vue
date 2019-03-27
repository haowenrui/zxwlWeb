<template>
    <div>
        <!-- <el-form ref="form" :inline="true" :model="queryParams" size="small">
            <el-form-item label="角色名称:" prop="name">
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

        </el-form> -->
        <div>
            <div class="clear-fix mb10">
                <el-button class="button-query fr" type="primary" @click="addNew" size="small">新增角色</el-button>
                <el-button class="button-query fr mr10" type="warning" @click="deleteRole" size="small">删除角色</el-button>
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

        <el-dialog v-if="dialogAdd" :title="roleInfo.roleId ?'编辑':'新增'" :visible.sync="dialogAdd" width="60%">
			<dialogAdd :show.sync="dialogAdd" :roleInfo="roleInfo" @refreshData="refreshData">
			</dialogAdd>
		</el-dialog>

        <el-dialog v-if="dialogCheck" title="查看" :visible.sync="dialogCheck" width="60%">
			<dialogCheck :show.sync="dialogCheck" :roleId="roleInfo.roleId">
			</dialogCheck>
		</el-dialog>
    </div>
</template>

<script>
import { dateFormat, checkDateValid } from '@/tools/utils';
import dialogAdd from './component/dialogAdd';
import dialogCheck from './component/dialogCheck';
import {  userTypeFilter } from '@/filters/index';


export default {
    components:{
        dialogAdd,
        dialogCheck
    },
    props:[],
    data(){
        return {
            queryingShowLoading: false,
            dialogAdd: false,
            dialogCheck: false,
            roleInfo: '',
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
                // {
                //     prop: 'roleId',
                //     label: '序号',
                //     width: ''
                // },
                {
                    prop: 'name',
                    label: '角色名称',
                    width: ''
                },
                {
                    prop: 'type',
                    label: '角色类型',
                    width: '',
                    formatter: (row, column,cellValue) => {
                        return userTypeFilter(cellValue)
                    }
                },
                {
                    prop: 'companyName',
                    label: '公司名称',
                    width: ''
                },
                {
                    prop: 'dateCreated',
                    label: '创建时间',
                    width: '',
                    formatter: (row, column,cellValue) => {
                        return dateFormat("yyyy-MM-dd",new Date(cellValue));
                    }
                },
                {
                    prop: 'creator',
                    label: '创建者',
                    width: '',
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
        this.queryRoleList();
    },
    methods:{
        onQuery(){
            this.queryParams.pageNo = 1;
            this.queryRoleList();
        },
        refreshData(){
            this.dialogAdd = false;
            this.queryRoleList();
        },
        addNew(){
            this.roleInfo = {};
            this.dialogAdd = true;
        },
        _checkSchoolInfo(info){
            this.roleInfo = info;
            this.dialogCheck = true;
        },
        handleCurrentChange(page) {
            this.queryParams.pageNumber = page;
            this.queryRoleList();
        },
        async queryRoleList(){
            let message = checkDateValid(this.queryParams.startTime,this.queryParams.endTime);
            if (message) {
                this.$message.warning(message);
                return;
            }
            const response = await this.$http.post(this.$urlApi.queryRoleList,this.queryParams); 
            this.tBody = response.data.content;
            this.total = response.data.totalElements;
            this.queryParams.pageNumber = response.data.number;
        },
        _editSchoolInfo(info){
            this.roleInfo = info;
            this.dialogAdd = true;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        async deleteRole(){
            let selectRoleId = [];
            this.multipleSelection.forEach(item => {
                selectRoleId.push(item.roleId);
            });
            const response = await this.$http.post(this.$urlApi.deleteRole,selectRoleId); 
            if(response.result == 'SUCCESS'){
                this.$message.success('删除成功');
                this.onQuery();
            }

        }
    }
}
</script>
<style lang="scss" scoped>
.input-info{
    width: 200px;
}
</style>


