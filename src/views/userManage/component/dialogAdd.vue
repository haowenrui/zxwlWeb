<template>
	<div>
		<el-form ref="form" :model="form" label-width="100px" size="mini">
			<el-form-item label="账号:">
				<el-input v-model.trim="form.username" :disabled="optType == 'edit'" clearable class="input-search" size="small" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="密码:">
				<el-input v-model.trim="form.password" clearable class="input-search" size="small" placeholder="请输入"></el-input>
			</el-form-item>
            <el-form-item label="用户名:">
				<el-input v-model.trim="form.name" clearable class="input-search" size="small" placeholder="请输入"></el-input>
			</el-form-item>
            <el-form-item label="部门:">
				<el-input v-model.trim="form.departMent" clearable class="input-search" size="small" placeholder="请输入"></el-input>
			</el-form-item>
            <el-form-item label="职位:">
				<el-input v-model.trim="form.post" clearable class="input-search" size="small" placeholder="请输入"></el-input>
			</el-form-item>
			<!-- <el-form-item label="绑定片区:">
				<el-select v-model="form.companyId" placeholder="请选择" @change="selectCompany" size="small">
					<el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item> -->
			<el-form-item label="绑定角色:">
                <el-select v-model="form.roleId" placeholder="请选择"  size="small">
					<el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div class="dialog-footer text-right pb20">
			<el-button size="small" @click="cancel">取 消</el-button>
			<el-button type="primary" @click="addNew" size="small">确 定</el-button>
		</div>
	</div>
</template>

<script>
    import { jsGetCookie } from '@/tools/utils';

	export default {
		components: {},
		mixins: [],
		props: ['userInfo'],
		data() {
			return {
				form: {
					username: '',
                    password: '',
                    name: '',
                    companyId: '',
                    departMent: '',
                    post: '',
                    roleId: '',
                    userId: '',
                    companyUserId: '',
					isMain: true,
                    isUsed: true,
                },
                companyList: [],
                roleList: [],
                optType: 'add',
			}
		},
		watch: {},
		computed: {},
		created() {},
		mounted() {
            // this.queryCompanyList();
            if(this.userInfo.userId){
                this.form = this.userInfo;
                this.optType = 'edit';
            }
            this.queryRoleList();
        },
		methods: {
            async queryCompanyList() {
				const res = await this.$http.get(this.$urlApi.getCompany);
				if (res.result == 'SUCCESS') {
                    this.companyList = res.data;
				}
            },
            // selectCompany(){
            //     this.queryRoleList();
            // },
            async queryRoleList() {
				const res = await this.$http.get(this.$urlApi.queryListByCompCode,{
                    companyId: jsGetCookie('_CURRENT_COMPANY_ID_')
                });
				if (res.result == 'SUCCESS') {
                    this.roleList = res.data;
				}
            },
			cancel() {
				this.$emit("update:show", false);
			},
			addNew() {
				let _self = this;
				this.$refs.form.validate(value => {
					if (value) {
						_self._addAndModifyUser();
					} else {
						_self.$message({
							showClose: true,
							message: errorMsg,
							type: "error"
						});
					}
				});
			},
			async _addAndModifyUser() {
                
                let response = null;
                if(!this.userInfo.userId){
                    response = await this.$http.post(this.$urlApi.addUser,this.form); 
                }else{
                    response = await this.$http.post(this.$urlApi.editUser,this.form); 
                }
				if (!response.status) {
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
