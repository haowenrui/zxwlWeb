<template>
	<div>
		<div>
			<span>角色名称:</span>
			<el-input v-model.trim="queryParams.name" clearable class="input-search" size="small" placeholder="商户ID/商户名称"></el-input>
		</div>
		<div class="mt20">
			<h2>选择角色最小操作单元：</h2>
			<div>
				<el-tree :data="permissionList" ref="roleTree" show-checkbox node-key="value" :default-expand-all="true" :default-checked-keys="queryParams.permissoinItemIds"
				 :props="defaultProps">
				</el-tree>
			</div>
            <div class="text-right pt20 pb20">
                <el-button type="primary" size="small" @click="submitRole">确 定
                </el-button>
            </div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		mixins: [],
		props: ['roleInfo'],
		data() {
			return {
				queryParams: {
                    id: this.roleInfo.roleId,
                    name: this.roleInfo.name,
                    permissoinItemIds: [],
                    type: 'WEB'
				},
                permissionList: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                currrentPermission: []
			}
		},
		watch: {},
		computed: {},
		created() {},
		mounted() {
            this.queryPermission();
            if(this.roleInfo.roleId){
                this.queryCurrentPermission();
            }
		},
		methods: {
			async queryPermission() {
				const res = await this.$http.get(this.$urlApi.getPermission);
				this.permissionList = res.data;
            },
            async queryCurrentPermission() {
				const res = await this.$http.get(this.$urlApi.getPermission,{
                    roleId: this.roleInfo.roleId
                });
                this.currrentPermission = res.data;
                this.queryParams.permissoinItemIds = [];
                let _self = this;
                this.currrentPermission.forEach(item => {
                    item.children.forEach(child => {
                        if(child.checked){
                            _self.queryParams.permissoinItemIds.push(child.value)
                        }
                    })
                })
            },
            async submitRole(){
                this.queryParams.permissoinItemIds = [];
                this.$refs.roleTree.getCheckedNodes().forEach(item => {
                    this.queryParams.permissoinItemIds.push(item.value);
                });
                const res = await this.$http.post(this.$urlApi.addRole, this.queryParams);

                if(res.result == 'SUCCESS'){
                    this.$emit('refreshData');
                }
            },
            selectPermission(data){
                if(!data.children || data.children.length <= 0){
                    let itemIndex = this.queryParams.permissoinItemIds.indexOf(data.value);
                    if(itemIndex != -1){
                        this.queryParams.permissoinItemIds.splice(itemIndex,1);
                    }else{
                        this.queryParams.permissoinItemIds.push(data.value);
                    }
                }else if(data.children.length >0){
                    data.children.forEach(item => {
                        let itemIndex = this.queryParams.permissoinItemIds.indexOf(item.value);
                        if(itemIndex != -1){
                            this.queryParams.permissoinItemIds.splice(itemIndex,1);
                        }else{
                            this.queryParams.permissoinItemIds.push(item.value);
                        }
                    });
                }
                console.log(this.queryParams.permissoinItemIds)
            },
		}
	}

</script>
<style lang="scss" scoped>
</style>
