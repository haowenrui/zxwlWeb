<template>
    <div>
        <el-form ref="form" :model="form" :inline="true" label-width="100px" size="mini">
            <el-form-item label="设备名称:">
                <el-input v-model.trim="form.deviceName" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="设备编码:">
                <el-input v-model.trim="form.deviceQRCode" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="通信编号:">
                <el-input v-model.trim="form.letterCode" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="生产商:">
                <el-input v-model.trim="form.proComName" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="厂家编码:">
                <el-input v-model.trim="form.proComCode" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="产品类型:">
                <el-input v-model.trim="form.proType" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="最小值:">
                <el-input v-model.trim="form.minValue" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="最大值:">
                <el-input v-model.trim="form.maxValue" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="通信协议:">
                <el-input v-model.trim="form.letterAgreement" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="传输方式:">
                <el-input v-model.trim="form.traMethod" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="是否模拟:">
                <el-input v-model.trim="form.isSimulate" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="版本号:">
                <el-input v-model.trim="form.version" clearable class="input-search" size="small" placeholder="请输入"></el-input>
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
        </el-form>
        <div class="dialog-footer text-right pb20">
			<el-button size="small" @click="cancel">取 消</el-button>
			<el-button type="primary" @click="addNew" size="small">确 定</el-button>
		</div>
    </div>
</template>

<script>
export default {
    components:{
    },
    mixins: [],
    props: ['equipmentInfo'],
    data(){
        return {
            form: {
                deviceId: this.equipmentInfo.equipmentInfo,
                deviceQRCode: '',
                deviceName: '',
                letterCode: '',
                proComName: '',
                proComCode: '',
                proType: '',
                minValue: '',
                maxValue: '',
                letterAgreement: '',
                traMethod: '',
                isSimulate: '',
                version: '',
                insFrequency: '',
                overTime: '',
                fireFacility: ''
            }
        }
    },
    watch:{
    },
    computed:{
    },
    created(){
        if(this.equipmentInfo.deviceId){
            this.queryEquipmentInfo();
        }
    },
    mounted(){
    },
    methods:{
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
            const response = await this.$http.get(this.$equApi.queryEquipmentInfo,{
                equipmentId: this.equipmentInfo.deviceId
            }); 
            this.form = response.data;
        },
        async _addAndModifyEquipment(){
            let response = null;
            if(!this.equipmentInfo.deviceId){
                response = await this.$http.post(this.$equApi.addEquipment,this.form); 
            }else{
                response = await this.$http.post(this.$equApi.modifyEquipment,this.form); 
            }
            if(response.result == 'SUCCESS'){
                this.$emit("update:show", false);
                this.$emit("refreshData");
                this.$message({
                    showClose: true,
                    message: "操作成功",
                    type: "success"
                });
            }
        },
    }
}
</script>
<style lang="scss" scoped>
</style>