<template>
    <div>
        <el-form ref="form" :inline="true" :model="queryParams" size="small">
            <el-form-item label="用户名称:" prop="name">
                <el-input v-model.trim="queryParams.name" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <!-- <el-form-item label="类型:" prop="type">
                <el-select placeholder="请选择" class="select-method" v-model="queryParams.type">
                    <el-option key="" label="全部" value=""></el-option>
                    <el-option v-for="item in this.$constants.merchantTypeList" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="账号:" prop="name">
                <el-input v-model.trim="queryParams.username" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="button-query" type="primary" :loading="queryingShowLoading" @click="onQuery">查询
                </el-button>
            </el-form-item>

        </el-form>
        <div>
            <div class="clear-fix mb10">
                <el-button class="button-query fr" type="primary" @click="addNew" size="small" v-if="this.$permissionShow('user_create')">新增用户</el-button>
                <el-button class="button-query fr mr10" type="warning" @click="deleteRole" size="small" v-if="this.$permissionShow('user_delete')">删除用户</el-button>
                <!-- <el-button class="button-query fr" type="primary" size="small" @click="downloadSchoolImportModel">下载模板</el-button>
                <el-upload class="button-query fr" :action='templateURL' :on-success="uploadSuccess" :on-error="uploadFailure" :before-upload="beforeUpload" :disabled="importingShowLoading" :show-file-list="false">
                    <el-button size="small" class="button-query" :loading="importingShowLoading" type="primary">批量导入</el-button>
                </el-upload> -->
            </div>
            <el-table :data="tBody" border style="width: 100%" size="small" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column align="center" v-for="item in tHead" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
                    :formatter="item.formatter">
                </el-table-column>
                <el-table-column align="center" label="操作" width="">
                    <template slot-scope="scope">

                        <!-- <el-tooltip effect="dark" content="查看" placement="bottom">
                            <el-button type="text" @click="_checkUserInfo(scope.row)" class="iconfont icon-chakan"></el-button>
                        </el-tooltip> -->
                        <el-tooltip effect="dark" content="编辑" placement="bottom" v-if="editShow">
                            <el-button type="text" @click="_editUserInfo(scope.row)" class="iconfont icon-biji"></el-button>
                        </el-tooltip>

                        <el-tooltip effect="dark" :content="scope.row.isUsed ? '停用' : '启用'" placement="bottom" v-if="editShow">
                            <el-button style="font-size: 20px;" type="text" @click="_editUserAuth(scope.row)" :class="{'el-icon-circle-close-outline' : scope.row.isUsed,'el-icon-circle-check-outline' : !scope.row.isUsed}"></el-button>
                        </el-tooltip>
                        
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page="queryParams.pageNumber" :page-size="queryParams.pageSize" layout="total, prev, pager, next"
                :total="total"  class="page" v-show="total > 0" :disabled="queryingShowLoading">
            </el-pagination>
        </div>

        <el-dialog v-if="dialogAdd" :title="userInfo.userId ?'编辑':'新增'" :visible.sync="dialogAdd" width="60%">
			<dialogAdd :show.sync="dialogAdd" :userInfo="userInfo" @refreshData="refreshData">
			</dialogAdd>
		</el-dialog>

        <el-dialog v-if="dialogCheck" title="查看" :visible.sync="dialogCheck" width="60%">
			<dialogCheck :show.sync="dialogCheck" :userInfo="userInfo">
			</dialogCheck>
		</el-dialog>
    </div>
</template>

<script>
import { dateFormat, checkDateValid, jsGetCookie } from '@/tools/utils';
import dialogAdd from './component/dialogAdd';
import dialogCheck from './component/dialogCheck';
import {  userTypeFilter } from '@/filters/index';

export default {
    components:{
        dialogAdd,
        dialogCheck
    },
    mixins: ['downloadWitha'],
    props:[],
    data(){
        return {
            queryingShowLoading: false,
            importingShowLoading: false,
            dialogAdd: false,
            dialogCheck: false,
            userInfo: {},
            queryParams: {
                name: '',
                username: '',
                pageSize: 10,
                pageNumber: 1,
            },
            total: 0,
            multipleSelection: [],
            pickerOptions1: {
                disabledDate(time) {
                return time.getTime() > Date.now();
                }
            },
            tHead: [
                // {
                //     prop: 'userId',
                //     label: '编码',
                //     width: ''
                // },
                {
                    prop: 'name',
                    label: '用户名称',
                    width: ''
                },
                {
                    prop: 'username',
                    label: '账号',
                    width: ''
                },
                {
                    prop: 'roleName',
                    label: '角色名称',
                    width: ''
                },
                {
                    prop: 'roleType',
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
                    prop: 'isUsed',
                    label: '状态',
                    width: '',
                    formatter: (row, column,cellValue) => {
                        return cellValue?"启用":"停用"
                    }
                }
            ],
            tBody:[]
        }
    },
    watch:{
    },
    computed:{
        templateURL: function() {
            return this.$urlApi.schoolImport;
        },
        editShow: function() {
            return this.$permissionShow('user_edit')
        },

    },
    created(){
    },
    mounted(){
        this.queryUserList();
    },
    methods:{
        onQuery(){
            this.queryParams.pageNumber = 1;
            this.queryUserList();
        },
        refreshData(){
            this.onQuery();
        },
        addNew(){
            this.userInfo = {};
            this.dialogAdd = true;            
        },
        _checkUserInfo(info){
            this.roleInfo = info;
            this.dialogCheck = true;
        },
        handleCurrentChange(page) {
            this.queryParams.pageNumber = page;
            this.queryUserList();
        },
        async queryUserList(){
            const response = await this.$http.post(this.$urlApi.getUserList,this.queryParams); 
            this.tBody = response.data.content;
            this.total = response.data.totalElements;
        },
        _editUserInfo(info){
            this.userInfo = info;
            this.dialogAdd = true;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        deleteRole(){

        },
        async _editUserAuth(info){
            let tips = '是否确定' + (info.isUsed ? '停用' : '启用') +'该用户';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning'
            }).then(() => {
                this.editAuth(info);
            }).catch(() => {
            });
        },
        async editAuth(info){
            const response = await this.$http.post(this.$urlApi.editLoginAuth,{
                userId: info.userId,
                isUsed: !info.isUsed
            }); 

            if(response.result == 'SUCCESS'){
                this.$message({
                    type: 'success',
                    message: '操作成功'
                });
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


