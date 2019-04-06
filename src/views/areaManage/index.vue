<template>
	<div>
		<div class="area-list fl">
			<el-tree :data="companyList" check-strictly show-checkbox default-expand-all node-key="value" ref="companyTree" highlight-current :props="defaultProps" @check="selectArea" @check-change="handleClick" :default-checked-keys="checkItem">
			</el-tree>
		</div>
		<div class="area-info fl ml20">
			<div class="clear-fix mb10">
				<el-button class="button-query fl" type="primary" @click="addNew" size="small" v-if="this.$permissionShow('company_create')">新增片区</el-button>
				<el-button class="button-query fl" type="primary" @click="modify" size="small" v-if="this.$permissionShow('copmany_edit')">编辑片区</el-button>
				<el-button class="button-query fl ml10" type="warning" @click="deleteCompany" size="small" v-if="this.$permissionShow('company_delete')">删除片区</el-button>
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
					<!-- <el-form-item label="所属区域:">
						<span>{{companyInfo.regionCode}}</span>
					</el-form-item> -->
					<el-form-item label="地址:">
						<span>{{companyInfo.address}}</span>
					</el-form-item>
					<el-form-item label="经度:">
						<span>{{companyInfo.lon}}</span>
					</el-form-item>
					<el-form-item label="纬度:">
						<span>{{companyInfo.lat}}</span>
					</el-form-item>
					<el-form-item label="负责人:">
						<span>{{companyInfo.director}}</span>
					</el-form-item>
					<el-form-item label="负责人电话:">
						<span>{{companyInfo.directorTel}}</span>
					</el-form-item>
					<!-- <el-form-item label="创建时间:">
						<span>{{companyInfo.dateCreated | dateFormatFilter}}</span>
					</el-form-item>
					<el-form-item label="修改者:">
						<span>{{companyInfo.name}}</span>
					</el-form-item>
					<el-form-item label="修改时间:">
						<span>{{companyInfo.lastUpdated | dateFormatFilter }}</span>
					</el-form-item> -->
				</el-form>
			</div>
		</div>

        <el-dialog v-if="dialogAdd" :title="dialogTitle" :visible.sync="dialogAdd" width="60%">
			<dialogAdd :show.sync="dialogAdd" :optType="optType" :companyInfo="companyInfo" @refreshData="refreshData">
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
                optType: 'add',
				defaultProps: {
					children: 'children',
					label: 'label'
                },
                selectAreaId: '',
                checkItem: [],
                selectCount: 0
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

			addNew() {
                this.dialogTitle = '新增片区';
                this.optType = 'add';
                this.dialogAdd = true;
            },
            modify(){
                this.dialogTitle = '编辑片区';
                this.optType = 'modify';
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
                this.selectAreaId = data.value;
                this.checkItem = [];
                this.checkItem.push(data.value)
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
            },
            handleClick(data,checked, node) {
                this.selectCount++;
                if(this.selectCount%2==0){
                    if(checked){
                        this.$refs.companyTree.setCheckedNodes([]);
                        this.$refs.companyTree.setCheckedNodes([data]);
                        //交叉点击节点
                    }else{
                        this.$refs.companyTree.setCheckedNodes([]);
                        //点击已经选中的节点，置空
                    }
                }
            }

		}
	}

</script>
<style lang="scss" scoped>
	.area-list {
		width: 200px;
	}

</style>
