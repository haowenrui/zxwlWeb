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
    ]


};

export default constants
