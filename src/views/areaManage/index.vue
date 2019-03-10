<template>
	<div>
		<div class="area-list fl">
			<el-tree :data="companyList" check-strictly show-checkbox default-expand-all node-key="value" ref="companyTree" highlight-current :props="defaultProps" @check="selectArea">
			</el-tree>
		</div>
		<div class="area-info fl ml20">
			<div class="clear-fix mb10">
				<el-button class="button-query fl" type="primary" @click="addNew" size="small">新增片区</el-button>
				<el-button class="button-query fl" type="primary" @click="modify" size="small">编辑片区</el-button>
				<el-button class="button-query fl ml10" type="warning" @click="deleteCompany" size="small">删除片区</el-button>
				<!-- <el-upload class="button-query fl ml10" :action='templateURL' :on-success="uploadSuccess" :on-error="uploadFailure" :before-upload="beforeUpload" :disabled="importingShowLoading" :show-file-list="false">
                    <el-button size="small" class="button-query" :loading="importingShowLoading" type="primary">批量导入</el-button>
                </el-upload>
                <el-button class="button-query fl ml10" type="primary" size="small" @click="downloadSchoolImportModel">下载模板</el-button> -->
			</div>
			<div>
				<el-form label-width="100px" size="mini" label-position="left">
					<el-form-item label="片区名称:">
						<span>{{companyInfo.name}}</span>
					</el-form-item>
					<el-form-item label="创建者:">
						<span>{{companyInfo.name}}</span>
					</el-form-item>
					<el-form-item label="创建时间:">
						<span>{{companyInfo.dateCreated | dateFormatFilter}}</span>
					</el-form-item>
					<el-form-item label="修改者:">
						<span>{{companyInfo.name}}</span>
					</el-form-item>
					<el-form-item label="修改时间:">
						<span>{{companyInfo.lastUpdated | dateFormatFilter }}</span>
					</el-form-item>
				</el-form>
			</div>
		</div>

        <el-dialog v-if="dialogAdd" :title="dialogTitle" :visible.sync="dialogAdd" width="60%">
			<dialogAdd :show.sync="dialogAdd" :companyInfo="companyInfo" @refreshData="refreshData">
			</dialogAdd>
		</el-dialog>
	</div>
</template>

<script>
    import dialogAdd from './component/dialogAdd';
	export default {
		components: {
            dialogAdd
        },
		mixins: [],
		props: [],
		data() {
			return {
                dialogAdd: false,
                dialogTitle: '',
				companyInfo: {},
				companyList: [],
				defaultProps: {
					children: 'children',
					label: 'label'
                },
                selectAreaId: '',
			}
		},
		watch: {},
		computed: {},
		created() {},
		mounted() {
			this.getCompany();
		},
		methods: {
			handleNodeClick(data) {
				console.log(data);
			},

			async getCompany() {
				const response = await this.$http.get(this.$urlApi.getCompany);
				this.companyList = response.data;
			},

			async addNew() {
                this.dialogTitle = '新增片区';
                this.dialogAdd = true;
            },
            modify(){
                this.dialogTitle = '编辑片区';
                this.dialogAdd = true;
            },
			async deleteCompany() {
				const response = await this.$http.post(this.$urlApi.deleteCompony,this.selectAreaId);
                if(response.result == 'SUCCESS'){
                    this.$message.success('删除成功');
                    this.getCompany();
                }
            },
            selectArea(data){
                this.selectAreaId = '';
                this.parentTree = [];
                this.selectAreaId = data.value;
                this.getCompanyInfo(this.selectAreaId)
            },
            async getCompanyInfo(companyId){
				const response = await this.$http.get(this.$urlApi.getCompanyInfo,{
                    compId: companyId
                });
                this.companyInfo = response.data;
            },
            refreshData(){
                this.dialogAdd = false;
                this.getCompany();
            }

		}
	}

</script>
<style lang="scss" scoped>
	.area-list {
		width: 200px;
	}

</style>
