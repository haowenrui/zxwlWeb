<style lang="scss" scoped>
	// 侧边栏
	.sidebar-container {
		transition: width 0.28s ease-out;
		width: 150px;
		height: 100%;
		position: fixed;
		top: 64px;
		bottom: 0;
		left: 0;
		z-index: 99;
		overflow-y: auto;
		padding-bottom: 108px;

		.el-menu {
			width: 100% !important;
			min-height: 100%;

			.links {
				padding: 0;
				text-decoration: none;

				.el-menu-item {
					height: 48px;
					line-height: 48px;
				}

				.el-menu-item.is-active {
					background: rgb(54, 62, 79) !important;
				}

			}
		}
	}

	.el-menu li {
		overflow: hidden;
	}

</style>

<template lang="html">
	<div class="sidebar-container">
		<el-menu @open="handleOpen" @close="handleClose" background-color="#495060" text-color="#fff" active-text-color="#2d8cf0"
		 :default-active="defaultPath" unique-opened>
			<template v-for="item in menus" v-if="!item.hidden">

				<el-submenu :index="item.key" v-if="item.children && item.children.length > 0">
					<template slot="title">
						<i :class="item.icon"></i>
						<span>{{item.name}}</span>
					</template>
					<router-link class="links" v-for="child in item.children" :key="child.path" v-if="!child.hidden" :to="child.path">
						<el-menu-item :index="item.path + '/'+child.path">
							{{child.name}}
						</el-menu-item>
					</router-link>
				</el-submenu>

                <template v-if="item.name === '监控中心'">
                    <router-link class="links" tag="a" target="_blank" v-if="!item.children || item.children.length == 0" :to="item.path">
                        <el-menu-item :index="item.path">
                            <i :class="item.icon"></i>{{item.name}} 
                        </el-menu-item>
                    </router-link>
                </template>
                <template v-else>
                    <router-link class="links" v-if="!item.children || item.children.length == 0" :to="item.path">
                        <el-menu-item :index="item.path">
                            <i :class="item.icon"></i>{{item.name}} 
                        </el-menu-item>
                    </router-link>
                </template>

			</template>
		</el-menu>
	</div>
</template>

<script>
    import {
		mapState,
		mapMutations
    } from "vuex";
    
	import MenuUtils from "@/tools/menuUtils";


	export default {
		data() {
			return {
                defaultPath: '',
				menus: [],
			}
		},
		created() {
			document.title = 'zxwl—' + this.$route.name;
		},
		watch: {
			$route() {
				document.title = 'zxwl—' + this.$route.name;
				this.defaultPath = this.$route.path;
			},
		},
		beforeUpdate() {
			this.defaultPath = this.$route.path;
        },
        mounted(){
			this.queryMenu();
        },
		methods: {
            ...mapMutations(["setMenus"]),
			async queryMenu() {
                const res = await this.$http.get(this.$urlApi.getPermission,{
                    level: 1,
                    type: 'WEB'
                })
                MenuUtils(this.menus, res.data);
				// this.setMenus(this.menus);
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}

</script>
