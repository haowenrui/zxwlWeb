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
