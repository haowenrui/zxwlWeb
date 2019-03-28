webpackJsonp([5],{lOdb:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("lC5x"),r=a.n(o),l=a("J0Oq"),i=a.n(l),n=a("GPKu"),s={components:{},mixins:[],props:["equipmentInfo"],data:function(){return{form:{deviceId:this.equipmentInfo.equipmentInfo,deviceQRCode:"",deviceName:"",letterCode:"",proComName:"",proComCode:"",proType:"",minValue:"",maxValue:"",letterAgreement:"",traMethod:"",isSimulate:"",version:"",insFrequency:"",overTime:"",fireFacility:""}}},watch:{},computed:{},created:function(){this.equipmentInfo.deviceId&&this.queryEquipmentInfo()},mounted:function(){},methods:{cancel:function(){this.$emit("update:show",!1)},addNew:function(){var e=this;this.$refs.form.validate(function(t){t?e._addAndModifyEquipment():e.$message({showClose:!0,message:errorMsg,type:"error"})})},queryEquipmentInfo:function(){var e=this;return i()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get(e.$equApi.queryEquipmentInfo,{equipmentId:e.equipmentInfo.deviceId});case 2:a=t.sent,e.form=a.data;case 4:case"end":return t.stop()}},t,e)}))()},_addAndModifyEquipment:function(){var e=this;return i()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=null,e.equipmentInfo.deviceId){t.next=7;break}return t.next=4,e.$http.post(e.$equApi.addEquipment,e.form);case 4:a=t.sent,t.next=10;break;case 7:return t.next=9,e.$http.post(e.$equApi.modifyEquipment,e.form);case 9:a=t.sent;case 10:"SUCCESS"==a.result&&(e.$emit("update:show",!1),e.$emit("refreshData"),e.$message({showClose:!0,message:"操作成功",type:"success"}));case 11:case"end":return t.stop()}},t,e)}))()}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{ref:"form",attrs:{model:e.form,inline:!0,"label-width":"100px",size:"mini"}},[a("el-form-item",{attrs:{label:"设备名称:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.deviceName,callback:function(t){e.$set(e.form,"deviceName","string"==typeof t?t.trim():t)},expression:"form.deviceName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"设备编码:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.deviceQRCode,callback:function(t){e.$set(e.form,"deviceQRCode","string"==typeof t?t.trim():t)},expression:"form.deviceQRCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"通信编号:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.letterCode,callback:function(t){e.$set(e.form,"letterCode","string"==typeof t?t.trim():t)},expression:"form.letterCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"生产商:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.proComName,callback:function(t){e.$set(e.form,"proComName","string"==typeof t?t.trim():t)},expression:"form.proComName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"厂家编码:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.proComCode,callback:function(t){e.$set(e.form,"proComCode","string"==typeof t?t.trim():t)},expression:"form.proComCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"产品类型:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.proType,callback:function(t){e.$set(e.form,"proType","string"==typeof t?t.trim():t)},expression:"form.proType"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"最小值:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.minValue,callback:function(t){e.$set(e.form,"minValue","string"==typeof t?t.trim():t)},expression:"form.minValue"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"最大值:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.maxValue,callback:function(t){e.$set(e.form,"maxValue","string"==typeof t?t.trim():t)},expression:"form.maxValue"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"通信协议:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.letterAgreement,callback:function(t){e.$set(e.form,"letterAgreement","string"==typeof t?t.trim():t)},expression:"form.letterAgreement"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"传输方式:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.traMethod,callback:function(t){e.$set(e.form,"traMethod","string"==typeof t?t.trim():t)},expression:"form.traMethod"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否模拟:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.isSimulate,callback:function(t){e.$set(e.form,"isSimulate","string"==typeof t?t.trim():t)},expression:"form.isSimulate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"版本号:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.version,callback:function(t){e.$set(e.form,"version","string"==typeof t?t.trim():t)},expression:"form.version"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"巡检频次:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.insFrequency,callback:function(t){e.$set(e.form,"insFrequency","string"==typeof t?t.trim():t)},expression:"form.insFrequency"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"过保时间:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.overTime,callback:function(t){e.$set(e.form,"overTime","string"==typeof t?t.trim():t)},expression:"form.overTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"消防设施:"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.fireFacility,callback:function(t){e.$set(e.form,"fireFacility","string"==typeof t?t.trim():t)},expression:"form.fireFacility"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer text-right pb20"},[a("el-button",{attrs:{size:"small"},on:{click:e.cancel}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.addNew}},[e._v("确 定")])],1)],1)},staticRenderFns:[]};var u={components:{dialogAdd:a("C7Lr")(s,c,!1,function(e){a("zpCW")},"data-v-5df091c3",null).exports},props:[],data:function(){return{dialogAdd:!1,queryingShowLoading:!1,importingShowLoading:!1,uploadAndDownload:!1,uploadType:"",queryParams:{pageSize:10,pageNumber:1},token:"",total:0,pageSize:10,currentPage:1,multipleSelection:[],pickerOptions1:{disabledDate:function(e){return e.getTime()>Date.now()}},tHead:[{prop:"deviceQRCode",label:"设备编号",width:""},{prop:"deviceName",label:"设备名称",width:""},{prop:"proComName",label:"厂家名称",width:""},{prop:"proType",label:"产品类型",width:""},{prop:"insFrequency",label:"巡检频次",width:""},{prop:"overTime",label:"过保时间",width:"",formatter:function(e,t,a){return Object(n.c)("yyyy-MM-dd",new Date(a))}},{prop:"districtName",label:"创建者",width:""},{prop:"merchantType",label:"修改者",width:""}],tBody:[],equipmentInfo:{}}},watch:{},computed:{templateURL:function(){return this.$equApi.importDevice}},created:function(){},mounted:function(){this.token=Object(n.f)("_TOKEN_"),this.queryEquipmentList()},methods:{onQuery:function(){this.queryParams.pageNo=1,this.queryEquipmentList()},addNew:function(){this.dialogAdd=!0},deleteEquipment:function(){var e=this;return i()(r.a.mark(function t(){var a,o;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=[],!(e.multipleSelection.length<=0)){t.next=5;break}return t.abrupt("return");case 5:e.multipleSelection.forEach(function(e){a.push(e.deviceId)});case 6:return t.next=8,e.$http.post(e.$equApi.deleteEquipment,a);case 8:"SUCCESS"==(o=t.sent).result?(e.$message({showClose:!0,message:"删除成功",type:"success"}),e.multipleSelection=[],e.onQuery()):e.$message({showClose:!0,message:o.message,type:"error"});case 10:case"end":return t.stop()}},t,e)}))()},_checkSchoolInfo:function(e){},beforeUpload:function(e){this.token=Object(n.f)("_TOKEN_"),this.importingShowLoading=!0},uploadSuccess:function(e){var t=this;return this.importingShowLoading=!1,function(e,a,o){"SUCCESS"==e.result?t.$message({showClose:!0,message:"导入成功",type:"success"}):t.$message({showClose:!0,message:e.message,type:"error"})}},uploadFailure:function(e,t,a){this.importingShowLoading=!1,this.$message({showClose:!0,message:"上传失败",type:"error"})},handleCurrentChange:function(e){this.queryParams.pageNo=e,this.queryEquipmentList()},queryEquipmentList:function(){var e=this;return i()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get(e.$equApi.equipmentList,e.queryParams);case 2:a=t.sent,e.tBody=a.data.equipmentList,e.total=a.data.total,e.queryParams.pageNo=a.data.pageNo;case 6:case"end":return t.stop()}},t,e)}))()},_editSchoolInfo:function(e){this.equipmentInfo=e,this.dialogAdd=!0},handleSelectionChange:function(e){this.multipleSelection=e},refreshData:function(){this.onQuery()},downloadEquTemplate:function(){var e=this;return i()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.post(e.$equApi.downloadTemplate,{deviceName:"网关室水压"});case 2:t.sent;case 3:case"end":return t.stop()}},t,e)}))()}}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{ref:"form",attrs:{inline:!0,model:e.queryParams,size:"small"}},[a("el-form-item",{attrs:{label:"设备名称:",prop:"name"}},[a("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.queryParams.name,callback:function(t){e.$set(e.queryParams,"name","string"==typeof t?t.trim():t)},expression:"queryParams.name"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticClass:"button-query",attrs:{type:"primary",loading:e.queryingShowLoading},on:{click:e.onQuery}},[e._v("查询\n\t\t\t\t")])],1)],1),e._v(" "),a("div",[a("div",{staticClass:"clear-fix mb10"},[a("el-button",{staticClass:"button-query fr",attrs:{type:"primary",size:"small"},on:{click:e.addNew}},[e._v("新增设备")]),e._v(" "),a("el-button",{staticClass:"button-query fr mr10",attrs:{type:"warning",size:"small"},on:{click:e.deleteEquipment}},[e._v("删除设备\n\t\t\t\t")]),e._v(" "),a("el-button",{staticClass:"button-query fr mr10",attrs:{size:"small",type:"success"},on:{click:function(t){e.uploadAndDownload=!e.uploadAndDownload}}},[e._v("导入设备\n\t\t\t\t\t")]),e._v(" "),a("el-button",{staticClass:"button-query fr mr10",attrs:{type:"primary",size:"small"},on:{click:function(t){e.uploadAndDownload=!e.uploadAndDownload}}},[e._v("下载模板\n\t\t\t\t")])],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tBody,border:"",size:"small"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),e._l(e.tHead,function(e){return a("el-table-column",{key:e.prop,attrs:{align:"center",prop:e.prop,label:e.label,width:e.width,formatter:e.formatter}})}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{effect:"dark",content:"查看",placement:"bottom"}},[a("el-button",{staticClass:"iconfont icon-chakan",attrs:{type:"text"},on:{click:function(a){e._checkSchoolInfo(t.row)}}})],1),e._v(" "),a("el-tooltip",{attrs:{effect:"dark",content:"编辑",placement:"bottom"}},[a("el-button",{staticClass:"iconfont icon-biji",attrs:{type:"text"},on:{click:function(a){e._editSchoolInfo(t.row)}}})],1)]}}])})],2),e._v(" "),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],staticClass:"page",attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.total,background:"",disabled:e.queryingShowLoading},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),e.dialogAdd?a("el-dialog",{attrs:{title:e.equipmentInfo.deviceId?"编辑":"新增",visible:e.dialogAdd,width:"60%"},on:{"update:visible":function(t){e.dialogAdd=t}}},[a("dialogAdd",{attrs:{show:e.dialogAdd,equipmentInfo:e.equipmentInfo},on:{"update:show":function(t){e.dialogAdd=t},refreshData:e.refreshData}})],1):e._e(),e._v(" "),e.uploadAndDownload?a("el-dialog",{attrs:{title:"上传与下载",visible:e.uploadAndDownload,width:"60%"},on:{"update:visible":function(t){e.uploadAndDownload=t}}},[a("div",{staticClass:"clearfix mt10 mb10 pl30"},[a("el-select",{staticClass:"fl mr10",staticStyle:{width:"50%"},attrs:{placeholder:"请选择",size:"small"},model:{value:e.uploadType,callback:function(t){e.uploadType=t},expression:"uploadType"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-button",{staticClass:"button-query fl mr10",attrs:{size:"small",loading:e.importingShowLoading,type:"primary"}},[e._v("下载模板\n                ")]),e._v(" "),a("el-upload",{staticClass:"button-query fl",attrs:{action:e.templateURL,headers:{"X-Access-Token":e.token},"on-success":e.uploadSuccess,"on-error":e.uploadFailure,"before-upload":e.beforeUpload,disabled:e.importingShowLoading,"show-file-list":!1}},[a("el-button",{staticClass:"button-query",attrs:{size:"small",loading:e.importingShowLoading,type:"success"}},[e._v("导入设备\n                    ")])],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.uploadAndDownload=!1}}},[e._v("关闭")])],1)]):e._e()],1)},staticRenderFns:[]};var p=a("C7Lr")(u,m,!1,function(e){a("xqc7")},"data-v-63c9f8b0",null);t.default=p.exports},xqc7:function(e,t){},zpCW:function(e,t){}});