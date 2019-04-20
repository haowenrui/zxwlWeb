import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/PageLayout';
const Login = () =>
    import ("@/views/login/index");
const RoleManage = () =>
    import ("@/views/roleManage/index");
const UserManage = () =>
    import ("@/views/userManage/index");
const AreaManage = () =>
    import ("@/views/areaManage/index");
const DataStatistics = () =>
    import ("@/views/dataStatistics/index");
const AlarmManage = () =>
    import ("@/views/home/index");
const EquipmentManage = () =>
    import ("@/views/equManage/index");
const AlarmList = () =>
    import ("@/views/alarmManage/index");

Vue.use(Router)

export default new Router({
    routes: [
        // 默认首页
        {
            path: "/",
            redirect: "/login",
            hidden: true
        },
        
        {
            path: "/login",
            name: "login",
            component: Login,
            name: "登录"
        },

        // {
        //     path: "/home",
        //     name: "home",
        //     component: Home,
        //     name: "报警中心"
        // },

        {
            path: "/",
            component: Layout,
            redirect: "/alarmList",
            noDropdown: false, //只有一个节点
            children: [
                {
                    path: "/alarmList",
                    component: AlarmList,
                    name: "报警历史"
                }
            ]
        },

        {
            path: "/",
            component: Layout,
            redirect: "/roleManage",
            noDropdown: false, //只有一个节点
            children: [
                {
                    path: "/roleManage",
                    component: RoleManage,
                    name: "角色管理"
                }
            ]
        },

        {
            path: "/",
            component: Layout,
            redirect: "/userManage",
            noDropdown: false, //只有一个节点
            children: [
                {
                    path: "/userManage",
                    component: UserManage,
                    name: "用户管理"
                }
            ]
        },

        {
            path: "/",
            component: Layout,
            redirect: "/companyManage",
            noDropdown: false, //只有一个节点
            children: [
                {
                    path: "/companyManage",
                    component: AreaManage,
                    name: "片区管理"
                }
            ]
        },

        {
            path: "/",
            component: Layout,
            redirect: "/dataStatistics",
            noDropdown: false, //只有一个节点
            children: [
                {
                    path: "/dataStatistics",
                    component: DataStatistics,
                    name: "数据统计"
                }
            ]
        },

        {
            path: "/",
            component: Layout,
            redirect: "/equipmentManage",
            noDropdown: false, //只有一个节点
            children: [
                {
                    path: "/equipmentManage",
                    component: EquipmentManage,
                    name: "设备管理"
                }
            ]
        },

        {
            path: "/monitorCenter",
            name: "monitorCenter",
            component: AlarmManage,
            name: "报警中心"
        },
       
    ]
});