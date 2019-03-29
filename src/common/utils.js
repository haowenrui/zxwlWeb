export default {
}

/**
 * 获取权限
 */
import store from '../store/AppStore';
export function permissionShow(permissionCode){
    let permissionList = store.state.permissionList;
    let showFlag = false;
    permissionList.forEach(item => {
        if(item.code == permissionCode){
            showFlag = true;
        }
    });

    return showFlag;
}
