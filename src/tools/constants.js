let constants = {
    //menus
    menuList1: [
        {
            "checked": true,
            "id": "1",
            "label": "商户管理",
            children: null,
            "sort": "1",
            "parentId": "0",
            "url": "merchantManage"
        },
        {
            "checked": false,
            "id": "2",
            "label": "交易记录",
            children: null,
            "sort": "2",
            "parentId": "0",
            "url": "businessRecord"
        },
        {
            "checked": false,
            "id": "3",
            "label": "结算记录",
            children: null,
            "sort": "3",
            "parentId": "0",
            "url": "settleRecord"
        },
        {
            "checked": false,
            "id": "4",
            "label": "数据统计",
            children: null,
            "sort": "4",
            "parentId": "0",
            "url": "dataStatistics"
        }
    ],

    roleType: [
        // {
        //     name: '超级管理员',
        //     value: 'SUPERADMIN'
        // },
        {
            name: '管理员',
            value: 'ADMIN'
        },
        {
            name: '调试员',
            value: 'INSTALLER'
        },
        {
            name: '用户',
            value: 'USER'
        }
    ],

    equType: [
        {
            name: 'NB烟感',
            value: 'nbSmoke'
        },
        {
            name: 'NB气感',
            value: 'nbGasSense'
        },
        {
            name: 'NB温感',
            value: 'nbTemperatureSense'
        },
        {
            name: 'NB水压',
            value: 'nbWaterPressure'
        },
        {
            name: '网关室水压',
            value: 'gatewayRoomWaterPressure'
        },
        {
            name: '水压小主机',
            value: 'waterPressureSmallHost'
        },
        {
            name: '电器火灾主机',
            value: 'electricalFireHost'
        },
        {
            name: '用户传输主机',
            value: 'userTransferHost'
        },
        {
            name: '九小小主机',
            value: 'nineSmallHosts'
        },

    ],
    alarmStatusList: [
        {
            value: 'unprocessed',
            name: '未处理'
        },
        {
            value: 'processed',
            name: '已处理'
        }
    ],
    alarmTypeList: [
        {
            value: 'smog',
            name: '烟雾报警'
        },
        {
            value: 'malfunction',
            name: '故障报警'
        },
        {
            value: 'lowPressure',
            name: '低压报警'
        },
        {
            value: 'offline',
            name: '离线报警'
        },
    ]


};

export default constants
