webpackJsonp([4],{Cpxx:function(e,t){},MQOw:function(e,t){},Px7x:function(e,t){},smzg:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("lC5x"),s=r.n(a),n=r("J0Oq"),o=r.n(n),i=r("GPKu"),l={components:{},mixins:[],props:["userInfo"],data:function(){return{form:{username:"",password:"",name:"",companyId:"",departMent:"",post:"",roleId:"",userId:"",companyUserId:"",isMain:!0,isUsed:!0},companyList:[],roleList:[],optType:"add"}},watch:{},computed:{},created:function(){},mounted:function(){this.userInfo.userId&&(this.form=this.userInfo,this.optType="edit"),this.queryRoleList()},methods:{queryCompanyList:function(){var e=this;return o()(s.a.mark(function t(){var r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get(e.$urlApi.getCompany);case 2:"SUCCESS"==(r=t.sent).result&&(e.companyList=r.data);case 4:case"end":return t.stop()}},t,e)}))()},queryRoleList:function(){var e=this;return o()(s.a.mark(function t(){var r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get(e.$urlApi.queryListByCompCode,{companyId:Object(i.g)("_CURRENT_COMPANY_ID_")});case 2:"SUCCESS"==(r=t.sent).result&&(e.roleList=r.data);case 4:case"end":return t.stop()}},t,e)}))()},cancel:function(){this.$emit("update:show",!1)},addNew:function(){var e=this;this.$refs.form.validate(function(t){t?e._addAndModifyUser():e.$message({showClose:!0,message:errorMsg,type:"error"})})},_addAndModifyUser:function(){var e=this;return o()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.post(e.$urlApi.addUser,e.form);case 2:t.sent.status||(e.$emit("update:show",!1),e.$emit("refreshData"),e.$message({showClose:!0,message:"操作成功",type:"success"}));case 4:case"end":return t.stop()}},t,e)}))()}}},c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{ref:"form",attrs:{model:e.form,"label-width":"100px",size:"mini"}},[r("el-form-item",{attrs:{label:"账号:"}},[r("el-input",{staticClass:"input-search",attrs:{disabled:"edit"==e.optType,clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username","string"==typeof t?t.trim():t)},expression:"form.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码:"}},[r("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password","string"==typeof t?t.trim():t)},expression:"form.password"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"用户名:"}},[r("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name","string"==typeof t?t.trim():t)},expression:"form.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"部门:"}},[r("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.departMent,callback:function(t){e.$set(e.form,"departMent","string"==typeof t?t.trim():t)},expression:"form.departMent"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"职位:"}},[r("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.form.post,callback:function(t){e.$set(e.form,"post","string"==typeof t?t.trim():t)},expression:"form.post"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"绑定角色:"}},[r("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:e.form.roleId,callback:function(t){e.$set(e.form,"roleId",t)},expression:"form.roleId"}},e._l(e.roleList,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer text-right pb20"},[r("el-button",{attrs:{size:"small"},on:{click:e.cancel}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.addNew}},[e._v("确 定")])],1)],1)},staticRenderFns:[]};var u=r("C7Lr")(l,c,!1,function(e){r("Px7x")},"data-v-97bb7170",null).exports,d={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{ref:"form",attrs:{"label-width":"100px",size:"mini"}},[r("el-form-item",{attrs:{label:"用户名:"}},[r("span",[e._v("11111")])]),e._v(" "),r("el-form-item",{attrs:{label:"性别:"}},[r("span",[e._v("11111")])]),e._v(" "),r("el-form-item",{attrs:{label:"学历:"}},[r("span",[e._v("11111")])]),e._v(" "),r("el-form-item",{attrs:{label:"职位:"}},[r("span",[e._v("11111")])]),e._v(" "),r("el-form-item",{attrs:{label:"电话:"}},[r("span",[e._v("11111")])]),e._v(" "),r("el-form-item",{attrs:{label:"住址:"}},[r("span",[e._v("11111")])]),e._v(" "),r("el-form-item",{attrs:{label:"所属部门:"}},[r("span",[e._v("11111")])]),e._v(" "),r("el-form-item",{attrs:{label:"创建者:"}},[r("span",[e._v("11111")])]),e._v(" "),r("el-form-item",{attrs:{label:"创建时间:"}},[r("span",[e._v("11111")])]),e._v(" "),r("el-form-item",{attrs:{label:"修改者:"}},[r("span",[e._v("11111")])]),e._v(" "),r("el-form-item",{attrs:{label:"修改时间:"}},[r("span",[e._v("11111")])]),e._v(" "),r("el-form-item",{attrs:{label:"所属片区:"}},[r("div",[r("div",[e._v("1111")])])]),e._v(" "),r("el-form-item",{attrs:{label:"角色权限:"}},[r("div",[r("p",[e._v("角色最小操作单元")]),e._v(" "),r("div",[e._v("1111")])])])],1)],1)},staticRenderFns:[]};var m=r("C7Lr")({components:{},mixins:[],props:[],data:function(){return{}},watch:{},computed:{},created:function(){},mounted:function(){},methods:{}},d,!1,function(e){r("Cpxx")},"data-v-5350274c",null).exports,p=r("Q0Ca"),f={components:{dialogAdd:u,dialogCheck:m},mixins:["downloadWitha"],props:[],data:function(){return{queryingShowLoading:!1,importingShowLoading:!1,dialogAdd:!1,dialogCheck:!1,userInfo:{},queryParams:{name:"",username:"",pageSize:10,pageNumber:1},total:0,multipleSelection:[],pickerOptions1:{disabledDate:function(e){return e.getTime()>Date.now()}},tHead:[{prop:"name",label:"用户名称",width:""},{prop:"username",label:"账号",width:""},{prop:"roleName",label:"角色名称",width:""},{prop:"roleType",label:"角色类型",width:"",formatter:function(e,t,r){return Object(p.userTypeFilter)(r)}},{prop:"companyName",label:"公司名称",width:""},{prop:"isUsed",label:"状态",width:"",formatter:function(e,t,r){return r?"启用":"停用"}}],tBody:[]}},watch:{},computed:{templateURL:function(){return this.$urlApi.schoolImport},editShow:function(){return this.$permissionShow("user_edit")}},created:function(){},mounted:function(){this.queryUserList()},methods:{onQuery:function(){this.queryParams.pageNumber=1,this.queryUserList()},refreshData:function(){this.onQuery()},addNew:function(){this.userInfo={},this.dialogAdd=!0},_checkUserInfo:function(e){this.roleInfo=e,this.dialogCheck=!0},handleCurrentChange:function(e){this.queryParams.pageNumber=e,this.queryUserList()},queryUserList:function(){var e=this;return o()(s.a.mark(function t(){var r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.post(e.$urlApi.getUserList,e.queryParams);case 2:r=t.sent,e.tBody=r.data.content,e.total=r.data.totalElements;case 5:case"end":return t.stop()}},t,e)}))()},_editUserInfo:function(e){this.userInfo=e,this.dialogAdd=!0},handleSelectionChange:function(e){this.multipleSelection=e},deleteRole:function(){},_editUserAuth:function(e){var t=this;return o()(s.a.mark(function r(){var a;return s.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:a="是否确定"+(e.isUsed?"停用":"启用")+"该用户",t.$confirm(a,"提示",{confirmButtonText:"确定",showCancelButton:!1,type:"warning"}).then(function(){t.editAuth(e)}).catch(function(){});case 2:case"end":return r.stop()}},r,t)}))()},editAuth:function(e){var t=this;return o()(s.a.mark(function r(){return s.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.$http.post(t.$urlApi.editLoginAuth,{userId:e.userId,isUsed:!e.isUsed});case 2:"SUCCESS"==r.sent.result&&(t.$message({type:"success",message:"操作成功"}),t.onQuery());case 4:case"end":return r.stop()}},r,t)}))()}}},h={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{ref:"form",attrs:{inline:!0,model:e.queryParams,size:"small"}},[r("el-form-item",{attrs:{label:"用户名称:",prop:"name"}},[r("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.queryParams.name,callback:function(t){e.$set(e.queryParams,"name","string"==typeof t?t.trim():t)},expression:"queryParams.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"账号:",prop:"name"}},[r("el-input",{staticClass:"input-search",attrs:{clearable:"",size:"small",placeholder:"请输入"},model:{value:e.queryParams.username,callback:function(t){e.$set(e.queryParams,"username","string"==typeof t?t.trim():t)},expression:"queryParams.username"}})],1),e._v(" "),r("el-form-item",[r("el-button",{staticClass:"button-query",attrs:{type:"primary",loading:e.queryingShowLoading},on:{click:e.onQuery}},[e._v("查询\n                ")])],1)],1),e._v(" "),r("div",[r("div",{staticClass:"clear-fix mb10"},[this.$permissionShow("user_create")?r("el-button",{staticClass:"button-query fr",attrs:{type:"primary",size:"small"},on:{click:e.addNew}},[e._v("新增用户")]):e._e(),e._v(" "),this.$permissionShow("user_delete")?r("el-button",{staticClass:"button-query fr mr10",attrs:{type:"warning",size:"small"},on:{click:e.deleteRole}},[e._v("删除用户")]):e._e()],1),e._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tBody,border:"",size:"small"},on:{"selection-change":e.handleSelectionChange}},[r("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),e._l(e.tHead,function(e){return r("el-table-column",{key:e.prop,attrs:{align:"center",prop:e.prop,label:e.label,width:e.width,formatter:e.formatter}})}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"操作",width:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e.editShow?r("el-tooltip",{attrs:{effect:"dark",content:"编辑",placement:"bottom"}},[r("el-button",{staticClass:"iconfont icon-biji",attrs:{type:"text"},on:{click:function(r){e._editUserInfo(t.row)}}})],1):e._e(),e._v(" "),e.editShow?r("el-tooltip",{attrs:{effect:"dark",content:t.row.isUsed?"停用":"启用",placement:"bottom"}},[r("el-button",{class:{"el-icon-circle-close-outline":t.row.isUsed,"el-icon-circle-check-outline":!t.row.isUsed},staticStyle:{"font-size":"20px"},attrs:{type:"text"},on:{click:function(r){e._editUserAuth(t.row)}}})],1):e._e()]}}])})],2),e._v(" "),r("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],staticClass:"page",attrs:{"current-page":e.queryParams.pageNumber,"page-size":e.queryParams.pageSize,layout:"total, prev, pager, next",total:e.total,disabled:e.queryingShowLoading},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),e.dialogAdd?r("el-dialog",{attrs:{title:e.userInfo.userId?"编辑":"新增",visible:e.dialogAdd,width:"60%"},on:{"update:visible":function(t){e.dialogAdd=t}}},[r("dialogAdd",{attrs:{show:e.dialogAdd,userInfo:e.userInfo},on:{"update:show":function(t){e.dialogAdd=t},refreshData:e.refreshData}})],1):e._e(),e._v(" "),e.dialogCheck?r("el-dialog",{attrs:{title:"查看",visible:e.dialogCheck,width:"60%"},on:{"update:visible":function(t){e.dialogCheck=t}}},[r("dialogCheck",{attrs:{show:e.dialogCheck,userInfo:e.userInfo},on:{"update:show":function(t){e.dialogCheck=t}}})],1):e._e()],1)},staticRenderFns:[]};var v=r("C7Lr")(f,h,!1,function(e){r("MQOw")},"data-v-45153439",null);t.default=v.exports}});