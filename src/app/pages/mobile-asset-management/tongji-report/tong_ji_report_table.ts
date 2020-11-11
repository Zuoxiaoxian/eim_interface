// -----实例！
export const DEFAULT =  {
    actions: {
      columnTitle: '操作',
      position: 'right'
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
      deviceName: {
        title: '设备名称',
        type: 'string',
      },
      edgeGatewayId: {
        title: '边缘网关编号',
        type: 'string',
      },
      departmentInfo: {
        title: '部门信息',
        type: 'string',
      },
      edgeGatewayStatus: {
        title: '边缘网关开关状态',
        type: 'string',
      },
    //   dateGatherStatus: {
    //     title: '数据采集状态',
    //     type: 'custom',
    //     renderComponent: StatusForTableComponent,
    //     onComponentInitFunction(instance) {
    //       instance.save.subscribe(row => {
    //       console.log("************TaskProgressForTableComponent**************", row)
    //       // alert(`${row.name} saved!`)
    //       });
    //     }
    //   },
      ipAddress: {
        title: 'IP地址',
        type: 'string',
      },
      continueTime: {
        title: '持续时间',
        type: 'string',
      },
      heartTime: {
        title: '心跳时间',
        type: 'string',
      },
    },
};


// -----报警报表
export const ALERT_REPORT_SETTINGS =  {
    actions: {
        columnTitle: '操作',
        position: 'right',
        add: false,
        edit: false,
        delete: false
    },
    editable: false,

    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
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
      deviceName: {
        title: '设备名称',
        type: 'string',
      },
      startAlertTime: {
        title: '开始报警时间',
        type: 'string',
      },
      endAlertTime: {
        title: '最后报警时间',
        type: 'string',
      },
      alertInfo: {
        title: '报警信息',
        type: 'string',
      },

      alertNum: {
        title: '报警次数',
        type: 'string',
      },
      handle: {
        title: '是否处理',
        type: 'string',
      },
      handlePeople: {
        title: '处理人',
        type: 'string',
      },
    },
};