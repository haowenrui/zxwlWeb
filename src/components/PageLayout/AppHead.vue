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

			<el-popover ref="popoverlogout" placement="bottom" width="160" v-model="visible">
				<div style="text-align: right; margin: 0">
					<el-button size="mini" type="primary" plain @click="logout">退出</el-button>
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
	</section>
</template>

<script>
	import {
        jsAddCookie,
        jsGetCookie,
		jsDeleteCookie
	} from '@/tools/utils';

	export default {
		name: 'appHead',
		data() {
			return {
                visible: false,
                companyList: [],
                companyId: '',
                companyName: ''
			}
		},
		created() {

		},
		mounted() {
            this.companyId = jsGetCookie('_CURRENT_COMPANY_ID_');
            this.companyName = decodeURI(jsGetCookie('_CURRENT_COMPANY_NAME_'));
			this.queryCompanyList();
		},
		methods: {
			async logout() {
				const res = await this.$http.post(this.$urlApi.logout);
				if (res.result == 'SUCCESS') {
					this.visible = false;
					jsDeleteCookie('_TOKEN_');
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
            }
		}
	}

</script>
