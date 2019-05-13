<template>
    <div>
        <el-form ref="form" :model="form" :inline="true" label-width="140px" size="mini">
            <!-- <el-form-item label="主机Id:">
                <el-input v-model.trim="form.hostId" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item> -->
            <el-form-item label="主机编码:">
                <el-input v-model.trim="form.hostQRCode" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="主机名称:">
                <el-input v-model.trim="form.hostName" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="主机类型:">
                <el-select v-model="form.hostType" placeholder="请选择" class="input-search" size="small">
					<el-option v-for="item in hostList" :key="item.code" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
            </el-form-item>
            <el-form-item label="主机小类型:">
                <el-select v-model="form.hostTypeMini" placeholder="请选择" class="input-search" size="small">
					<el-option v-for="item in miniTypeList" :key="item.code" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
            </el-form-item>
            <el-form-item label="安装人id:">
                <el-input v-model.trim="form.insUserId" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="安装位置:">
                <el-input v-model.trim="form.insLocation" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="安装日期:">
                <el-input v-model.trim="form.insDate" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="CCID:">
                <el-input v-model.trim="form.ccid" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="使用状况:">
                <el-input v-model.trim="form.useStatus" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="传输方式:">
                <el-input v-model.trim="form.transferMethod" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="是否模拟:">
                <el-input v-model.trim="form.isSimulate" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="通信协议:">
                <el-input v-model.trim="form.letterAgreement" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="版本号:">
                <el-input v-model.trim="form.version" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="厂家编码:">
                <el-input v-model.trim="form.proComCode" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="生产商:">
                <el-input v-model.trim="form.proComName" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="产品类型:">
                <el-input v-model.trim="form.proType" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="所属企业标识号:">
                <el-input v-model.trim="form.opeCompany" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="所属服务器标识号:">
                <el-input v-model.trim="form.opeService" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="巡检频次:">
                <el-input v-model.trim="form.insFrequency" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="过保时间:">
                <el-input v-model.trim="form.overTime" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="消防设施:">
                <el-input v-model.trim="form.fireFacility" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="片区id:">
                <el-input v-model.trim="form.companyId" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="片区编码:">
                <el-input v-model.trim="form.companyCode" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="新增设备用户名Id:">
                <el-input v-model.trim="form.addHostUserId" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="新增设备用户编码:">
                <el-input v-model.trim="form.addHostUserCode" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="新增设备用户名:">
                <el-input v-model.trim="form.addHostUserName" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="是否在线:">
                <el-input v-model.trim="form.hostOnline" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="设备配置编码:">
                <el-input v-model.trim="form.equipmentConfigerCode" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer text-right pb20">
			<el-button size="small" @click="cancel">取 消</el-button>
			<el-button type="primary" @click="addNew" size="small">确 定</el-button>
		</div>
    </div>
</template>

<script>
import { dateFormatFilter } from '@/filters/index';
export default {
    components:{
    },
    mixins: [],
    props: ['equipmentInfo'],
    data(){
        return {
            form: {
                hostId: this.equipmentInfo.hostId,
                hostQRCode: '',
                hostName: '',
                hostType: '',
                hostTypeMini: '',
                insUserId: '',
                insLocation: '',
                insDate: '',
                ccid: '',
                useStatus: '',
                transferMethod: '',
                isSimulate: '',
                letterAgreement: '',
                version: '',
                proComCode: '',
                proComName: '',
                proType: '',
                opeCompany: '',
                opeService: '',
                insFrequency: '',
                overTime: '',
                fireFacility: '',
                createTime: '',
                companyId: '',
                companyCode: '',
                addHostUserId: '',
                addHostUserCode: '',
                addHostUserName: '',
                hostOnline: '',
                equipmentConfigerCode: ''
            },
            hostList: [],
            miniTypeList: []
        }
    },
    watch:{
    },
    computed:{
    },
    created(){
        if(this.equipmentInfo.hostId){
            this.queryEquipmentInfo();
        }
    },
    mounted(){
        this.queryHostType();
        this.queryMiniType();
    },
    methods:{
        async queryHostType(){
            const response = await this.$http.get(this.$equApi.findMiniTypeByNoteAndParentCode, {
                note: '主机'
            });
            this.hostList = response.data;
        },
        async queryMiniType(){
            const response = await this.$http.get(this.$equApi.findMiniTypeByNoteAndParentCode, {
                note: '',
                parent_code: '5',
                type: '设备类型'
            });
            this.miniTypeList = response.data;
        },
        cancel() {
            this.$emit("update:show", false);
        },
        addNew() {
            let _self = this;
            this.$refs.form.validate(value => {
                if (value) {
                    _self._addAndModifyEquipment();
                } else {
                    _self.$message({
                        showClose: true,
                        message: errorMsg,
                        type: "error"
                    });
                }
            });
        },
        async queryEquipmentInfo(){
            const response = await this.$http.get(this.$equApi.findByHostId,{
                hostId: this.equipmentInfo.hostId
            }); 
            response.data.createTime = dateFormatFilter(response.data.createTime,'yyyy-MM-dd hh:mm:ss')
            response.data.insDate = dateFormatFilter(response.data.insDate,'yyyy-MM-dd hh:mm:ss')
            response.data.overTime = dateFormatFilter(response.data.overTime,'yyyy-MM-dd hh:mm:ss')
            this.form = response.data;
        },
        async _addAndModifyEquipment(){
            let response = null;
            if(!this.equipmentInfo.hostId){
                response = await this.$http.post(this.$equApi.hostSave,this.form); 
            }else{
                response = await this.$http.post(this.$equApi.hostUpdate,this.form); 
            }
            if(response.result == 'SUCCESS'){
                this.$emit("update:show", false);
                this.$emit("refreshData");
                this.$message({
                    showClose: true,
                    message: "添加成功",
                    type: "success"
                });
            }
        },
    }
}
</script>
<style lang="scss" scoped>
</style>