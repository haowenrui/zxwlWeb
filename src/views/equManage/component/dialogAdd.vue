<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px" size="mini">
            <el-form-item label="设备编码:">
                <el-input v-model.trim="form.deviceCode" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="设备名称:">
                <el-input v-model.trim="form.deviceName" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="主机编号:">
                <el-input v-model.trim="form.id" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="主机名称:">
                <el-input v-model.trim="form.hostName" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="安装片区:">
                <el-input v-model.trim="form.insFrequency" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="安装地址:">
                <el-input v-model.trim="form.insLocation" clearable class="input-search" size="small" placeholder="请输入"></el-input>
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
                deviceCode: '',
                deviceName: '',
                id: '',
                hostName: '',
                insFrequency: '',
                insLocation: ''
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
            const response = await this.$http.get(this.$equApi.queryEquipmentInfo,this.equipmentInfo.deviceId); 
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
                this.$emit("refresh-data");
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