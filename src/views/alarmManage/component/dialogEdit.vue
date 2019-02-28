<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px" size="mini">
            <el-form-item label="状态:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="设备编码:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="设备名称:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="设备编码:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="主机编号:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="主机名称:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="安装片区:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="安装地址:">
                <span>11111</span>
            </el-form-item>
        </el-form>
        <div class="dialog-footer text-right">
			<el-button size="small" @click="cancel">取 消</el-button>
			<el-button type="primary" @click="addNew" size="small">确 定</el-button>
            <el-button type="primary" @click="sendMessage" size="small">转发消息</el-button>
		</div>
    </div>
</template>

<script>
export default {
    components:{
    },
    mixins: [],
    props: [],
    data(){
        return {
        }
    },
    watch:{
    },
    computed:{
    },
    created(){
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
                    _self._addAndModifyBnak();
                } else {
                    _self.$message({
                        showClose: true,
                        message: errorMsg,
                        type: "error"
                    });
                }
            });
        },
        async _addAndModifyBnak(){
            const response = await this.$http.post(this.$urlApi.addBank,this.bankForm); 
            if(!response.status){
                this.$emit("update:show", false);
                this.$emit("refresh-data");
                this.$message({
                    showClose: true,
                    message: "操作成功",
                    type: "success"
                });
            }
        },
        sendMessage(){
            
        }
    }
}
</script>
<style lang="scss" scoped>
</style>