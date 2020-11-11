// -----资产管理
export const ASSETS_MANAGE_SETTINGS =  {
    actions: {
        columnTitle: '操作',
        position: 'right',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    // 设置表分页
    pager:{
      perPage: 10,
    },
    columns: {
      id: {
        title: '序号',
        type: 'string',
      },
      gpsId: {
        title: 'GPS编号',
        type: 'string',
      },
      assetsId: {
        title: '移动资产编号',
        type: 'string',
      },
      time: {
        title: '时间',
        type: 'string',
      },
      department: {
        title: '部门',
        type: 'string',
      },

      gpsIp: {
        title: 'GPSIP',
        type: 'string',
      },
      principal: {
        title: '负责人',
        type: 'string',
      },
      power: {
        title: '电量',
        type: 'string',
      },
      networkDescribe: {
        title: '联网描述',
        type: 'string',
      },
      lastHeartbeatTime: {
        title: '最后心跳时间',
        type: 'string',
      },
      heartbeatSept: {
        title: '心跳间隔',
        type: 'string',
      },
    },
};