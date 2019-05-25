<template>
    <div>
        <el-form ref="form" :inline="true" :model="queryParams" size="small">
            <el-form-item label="设备名称:" prop="name">
                <el-input v-model.trim="queryParams.deviceName" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="状态:" prop="type">
                <el-select placeholder="请选择" class="select-method" v-model="queryParams.alarmStatus">
                    <el-option key="" label="全部" value=""></el-option>
                    <el-option v-for="item in this.$constants.alarmStatusList" :label="item.name" :value="item.value" :key="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型:" prop="type">
                <el-select placeholder="请选择" class="select-method" v-model="queryParams.alarmType">
                    <el-option key="" label="全部" value=""></el-option>
                    <el-option v-for="item in alarmTypeList" :label="item.name" :value="item.value" :key="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button class="button-query" type="primary" :loading="queryingShowLoading" @click="onQuery">查询
                </el-button>
            </el-form-item>

        </el-form>
        <div>
            <!-- <div class="clear-fix mb10">
                <el-button class="button-query fr mr10" type="warning" @click="deleteRole" size="small">导出报警详情</el-button>
            </div> -->
            <el-table :data="alarmHistioryList" border style="width: 100%" size="small">
                <!-- <el-table-column type="selection" width="55">
                </el-table-column> -->
                <el-table-column align="center" v-for="item in tHead" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
                    :formatter="item.formatter">
                </el-table-column>
                <el-table-column align="center" label="操作" width="">
                    <template slot-scope="scope">
                        <el-button type="text" @click="transmit(scope.row)"> 转发</el-button>
                        <el-button type="text" @click="resolve(scope.row)" >报警处理</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page="queryParams.pageNumber" :page-size="queryParams.pageSize" layout="total, prev, pager, next, jumper"
                :total="total" class="page" v-show="total > 0" :disabled="queryingShowLoading">
            </el-pagination>
        </div>


        <el-dialog v-if="resolveAlarmVisible" title="报警处理" :visible.sync="resolveAlarmVisible" width="30%">
			<resolveAlarm :show.sync="resolveAlarmVisible" :alrmInfo="alrmInfo" @closePopup="closePopup" @resolveAlarm="closePopup">
			</resolveAlarm>
		</el-dialog>

        <el-dialog v-if="transmitAlarmVisible" title="报警转发" :visible.sync="transmitAlarmVisible" width="30%">
			<transmitAlarm :show.sync="transmitAlarmVisible" :alrmInfo="alrmInfo" @closePopup="closePopup">
			</transmitAlarm>
		</el-dialog>
    </div>
</template>

<script>
import { dateFormat, checkDateValid } from '@/tools/utils';
import {jsGetCookie} from '@/tools/utils';
import env from '@/common/env';
import { alarmStatus, alarmType } from '@/filters/index';

import resolveAlarm from '../home/components/resolveAlarm.vue';
import transmitAlarm from '../home/components/transmitAlarm.vue';

export default {
    components:{
        resolveAlarm,
        transmitAlarm
    },
    props:[],
    data(){
        return {
            resolveAlarmVisible: false,
            transmitAlarmVisible: false,
            queryingShowLoading: false,
            alrmInfo: {},
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
                alarmStatus: '',
                deviceName: '',
                alarmType: ''
            },
            alarmTypeList: [],
            total: 0,
            pageSize: 10,
            currentPage: 1,
            multipleSelection: [],
            alarmHistioryList: [],
            pickerOptions1: {
                disabledDate(time) {
                return time.getTime() > Date.now();
                }
            },
            tHead: [
                {
                    prop: 'deviceName',
                    label: '设备名称',
                    width: ''
                },
                {
                    prop: 'alarmDate',
                    label: '报警时间',
                    width: '',
                    formatter: (row, column,cellValue) => {
                        return dateFormat("yyyy-MM-dd hh:mm:ss",new Date(cellValue));
                    }
                },
                {
                    prop: 'alarmStatus',
                    label: '状态',
                    width: '',
                    formatter: (row, column,cellValue) => {
                        return alarmStatus(cellValue);
                    }
                },
                {
                    prop: 'alarmType',
                    label: '类型',
                    width: '',
                    formatter: (row, column,cellValue) => {
                        let currentAlarmType = this.alarmTypeList.find(item => {
                            return item.value === cellValue;
                        })
                        return currentAlarmType.name;
                    }
                },
                {
                    prop: 'alarmValue',
                    label: '报警值',
                    width: '',
                    formatter: (row, column,cellValue) => {
                        let alarmStr = '';
                        if(row.alarmValue && row.alarmValue != null){
                            alarmStr = row.itemName + '-' + row.alarmValue + row.itemUnit
                        }
                        return alarmStr;
                    }
                },
                {
                    prop: 'companyName',
                    label: '公司名称',
                    width: '',
                },
                {
                    prop: 'companyAddress',
                    label: '公司地址',
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
        this.getAlarmList();
        this.getAlarmTypeList();
    },
    methods:{
        onQuery(){
            this.queryParams.pageNumber = 1;
            this.getAlarmList();
        },
         
        handleCurrentChange(page) {
            this.queryParams.pageNumber = page;
            this.getAlarmList();
        },

        async getAlarmList(){
            let self = this;
            const res = await this.$http.post(this.$equApi.alarmList,this.queryParams);
            this.alarmHistioryList = res.data.content;
            this.total = res.data.totalElements;
        },
        async getAlarmTypeList(){
            let self = this;
            const res = await this.$http.get(this.$equApi.alarmTypes);
            this.alarmTypeList = res.data;
        },


        resolve(info){
            this.alrmInfo = info;
            this.resolveAlarmVisible = true;
        },

        transmit(info){
            this.alrmInfo = info;
            this.transmitAlarmVisible = true;
        },

        closePopup(){
            this.resolveAlarmVisible = false;
            this.transmitAlarmVisible = false;
            this.onQuery();
        },

        
    }
}
</script>
<style lang="scss" scoped>
.input-info{
    width: 200px;
}
</style>


