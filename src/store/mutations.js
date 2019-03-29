export default {
    loading(state) {
        state.loading = true
    },
    unloading(state) {
        state.loading = false
    },
    setCurrentUserInfo(state, currentUser) {
        state.currentUser = currentUser;
    },

    setMenus(state, meuns) {
        state.menus = meuns;
    },

    setPermissionList(state, list) {
        state.permissionList = list;
    }
}