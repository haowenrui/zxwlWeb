webpackJsonp([2],{CSLi:function(t,e){},J9Se:function(t,e){},KR8f:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("lC5x"),i=a.n(s),n=a("J0Oq"),r=a.n(n),o=a("5YEj"),l=a.n(o),c=a("GPKu"),m=(a("kGj0"),{components:{},mixins:[],props:["alrmInfo"],data:function(){return{}},watch:{},computed:{},created:function(){},mounted:function(){},methods:{submit:function(){var t=this;return r()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.post(t.$equApi.updateAlarmStatus,{alarmId:t.alrmInfo.alarmId,alarmStatus:"processed"});case 2:"SUCCESS"==e.sent.result&&(t.$message({type:"success",message:"处理成功"}),t.$emit("resolveAlarm"));case 4:case"end":return e.stop()}},e,t)}))()},cancel:function(){this.$emit("closePopup")}}}),u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",{ref:"form",attrs:{inline:!1,"label-width":"100px",size:"mini"}},[a("el-form-item",{attrs:{label:"设备编码:"}},[a("span",[t._v(t._s(t.alrmInfo.deviceCode))])]),t._v(" "),a("el-form-item",{attrs:{label:"设备名称:"}},[a("span",[t._v(t._s(t.alrmInfo.deviceName))])]),t._v(" "),a("el-form-item",{attrs:{label:"安装片区:"}},[a("span",[t._v(t._s(t.alrmInfo.companyName))])]),t._v(" "),a("el-form-item",{attrs:{label:"安装地址:"}},[a("span",[t._v(t._s(t.alrmInfo.companyAddress))])])],1),t._v(" "),a("div",{staticClass:"dialog-footer text-right pb20"},[a("el-button",{attrs:{size:"small"},on:{click:t.cancel}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.submit}},[t._v("确认处理")])],1)],1)},staticRenderFns:[]};var p={components:{},mixins:[],props:["alrmInfo"],data:function(){return{sendForm:{alarmId:this.alrmInfo.alarmId,name:"",mobile:""}}},watch:{},computed:{},created:function(){},mounted:function(){},methods:{send:function(){var t=this;return r()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.post(t.$equApi.sendAlarmMessage,t.sendForm);case 2:"SUCCESS"==e.sent.result&&(t.$message({type:"success",message:"发送成功"}),t.$emit("closePopup"));case 4:case"end":return e.stop()}},e,t)}))()},cancel:function(){this.$emit("closePopup")}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"mb10"},[a("ul",[a("li",[t._v("\n                    "+t._s(t.alrmInfo.deviceName)+"报警   "),a("span",{staticClass:"color-red"},[t._v("待处理")])]),t._v(" "),a("li",[t._v("\n                    "+t._s(t.alrmInfo.companyName)+"\n                ")]),t._v(" "),a("li",[t._v("\n                    "+t._s(t.alrmInfo.companyAddress)+"\n                ")])])]),t._v(" "),a("el-form",{ref:"ruleForm",attrs:{model:t.sendForm,"label-width":"60px","label-position":"left",size:"small"}},[a("el-form-item",{attrs:{label:"联系人",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入联系人"},model:{value:t.sendForm.name,callback:function(e){t.$set(t.sendForm,"name",e)},expression:"sendForm.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手机号",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:t.sendForm.mobile,callback:function(e){t.$set(t.sendForm,"mobile",e)},expression:"sendForm.mobile"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer text-right pb20"},[a("el-button",{attrs:{size:"small"},on:{click:t.cancel}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.send}},[t._v("发 送")])],1)],1)},staticRenderFns:[]};var f={components:{resolveAlarm:a("C7Lr")(m,u,!1,function(t){a("J9Se")},"data-v-3aee64b3",null).exports,transmitAlarm:a("C7Lr")(p,d,!1,function(t){a("CSLi")},"data-v-0755bca4",null).exports},mixins:[],props:[],data:function(){return{resolveAlarmVisible:!1,transmitAlarmVisible:!1,alrmInfo:{},map:{center:[116.404,39.915],zoom:13},amapManager:null,mapStyle:"amap://styles/2daab02a809fa46d3675bb16d22b771c",pointFireIcon:null,markers:[],markersFire:[],websock:null,areaCode:"",alarmList:[],connectFlag:!0,conpanyPositionList:[],alarmPositionList:[],BMapGet:null,mapGet:null,myIcongGet:null,colorPalette:["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3","#e5cf0d","#97b552","#95706d","#dc69aa","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a","#6f5553","#c14089"]}},watch:{},computed:{},created:function(){this.initWebSocket()},destroyed:function(){this.connectFlag=!1,this.websocketclose()},mounted:function(){this.areaCode=Object(c.g)("_CURRENT_COMPANY_AREA_"),this.alarmTypeChart(),this.equErrorCharts(),this.equTypeCharts(),this.monthAlarmCharts(),this.newEquCharts(),this.alarmCenterCharts(),this.getCompanyPositionList(),this.getAlarmList();var t=this;setTimeout(function(){t.pointFireIcon=new AMap.Icon({size:new AMap.Size(40,40),image:a("gfE7"),imageSize:new AMap.Size(40,40)})},1e3)},methods:{getCompanyPositionList:function(){var t=this;return r()(i.a.mark(function e(){var a,s;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t,e.next=3,t.$http.get(t.$urlApi.getCompanyPosition);case 3:(s=e.sent).status||(t.conpanyPositionList=s.data,t.map.center=[t.conpanyPositionList[0].lon,t.conpanyPositionList[0].lat],t.conpanyPositionList.forEach(function(t){t.lon&&t.lat&&a.markers.push({position:[t.lon,t.lat],visible:!0,events:{click:function(){alert(t.name+"-"+t.address)}}})}));case 5:case"end":return e.stop()}},e,t)}))()},getAlarmList:function(){var t=this;return r()(i.a.mark(function e(){var a,s;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t,e.next=3,t.$http.post(t.$equApi.alarmList,{pageNumber:1,pageSize:3,alarmStatus:"unprocessed"});case 3:"SUCCESS"==(s=e.sent).result&&(t.alarmPositionList=[],t.alarmList=[],t.alarmPositionList=s.data,t.alarmList=s.data.content,t.alarmPositionList.content.forEach(function(t){t.lng&&t.lat&&a.markersFire.push({id:t.alarmId,position:[t.lng,t.lat],visible:!0,events:{click:function(){alert(t.deviceName+"于"+Object(c.c)("yyyy-MM-dd hh:mm:ss",new Date(t.alarmDate))+"发生报警\n地址："+t.companyName+"-"+t.companyAddress)}}})}));case 5:case"end":return e.stop()}},e,t)}))()},alarmTypeChart:function(t){var e=this;return r()(i.a.mark(function t(){var a,s,n,r,o;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=document.getElementById("alarmType"),t.next=3,e.$http.post(e.$equApi.alarmStatistics,{areaCode:e.areaCode,isSubArea:!0});case 3:s=t.sent,n=[],s.data.forEach(function(t){n.push(t.name)}),r="报警类型统计",o=s.data,e._renderPieCharts(a,n,r,o);case 9:case"end":return t.stop()}},t,e)}))()},_renderPieCharts:function(t,e,a,s){var i=l.a.init(t),n={color:this.colorPalette,title:{show:!1,x:"center"},grid:{top:0,left:0,bottom:0,right:0},tooltip:{show:!0,position:["20%","0"],trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{show:!0,orient:"vertical",left:"left",data:e,textStyle:{color:"#fff",fontSize:10}},series:[{name:a,type:"pie",radius:"70%",center:["50%","60%"],data:s,label:{normal:{show:!0}},labelLine:{length:0},itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};i.setOption(n)},equErrorCharts:function(){var t=this;return r()(i.a.mark(function e(){var a,s,n,r,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=document.getElementById("equError"),e.next=3,t.$http.post(t.$equApi.failureRateStatistics,{areaCode:t.areaCode,isSubArea:!0});case 3:s=e.sent,n="设备故障率",r=[],s.data.forEach(function(t){r.push(t.name)}),o=s.data,t._renderCircleCharts(a,n,o,r);case 9:case"end":return e.stop()}},e,t)}))()},equTypeCharts:function(){var t=this;return r()(i.a.mark(function e(){var a,s,n,r,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=document.getElementById("equType"),e.next=3,t.$http.post(t.$equApi.deviceTypeStatistics,{areaCode:t.areaCode,isSubArea:!0});case 3:s=e.sent,n="设备型号统计",r=[],s.data.forEach(function(t){r.push(t.name)}),o=s.data,t._renderCircleCharts(a,n,o,r);case 9:case"end":return e.stop()}},e,t)}))()},_renderCircleCharts:function(t,e,a,s){var i=l.a.init(t),n={color:this.colorPalette,tooltip:{trigger:"item",position:["20%","0"],formatter:"{a} <br/>{b}: {c} ({d}%)"},grid:{top:0,left:0,bottom:0,right:0},legend:{orient:"vertical",x:"left",data:s,textStyle:{color:"#fff",fontSize:10}},series:[{name:e,type:"pie",radius:["25%","65%"],avoidLabelOverlap:!1,label:{normal:{show:!1,position:"center"},emphasis:{show:!1,textStyle:{fontSize:"20",fontWeight:"bold"}}},labelLine:{normal:{show:!1}},data:a}]};i.setOption(n)},newEquCharts:function(){var t=this;return r()(i.a.mark(function e(){var a,s,n,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=document.getElementById("newEqu"),e.next=3,t.$http.post(t.$equApi.devicesStatistics,{areaCode:t.areaCode,isSubArea:!0});case 3:s=e.sent,n=[],r=[],s.data.forEach(function(t){n.push(t.name),r.push(t.value)}),t._renderBarCharts(a,n,r);case 8:case"end":return e.stop()}},e,t)}))()},alarmCenterCharts:function(){var t=this;return r()(i.a.mark(function e(){var a,s,n,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=document.getElementById("alarmCenter"),e.next=3,t.$http.post(t.$equApi.failureCountStatistics,{areaCode:t.areaCode,isSubArea:!0});case 3:s=e.sent,n=[],r=[],s.data.forEach(function(t){n.push(t.name),r.push(t.value)}),t._renderBarCharts(a,n,r);case 8:case"end":return e.stop()}},e,t)}))()},_renderBarCharts:function(t,e,a){var s=l.a.init(t),i={color:this.colorPalette,grid:{top:"10px",left:"10px",right:"4%",bottom:"3%",containLabel:!0},tooltip:{show:!0,axisPointer:{type:"shadow"}},xAxis:{type:"category",axisLine:{lineStyle:{color:"#666"}},axisLabel:{color:"#fff",fontSize:10},data:e},yAxis:{type:"value",axisLine:{lineStyle:{color:"#666"}},axisLabel:{color:"#fff",fontSize:10},splitLine:{show:!1}},series:[{data:a,type:"bar"}]};s.setOption(i)},newUserCharts:function(){var t=document.getElementById("newUser");this._renderUserBarCharts(t,["周一","周二","周三","周四","周五","周六","周日"],[{name:"City Alpha",type:"bar",data:[165,170,30]},{name:"City Beta",type:"bar",data:[150,105,110]},{name:"City Gamma",type:"bar",data:[220,82,63]}])},_renderUserBarCharts:function(t,e,a){var s=l.a.init(t),i={color:this.colorPalette,grid:{top:"10px",left:"10px",right:"4%",bottom:"3%",containLabel:!0},tooltip:{show:!0,trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:"value",axisLine:{lineStyle:{color:"#666"}},axisLabel:{color:"#fff",fontSize:10},splitLine:{show:!1}},yAxis:{type:"category",axisLine:{lineStyle:{color:"#666"}},axisLabel:{color:"#fff",fontSize:10},data:e},series:a};s.setOption(i)},monthAlarmCharts:function(){var t=this;return r()(i.a.mark(function e(){var a,s,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t,a=document.getElementById("monthAlarm"),s=[],n=[],e.next=6,t.$http.post(t.$equApi.monthlyAlarmStatistics,{areaCode:t.areaCode,isSubArea:!0});case 6:e.sent.data.forEach(function(t){s.push(t.name),n.push(t.value)}),t._renderLineCharts(a,s,n);case 9:case"end":return e.stop()}},e,t)}))()},_renderLineCharts:function(t,e,a){var s=l.a.init(t),i={color:this.colorPalette,grid:{top:"10px",left:"10px",right:"4%",bottom:"3%",containLabel:!0},tooltip:{show:!0,trigger:"axis"},xAxis:{type:"category",axisLine:{lineStyle:{color:"#666"}},axisLabel:{color:"#fff",fontSize:10},data:e},yAxis:{type:"value",axisLine:{lineStyle:{color:"#666"}},axisLabel:{color:"#fff",fontSize:10},splitLine:{show:!1}},series:[{data:a,type:"line"}]};s.setOption(i)},initWebSocket:function(){var t="ws://39.98.173.65:9001/alarm.ws?token="+Object(c.g)("_TOKEN_")+"&loginType=WEB&company="+Object(c.g)("_CURRENT_COMPANY_AREA_")+"&userName="+decodeURI(Object(c.g)("_CURRENT_COMPANY_NAME_"));console.log(t),this.websock=new WebSocket(t),this.websock.onmessage=this.websocketonmessage,this.websock.onopen=this.websocketonopen,this.websock.onerror=this.websocketonerror,this.websock.onclose=this.websocketclose},websocketonopen:function(){console.log("WebSocket连接成功"),this.websocketsend("111")},websocketonerror:function(){console.log("WebSocket连接发生错误"),this.initWebSocket()},websocketonmessage:function(t){if(console.log("数据接收",t),"111 received at server"!=t.data){var e=JSON.parse(t.data);-1==this.alarmList.findIndex(function(t){return t.alarmId==e.alarmId})&&(document.getElementById("sound").play(),this.alarmList.length>1&&this.alarmList.splice(2),this.alarmList.push(e),this.markersFire.push({id:e.alarmId,position:[parseFloat(e.lng),parseFloat(e.lat)],visible:!0,events:{click:function(){alert(e.deviceName+"-"+e.insLocation)}}}))}},websocketsend:function(t){this.websock.send(t)},websocketclose:function(t){var e=this;console.log("断开连接",t);this.connectFlag&&this.checkToken(function(){console.log("重新连接"),e.initWebSocket()})},checkToken:function(t){var e=this;return r()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.post(e.$urlApi.checkToken);case 2:"SUCCESS"===a.sent.result?t&&t():e.$router.push({path:"/login"});case 4:case"end":return a.stop()}},a,e)}))()},resolve:function(t){this.alrmInfo=t,this.resolveAlarmVisible=!0},transmit:function(t){this.alrmInfo=t,this.transmitAlarmVisible=!0},closePopup:function(){this.resolveAlarmVisible=!1,this.transmitAlarmVisible=!1},resolveAlarm:function(){var t=this,e=this.markersFire.findIndex(function(e){return e.id==t.alrmInfo.alarmId}),a=this.alarmList.findIndex(function(e){return e.id==t.alrmInfo.alarmId});this.alarmList.splice(a,1),this.markersFire.splice(e,1),this.resolveAlarmVisible=!1}}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-bg"},[a("el-row",{staticStyle:{height:"100%"},attrs:{gutter:16}},[a("el-col",{staticStyle:{height:"100%"},attrs:{span:6}},[a("div",{staticClass:"item-block"},[a("div",{staticClass:"item-title"},[t._v("\n\t\t\t\t\t\t报警类型统计\n\t\t\t\t\t")]),t._v(" "),a("div",{staticClass:"item-cont"},[a("div",{attrs:{id:"alarmType"}})])]),t._v(" "),a("div",{staticClass:"item-block"},[a("div",{staticClass:"item-title"},[t._v("\n\t\t\t\t\t\t设备故障率\n\t\t\t\t\t")]),t._v(" "),a("div",{staticClass:"item-cont"},[a("div",{attrs:{id:"equError"}})])]),t._v(" "),a("div",{staticClass:"item-block"},[a("div",{staticClass:"item-title"},[t._v("\n\t\t\t\t\t\t设备型号统计\n\t\t\t\t\t")]),t._v(" "),a("div",{staticClass:"item-cont"},[a("div",{attrs:{id:"equType"}})])])]),t._v(" "),a("el-col",{staticStyle:{height:"100%"},attrs:{span:12}},[a("div",{staticClass:"item-block",staticStyle:{height:"calc(100% - 28px)"}},[a("div",{staticClass:"item-title"},[t._v("\n\t\t\t\t\t\t监控中心\n\t\t\t\t\t")]),t._v(" "),a("div",{staticClass:"item-cont"},[a("div",{attrs:{id:"monitorCenter"}},[a("el-amap",{staticClass:"amap-demo",attrs:{vid:"amapAlarm",center:t.map.center,mapStyle:t.mapStyle,"amap-manager":t.amapManager,zoom:t.map.zoom}},[t._l(t.markers,function(t,e){return a("el-amap-marker",{key:e+"a",attrs:{position:t.position,events:t.events,visible:t.visible,vid:e}})}),t._v(" "),t._l(t.markersFire,function(e,s){return a("el-amap-marker",{key:s+"b",attrs:{position:e.position,events:e.events,visible:e.visible,vid:s,icon:t.pointFireIcon}})})],2)],1),t._v(" "),t.alarmList.length>0?a("div",{staticClass:"alrm-list"},[a("ul",t._l(t.alarmList,function(e,s){return a("li",{key:s},[a("div",[a("span",[t._v(t._s(e.deviceName))]),t._v(" "),a("span",{staticClass:"color-red"},[t._v("代处理")]),t._v(" "),a("span",{staticClass:"ml10 color-orange",staticStyle:{cursor:"pointer"},on:{click:function(a){t.resolve(e)}}},[t._v("处理")]),t._v(" "),a("span",{staticClass:"ml10 color-orange",staticStyle:{cursor:"pointer"},on:{click:function(a){t.transmit(e)}}},[t._v("转发")])]),t._v(" "),a("div",[t._v("\n                                        "+t._s(e.companyName)+"\n                                    ")]),t._v(" "),a("div",[t._v("\n                                        "+t._s(e.companyAddress)+"\n                                    ")])])}),0)]):t._e()])])]),t._v(" "),a("el-col",{staticStyle:{height:"100%"},attrs:{span:6}},[a("div",{staticClass:"item-block"},[a("div",{staticClass:"item-title"},[t._v("\n\t\t\t\t\t\t片区新增设备\n\t\t\t\t\t")]),t._v(" "),a("div",{staticClass:"item-cont"},[a("div",{attrs:{id:"newEqu"}})])]),t._v(" "),a("div",{staticClass:"item-block"},[a("div",{staticClass:"item-title"},[t._v("\n\t\t\t\t\t\t月度报警数量统计\n\t\t\t\t\t")]),t._v(" "),a("div",{staticClass:"item-cont"},[a("div",{attrs:{id:"monthAlarm"}})])]),t._v(" "),a("div",{staticClass:"item-block"},[a("div",{staticClass:"item-title"},[t._v("\n\t\t\t\t\t\t片区设备故障次数\n\t\t\t\t\t")]),t._v(" "),a("div",{staticClass:"item-cont"},[a("div",{attrs:{id:"alarmCenter"}})])])])],1),t._v(" "),t._m(0),t._v(" "),t.resolveAlarmVisible?a("el-dialog",{attrs:{title:"报警处理",visible:t.resolveAlarmVisible,width:"30%"},on:{"update:visible":function(e){t.resolveAlarmVisible=e}}},[a("resolveAlarm",{attrs:{show:t.resolveAlarmVisible,alrmInfo:t.alrmInfo},on:{"update:show":function(e){t.resolveAlarmVisible=e},closePopup:t.closePopup,resolveAlarm:t.resolveAlarm}})],1):t._e(),t._v(" "),t.transmitAlarmVisible?a("el-dialog",{attrs:{title:"报警转发",visible:t.transmitAlarmVisible,width:"30%"},on:{"update:visible":function(e){t.transmitAlarmVisible=e}}},[a("transmitAlarm",{attrs:{show:t.transmitAlarmVisible,alrmInfo:t.alrmInfo},on:{"update:show":function(e){t.transmitAlarmVisible=e},closePopup:t.closePopup}})],1):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"alarm-sound"},[e("audio",{attrs:{id:"sound",autoplay:"false",src:"../../../static/fire.mp3"}})])}]};var v=a("C7Lr")(f,h,!1,function(t){a("ZDqt")},"data-v-43ea5468",null);e.default=v.exports},ZDqt:function(t,e){},gfE7:function(t,e){t.exports="data:image/png;base64,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"}});