<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div>
                    <h4 class="data-card-title">报警类型</h4>
                    <div id="alarmType">
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div>
                    <h4 class="data-card-title">片区安装用户</h4>
                    <div id="areaUser">
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div>
                    <h4 class="data-card-title">设备型号数量</h4>
                    <div id="equCount">
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div>
                    <h4 class="data-card-title">离线数量</h4>
                    <div id="offlineCount">
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div>
                    <h4 class="data-card-title">行业统计</h4>
                    <div id="industryCount">
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div>
                    <h4 class="data-card-title">片区增加设备数量</h4>
                    <div id="areaAddCount">
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import ECharts from 'echarts';
export default {
    components:{
    },
    mixins: [],
    props: [],
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
        this.areaUserCharts();
        this.equCountCharts();
        this.offlineCountCharts();
        this.industryCountCharts();
        this.areaAddCountCharts();
    },
    methods:{
        alarmTypeChart(data){
            let ele = document.getElementById("alarmType");
            let legendData = ['支付宝信用卡','支付宝储蓄卡','支付宝花呗','支付宝花呗分期','支付宝余额'];
            let seriesName = '支付宝支付渠道';
            let seriesData = data;
            this._renderPieCharts(ele,legendData,seriesName,seriesData)
        },
        _renderPieCharts(ele,legendData,seriesName,seriesData){
            let _self = this;
            let charts = ECharts.init(ele);
            let option = {
                color: ['#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                title : {
                    x:'center'
                },
                grid: {
                    top: 0,
                    left: 0
                },
                tooltip : {
                    position: ['15%', '20%'],
                    trigger: 'item',
                    formatter: (data) => {
                        let count = '';
                        _self.payCount.forEach(item => {
                            if(item.name == data.data.name){
                                count = item.value;
                            }
                        })
                        let money = moneyAdvanceFilter(data.data.value)
                        return `${data.data.name} :  占${data.percent}%, ${count}笔共¥${money}`;
                    }
                },
                grid: {
                    left: 0
                },
                legend: {
                    itemWidth: 10,
                    itemHeight: 10,
                    orient: 'vertical',
                    left: 'left',
                    data: legendData
                },
                series : [
                    {
                        name: seriesName,
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data: seriesData,
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            charts.setOption(option);

        },
        areaUserCharts(){
            let ele = document.getElementById("areaUser");
            let xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            let seriesData = [120, 200, 150, 80, 70, 110, 130];
            this._renderBarCharts(ele,xData,seriesData);
        },
        equCountCharts(){
            let ele = document.getElementById("equCount");
            let xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            let seriesData = [120, 200, 150, 80, 70, 110, 130];
            this._renderBarCharts(ele,xData,seriesData);
        },
        offlineCountCharts(){
            let ele = document.getElementById("offlineCount");
            let xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            let seriesData = [120, 200, 150, 80, 70, 110, 130];
            this._renderBarCharts(ele,xData,seriesData);
        },
        industryCountCharts(){
            let ele = document.getElementById("industryCount");
            let xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            let seriesData = [120, 200, 150, 80, 70, 110, 130];
            this._renderBarCharts(ele,xData,seriesData);
        },
        areaAddCountCharts(){
            let ele = document.getElementById("areaAddCount");
            let xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            let seriesData = [120, 200, 150, 80, 70, 110, 130];
            this._renderBarCharts(ele,xData,seriesData);
        },
        _renderBarCharts(ele,xData,seriesData){
            let _self = this;
            let charts = ECharts.init(ele);
            let option = {
                grid: {
                    top: 0,
                    left: 0
                },
                xAxis: {
                    type: 'category',
                    data: xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: seriesData,
                    type: 'bar'
                }]
            };
            charts.setOption(option);
        }
    }
}
</script>
<style lang="scss" scoped>


    .data-card-title{
        border-bottom: 1px solid #eee;
        padding-bottom: 6px;
        font-size: 14px;
        font-weight: normal;
    }



#alarmType,
#areaUser,
#equCount,
#offlineCount,
#industryCount,
#areaAddCount{
    width: 100%;
    height: 300px;
}
</style>