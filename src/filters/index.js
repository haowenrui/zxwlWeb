import { dateFormat} from "../tools/utils";

//区域filter：陕西省|西安市|雁塔区
let areaFilter = info => {
    let area = info.provinceName;
    if (info.cityName) {
        area += ' | ';
        area += info.cityName;
    }
    if (info.districtName) {
        area += ' | ';
        area += info.districtName;
    }
    return area;
};

export { areaFilter }

let dateFormatFilter = (value, format) => {
    if (value && value > 0) {
        if (!format) {
            format = 'yyyy-MM-dd';
        }
        return (dateFormat(format, new Date(value)));
    } else {
        return '';
    }
};
export { dateFormatFilter }


let userTypeFilter = (type) => {
    let result = '';
    switch(type){
        case 'SUPERADMIN':
            result = '超级管理员';
            break;
        case 'ADMIN':
            result = '管理员';
            break;
        case 'INSTALLER':
            result = '调试员';
            break;
        case 'USER':
            result = '用户';
            break;
    }
    return result;
};
export { userTypeFilter }


let deviceStatus = type => {
    let status = '';
    if(type == 'online'){
        status = '在线';
    }else{
        status = '离线'
    }
    return status;
}
export { deviceStatus }


let alarmStatus = status => {
    let result = '';
    if(status == 'processed'){
        result = '已处理';
    }else{
        result = '未处理'
    }
    return result;
}

export { alarmStatus }


let alarmType = type => {
    let result = '';
    switch(type){
        case 'smog':
            result = '烟雾报警';
            break;
        case 'malfunction':
            result = '故障报警';
            break;
        case 'lowPressure':
            result = '低压报警';
            break;
        case 'offline':
            result = '离线报警';
            break;
    }
    return result;
}

export { alarmType }

