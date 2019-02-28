<template>
	<div class="login">
		<div class="bannder_home">
			<!-- <a href="#"><img src="../../assets/images/logos.png" alt=""></a> -->
		</div>
		<div class="login-con">

			<div class="left">
				<!-- <img src="../../assets/images/login-bg.png" alt=""> -->
			</div>
			<div class="right">
				<div class="loginbox">
					<div class="lgbox">
						<div class="menutext">
							<span class="active">登录</span>
						</div>
						<div class="rowinput phoneinput" style="margin-top:60px; margin-bottom:20px;">
							<em>
								<img src="../../assets/images/phone.png" alt="">
							</em>
							<el-input v-model="login.userName" size="medium" placeholder="用户名" maxlength="11"></el-input>
						</div>
						<div class="rowinput last phoneinput">
							<em>
								<img src="../../assets/images/suo.png" alt="">
							</em>
							<el-input v-model="login.password" placeholder="密码" maxlength="20" minlength="6" size="medium" type="password"
							 @keyup.enter.native="loginFun"></el-input>
						</div>
						<div class="wxloginbox">
							<span class="text" @click="openforgetpassword">忘记密码?</span>
						</div>
						<div class="rowinput1">
							<el-button type="primary" style="width:100%" @click="loginFun" size="medium" :loading="loading">登录</el-button>
						</div>
						 
					</div>
				</div>
			</div>
		</div>

		<div class="copyright">
			<p>xzwl有限公司</p>
		</div>

		<!-- 忘记密码   -->
		<forgetPwd :show="forgetpassword"></forgetPwd>

	</div>
</template>

<script>
    
    import forgetPwd from './forgetPwd';
    import madeSecrect from 'md5';
    import { jsAddCookie } from '@/tools/utils';

	export default {
		data() {
			return {
				loading: false,
				login: {
					userName: '',
                    password: '',
                    loginType: 'WEB'
				},
				forgetpassword: 0,
			};
		},
		components: {
			forgetPwd
		},
		methods: {
			// 打开忘记密码
			openforgetpassword() {
				this.forgetpassword = Date.now();
			},
			 
			// 登录
			async loginFun() {
				if (this.login.userName == "") {
					this.$message({
                        type: 'warning',
						message: "请输入用户名"
					});
					return;
				}
				if (this.login.password == "") {
					this.$message({
                        type: 'warning',
						message: "请输入密码"
					});
					return;
				}
				
                this.loading = true;
                
                // this.login.password = madeSecrect(this.login.password);
                const res = await this.$http.post(this.$urlApi.login,this.login);

                if(res.result == 'SUCCESS'){
                    jsAddCookie('_TOKEN_',res.data._token.token);
                    jsAddCookie('_CURRENT_COMPANY_ID_',res.data._user.company.id);
                    jsAddCookie('_CURRENT_COMPANY_NAME_',res.data._user.company.name);

                    this.$router.replace({
                        // path: '/home'
                        path: '/roleManage'
                    });
                }

                
            },
		},
	};

</script>

<style lang="scss" scoped>

    .bannder_home {
        height: 70px;
        width: 100%;
        background-color: #343639;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;

        & > a {
            display: block;
            width: 1200px;
            margin: 0 auto;
            height: 70px;

            & > img {
                height: 30px;
                margin-top: 20px;
            }
        }
    }

	.rowinput {
		&.last {
			margin-bottom: 5px;
		}
	}

	.wxloginbox {
		line-height: 1;
		margin-bottom: 20px;
		text-align: right;

		.text {
			text-align: right;
			margin-right: 0;
			cursor: pointer;
			line-height: 30px;
			color: #FF6562;

			&:hover {
				text-decoration: underline;
			}
		}
	}

    .phoneinput {
        position: relative;

        & > em {
            display: block;
            width: 40px;
            height: 40px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;

            & > img {
                width: 15px
            }
        }

        & >>> .el-input__inner {
            padding-left: 38px;
            height: 40px;
        }

        & /deep/ .el-input__inner {
            padding-left: 38px;
            height: 40px;
        }
    }

	.othenlogin {
		height: 44px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f7f7f7;
		color: #3a2929;
		cursor: pointer;

		&:hover {
			opacity: 0.7;
		}

		s {
			text-decoration: none;
			margin-right: 80px;
		}

		img {
			height: 30px;
			cursor: pointer;
			margin-right: 8px;
		}
	}



	.copyright {
		text-align: center;
		font-size: 12px;
		padding-top: 10px;
		line-height: 1;
		padding-top: 20px;

		p {
			margin-bottom: 10px;
		}
	}

	.lgbox {
		width: 336px;
		margin: 0 auto;
		margin-top: 50px;
	}

	.rowinput1 {
		margin-bottom: 14px;

		button {
			height: 44px;
		}
	}

	.menutext {
		width: 100%;
		font-size: 28px;
		color: #3a2929;
		display: flex;
		justify-content: center;
		margin-bottom: 34px;
		cursor: pointer;

		span {
			display: block;

			&:first-child {
				margin-right: 30px;
			}

			&.active {
				border-bottom: 3px solid rgba(255, 101, 100, 0.15);
				color: #FF6562;
			}
		}
	}

	.login {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		overflow: auto;

		&-con {
			width: 900px;
			height: 560px;
			margin: 0 auto;
			margin-top: 10%;
			display: flex;
			box-shadow: 0 1px 20px 5px rgba(200, 200, 200, 0.2);

			.left {
				width: 436px;
				height: 100%;
				overflow: hidden;

				img {
					display: block;
					width: 100%;
					min-height: 100%;
				}
			}

			.right {
				flex: 1;
				background: #fff;
                margin-right: 0;
			}
		}
	}

</style>
