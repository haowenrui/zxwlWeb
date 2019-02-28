<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px" size="mini">
            <el-form-item label="片区名称:">
                <el-input v-model.trim="form.name" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer text-right pb20">
			<el-button size="small" @click="cancel">取 消</el-button>
			<el-button v-if="!companyInfo.id" type="primary" @click="addNew" size="small">确 定</el-button>
			<el-button v-if="companyInfo.id" type="primary" @click="modify" size="small">确 定</el-button>
		</div>
    </div>
</template>

<script>
export default {
    components:{
    },
    mixins: [],
    props: ['companyInfo'],
    data(){
        return {
            form: {
                address: '',
                directorTel: '',
                fireTel: '',
                fireUnit: '',
                lat: '',
                lon: '',
                name: '',
                parentId: ''
            }
        }
    },
    watch:{
    },
    computed:{
    },
    created(){
    },
    mounted(){
        if(this.companyInfo.id){
            this.form = this.companyInfo;
        }else{
            this.form.parentId = this.companyInfo.parentId;
        }
    },
    methods:{
        async addNew(){
            const res = await this.$http.post(this.$urlApi.addCompony,this.form);
            if(res.result == 'SUCCESS'){
                this.$message({
                    type: 'success',
                    message: '操作成功'
                });
                this.$emit('refreshData');
            }
        },
        async modify(){
            const res = await this.$http.put(this.$urlApi.editCompony,this.form);
            if(res.result == 'SUCCESS'){
                this.$message({
                    type: 'success',
                    message: '操作成功'
                });
                this.$emit('refreshData');
            }
        },
        cancel(){
            this.$emit('update:show',false)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>