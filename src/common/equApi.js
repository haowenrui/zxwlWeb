import env from './env'


let BASE_URL = 'http://39.98.173.65:9001';
// let BASE_URL = 'http://192.168.43.71:9001';



let equApi = {
    //设备管理
    equipmentDelete: '/equipment/delete',
    queryEquipmentInfo: '/equipment/findByEquipmentId',
    equipmentList: '/equipment/findDeviceByInsUser',
    importDevice: '/equipment/importDevice',
    addEquipment: '/equipment/save',
    modifyEquipment: '/equipment/update',
    deleteEquipment: '/equipment/delete',
    downloadTemplate: '/equipment/downloadTemplatezxwl',
    findEquipmentItemHistory: '/equipment/findEquipmentItemHistory',
    findEquipmentModleItem: '/equipment/findEquipmentModleItem',

    alarmList: '/alarm/list',
    alarmTypes: '/alarm/alarmTypes',
    alarmStatistics: '/statistics/alarmType',
    deviceTypeStatistics: '/statistics/deviceType',
    devicesStatistics:'/statistics/devices',
    failureCountStatistics: '/statistics/failureCount',
    failureRateStatistics: '/statistics/failureRate',
    monthlyAlarmStatistics: '/statistics/monthlyAlarm',

    sendAlarmMessage: '/alarm/sendAlarmMessage',
    updateAlarmStatus: '/alarm/updateAlarmStatus',

    hostList: '/host/findDeviceByInsUser',
    hostDelete: '/host/delete',
    hostSave: '/host/save',
    hostUpdate: '/host/update',
    findByHostId: '/host/findByHostId',

    indexList: '/equipmentItem/list',
    indexType: '/equipmentItem/getItemType',
    indexEdit: '/equipmentItem/eidt',
    indexDelete: '/equipmentItem/delete',
    indexAdd: '/equipmentItem/add',
    getEquipmentConfiger: '/equipmentConfiger/getEquipmentConfiger',
    findMiniTypeByNoteAndParentCode: '/equipmentConfiger/findMiniTypeByNoteAndParentCode',
    indexDetail: '/equipmentItem/detail'
}

for (let key in equApi) {
	equApi[key] = BASE_URL + equApi[key]
}
export default equApi