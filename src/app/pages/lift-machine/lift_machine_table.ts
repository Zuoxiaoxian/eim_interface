// -----设备kpi统计
import { TotalTimeComponent } from './device-kpi-tongji/total-time/total-time.component';
import { StatusComponent } from './device-kpi-tongji/status/status.component';
import { DetailComponent } from './device-kpi-tongji/detail/detail.component';

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
      liftMachineId: {
        title: '举升机编号',
        type: 'string',
      },
      deparrtment: {
        title: '部门',
        type: 'string',
      },
      liftMachinePosition: {
        title: '举升机位置',
        type: 'string',
      },
      startTime: {
        title: '开始作业时间',
        type: 'string',
      },

      time: {
        title: '本次作业时间',
        type: 'string',
      },
      principal: {
        title: '负责人',
        type: 'string',
      },
      totalTime: {
        title: '累计作业时长',
        type: 'custom',
        renderComponent: TotalTimeComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          console.log("************TotalTimeComponent**************", row)
          // alert(`${row.name} saved!`)
          });
        }
      },
      status: {
        title: '状态',
        type: 'custom',
        renderComponent: StatusComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          console.log("************StatusComponent**************", row)
          // alert(`${row.name} saved!`)
          });
        }
      },
      chargePerson: {
        title: '责任人',
        type: 'string',
      },
      detail: {
        title: 'kpi详情',
        type: 'custom',
        renderComponent: DetailComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          console.log("************DetailComponent**************", row)
          // alert(`${row.name} saved!`)
          });
        }
      },
    },
};