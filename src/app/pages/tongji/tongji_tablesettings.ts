
// 统计分析模块中的 table(ng2-smart-table)settings 配置

// -----设备管理！
import { StatusForTableComponent } from './device-manage/status-for-table/status-for-table.component';
import { ActionsComponent as DeviceActionsComponent } from './device-manage/actions/actions.component';

export const DEVICE_MANAGE_SETTINGS =  {
    // actions: {
    //   columnTitle: '操作',
    //   position: 'right'
    // },
    // editable: false,
    selectMode: 'multi',
    actions:{
      columnTitle: '操作',
      position: 'right',
      add: false,
      edit: false,
      delete: false
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
      perPage: 7,
    },
    columns: {
      // id: {
      //   title: '序号',
      //   type: 'string',
      //   filter: false,
      // },
      devicename: {
        title: '设备名称',
        // type: 'string',
        filter: false,
        type: 'html',
        width: '30px',
        valuePrepareFunction: (value) => { return '<div class="wide" >' + value + '</div>'; }
      },
      deviceno:{
        title: '设备编号',
        type: 'string',
        filter: false,
      },
      type:{
        title: '设备类型',
        type: 'string',
        filter: false,
      },
      active: {
        title: '是否启用',
        type: 'string',
        filter: false,
      },
      assetno: {
        title: '资产编号',
        type: 'string',
        filter: false,
      },
      factoryno: {
        title: '出厂编号',
        type: 'string',
        filter: false,
      },
      deviceid: {
        title: '设备编号',
        type: 'string',
        filter: false,
      },
      purchaseon: {
        title: '购置日期',
        type: 'string',
        filter: false,
      },
      supplier: {
        title: '供应商',
        type: 'string',
        filter: false,
      },
      location: {
        title: '存放地点',
        type: 'string',
        filter: false,
      },
      department: {
        title: '使用部门',
        type: 'string',
        filter: false,
      },
      groups: {
        title: '科室',
        type: 'string',
        filter: false,
      },
      belonged: {
        title: '归属人',
        type: 'string',
        filter: false,
      },
      devicestatus: {
        title: '设备状态',
        type: 'custom',
        filter: false,
        renderComponent: StatusForTableComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          console.log("************StatusForTableComponent**************", row)
          // alert(`${row.name} saved!`)
          });
        }
      },
      createdby: {
        title: '创建人',
        type: 'string',
        filter: false,
      },
      createdon: {
        title: '创建时间',
        type: 'string',
        filter: false,
      },
      // statusTime: {
      //   title: '状态持续时间(h)',
      //   type: 'string',
      //   filter: false,
      // },
      options: {
        title: '操作',
        type: 'custom',
        filter: false,
        renderComponent: DeviceActionsComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          console.log("************DeviceActionsComponent**************", row)
          // alert(`${row.name} saved!`)
          });
        }
      },
    },
};

// -----试验任务管理！
import { TaskProgressForTableComponent } from './test-task-manage/task-progress-for-table/task-progress-for-table.component';

export const TEST_TASK_MANAGE_SETTINGS =  {
  editable: false,
  actions:{
    add: false,
    edit: false,
    delete: false
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
      taskNumber: {
        title: '任务单号',
        type: 'string',
      },
      departmentInfo: {
        title: '部门信息',
        type: 'string',
      },
      describe: {
        title: '描述',
        type: 'string',
      },
      testStartTime: {
        title: '试验开始时间',
        type: 'string',
      },
      testEndTime: {
        title: '试验结束时间',
        type: 'string',
      },
      taskProgress: {
        title: '任务进度',
        type: 'custom',
        renderComponent: TaskProgressForTableComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          console.log("************TaskProgressForTableComponent**************", row)
          // alert(`${row.name} saved!`)
          });
        }
      },
      testTime: {
        title: '试验持续时长(h)',
        type: 'string',
      },
      principal: {
        title: '负责人',
        type: 'string',
      },
      dataUpdateTime: {
        title: '数据更新时间',
        type: 'string',
      },
    },
};

