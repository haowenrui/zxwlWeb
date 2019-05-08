<template>
    <div>
        <el-form ref="form" :model="form" :inline="false" label-width="100px" size="mini">
            <el-form-item label="设备类型:">
                <el-select v-model="form.configerId" placeholder="请选择" class="input-search fl mr10" clearable size="small">
					<el-option v-for="item in configerList" :key="item.validue" :label="item.des" :value="item.id">
					</el-option>
				</el-select>
            </el-form-item>
            <el-form-item label="指标名称:">
                <el-input v-model.trim="form.name" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="指标类型:">
                <el-select v-model="form.type" placeholder="请选择" class="input-search fl mr10" size="small">
					<el-option v-for="item in equTypeList" :key="item.value" :label="item.name" :value="item.value">
					</el-option>
				</el-select>
            </el-form-item>
            <el-form-item label="指标编码:">
                <el-input v-model.trim="form.code" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="指标单位:">
                <el-input v-model.trim="form.unit" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="最大值:">
                <el-input v-model.trim="form.maxValue" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="最小值:">
                <el-input v-model.trim="form.minValue" clearable class="input-search" size="small" placeholder="请输入"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer text-right pb20">
			<el-button size="small" @click="cancel">取 消</el-button>
			<el-button type="primary" @click="_addAndModifyEquipment" size="small">确 定</el-button>
		</div>
    </div>
</template>

<script>
export default {
    components:{
    },
    mixins: [],
    props: ['equipmentInfo'],
    data(){
        return {
            configerList: [],
            equTypeList: [],
            form: {
                id: this.equipmentInfo.id,
                type: '',
                name: '',
                configerId: '',
                code: '',
                unit: '',
                maxValue: 0,
                minValue: 0,

            }
        }
    },
    watch:{
    },
    computed:{
    },
    created(){
        if(this.equipmentInfo.id){
            this.queryIndexInfo();
        }
    },
    mounted(){
        this.getEquipmentConfiger();
        this.getEquTypeList();
    },
    methods:{
        async getEquipmentConfiger(){
            const response = await this.$http.get(this.$equApi.getEquipmentConfiger);
            this.configerList = response.data;
        },
        async getEquTypeList(){
            const response = await this.$http.get(this.$equApi.indexType);
            this.equTypeList = response.data;
        },
        cancel() {
            this.$emit("update:show", false);
        },
        addNew() {
            let _self = this;
            this.$refs.form.validate(value => {
                if (value) {
                    _self._addAndModifyEquipment();
                } else {
                    _self.$message({
                        showClose: true,
                        message: errorMsg,
                        type: "error"
                    });
                }
            });
        },
        async queryIndexInfo(){
            const response = await this.$http.get(this.$equApi.indexDetail,{
                id: this.equipmentInfo.deviceId
            }); 
            this.form = response.data;
        },
        async _addAndModifyEquipment(){
            let response = null;
            if(!this.equipmentInfo.deviceId){
                response = await this.$http.post(this.$equApi.indexAdd,this.form); 
            }else{
                response = await this.$http.post(this.$equApi.indexEdit,this.form); 
            }
            if(response.result == 'SUCCESS'){
                this.$emit("update:show", false);
                this.$emit("refreshData");
                this.$message({
                    showClose: true,
                    message: "添加成功",
                    type: "success"
                });
            }
        },
    }
}
</script>
<style lang="scss" scoped>
</style>