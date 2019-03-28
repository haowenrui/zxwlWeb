import env from './env'

let BASE_URL = 'http://39.98.173.65:9001';


let equApi = {
    //设备管理
    equipmentDelete: '/equipment/delete',
    queryEquipmentInfo: '/equipment/findByEquipmentId',
    equipmentList: '/equipment/findDeviceByInsUser',
    importDevice: '/equipment/importDevice',
    addEquipment: '/equipment/save',
    modifyEquipment: '/equipment/update',
    deleteEquipment: '/equipment/delete',
    downloadTemplate: '/equipment/downloadTemplate',

    alarmList: '/alarm/list',
    alarmStatistics: '/statistics/alarmType',
    deviceTypeStatistics: '/statistics/deviceType',
    devicesStatistics:'/statistics/devices',
    failureCountStatistics: '/statistics/failureCount',
    failureRateStatistics: '/statistics/failureRate',
    monthlyAlarmStatistics: '/statistics/monthlyAlarm'
}

for (let key in equApi) {
	equApi[key] = BASE_URL + equApi[key]
}
export default equApi