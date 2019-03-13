import env from './env'

let BASE_URL = 'http://39.98.173.65:9001';

let equApi = {
    //设备管理
    equipmentDelete: '/equipment/delete',
    queryEquipmentInfo: '/equipment/findByDeviceCode',
    equipmentList: '/equipment/findDeviceByInsUser',
    importDevice: '/equipment/importDevice',
    addEquipment: '/equipment/save',
    modifyEquipment: '/equipment/update'
}

for (let key in equApi) {
	equApi[key] = BASE_URL + equApi[key]
}
export default equApi