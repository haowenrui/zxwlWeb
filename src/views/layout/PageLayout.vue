<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../assets/styles/mixin";

	.app-wrapper {
		position: relative;
		height: 100%;
		width: 100%;

		.main-container {
			transition: margin-left 0.28s ease-out;
			margin-left: 150px;
			padding: 20px;
			padding-top: 20px;
		}
	}

	.box-card {
		margin-bottom: 40px;
		min-width: $app-min-width;
	}

</style>
<template lang="html">
	<div class="app-wrapper">
		<head-top></head-top>
		<sidebar></sidebar>
		<div class="main-container">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<app-breadcrumb></app-breadcrumb>
				</div>
				<app-main></app-main>
			</el-card>
			<app-footer></app-footer>
		</div>
	</div>
</template>

<script>
	import HeadTop from "@/components/PageLayout/AppHead.vue";
	import Sidebar from "@/components/PageLayout/AppSideBar.vue";
	import AppMain from "@/components/PageLayout/AppMain.vue";
	import AppFooter from "@/components/PageLayout/AppFooter.vue";
	import AppBreadcrumb from "@/components/PageLayout/AppBreadcrumb.vue";
	import store from "../../store/AppStore";
	import env from '@/common/env';

	import {
		mapState,
		mapMutations
	} from "vuex";
	import constants from "../../tools/constants";
	import {
		jsAddCookie,
		jsGetCookie,
		jsDeleteCookie,
		getUrlKey
	} from '../../tools/utils'
	const lastTempT = jsGetCookie("tempT");
	export default {
		name: "layout",
		components: {
			HeadTop,
			Sidebar,
			AppMain,
			AppFooter,
			AppBreadcrumb
		},
		data() {
			return {
				userName: "",
				breadcrumbHide: true,
				menus: [],
			};
		},
		mounted() {
		},
		created() {

		},
		watch: {},
		methods: {
			
		}
	};

</script>
