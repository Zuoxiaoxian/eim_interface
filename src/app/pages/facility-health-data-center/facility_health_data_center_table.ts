// 设备报警
import { OperationForTableComponent } from './operation-for-table/operation-for-table.component';
import { AlertGradeForTableComponent } from './alert-grade-for-table/alert-grade-for-table.component';

export const facility_health_SETTINGS =  {
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
        // type: 'number',
      },
      deparrtment: {
        title: '部门',
        type: 'string',
      },
      deviceName: {
        title: '设备名称',
        type: 'string',
      },
      devicePosition: {
        title: '设备位置',
        type: 'string',
      },

      alertContent: {
        title: '报警内容',
        type: 'string',
      },
      alertTime: {
        title: '报警时间',
        type: 'string',
      },
      
      status: {
        title: '状态',
        type: 'string',
      },
      handleTime: {
        title: '处理时间',
        type: 'string',
      },
      alertGrade: {
        title: '报警等级',
        type: 'custom',
        renderComponent: AlertGradeForTableComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          console.log("************AlertGradeForTableComponent**************", row)
          // alert(`${row.name} saved!`)
          });
        }
      },
      operation: {
        title: '操作',
        type: 'custom',
        renderComponent: OperationForTableComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          console.log("************OperationForTableComponent**************", row)
          // alert(`${row.name} saved!`)
          });
        }
      },
      
    },
};