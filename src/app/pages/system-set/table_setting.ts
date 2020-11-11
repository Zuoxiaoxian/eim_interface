// 角色表的actions
import { ActionsComponent as RoleActionsComponent} from './role/actions/actions.component';

export const ROLE_TABLE =  {
  
  // 多选
  selectMode: 'multi',
  // selectMode: 'single',
  actions: {
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
    perPage: 10,
  },
  columns: {
    // roleid: {
    //   title: '角色级别',
    //   filter: false,
    // },
    role_name: {
      title: '角色名称',
      type: 'string',
      filter: false,
    },
    role: {
      title: '英文名称',
      type: 'string',
      filter: false,
    },
    active: {
      title: '是否启用',
      type: 'string',
      filter: false,
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
    lastupdatedby: {
      title: '最后一次修改人',
      type: 'string',
      filter: false,
    },
    lastupdateon: {
      title: '最后一次修改时间',
      type: 'string',
      filter: false,
    },
    options: {
      title: '操作',
      type: 'custom',
      filter: false,
      renderComponent: RoleActionsComponent,
      onComponentInitFunction(instance) {
        instance.save.subscribe(row => {
        console.log("************RoleActionsComponent**************", row)
        // alert(`${row.name} saved!`)
        });
      }
    },
  },
};
export const SECURITY_TABLE =  {
  
  actions: {
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
  // 多选
  selectMode: 'multi',
  // 设置表分页
  pager:{
    perPage: 7,
    // display: false

  },
  columns: {
    application: {
      title: '应用',
      filter: false,
    },
    source: {
      title: '访问IP',
      type: 'string',
      filter: false,
    },
    machinename: {
      title: '设备名称',
      type: 'string',
      filter: false,
    },
    info: {
      title: '信息',
      type: 'string',
      filter: false,
    },
    logintime: {
      title: '最近登录时间',
      type: 'string',
      filter: false,
    },
    
    // videoServiceStatus: {
    //   title: '视频服务器状态',
    //   type: 'custom',
    //   renderComponent: StatusForTableComponent,
    //   onComponentInitFunction(instance) {
    //     instance.save.subscribe(row => {
    //     console.log("************TaskProgressForTableComponent**************", row)
    //     // alert(`${row.name} saved!`)
    //     });
    //   }
    // },
  },
};

// 员工表！
export const EMPLOYEE_TABLE =  {
  // 多选
  selectMode: 'multi',
  actions: {
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
    perPage: 10,
    // display: false
  },
  columns: {
    name: {
      title: '姓名',
      filter: false,
    },
    
    loginname: {
      title: '域账号',
      type: 'string',
      filter: false,
    },

    role_name: {
      title: '角色名称',
      type: 'string',
      filter: false,
    },
    groups_name: {
      title: '用户组',
      type: 'string',
      filter: false,
    },
    // role: {
    //   title: '角色名称(en)',
    //   type: 'string',
    //   filter: false,
    // },
    active: {
      title: '是否启用',
      type: 'string',
      filter: false,
    },
    employeeno: {
      title: '编号',
      type: 'string',
      filter: false,
    },
    email: {
      title: '邮箱',
      type: 'string',
      filter: false,
    },
    phoneno: {
      title: '手机号',
      type: 'string',
      filter: false,
    },
    pictureurl: {
      title: '头像地址',
      type: 'string',
      filter: false,
    },
    department: {
      title: '部门',
      type: 'string',
      filter: false,
    },
    
    lastsignondate: {
      title: '最后登录时间',
      type: 'string',
      filter: false,
    },
    // options: {
    //   title: '操作',
    //   type: 'custom',
    //   filter: false,
    //   renderComponent: ActionsComponent,
    //   onComponentInitFunction(instance) {
    //     instance.save.subscribe(row => {
    //     console.log("************TaskProgressForTableComponent**************", row)
    //     // alert(`${row.name} saved!`)
    //     });
    //   }
    // },
    

    
    // videoServiceStatus: {
    //   title: '视频服务器状态',
    //   type: 'custom',
    //   renderComponent: StatusForTableComponent,
    //   onComponentInitFunction(instance) {
    //     instance.save.subscribe(row => {
    //     console.log("************TaskProgressForTableComponent**************", row)
    //     // alert(`${row.name} saved!`)
    //     });
    //   }
    // },
  },
};

// 用户组
import { ActionsComponent as GroupActionsComponent } from './user-employee-group/actions/actions.component';
export const EMPLOYEEGROUP_TABLE =  {
  // 多选multi  single
  selectMode: 'multi',
  actions: {
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
    perPage: 10,
  },
  columns: {
    group: {
      title: '组名称',
      filter: false,
      width: '5px'
    },
    group_name:{
      title: '用户组英文名称',
      filter: false,
      width: '5px'
    },
    
    createdon: {
      title: '创建时间',
      type: 'string',
      filter: false,
      width: '5px'
    },

    createdby: {
      title: '创建人',
      type: 'string',
      filter: false,
      width: '5px'
    },

    active: {
      title: '是否启用',
      type: 'string',
      filter: false,
      width: '5px'
    },

    options: {
      title: '操作',
      type: 'custom',
      filter: false,
      width: '5px',
      renderComponent: GroupActionsComponent,
      onComponentInitFunction(instance) {
        instance.save.subscribe(row => {
        console.log("************TaskProgressForTableComponent**************", row)
        // alert(`${row.name} saved!`)
        });
      }
    },
    


    
    // videoServiceStatus: {
    //   title: '视频服务器状态',
    //   type: 'custom',
    //   renderComponent: StatusForTableComponent,
    //   onComponentInitFunction(instance) {
    //     instance.save.subscribe(row => {
    //     console.log("************TaskProgressForTableComponent**************", row)
    //     // alert(`${row.name} saved!`)
    //     });
    //   }
    // },
  },
};


// 系统设置--角色
export const ROLE_SETTINGS =  {
  columns: [
    {
      field: 'ck',
      checkbox: true
    },
    {
      field: 'role',
      title: '角色名称',
      align: 'center',
    }, 
    {
      field: 'roleid',
      title: '角色级别',
      align: 'center',
    }, 
    {
      field: 'createdby',
      title: '创建人',
      align: 'center',
    },
    {
      field: 'createdon',
      title: '创建时间',
      align: 'center',
    },
    {
      field: 'lastupdatedby',
      title: '最后一次修改人',
      align: 'center',
    },
    {
      field: 'lastupdateon',
      title: '最后一次修改时间',
      align: 'center',
    },
    
  ],
};

