<template>
    <div>
        <el-form label-width="100px" size="mini">
            <el-form-item label="角色名称:">
                <span>{{roleInfo.name}}</span>
            </el-form-item>
            <el-form-item label="类型:">
                <span>{{roleInfo.type}}</span>
            </el-form-item>
            <!-- <el-form-item label="创建者:">
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
            </el-form-item> -->
            <el-form-item label="角色权限:">
                <div>
                    <p>角色最小操作单元</p>
                    <div>
                        <el-tree :data="roleInfo.permissionItem" node-key="value" :default-expand-all="false" :props="defaultProps"></el-tree>
                    </div>
                </div>
            </el-form-item>
        </el-form>

        <div class="dialog-footer text-right pb20">
			<el-button size="small" @click="cancel">关 闭</el-button>
		</div>
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
            roleInfo: {},
            defaultProps: {
                children: 'children',
                label: 'label'
            },
        }
    },
    watch:{
    },
    computed:{
    },
    created(){
    },
    mounted(){
        this.queryRoleDetail();
        this.getCurrentPermission();
    },
    methods:{
        async getCurrentPermission(){
            const response = await this.$http.get(this.$urlApi.getPermission,{
                roleId: this.roleId,
                type: 'WEB'
            }); 

            this.roleInfo = response.data;

        },
        async queryRoleDetail(){
            const response = await this.$http.get(this.$urlApi.queryRoleDetail,{
                roleId: this.roleId,
            }); 

            this.roleInfo = response.data;

        },
        cancel(){
            this.$emit('update:show',false);
        }
    }
}
</script>
<style lang="scss" scoped>
</style>