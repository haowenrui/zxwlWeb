<template>
    <div>
        <el-form label-width="100px" size="mini">
            <el-form-item label="角色名称:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="类型:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="创建者:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="创建时间:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="修改者:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="修改时间:">
                <span>11111</span>
            </el-form-item>
            <el-form-item label="角色权限:">
                <div>
                    <p>角色最小操作单元</p>
                    <div>1111</div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    components:{
    },
    mixins: [],
    props: ['roleId'],
    data(){
        return {
            roleInfo: {}
        }
    },
    watch:{
    },
    computed:{
    },
    created(){
    },
    mounted(){
        this.getCurrentPermission();
    },
    methods:{
        async getCurrentPermission(){
            const response = await this.$http.get(this.$urlApi.getPermission,{
                roleId: this.roleId,
                type: 'WEB'
            }); 

            this.roleInfo = response.data;

        }
    }
}
</script>
<style lang="scss" scoped>
</style>