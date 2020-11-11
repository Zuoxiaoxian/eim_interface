// -----边缘网关管理！
export const BORDER_GATEWAY_SETTINGS=  {
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
    dateGatherStatus: {
      title: '数据采集状态',
      type: 'custom',
      renderComponent: StatusForTableComponent,
      onComponentInitFunction(instance) {
        instance.save.subscribe(row => {
        console.log("************TaskProgressForTableComponent**************", row)
        // alert(`${row.name} saved!`)
        });
      }
    },
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

// -----视频集成服务器管理！
import { StatusForTableComponent } from './video-integration/status-for-table/status-for-table.component'
export const VIDEO_INTEGRATION_SETTINGS =  {
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
      cameraIP: {
        title: '摄像头IP',
        type: 'string',
      },
      territory: {
        title: '负责区域',
        type: 'string',
      },
      departmentInfo: {
        title: '部门信息',
        type: 'string',
      },
      description: {
        title: '描述',
        type: 'string',
      },
      videoServiceStatus: {
        title: '视频服务器状态',
        type: 'custom',
        renderComponent: StatusForTableComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          console.log("************TaskProgressForTableComponent**************", row)
          // alert(`${row.name} saved!`)
          });
        }
      },

      ipAddress: {
        title: 'IP地址',
        type: 'string',
      },
      continueTime: {
        title: '持续时间',
        type: 'string',
      },
      principal: {
        title: '负责人',
        type: 'string',
      },
    },
};
