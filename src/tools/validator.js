var validPhone = (rule, value, callback) => {
  let reg = new RegExp('^[1][3,4,5,6,7,8,9][0-9]{9}$')
  if (!reg.test(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}
export { validPhone }

var validServicePhone = (rule, value, callback) => {
    let reg = new RegExp('^[0-9]{5,15}$')
    if (!reg.test(value)) {
      callback(new Error('请输入正确的电话号码'))
    } else {
      callback()
    }
}
export { validServicePhone }

//校验电话
let checkTel = (tel) => {
    var mobile = /^1[3,4,5,6,7,8,9]\d{9}$/;
    return mobile.test(tel);
}

export { checkTel }


var validEmail = (rule, value, callback) => {
    let reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$')
    if(!value){
        callback()
    }else{
        if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱地址'))
        } else {
            callback()
        }
    }
  }
  export { validEmail }
