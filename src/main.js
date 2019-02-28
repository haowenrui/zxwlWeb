// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/AppStore'
import router from './router'
import '../theme/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import './assets/css/iconFont.css'; //iconfont
import './assets/css/public.css';
import './assets/css/element-override.css';
import './assets/font-awesome/css/font-awesome.css';
import Common from './common/com';
import * as filters from './filters/index';
import BaiduMap from 'vue-baidu-map';


Vue.use(ElementUI);
Vue.use(Common);
Vue.use(BaiduMap,{
    ak: 'BZVuuofxGfmKM1SpcLt8jzceVmQYKaAs'
})

// NProgress.inc(0.2)
// NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
    NProgress.start(); // 开启progress
    next()
});

router.afterEach(() => {
    NProgress.done() // 结束Progress
});


Vue.config.productionTip = false


Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});


/* eslint-disable no-new */
var app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
export { app }