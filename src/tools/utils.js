export function dateFormat(fmt, date) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


export function getQueryVariable(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href))
        return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
}

export function toQueryString(param, key, encode) {
    if (param instanceof FormData) {
        return param;
    }

    var paramStr = '';

    //当值为null时转为空字串
    if (param == null) {
        paramStr += '&' + key + '=' + '';
    }

    var t = typeof(param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += toQueryString(param[i], k, encode);
        }
    }
    return paramStr;
}

//当前时间 yyyy-MM-dd hh:mm:ss
export function curTime(date, format) {
    const dateCur = new Date();
    date.setHours(dateCur.getHours(), dateCur.getMinutes(), dateCur.getSeconds());
    return dateFormat(format, date);
}

//今天凌晨时间 yyyy-MM-dd 00:00:00
export function todayWeeHoursTime(date, format) {
    date.setHours(0, 0, 0);
    return dateFormat(format, date);;
}

//今天凌晨时间 yyyy-MM-dd 23:59:059
export function weeHoursTime(date, format) {
    date.setHours(23, 59, 59);
    return dateFormat(format, date);;
}


/**
 * 校验日期
 * @param startDate
 * @param endDate
 * @param checkNull  是否判断日期为空
 * @param dateSpanMonth  两个时间最大跨度（月）值为0时不校验
 */
export function checkDateValid(startDate, endDate, checkNull, dateSpanMonth = 0) {
    let message = '';
    if (startDate && endDate && startDate > endDate) {
        message = '开始时间不能大于结束时间';
    }

    if (checkNull) {
        if (startDate && !endDate) {
            message = '请选择结束时间';

        }
        if (!startDate && endDate) {
            message = '请选择开始时间';
        }
    }
    if (dateSpanMonth > 0) {
        const beginYM = startDate.split("-");
        const endYM = endDate.split("-");
        const dateRange =
            (endYM[0] - beginYM[0]) * 12 + (endYM[1] - beginYM[1]) + 1;
        if (Math.abs(dateRange) > dateSpanMonth) {
            message = `时间跨度不能超过${dateSpanMonth}个月`
        }
    }
    return message;
}

/**
 * js 原生cookie add
 * 
 * @param {*} name 
 * @param {*} value 
 * @param {*} expiresSec 
 */
export function jsAddCookie(name, value, expiresSec) {
    var cookieString = name + "=" + encodeURI(value);
    //判断是否设置过期时间
    if (expiresSec > 0) {
        var date = new Date();
        date.setTime(date.getTime() + expiresSec * 1000);
        cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
}
/**
 * js 原生cookie get
 * 
 * @param {*} name 
 */
export function jsGetCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return "";
}

/**
 * js 原生cookie delete
 * 
 * @param {*} name 
 */
export function jsDeleteCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=v; expires=" + date.toGMTString();
}
/**
 * 获取当前url参数
 * @param {*} name
 */
export function getUrlKey(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

export function getPreMonthDate(format = 'yyyy-MM') {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    return dateFormat(format, date);
}


//下载
export function downloadFile(url) {
    let a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "");
    document.body.append(a);
    a.click();
    a.remove();
}

export function formatFloat(num, digit) {
    var m = Math.pow(10, digit);
    return Math.round(num * m, 2) / m;
}

//校验电话
export function checkTel(tel) {
    var mobile = /^1\d{10}$/ , phone = /^0\d{2,3}-?\d{7,8}$/;
    return mobile.test(tel) || phone.test(tel);
}


/**
 * 获取上个月
 */
export function getPreMonth(date, onlyeMoth = false) {
    let arr = date.split('-');
    const year = arr[0]; //获取当前日期的年份
    const month = arr[1]; //获取当前日期的月份
    const day = arr[2]; //获取当前日期的日
    let days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    let year2 = year;
    let month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    let day2 = day;
    let days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    let t2 = '';
    if (onlyeMoth) {
        t2 = year2 + '-' + month2;
    } else {
        t2 = year2 + '-' + month2 + '-' + day2;
    }
    return t2;
}

