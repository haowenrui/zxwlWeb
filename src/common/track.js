import {
    jsGetCookie
} from '../tools/utils'

export default {
    /**
     * 统计打点
     * @param {*} eventId  事件ID
     * @param {*} ext  扩展字段
     */
    track(eventId, ext) {
        xysBuryPoint.track(jsGetCookie("alipayUID"), eventId, '', ext);
    },

    /**
     * 统计打点
     * @param {*} eventId  事件ID
     */
    track(eventId) {
        let evtName = '';
        switch (eventId) {
            case 2:
                evtName = '学校管理';
                break;
            case 3:
                evtName = '学校公海';
                break;
            case 4:
                evtName = '签约学校审核';
                break;
            case 5:
                evtName = '提现账号审核';
                break;
            case 6:
                evtName = '服务商管理';
                break;
            case 7:
                evtName = '数据统计';
                break;
            case 8:
                evtName = '学生管理';
                break;
            case 9:
                evtName = '缴费账单管理';
                break;
            case 10:
                evtName = 'Excel核验';
                break;
            case 11:
                evtName = '资金管理';
                break;
            case 12:
                evtName = '角色管理';
                break;
            case 13:
                evtName = '操作人员管理';
                break;
            case 14:
                evtName = '机构审核';
                break;
            case 15:
                evtName = '代理政策管理';
                break;
            case 16:
                evtName = '金融产品管理';
                break;
            case 17:
                evtName = '金融产品审核';
                break;
            case 18:
                evtName = '学校管理-K12学校';
                break;
            case 19:
                evtName = '学校管理-K12学校-查询';
                break;
            case 20:
                evtName = '学校管理-K12学校-新增学校';
                break;
            case 21:
                evtName = '学校管理-K12学校-查看';
                break;
            case 22:
                evtName = '学校管理-K12学校-编辑';
                break;
            case 23:
                evtName = '学校管理-K12学校-银行账户管理';
                break;
            case 24:
                evtName = '学校管理-K12学校-通联分期';
                break;
            case 25:
                evtName = '学校管理-K12学校-信用卡';
                break;
            case 26:
                evtName = '学校管理-K12学校-提现记录';
                break;
            case 27:
                evtName = '学校管理-教培机构';
                break;
            case 28:
                evtName = '学校管理-教培机构-查询';
                break;
            case 29:
                evtName = '学校管理-教培机构-新增商户';
                break;
            case 30:
                evtName = '学校管理-教培机构-查看';
                break;
            case 31:
                evtName = '学校管理-教培机构-编辑';
                break;
            case 32:
                evtName = '学校公海-查询';
                break;
            case 33:
                evtName = '学校公海-下载模板';
                break;
            case 34:
                evtName = '学校公海-导入';
                break;
            case 35:
                evtName = '学校公海-新增';
                break;
            case 37:
                evtName = '学校公海-新增-确定';
                break;
            case 38:
                evtName = '签约学校审核-查询';
                break;
            case 39:
                evtName = '签约学校审核-查看';
                break;
            case 40:
                evtName = '签约学校审核-审核';
                break;
            case 41:
                evtName = '签约学校审核-审核-审核通过';
                break;
            case 42:
                evtName = '签约学校审核-审核-审核驳回';
                break;
            case 43:
                evtName = '提现账户审核-查询';
                break;
            case 44:
                evtName = '提现账户审核-查看';
                break;
            case 45:
                evtName = '提现账户审核-审核';
                break;
            case 46:
                evtName = '提现账户审核-审核-审核通过';
                break;
            case 47:
                evtName = '提现账户审核-审核-审核驳回';
                break;
            case 49:
                evtName = '服务商管理-查询';
                break;
            case 50:
                evtName = '服务商管理-新增服务商';
                break;
            case 51:
                evtName = '服务商管理-查看';
                break;
            case 52:
                evtName = '服务商管理-编辑';
                break;
            case 53:
                evtName = '服务商管理-服务商保护';
                break;
            case 54:
                evtName = '服务商管理-服务商保护-查询';
                break;
            case 56:
                evtName = '服务商管理-服务商保护-提交';
                break;
            case 58:
                evtName = '服务商管理-服务商保护-提交-确定';
                break;
            case 59:
                evtName = '数据统计-增长数据';
                break;
            case 60:
                evtName = '数据统计-增长数据-查询';
                break;
            case 61:
                evtName = '数据统计-账单数据';
                break;
            case 62:
                evtName = '数据统计-账单数据-查询';
                break;
            case 63:
                evtName = '数据统计-账单数据-excel数据导出';
                break;
            case 64:
                evtName = '数据统计-渠道数据';
                break;
            case 65:
                evtName = '数据统计-渠道数据-查询';
                break;
            case 66:
                evtName = '数据统计-渠道数据-excel数据导出';
                break;
            case 68:
                evtName = '学生管理-查询';
                break;
            case 69:
                evtName = '学生管理-查看';
                break;
            case 70:
                evtName = '学生管理-编辑';
                break;
            case 72:
                evtName = '学生管理-编辑-确定';
                break;
            case 74:
                evtName = '缴费账单管理-普通查询';
                break;
            case 75:
                evtName = '缴费账单管理-普通查询-查询';
                break;
            case 76:
                evtName = '缴费账单管理-普通查询-查看';
                break;
            case 77:
                evtName = '缴费账单管理-普通查询-删除';
                break;
            case 78:
                evtName = '缴费账单管理-精确查询';
                break;
            case 79:
                evtName = '缴费账单管理-精确查询-查询';
                break;
            case 80:
                evtName = '缴费账单管理-精确查询-查看';
                break;
            case 81:
                evtName = '缴费账单管理-精确查询-删除';
                break;
            case 83:
                evtName = 'excel核验-核验';
                break;
            case 86:
                evtName = '资金管理-全部';
                break;
            case 87:
                evtName = '资金管理-学校';
                break;
            case 88:
                evtName = '资金管理-学校-查询';
                break;
            case 89:
                evtName = '权限管理-角色管理';
                break;
            case 90:
                evtName = '权限管理-角色管理-新增角色';
                break;
            case 92:
                evtName = '权限管理-角色管理-新增角色-确定';
                break;
            case 93:
                evtName = '权限管理-角色管理-查看';
                break;
            case 94:
                evtName = '权限管理-角色管理-编辑';
                break;
            case 96:
                evtName = '权限管理-角色管理-编辑-确定';
                break;
            case 97:
                evtName = '权限管理-操作人员管理';
                break;
            case 98:
                evtName = '权限管理-操作人员管理-查询';
                break;
            case 99:
                evtName = '权限管理-操作人员管理-新增操作人员';
                break;
            case 101:
                evtName = '权限管理-操作人员管理-新增操作人员-确定';
                break;
            case 102:
                evtName = '权限管理-操作人员管理-查看';
                break;
            case 103:
                evtName = '权限管理-操作人员管理-编辑';
                break;
            case 105:
                evtName = '权限管理-操作人员管理-编辑-确定';
                break;
            case 107:
                evtName = '机构审核-查询';
                break;
            case 109:
                evtName = '代理政策-查询';
                break;
            case 110:
                evtName = '代理政策-新建代理政策';
                break;
            case 112:
                evtName = '代理政策-新建代理政策-确定';
                break;
            case 113:
                evtName = '代理政策-新建代理政策-下载';
                break;
            case 114:
                evtName = '代理政策-新建代理政策-编辑';
                break;
            case 116:
                evtName = '代理政策-新建代理政策-编辑-确定';
                break;
            case 117:
                evtName = '代理政策-新建代理政策-删除';
                break;
            case 118:
                evtName = '金融服务-金融产品管理';
                break;
            case 119:
                evtName = '金融服务-金融产品管理-查询';
                break;
            case 120:
                evtName = '金融服务-金融产品管理-新建产品';
                break;
            case 121:
                evtName = '金融服务-金融产品管理-新建产品-预览';
                break;
            case 123:
                evtName = '金融服务-金融产品管理-新建产品-提交';
                break;
            case 124:
                evtName = '金融服务-金融产品管理-查看';
                break;
            case 125:
                evtName = '金融服务-金融产品管理-编辑';
                break;
            case 126:
                evtName = '金融服务-金融产品管理-编辑-预览';
                break;
            case 128:
                evtName = '金融服务-金融产品管理-编辑-提交';
                break;
            case 129:
                evtName = '金融服务--金融产品管理-白名单';
                break;
            case 130:
                evtName = '金融服务--金融产品管理-白名单-上架';
                break;
            case 131:
                evtName = '金融服务--金融产品管理-白名单-查询';
                break;
            case 133:
                evtName = '金融服务--金融产品审核';
                break;
            case 134:
                evtName = '金融服务--金融产品审核-查询';
                break;
            case 135:
                evtName = '金融服务--金融产品审核-查看';
                break;
            case 136:
                evtName = '金融服务--金融产品审核-审核';
                break;
            case 137:
                evtName = '金融服务--金融产品审核-审核-审核通过';
                break;
            case 138:
                evtName = '金融服务--金融产品审核-审核-审核驳回';
                break;
            case 139:
                evtName = '结算管理';
                break;
            case 140:
                evtName = '结算管理-结算单模板';
                break;
            case 141:
                evtName = '结算管理-结算单导入';
                break;
            case 142:
                evtName = '结算管理-生成付款单';
                break;
            case 143:
                evtName = '结算管理-生成付款单-生成';
                break;
            case 144:
                evtName = '结算管理-查看';
                break;
            case 145:
                evtName = '结算管理-查看-下载';
                break;
            case 146:
                evtName = '结算管理-查看-打印';
                break;
            case 147:
                evtName = '结算管理-查看-确认付款';
                break;
            case 148:
                evtName = '结算管理-查看-关闭';
                break;
            case 149:
                evtName = '结算管理-流水-查询';
                break;
                // case 150:
                // evtName = '申诉管理';
                // break;
            case 150:
                evtName = '申诉管理-查询';
                break;
            case 151:
                evtName = '申诉管理-编辑';
                break;
            case 152:
                evtName = '申诉管理-编辑-确定';
                break;
            case 153:
                evtName = '服务商管理-保护查看';
                break;
            case 154:
                evtName = '服务商管理-保护查看-关闭';
                break;
            case 155:
                evtName = '服务商管理-保护查看-解绑';
                break;
            case 156:
                evtName = '服务商管理-保护查看-确定';
                break;
        }
        console.log('eventId:' + eventId + '  evtName:' + evtName);
        xysBuryPoint.track(jsGetCookie("alipayUID"), eventId, "", {
            evtName: evtName
        });
    }

}