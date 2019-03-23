<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px" size="mini">
            <el-form-item label="片区名称:">
                <el-input v-model.trim="form.name" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="所属区域:">
                <el-input v-model.trim="form.regionCode" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="地址:">
                <el-input v-model.trim="form.address" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="经度:">
                <el-input v-model.trim="form.lon" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="纬度:">
                <el-input v-model.trim="form.lat" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="负责人:">
                <el-input v-model.trim="form.director" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="负责人电话:">
                <el-input v-model.trim="form.directorTel" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer text-right pb20">
			<el-button size="small" @click="cancel">取 消</el-button>
			<el-button type="primary" @click="submit" size="small">确 定</el-button>
		</div>
    </div>
</template>

<script>
export default {
    components:{
    },
    mixins: [],
    props: ['companyInfo','optType'],
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
        if(this.optType == 'modify'){
            this.form = this.companyInfo;
        }else{
            this.form.parentId = this.companyInfo.id;
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
        },
        submit(){
            if(this.optType == 'add'){
                this.addNew();
            }else{
                this.modify();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
</style>