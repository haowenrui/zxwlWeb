import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false,
        currentUser: null, //当前用户信息
        menus: [], //菜单栏
        permissionList: []
    },
    mutations: mutations
})