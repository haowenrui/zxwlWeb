<template>
    <div>
        <div>
            <ul>
                <li>
                    {{alrmInfo.deviceName}}报警   <span class="color-red">待处理</span>
                </li>
                <li>
                    {{alrmInfo.companyName}}
                </li>
                <li>
                    {{alrmInfo.companyAddress}}
                </li>
                <li>
                    <el-input v-model="sendForm.name" placeholder="请输入联系人"></el-input>
                </li>
                <li>
                    <el-input v-model="sendForm.mobile" placeholder="请输入手机号"></el-input>
                </li>
            </ul>
        </div>
        <div class="dialog-footer text-right pb20">
			<el-button size="small" @click="cancel">取 消</el-button>
			<el-button type="primary" @click="send" size="small">发 送</el-button>
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
            sendForm: {
                alarmId: this.alrmInfo.alarmId,
                name: '',
                mobile: ''
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
    },
    methods:{
        async send(){
            const res = await this.$http.post(this.$equApi.sendAlarmMessage,this.sendForm);
            if(res.result == 'SUCCESS'){
                this.$message({
                    type: 'success',
                    message: '发送成功'
                });
                this.$emit('closePopup');
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