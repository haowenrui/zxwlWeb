<style lang="scss" scoped>
	.layout-head {
    height: 64px;
    overflow: hidden;
    .head-fixed {
      width: 100%;
      background: #495060;
      position: fixed;
      top: 0;
      height: 64px;
      z-index: 100;
    }
  }

  .logo {
    margin: 0;
    height: 64px;
    display: inline-block;

    & > img{
        margin-left: 16px;
        margin-top: 7px;
    }
  }

  .phone-links {
    position: absolute;
    top: 25px;
    left: 180px;
    color: #A5B0C0;
    font-size: 13px;
  }

  .title {
    position: absolute;
    top: 20px;
    right: 600px;
    color: #ffffff;
    font-size: 18px;
  }

  .button-user {
    height: 64px;
    margin-right: 20px;
    float: right;
    text-align: center
  }

  .div-box{
      margin-top: 15px;
      margin-right: 15px;
  }
</style>

<template lang="html">
	<section class="layout-head">
		<div class="head-fixed clearfix">
			<h1 class="logo fl">
				<img height="40" src="../../assets/images/logo.png" alt="">
			</h1>

			<el-popover ref="popoverlogout" placement="bottom" width="140" v-model="visible">
				<div class="text-center">
                    <ul>
                        <li>
					        <el-button class="mb10 select-min" size="mini" type="primary" plain @click="modifyPwdVisible = true">修改密码</el-button>
                        </li>
                        <li>
					        <el-button class="select-min" size="mini" type="primary" plain @click="logout">退出</el-button>
                        </li>
                    </ul>
				</div>
			</el-popover>
			<el-button type="text" class="button-user fr" v-if="companyName"
			 v-popover:popoverlogout @click=" visible = true">
				{{companyName}}<i class="el-icon-more el-icon--right"></i>
            </el-button>

            <div class="div-box fr" v-if="companyList && companyList.length > 1">
                <el-select size="small" style="width:140px" class="content-v-center" v-model="companyId" @change="changeCompany">
                    <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
		</div>

        <el-dialog v-if="modifyPwdVisible" title="修改密码" :visible.sync="modifyPwdVisible" width="60%">
			<div class="clearfix mt10 mb10">
                <el-form :model="modifyPwdForm" size="small" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="旧密码" prop="oldPassword">
                        <el-input type="password" class="input-school-name" v-model="modifyPwdForm.oldPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password">
                        <el-input type="password" class="input-school-name" v-model="modifyPwdForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPwd">
                        <el-input type="password" class="input-school-name" v-model="modifyPwdForm.checkPwd" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="default" @click="modifyPwdVisible = false" size="small">取消</el-button>
				<el-button type="primary" @click="submit" size="small">确定</el-button>
			</span>
		</el-dialog>
	</section>
</template>

<script>
	import {
        jsAddCookie,
        jsGetCookie,
		jsDeleteCookie
    } from '@/tools/utils';
    import {
		mapState,
		mapMutations
    } from "vuex";

	export default {
		name: 'appHead',
		data() {
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.modifyPwdForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
			return {
                visible: false,
                modifyPwdVisible: false,
                companyList: [],
                companyId: '',
                companyName: '',
                modifyPwdForm: {
                    oldPassword: '',
                    password: '',
                    checkPwd: '',
                    userId: ''
                },
                rules2: {
                    oldPassword: [
                        { required: true,message: '请输入旧密码', trigger: 'blur' }
                    ],
                    password: [
                        { required: true,message: '请输入新密码', trigger: 'blur' }
                    ],
                    checkPwd: [
                        { required: true,validator: validatePass2, trigger: 'blur' }
                    ],
                }
			}
        },
        computed: {
            ...mapState(["permissionList"])
        },
		created() {

		},
		mounted() {
            this.companyId = jsGetCookie('_CURRENT_COMPANY_ID_');
            this.companyName = decodeURI(jsGetCookie('_CURRENT_COMPANY_NAME_'));
            this.queryCompanyList();
            this.queryCurrentPermission();
		},
		methods: {
            ...mapMutations(["setPermissionList"]),
			async logout() {
				const res = await this.$http.post(this.$urlApi.logout);
				if (res.result == 'SUCCESS') {
					this.visible = false;
                    jsDeleteCookie('_TOKEN_');
                    jsDeleteCookie('_CURRENT_COMPANY_ID_');
                    jsDeleteCookie('_CURRENT_COMPANY_NAME_');
                    jsDeleteCookie('_CURRENT_COMPANY_AREA_');
                    jsDeleteCookie('_CURRENT_USER_ID_');
					document.title = 'zxwl';
					this.$router.push({
						path: 'login'
					})
				}
			},
			async queryCompanyList() {
				const res = await this.$http.get(this.$urlApi.queryCompanyList);
				if (res.result == 'SUCCESS') {
                    this.companyList = res.data;
				}
            },
            async queryCurrentPermission(){
				const res = await this.$http.get(this.$urlApi.queryCurrentPermission,{
                    type: 'WEB',
                    companyId: this.companyId
                });

                this.setPermissionList(res.data);
            },
            changeCompany(){
                // var href = window.location.href;
                // if (href.indexOf('homeIndex') == -1) {
                //     window.location.href = "/web/#/role/list";
                // } else {
                //     window.location.reload()
                // }
                jsAddCookie('_CURRENT_COMPANY_ID_',this.companyId);
                this.companyList.forEach(item => {
                    if(item.id == this.companyId){
                        this.companyName = item.name;
                    }
                })
                jsAddCookie('_CURRENT_COMPANY_NAME_',this.companyName);
                window.location.reload()
            },
            submit(){
                this.$refs.ruleForm2.validate(value => {
                    if(value){
                        this.modifyPwd();
                    }
                })
            },
            async modifyPwd(){
                this.modifyPwdForm.userId = jsGetCookie('_CURRENT_USER_ID_');
                const res = await this.$http.post(this.$urlApi.modifyPwd,this.modifyPwdForm);
                if(res.status == 'SUCCESS'){
                    this.$message.success('修改成功');
                    this.modifyPwdVisible = false;
                    this.$refs.ruleForm2.resetFields();
                }
            }
		}
	}

</script>