// -----设备KPI报表！
import { KpireportLinkFortableComponent } from './device-kpi-report/kpireport-link-fortable/kpireport-link-fortable.component';
export const DEVICE_KPI_REPORT_SETTINGS =  {
  editable: false,
  actions:{
    add: false,
    edit: false,
    delete: false
  },
  selectMode: 'multi',
  // 设置表分页
  pager:{
    perPage: 7,
  },
  columns: {
    // id: {
    //   title: '序号',
    //   type: 'string',
    //   filter: false,
    // },
    devicename: {
      title: '设备名称',
      // type: 'string',
      filter: false,
      type: 'html',
      valuePrepareFunction: (value) => { return '<div class="device_kpi_device_name">' + value + '</div>'; }
    },
    deviceid: {
      title: '设备id',
      type: 'string',
      filter: false,
    },
    department: {
      title: '部门信息',
      type: 'string',
      filter: false,
    },
    starttime: {
      title: '开始时间',
      type: 'string',
      filter: false,
    },
    endtime: {
      title: '结束时间',
      type: 'string',
      filter: false,
    },
    sumruntime: {
      title: '累计运行时长(h)',
      type: 'string',
      filter: false,
    },
    avgtime: {
      title: '平均运行时长(h)',
      type: 'string',
      filter: false,
    },
    ratetime: {
      title: '开动率(%)',
      type: 'string',
      filter: false,
    },
    belonged: {
      title: '负责人',
      type: 'string',
      filter: false,
    },
    // reportDetail: {
    //   title: '报表详情',
    //   type: 'custom',
    //   filter: false,
    //   renderComponent: KpireportLinkFortableComponent,
    //   onComponentInitFunction(instance) {
    //     instance.save.subscribe(row => {
    //     console.log("************KpireportLinkFortableComponent**************", row)
    //     // alert(`${row.name} saved!`)
    //     });
    //   }
    // },
  },
};

// -----工时KPI报表
import { ManhourReportLinkFortableComponent } from './man-hour-kpi-report/manhour-report-link-fortable/manhour-report-link-fortable.component';
export const MAN_HOUR_KPI_REPORT_SETTINGS =  {
  editable: false,
  actions:{
    add: false,
    edit: false,
    delete: false
  },
  selectMode: 'multi',
  // 设置表分页
  pager:{
    perPage: 7,
  },
  columns: {
    // id: {
    //   title: '序号',
    //   type: 'string',
    //   filter: false,
    // },
    devicename: {
      title: '设备名称',
      type: 'string',
      filter: false,

    },

    department: {
      title: '部门信息',
      type: 'string',
      filter: false,
    },
    deviceid: {
      title: '部门id',
      type: 'string',
      filter: false,
    },
    starttime: {
      title: '开始时间',
      type: 'string',
      filter: false,
    },
    endtime: {
      title: '结束时间',
      type: 'string',
      filter: false,
    },
    running: {
      title: '运行时长(h)',
      type: 'string',
      filter: false,
    },
    stop: {
      title: '空闲时长(h)',
      type: 'string',
      filter: false,
    },
    placeon: {
      title: '占位时长(h)',
      type: 'string',
      filter: false,
    },
    warning: {
      title: '维保时长(h)',
      type: 'string',
      filter: false,
    },
    belonged: {
      title: '负责人',
      type: 'string',
      filter: false,
    },
    // reportDetail: {
    //   title: '报表详情',
    //   type: 'custom',
    //   filter: false,
    //   renderComponent: ManhourReportLinkFortableComponent,
    //   onComponentInitFunction(instance) {
    //     instance.save.subscribe(row => {
    //     console.log("************KpireportLinkFortableComponent**************", row)
    //     // alert(`${row.name} saved!`)
    //     });
    //   }
    // },
  },
};