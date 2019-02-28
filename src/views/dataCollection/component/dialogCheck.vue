<template>
    <div>
        <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
            <el-form-item label="所属公司:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="序号:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="数据来源:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="接收时间:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="安装地址:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="值班室:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="值班室电话:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="片区经理:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="片区经理电话:">
                <span>11111</span>
            </el-form-item>
        </el-form>
        <div class="dialog-footer text-right">
			<el-button size="small" @click="cancel">取 消</el-button>
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
    }
}
</script>
<style lang="scss" scoped>
</style>