import env from './env'

let BASE_URL = env.getHttpUrl()

console.log(BASE_URL)

let urlApi = {
    //登录
    login: '/system/login',
    queryCompanyList: '/company/loginUserCompanys',
    queryPermission: '/role/permissionItems',
    getPermission: '/role/permissionTree',
    logout: '/system/logout',

    //角色管理
    queryRoleList: '/role/list',
    queryListByCompCode: '/role/listByCompanyId',
    addRole: '/role/addEdit',
    deleteRole: '/role/delete',

    //公司管理
    getCompany: '/company/companyTree',
    getCompanyInfo: '/company/infoById',
    addCompony: '/company/add',
    editCompony: '/company/edit',
    deleteCompony: '/company/delete',

    //用户管理
    getUserList: '/user/list',
    modifyPwd: '/user/editPassword',
    editLoginAuth: '/user/editLoginAuthority',
    addUser: '/user/add',
    editUser: '/user/edit',

    //设备管理
    equipmentDelete: '/equipment/delete',
    queryEquipmentInfo: '/equipment/findByDeviceCode',
    equipmentList: '/equipment/findByPage',
    importDevice: '/equipment/importDevice',
    addEquipment: '/equipment/save',
    modifyEquipment: '/equipment/update'
}

for (let key in urlApi) {
	// urlApi[key] = BASE_URL + '/vue' + urlApi[key]
	urlApi[key] = BASE_URL + urlApi[key]
}
export default urlApi