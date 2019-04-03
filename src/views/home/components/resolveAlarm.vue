<template>
    <div>
        <el-form ref="form" :inline="false" label-width="100px" size="mini">
            <el-form-item label="设备编码:">
                <span>{{alrmInfo.deviceCode}}</span>
            </el-form-item>
            <el-form-item label="设备名称:">
                <span>{{alrmInfo.deviceName}}</span>
            </el-form-item>
            <el-form-item label="安装片区:">
                <span>{{alrmInfo.companyName}}</span>
            </el-form-item>
            <el-form-item label="安装地址:">
                <span>{{alrmInfo.companyAddress}}</span>
            </el-form-item>
        </el-form>
        <div class="dialog-footer text-right pb20">
			<el-button size="small" @click="cancel">取 消</el-button>
			<el-button type="primary" @click="submit" size="small">确认处理</el-button>
		</div>
    </div>
</template>

<script>
export default {
    components:{
    },
    mixins: [],
    props: ['alrmInfo'],
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
        async submit(){
            const res = await this.$http.post(this.$equApi.updateAlarmStatus,{
                alarmId: this.alrmInfo.alarmId,
                alarmStatus: 'processed'
            });
            if(res.result == 'SUCCESS'){
                this.$message({
                    type: 'success',
                    message: '处理成功'
                });
                this.$emit('resolveAlarm');
            }
        },
        cancel(){
            this.$emit('closePopup');
        }
    }
}
</script>
<style lang="scss" scoped>
</style>