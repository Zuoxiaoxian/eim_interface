export const url:string = "http://192.168.8.104/eimapi";
// export const url:string = "http://localhost:8000/api";

// 重定向的url
export const redirectUrl: string = "http://localhost:4200/pages";

export const salt:string = "YzcmCZNvbXocrsz9dm8e";

export const MULU: string = "mulu";


// 记住用户登录信息
export const LOGIN_INFO: string = "login_info";


// 统一认证login
export const ssotoken: string = "app_token";

export const SSOUSERINFO: string = "ssouserinfo";

// 统一认证，默认初始密码
export const ssopassword: string = "123456";

// toastr===通知
export const UpSuccess = {position: 'toast-botton-right', status: 'success', conent:"修改成功!"};
export const UpDanger  = {position: 'toast-botton-right', status: 'danger', conent:"修改失败！"};

export const AddSuccess = {position: 'toast-botton-right', status: 'success', conent:"添加成功!"};
export const AddDanger  = {position: 'toast-botton-right', status: 'danger', conent:"添加失败！"};

export const DelSuccess  = {position: 'toast-botton-right', status: 'success', conent:"删除成功!"};
export const DelDanger = {position: 'toast-botton-right', status: 'danger', conent:"删除失败！"}
export const SavSuccess  = {position: 'toast-botton-right', status: 'success', conent:"保存成功!"};
export const SavDanger  = {position: 'toast-botton-right', status: 'danger', conent:"保存失败！"};

// echart 重置resize
export const ECHARTS_RESIZE: string = "echart_resize";


// 系统设置menu
export const SYSMENU: string = "sysmenu";
// 系统设置、菜单编辑
export const SYSMENUEDIT: string = "systemsetting_editmenu";

// 系统设置-角色-菜单
export const SYSROLEMENU: string = "systemsetting_rolemenu";
export const SYSROLE: string = "systemsetting_role";
// 角色管理button
export const role_action: string = "role_action";

// 编辑菜单，判断是否是目录
export const EDIT_MENU_ISMENU: string = "edit_menu_is_menu";

// 编辑菜单--按钮需要的上级目录数据
export const ANNIU_PARTENT_MULU: string = "anniu_partent_mulu";

// 添加菜单，判断是否是目录
export const ADD_MENU_ISMENU: string = "add_menu_is_menu";


export const role_tree_data: string = "role_edit_data";

// 系统设置用户可用button
export const menu_button_list: string = "auth_button_list";
export const employee_action: string = "employee_action";
export const employeegroup_action: string = "employeegroup_action";

// 设备管理
export const device_action: string = "device_action";



// 登录后要跳转的界面
export const afterloginurl: string = '/pages';

// 登录的界面
export const loginurl: string = '/';




// map地图初始 point
export const map_init_point:Number[] = [121.3229007700, 30.3322026400]


// 看板--实时
export const guanji_url = "assets/pages/device-inline/images/light_a.png";
export const kaiji_url = "assets/pages/device-inline/images/light_b.png";
export const alert_url = "assets/pages/device-inline/images/light_c.png";
export const device_img_url = "assets/pages/device-inline/images/长沙1号.png";





// toastr data
export interface Data{
    position:any,
    status:any,
    conent:any,
}

// gps 定位监控 - 展示需要
export interface List{
    Title:string,
    ListItems: Group[],
    tabIcon:string,
    badgeText: string,
    all_num:number,
    badgePosition:string,
    responsive:boolean,
}
  




// gps 定位监控 - 搜索需要
export interface Group {
    title: string;
    icon:string;
    device_info:any[];
    children: string[];
  }


// 结合唐山的 --------------------------------

    // login 
    // export let LOGIN_API = 'http://192.168.8.105/api/v1/auth/login';   
    // export let INFO_API = 'http://192.168.8.105/api/v1/auth/info';   

    // // plv8 url
    // export let PLV8_URL = "http://192.168.8.105/rpc/v1"


    export let LOGIN_API = '/api/v1/auth/login';   
    export let INFO_API = '/api/v1/auth/info';   

    // plv8 url
    export let PLV8_URL = "/rpc/v1"


    // login  mydocker
    // export let LOGIN_API = 'http://192.168.10.141/api/v1/auth/login';   
    // export let INFO_API = 'http://192.168.10.141/api/v1/auth/info';   

    // // plv8 url
    // export let PLV8_URL = "http://192.168.10.141/rpc/v1"






// 结合唐山的 --------------------------------


// board======================================

// 看板--实时
export const mq_config = {
    hostname: '127.0.0.1',  // mqtt 服务器ip
    port: 8083,  // mqtt 服务器端口
    timeout: 10,
    cleanSession:false,
    AliveInterval:100,
    useSSL:false,
    clientId:'client_'+guid2(),
  };
  
  function guid2() {
      function S4() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }



// board======================================
