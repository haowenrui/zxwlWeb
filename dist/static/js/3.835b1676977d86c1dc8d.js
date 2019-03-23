webpackJsonp([3],{"M/Yj":function(e,t){},Y1Fk:function(e,t){},pobt:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("lC5x"),n=r.n(a),s=r("J0Oq"),o=r.n(s),i=r("GPKu"),l={components:{},mixins:[],props:["roleInfo"],data:function(){return{queryParams:{id:this.roleInfo.roleId,name:this.roleInfo.name,permissoinItemIds:[],type:"USER"},permissionList:[],defaultProps:{children:"children",label:"label"},currrentPermission:[]}},watch:{},computed:{},created:function(){},mounted:function(){this.queryPermission(),this.roleInfo.roleId&&this.queryCurrentPermission()},methods:{queryPermission:function(){var e=this;return o()(n.a.mark(function t(){var r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get(e.$urlApi.getPermission);case 2:r=t.sent,e.permissionList=r.data;case 4:case"end":return t.stop()}},t,e)}))()},queryCurrentPermission:function(){var e=this;return o()(n.a.mark(function t(){var r,a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get(e.$urlApi.getPermission,{roleId:e.roleInfo.roleId});case 2:r=t.sent,e.currrentPermission=r.data,e.queryParams.permissoinItemIds=[],a=e,e.currrentPermission.forEach(function(e){e.children.forEach(function(e){e.checked&&a.queryParams.permissoinItemIds.push(e.value)})});case 7:case"end":return t.stop()}},t,e)}))()},submitRole:function(){var e=this;return o()(n.a.mark(function t(){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.queryParams.permissoinItemIds=[],e.$refs.roleTree.getCheckedNodes().forEach(function(t){e.queryParams.permissoinItemIds.push(t.value)}),t.next=4,e.$http.post(e.$urlApi.addRole,e.queryParams);case 4:"SUCCESS"==t.sent.result&&e.$emit("refreshData");case 6:case"end":return t.stop()}},t,e)}))()},selectPermission:function(e){var t=this;if(!e.children||e.children.length<=0){var r=this.queryParams.permissoinItemIds.indexOf(e.value);-1!=r?this.queryParams.permissoinItemIds.splice(r,1):this.queryParams.permissoinItemIds.push(e.value)}else e.children.length>0&&e.children.forEach(function(e){var r=t.queryParams.permissoinItemIds.indexOf(e.value);-1!=r?t.queryParams.permissoinItemIds.splice(r,1):t.queryParams.permissoinItemIds.push(e.value)});console.log(this.queryParams.permissoinItemIds)}}},c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",[r("span",[e._v("角色名称:")]),e._v(" "),r("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"商户ID/商户名称"},model:{value:e.queryParams.name,callback:function(t){e.$set(e.queryParams,"name","string"==typeof t?t.trim():t)},expression:"queryParams.name"}})],1),e._v(" "),r("div",{staticClass:"mt10"},[r("span",[e._v("角色类型:")]),e._v(" "),r("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:e.queryParams.type,callback:function(t){e.$set(e.queryParams,"type",t)},expression:"queryParams.type"}},e._l(this.$constants.roleType,function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}),1)],1),e._v(" "),r("div",{staticClass:"mt20"},[r("h2",[e._v("权限清单：")]),e._v(" "),r("div",[r("el-tree",{ref:"roleTree",attrs:{data:e.permissionList,"show-checkbox":"","node-key":"value","default-expand-all":!0,"default-checked-keys":e.queryParams.permissoinItemIds,props:e.defaultProps}})],1),e._v(" "),r("div",{staticClass:"text-right pt20 pb20"},[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.submitRole}},[e._v("确 定\n\t\t\t")])],1)])])},staticRenderFns:[]};var u={components:{},mixins:[],props:["roleId"],data:function(){return{roleInfo:{},defaultProps:{children:"children",label:"label"}}},watch:{},computed:{},created:function(){},mounted:function(){this.queryRoleDetail(),this.getCurrentPermission()},methods:{getCurrentPermission:function(){var e=this;return o()(n.a.mark(function t(){var r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get(e.$urlApi.getPermission,{roleId:e.roleId,type:"WEB"});case 2:r=t.sent,e.roleInfo=r.data;case 4:case"end":return t.stop()}},t,e)}))()},queryRoleDetail:function(){var e=this;return o()(n.a.mark(function t(){var r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get(e.$urlApi.queryRoleDetail,{roleId:e.roleId});case 2:r=t.sent,e.roleInfo=r.data;case 4:case"end":return t.stop()}},t,e)}))()},cancel:function(){this.$emit("update:show",!1)}}},d={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{attrs:{"label-width":"100px",size:"mini"}},[r("el-form-item",{attrs:{label:"角色名称:"}},[r("span",[e._v(e._s(e.roleInfo.name))])]),e._v(" "),r("el-form-item",{attrs:{label:"类型:"}},[r("span",[e._v(e._s(e.roleInfo.type))])]),e._v(" "),r("el-form-item",{attrs:{label:"角色权限:"}},[r("div",[r("p",[e._v("角色最小操作单元")]),e._v(" "),r("div",[r("el-tree",{attrs:{data:e.roleInfo.permissionItem,"node-key":"value","default-expand-all":!1,props:e.defaultProps}})],1)])])],1),e._v(" "),r("div",{staticClass:"dialog-footer text-right pb20"},[r("el-button",{attrs:{size:"small"},on:{click:e.cancel}},[e._v("关 闭")])],1)],1)},staticRenderFns:[]};var p={components:{dialogAdd:r("C7Lr")(l,c,!1,function(e){r("t18A")},"data-v-73fbec7e",null).exports,dialogCheck:r("C7Lr")(u,d,!1,function(e){r("Y1Fk")},"data-v-952ee808",null).exports},props:[],data:function(){return{queryingShowLoading:!1,dialogAdd:!1,dialogCheck:!1,roleInfo:"",queryParams:{pageSize:10,pageNumber:1},total:0,pageSize:10,currentPage:1,multipleSelection:[],pickerOptions1:{disabledDate:function(e){return e.getTime()>Date.now()}},tHead:[{prop:"name",label:"角色名称",width:""},{prop:"type",label:"角色类型",width:""},{prop:"companyName",label:"公司名称",width:""},{prop:"dateCreated",label:"创建时间",width:"",formatter:function(e,t,r){return Object(i.c)("yyyy-MM-dd",new Date(r))}},{prop:"creator",label:"创建者",width:""}],tBody:[]}},watch:{},computed:{},created:function(){},mounted:function(){this.queryRoleList()},methods:{onQuery:function(){this.queryParams.pageNo=1,this.queryRoleList()},refreshData:function(){this.dialogAdd=!1,this.queryRoleList()},addNew:function(){this.roleInfo={},this.dialogAdd=!0},_checkSchoolInfo:function(e){this.roleInfo=e,this.dialogCheck=!0},handleCurrentChange:function(e){this.queryParams.pageNumber=e,this.queryRoleList()},queryRoleList:function(){var e=this;return o()(n.a.mark(function t(){var r,a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(r=Object(i.a)(e.queryParams.startTime,e.queryParams.endTime))){t.next=4;break}return e.$message.warning(r),t.abrupt("return");case 4:return t.next=6,e.$http.post(e.$urlApi.queryRoleList,e.queryParams);case 6:a=t.sent,e.tBody=a.data.content,e.total=a.data.totalElements,e.queryParams.pageNumber=a.data.number;case 10:case"end":return t.stop()}},t,e)}))()},_editSchoolInfo:function(e){this.roleInfo=e,this.dialogAdd=!0},handleSelectionChange:function(e){this.multipleSelection=e},deleteRole:function(){var e=this;return o()(n.a.mark(function t(){var r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=[],e.multipleSelection.forEach(function(e){r.push(e.roleId)}),t.next=4,e.$http.post(e.$urlApi.deleteRole,r);case 4:"SUCCESS"==t.sent.result&&(e.$message.success("删除成功"),e.onQuery());case 6:case"end":return t.stop()}},t,e)}))()}}},m={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",[r("div",{staticClass:"clear-fix mb10"},[r("el-button",{staticClass:"button-query fr",attrs:{type:"primary",size:"small"},on:{click:e.addNew}},[e._v("新增角色")]),e._v(" "),r("el-button",{staticClass:"button-query fr mr10",attrs:{type:"warning",size:"small"},on:{click:e.deleteRole}},[e._v("删除角色")])],1),e._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tBody,border:"",size:"small"},on:{"selection-change":e.handleSelectionChange}},[r("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),e._l(e.tHead,function(e){return r("el-table-column",{key:e.prop,attrs:{align:"center",prop:e.prop,label:e.label,width:e.width,formatter:e.formatter}})}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"操作",width:""},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tooltip",{attrs:{effect:"dark",content:"查看",placement:"bottom"}},[r("el-button",{staticClass:"iconfont icon-chakan",attrs:{type:"text"},on:{click:function(r){e._checkSchoolInfo(t.row)}}})],1),e._v(" "),r("el-tooltip",{attrs:{effect:"dark",content:"编辑",placement:"bottom"}},[r("el-button",{staticClass:"iconfont icon-biji",attrs:{type:"text"},on:{click:function(r){e._editSchoolInfo(t.row)}}})],1)]}}])})],2),e._v(" "),r("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],staticClass:"page",attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.total,background:"",disabled:e.queryingShowLoading},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),e.dialogAdd?r("el-dialog",{attrs:{title:e.roleInfo.roleId?"编辑":"新增",visible:e.dialogAdd,width:"60%"},on:{"update:visible":function(t){e.dialogAdd=t}}},[r("dialogAdd",{attrs:{show:e.dialogAdd,roleInfo:e.roleInfo},on:{"update:show":function(t){e.dialogAdd=t},refreshData:e.refreshData}})],1):e._e(),e._v(" "),e.dialogCheck?r("el-dialog",{attrs:{title:"查看",visible:e.dialogCheck,width:"60%"},on:{"update:visible":function(t){e.dialogCheck=t}}},[r("dialogCheck",{attrs:{show:e.dialogCheck,roleId:e.roleInfo.roleId},on:{"update:show":function(t){e.dialogCheck=t}}})],1):e._e()],1)},staticRenderFns:[]};var f=r("C7Lr")(p,m,!1,function(e){r("M/Yj")},"data-v-3df8a81e",null);t.default=f.exports},t18A:function(e,t){}});