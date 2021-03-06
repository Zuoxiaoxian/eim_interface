import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpserviceService } from '../../../services/http/httpservice.service';


import { NbDialogService } from '@nebular/theme';
import { UserEmployeeComponent as AddUserEmployeeComponent } from '../../../pages-popups/system-set/user-employee/user-employee.component';


import { EditDelTooltipComponent } from '../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';

import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

import { SYSMENU,menu_button_list,employee_action } from '../../../appconfig';
import { Observable } from 'rxjs';

import { AddEmployee } from '../../../pages-popups/system-set/form_verification';

declare let $;
declare let layui;

import * as XLSX from 'xlsx';
type AOA = any[][];
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { ActionComponent } from './action/action.component';

@Component({
  selector: 'ngx-user-employee',
  templateUrl: './user-employee.component.html',
  styleUrls: ['./user-employee.component.scss']
})
export class UserEmployeeComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;


  constructor(private http: HttpserviceService, private dialogService: NbDialogService, 
    private publicmethod: PublicmethodService, private userinfo: UserInfoService) { 

      // 得到用户组和角色  get_groupname get_rolename get_group
      this.http.callRPC("role", "get_rolename",{}).subscribe(roles=>{
        console.log("get_rolename-------------------->>>>","get_rolename",roles);
        var res = roles["result"]["message"][0];
        if (res["code"] ===1){
          this.get_rolename = res["message"];
          localStorage.setItem("employee_rolename", JSON.stringify(this.get_rolename))

        }
      });
      this.http.callRPC("role", "get_groupname",{}).subscribe(roles=>{
        console.log("get_groupname-------------------->>>>","get_groupname", roles )
        var res = roles["result"]["message"][0];
        if (res["code"] === 1){
          this.get_groupname = res["message"];
          localStorage.setItem("employee_groupname", JSON.stringify(this.get_groupname))
          
        }
      });
      // get_group
      this.http.callRPC('groups', 'get_group', {}).subscribe(result=>{
        console.log("get_group-------------------->>>>","get_group",  result);
        var res = result["result"]["message"][0]
        if (res["code"] === 1){
          var employee_result =  res["message"];
          localStorage.setItem("employee_group_all_", JSON.stringify(employee_result))
          
        }

      })


    }





  // 全部角色、用户组
  get_rolename;
  get_groupname;


  // 前端要展示的button 主要是：增、删、改
  buttons;

  // 前端要展示的buttons 主要是：搜索、导入导出
  buttons2;

  // 要删除、修改的行数据 
  rowdata;


  // 分页
  employee_data = [];

  // loading 加载agGrid
  loading = false;

  employee_agGrid;
  

  DelSuccess :any = {position: 'bottom-right', status: 'success', conent:"删除成功!"};
  DellDanger :any = {position: 'bottom-right', status: 'danger', conent:"删除失败！"}

  importdata: AOA = [[1,2], [3,4]];
  
  active; // 操作！
  
  ngOnInit(): void {

    // ====================================agGrid
      // 得到该页面下的button
      this.getbuttons();
      var that = this;
      this.active = { field: 'action', headerName: '操作', cellRendererFramework: ActionComponent, pinned: 'right',
        cellRendererParams: {
          clicked: function(data: any) {
            if (data["active"]==='edit'){
              that.edit(data["data"]);
            }else{
              that.del(data["data"]);
            }
          }
        },
      }
      
  }
    

  ngAfterViewInit(){

    // 初始化table
    this.tableDatas.columnDefs.push(
      this.active
    )
    this.getemployee();
   
    
  }
  ngOnDestroy(){
    localStorage.removeItem(SYSMENU);
    localStorage.removeItem("employee_rolename");
    localStorage.removeItem("employee_groupname");
    localStorage.removeItem("employee_agGrid");
  }


  // =================================================agGrid

  
  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection
      { field: 'name', headerName: '姓名', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,},
      { field: 'loginname', headerName: '域账号',  },
      { field: 'role_name', headerName: '角色', },
      { field: 'groups_name', headerName: '用户组', },
      { field: 'active', headerName: '是否启用', },
      { field: 'employeeno', headerName: '员工编号', },
      { field: 'email', headerName: '邮箱', },

      { field: 'department', headerName: '部门', },
      { field: 'lastsignondate', headerName: '最后登录时间', },
      // { field: 'action', headerName: '操作', cellRendererFramework: ActionComponent, pinned: 'right',
      //   cellRendererParams: {
      //     clicked: function(data: any) {
      //       var that = this;
      //       console.log("00000000000000000", data);
            
      //     }
      //   },
      // }
      
    ],
    rowData: [ // data
      // { name: 'Toyota', loginname: 'Celica', role_name: 35000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,department: "ZJX", lastsignondate:"2020"},
      // { name: 'Ford', loginname: 'Mondeo', role_name: 32000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,department: "ZJX", lastsignondate:"2020" },
      // { name: 'Porsche', loginname: 'Boxter', role_name: 72000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,department: "ZJX", lastsignondate:"2020" }
    ]
  };

  private gridData = [];
  
  getemployee(event?){
    var offset;
    var limit;
    console.log("event------------------------------------------------", event, this.agGrid);
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
    }else{
      offset = 0;
      limit = 50;
    }
    // 得到员工信息！
    
    this.http.callRPC('emeployee', 'get_employee_limit', {offset:offset,limit:limit}).subscribe((result_res)=>{
      var res  = result_res["result"]["message"][0];
      console.log("-=得到员工信息！-=-=-=-=-", res);
      if (res["code"] === 1){
        var get_employee_limit = res
        console.log("get_employee_limit", get_employee_limit);
        var message = res;
        switch (message["code"]) {
          case 401:
            break;
          case 1:
            // 处理data
            var result_data = message.message.reverse();
            if (result_data[0] && result_data[0][0]["numbers"]){
              var other_result_data = result_data.splice(1, result_data.length);
            }else{
              var other_result_data = result_data;
            }
            var other_result_data_after = [];
            other_result_data.forEach(result => {
              other_result_data_after = other_result_data_after.concat(result);
            });
            console.log("-------other_result_data_after-----------",other_result_data_after);
            // -----------------------
            var result = other_result_data_after;
            var employee_list = [];
            for (let item of result){
              var rids = [];
              var items_dict = {};
              var role_name_lists = []; 
              var groups_name_lists = []; 
              for (let element of result){
                var rid_name = {}
                if (item["employeeid"] === element["employeeid"]){
                  // items_dict["active"] = element["active"] == 1?'是': "否";
                  items_dict["active"] = element["active"] == 1?'是': "否";
                  items_dict["company"] = element["company"];
                  items_dict["department"] = element["department"];
                  items_dict["email"] = element["email"];
                  items_dict["employeeid"] = element["employeeid"];
                  items_dict["employeeno"] = element["employeeno"];
                  items_dict["facility"] = element["facility"];
                  items_dict["loginname"] = element["loginname"];
                  items_dict["name"] = element["name"];
                  items_dict["phoneno"] = element["phoneno"];
                  items_dict["pictureurl"] = element["pictureurl"];
                  items_dict["rid"] = element["rid"];
                  items_dict["groupid"] = element["groupid"];
                  
                  items_dict["role"] = element["role"];
                  items_dict["lastsignondate"] = element["lastsignondate"];
                  
                  items_dict["role_name"] = element["role_name"];
      
                  rid_name["role"] = element["role"];
                  rid_name["rid"] = element["rid"];
                  var role_name_str: string | null = element["role_name"] ? element["role_name"]: null;
                  var groups_name_str: string | null = element["groups"] ? element["groups"]: null;
                  // rid_name["role_name"] =  role_name_str.replace(/\s/g, "");
                  role_name_lists.push(role_name_str)
                  groups_name_lists.push(groups_name_str)
                  rids.push(rid_name)
                  items_dict["rids"] = rids;
                  items_dict["role_name"] = role_name_lists;
                  items_dict["groups_name"] = groups_name_lists;
                  continue
                }else{
                  
                }
              }
              // 处理 role_names，将以第一， 去掉！
              employee_list.push(items_dict)
            }
            // 列表去重！
            var unique_result = unique(employee_list, "employeeid")
            unique_group_role(unique_result, "groups_name");
            unique_group_role(unique_result, "role_name");
            this.gridData.push(...unique_result)
            this.tableDatas.rowData = this.gridData;
            var totalpagenumbers = get_employee_limit['numbers']? get_employee_limit['numbers'][0]['numbers']: '未得到总条数';;
            this.tableDatas.totalPageNumbers = totalpagenumbers;
            this.agGrid.init_agGrid(this.tableDatas);
            function unique(arr, field) { // 根据employeeid去重
              const map = {};
              const res = [];
              for (let i = 0; i < arr.length; i++) {
                if (!map[arr[i][field]]) {
                  map[arr[i][field]] = 1;
                  res.push(arr[i]);
                }
              }
              return res;
            };
            // groups_name、role_name去重
            function unique_group_role(arr, fild){
              arr.forEach(element => {
                var arr_list = [];
                var groups_name_list = element[fild];
                groups_name_list.forEach(groups => {
                  if(arr_list.indexOf(groups) === -1){
                    arr_list.push(groups)
                  }
                });
                // arr_list [] 改为 str
                element[fild] = arr_list.join(";")
              });
            }
            
            break;
          case 0:
            break;

        }

      }

    })
  }
  pagemployee(event?){
    var offset;
    var limit;
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
    }else{
      offset = 0;
      limit = 50;
    }
    // 得到员工信息！
    this.http.callRPC('emeployee', 'get_employee_limit', {offset: offset, limit: limit}).subscribe((res)=>{
      // console.log("get_menu_role", result)
      var message = res["result"]["message"][0];
      if (message["code"] ===1){
        if( message.code === 0){
          // 表示token过期了，跳转到 / 
        }
        // 处理data
        var result_data = message.message.reverse();
        if (result_data[0] && result_data[0][0]["numbers"]){
          var other_result_data = result_data.splice(1, result_data.length);
        }else{
          var other_result_data = result_data;
        }
        var other_result_data_after = [];
        other_result_data.forEach(result => {
          other_result_data_after = other_result_data_after.concat(result);
        });
        console.log("-------other_result_data_after-----------",other_result_data_after);
        // -----------------------
        var result = other_result_data_after;
        var employee_list = [];
        for (let item of result){
          var rids = [];
          var items_dict = {};
          var role_name_lists = []; 
          var groups_name_lists = []; 
          for (let element of result){
            var rid_name = {}
            if (item["employeeid"] === element["employeeid"]){
              // items_dict["active"] = element["active"] == 1?'是': "否";
              items_dict["active"] = element["active"] == 1?'是': "否";
              items_dict["company"] = element["company"];
              items_dict["department"] = element["department"];
              items_dict["email"] = element["email"];
              items_dict["employeeid"] = element["employeeid"];
              items_dict["employeeno"] = element["employeeno"];
              items_dict["facility"] = element["facility"];
              items_dict["loginname"] = element["loginname"];
              items_dict["name"] = element["name"];
              items_dict["phoneno"] = element["phoneno"];
              items_dict["pictureurl"] = element["pictureurl"];
              items_dict["rid"] = element["rid"];
              items_dict["groupid"] = element["groupid"];
              
              items_dict["role"] = element["role"];
              items_dict["lastsignondate"] = element["lastsignondate"];
              
              items_dict["role_name"] = element["role_name"];
  
              rid_name["role"] = element["role"];
              rid_name["rid"] = element["rid"];
              var role_name_str: string | null = element["role_name"] ? element["role_name"]: null;
              var groups_name_str: string | null = element["groups"] ? element["groups"]: null;
              // rid_name["role_name"] =  role_name_str.replace(/\s/g, "");
              role_name_lists.push(role_name_str)
              groups_name_lists.push(groups_name_str)
              rids.push(rid_name)
              items_dict["rids"] = rids;
              items_dict["role_name"] = role_name_lists;
              items_dict["groups_name"] = groups_name_lists;
              continue
            }else{
              
            }
          }
          // 处理 role_names，将以第一， 去掉！
          employee_list.push(items_dict)
        }
  
        // 列表去重！
        var unique_result = unique(employee_list, "employeeid")
  
        unique_group_role(unique_result, "groups_name");
        unique_group_role(unique_result, "role_name");
  
        this.gridData = [];
        this.gridData.push(...unique_result)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = message['numbers']? message['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        // this.agGrid.update_agGrid(this.tableDatas);
        this.agGrid.init_agGrid(this.tableDatas);
        
        function unique(arr, field) { // 根据employeeid去重
          const map = {};
          const res = [];
          for (let i = 0; i < arr.length; i++) {
            if (!map[arr[i][field]]) {
              map[arr[i][field]] = 1;
              res.push(arr[i]);
            }
          }
          return res;
        };
  
        // groups_name、role_name去重
        function unique_group_role(arr, fild){
          arr.forEach(element => {
            var arr_list = [];
            var groups_name_list = element[fild];
            groups_name_list.forEach(groups => {
              if(arr_list.indexOf(groups) === -1){
                arr_list.push(groups)
              }
            });
            // arr_list [] 改为 str
            element[fild] = arr_list.join(";")
          });
        }

      }

    })
  }


  updategetemployee(event?){
    // this.agGrid.methodFromParent(event);
    
    this.pagemployee();
    
  }



  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event){
    console.log("页码改变的回调", event);
    this.getemployee(event);
  }


  // =================================================agGrid
 

  // 得到buttons----------------------------------------------------------
  getbuttons(){
    // 根据menu_item_role得到 该页面对应的 button！
    this.publicmethod.get_buttons().subscribe((button_list: any[])=>{
      this.publicmethod.get_current_pathname().subscribe(res=>{
        console.log("get_current_pathname   ", res);
        var currentmenuid = res["id"];
        var buttons = [];
        // 分离搜索、导入、导出
        var buttons2 = [];
        
        button_list.forEach(button => {
          if (currentmenuid === button["parentid"]){
            var method = button["permission"].split(":")[1];
            if ( method === "query" || method === "import" || method === "download" ){
              buttons2.push(button)
            }else{
              buttons.push(button);
            }
          }
        });
        // 对button进行排序 根据 title(导入、导出), 或者是 permission(menu:import)
        buttons2.forEach(b=>{
          switch (b["permission"].split(":")[1]) {
            case "query":
              b["order_"] = 0;
              break;
            case "import":
              b["order_"] = 1;
              break;
            case "download":
              b["order_"] = 2;
              break;
  
          }
        })
        // -----排序
        buttons2.sort(function(item1, item2){
          return item1["order_"] - item2["order_"]
        });
  
        this.buttons = buttons;
        this.buttons2 = buttons2;
        console.log("-----------buttons--------",buttons);
        console.log("-----------buttons2--------",buttons2);
        // =======================================================
        var isactions = {};
        buttons.forEach(button=>{
          if (button["permission"].search("add") === -1){
            if (button["permission"].search("edit") === -1){
              // 编辑不存在
              // isactions.push({edit:false})
            }else{ // 编辑存在
              isactions["edit"] = true
            }
            if (button["permission"].search("del") === -1){
              // isactions.push({del: false})
            }else{
              isactions["del"] = true
            }
          }
        })
  
        if (!isactions["edit"]){
          isactions["edit"] = false
        }
        if (!isactions["del"]){
          isactions["del"] = false
        }
        localStorage.setItem(employee_action, JSON.stringify(isactions));
      })

    })
    
  }

 

 

  // 请求得到 表get_employee中的数据！
  getsecurity_edit(table: string, method: string, colums: object){
    return new Observable((res)=>{
      this.http.callRPC(table, method, colums).subscribe((result)=>{
        console.log("===================================!!!!!!!!!!!!!!!!!!!!!!!! !! 用户组",result, "result  status ",result["result"]["message"][0]["code"])
        
        res.next(result)
      })
    })
  }


  



  // 将得到的employee的数据，处理成编辑、添加需要的数据！
  edit_add_emplyee_data(result){
    console.log("result", result)
    var employee_list = [];
    for (let item of result){
      var rids = [];
      var items_dict = {};
      var role_name_lists = []; 
      var groups_name_lists = []; 
      for (let element of result){
        var rid_name = {}
        if (item["employeeid"] === element["employeeid"]){
          // items_dict["active"] = element["active"] == 1?'是': "否";
          items_dict["active"] = element["active"] == 1?'是': "否";
          items_dict["company"] = element["company"];
          items_dict["department"] = element["department"];
          items_dict["email"] = element["email"];
          items_dict["employeeid"] = element["employeeid"];
          items_dict["employeeno"] = element["employeeno"];
          items_dict["facility"] = element["facility"];
          items_dict["loginname"] = element["loginname"];
          items_dict["name"] = element["name"];
          items_dict["phoneno"] = element["phoneno"];
          items_dict["pictureurl"] = element["pictureurl"];
          items_dict["rid"] = element["rid"];
          items_dict["groupid"] = element["groupid"];
          
          items_dict["role"] = element["role"];
          items_dict["lastsignondate"] = element["lastsignondate"];
          
          items_dict["role_name"] = element["role_name"];

          rid_name["role"] = element["role"];
          rid_name["rid"] = element["rid"];
          var role_name_str: string | null = element["role_name"] ? element["role_name"]: null;
          var groups_name_str: string | null = element["groups"] ? element["groups"]: null;
          // rid_name["role_name"] =  role_name_str.replace(/\s/g, "");
          role_name_lists.push(role_name_str)
          groups_name_lists.push(groups_name_str)
          rids.push(rid_name)
          items_dict["rids"] = rids;
          items_dict["role_name"] = role_name_lists;
          items_dict["groups_name"] = groups_name_lists;
          continue
        }else{
          
        }
      }
      // 处理 role_names，将以第一， 去掉！
      employee_list.push(items_dict)
    }
    
    // 列表去重！
    var unique_result =  this.unique(employee_list, "employeeid")


    // groups_name、role_name去重
    this.unique_group_role(unique_result, "groups_name");
    this.unique_group_role(unique_result, "role_name");

    return unique_result
  }

  // 根据employeeid去重
  unique(arr, field) {
    const map = {};
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      if (!map[arr[i][field]]) {
        map[arr[i][field]] = 1;
        res.push(arr[i]);
      }
    }
    return res;
  }

  // groups_name、role_name去重
  unique_group_role(arr, fild){
    arr.forEach(element => {
      var arr_list = [];
      var groups_name_list = element[fild];
      groups_name_list.forEach(groups => {
        if(arr_list.indexOf(groups) === -1){
          arr_list.push(groups)
        }
      });
      // arr_list [] 改为 str
      element[fild] = arr_list.join(";")
    });
  }


  // button按钮执行！新增
  add(){
    this.dialogService.open(AddUserEmployeeComponent,{closeOnBackdropClick: false,context: { rowdata: JSON.stringify('add'), res: JSON.stringify(''), goups: JSON.stringify('')}}).onClose.subscribe(name=>{
    // this.dialogService.open(AddUserEmployeeComponent,{closeOnBackdropClick: false}).onClose.subscribe(name=>{
      if (name){
        this.loading = true

        // 得到员工信息！
        this.http.callRPC('emeployee', 'get_employee_limit', {offset: 0, limit: 50}).subscribe((res)=>{
          console.log("get_menu_role", result)
          this.loading = false;
          var message = res["result"]["message"][0];
          if( message.code === 401){
            // 表示token过期了，跳转到 / 
          }else{
            // 处理data
            var result_data = message.message.reverse();
            if (result_data[0] && result_data[0][0]["numbers"]){
              var other_result_data = result_data.splice(1, result_data.length);
            }else{
              var other_result_data = result_data;
            }
            var other_result_data_after = [];
            other_result_data.forEach(result => {
              other_result_data_after = other_result_data_after.concat(result);
            });
            
            console.log("-------other_result_data_after-----------",other_result_data_after);
            // -----------------------
            var result = other_result_data_after;
            var employee_list = [];
            for (let item of result){
              var rids = [];
              var items_dict = {};
              var role_name_lists = []; 
              var groups_name_lists = []; 
              for (let element of result){
                var rid_name = {}
                if (item["employeeid"] === element["employeeid"]){
                  // items_dict["active"] = element["active"] == 1?'是': "否";
                  items_dict["active"] = element["active"] == 1?'是': "否";
                  items_dict["company"] = element["company"];
                  items_dict["department"] = element["department"];
                  items_dict["email"] = element["email"];
                  items_dict["employeeid"] = element["employeeid"];
                  items_dict["employeeno"] = element["employeeno"];
                  items_dict["facility"] = element["facility"];
                  items_dict["loginname"] = element["loginname"];
                  items_dict["name"] = element["name"];
                  items_dict["phoneno"] = element["phoneno"];
                  items_dict["pictureurl"] = element["pictureurl"];
                  items_dict["rid"] = element["rid"];
                  items_dict["groupid"] = element["groupid"];
                  
                  items_dict["role"] = element["role"];
                  items_dict["lastsignondate"] = element["lastsignondate"];
                  
                  items_dict["role_name"] = element["role_name"];
      
                  rid_name["role"] = element["role"];
                  rid_name["rid"] = element["rid"];
                  var role_name_str: string | null = element["role_name"] ? element["role_name"]: null;
                  var groups_name_str: string | null = element["groups"] ? element["groups"]: null;
                  // rid_name["role_name"] =  role_name_str.replace(/\s/g, "");
                  role_name_lists.push(role_name_str)
                  groups_name_lists.push(groups_name_str)
                  rids.push(rid_name)
                  items_dict["rids"] = rids;
                  items_dict["role_name"] = role_name_lists;
                  items_dict["groups_name"] = groups_name_lists;
                  continue
                }else{
                  
                }
              }
              // 处理 role_names，将以第一， 去掉！
              employee_list.push(items_dict)
            }
      
            // 列表去重！
            var unique_result = unique(employee_list, "employeeid")
      
            unique_group_role(unique_result, "groups_name");
            unique_group_role(unique_result, "role_name");
            // this.loading = true
            this.updategetemployee();
            // this.loading = false
            
            
            function unique(arr, field) { // 根据employeeid去重
              const map = {};
              const res = [];
              for (let i = 0; i < arr.length; i++) {
                if (!map[arr[i][field]]) {
                  map[arr[i][field]] = 1;
                  res.push(arr[i]);
                }
              }
              return res;
            };
      
            // groups_name、role_name去重
            function unique_group_role(arr, fild){
              arr.forEach(element => {
                var arr_list = [];
                var groups_name_list = element[fild];
                groups_name_list.forEach(groups => {
                  if(arr_list.indexOf(groups) === -1){
                    arr_list.push(groups)
                  }
                });
                // arr_list [] 改为 str
                element[fild] = arr_list.join(";")
              });
            }

          }
        })
      }
    });
    
  }

  // button按钮执行！ 编辑
  edit(active_data?){
    var rowdata
    // console.log("this.agGrid.getselectedrows()",this.agGrid.getselectedrows()) []
    if (active_data){
      rowdata = active_data;
    }else{
      rowdata = this.agGrid.getselectedrows();
    }
    // 得到选中的aggrid rowdatas
    console.log("------------得到选中的aggrid rowdatas--------------", rowdata)
    if (rowdata.length === 0){
      console.log("没有选中行数据", rowdata);
      // 提示选择行数据  EditDelTooltipComponent
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content: "请选择一行数据！"}} ).onClose.subscribe(
        name=>{
          // console.log("----name-----", name)
        }
      );
      
    }else if (rowdata.length > 1){
      console.log("button按钮执行222！ 编辑", rowdata);
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `请选择一行数据！`}} ).onClose.subscribe(
        name=>{
          // console.log("----name-----", name)
        }
      );
    }else{
      var rowData = rowdata[0]
      var res = JSON.parse(localStorage.getItem("employee_rolename"));
      var column = {
        employeeid:  rowData["employeeid"] // 用户id
      }
      this.loading = true
      this.getsecurity_edit("groups", "get_groups", column).subscribe((goups)=>{
        
        console.log("根据用户角色得到，用户对应的组:", goups, "res", res);
        var res_ = goups["result"]["message"][0];
        this.loading = false;
        if(res_["code"] === 1){
          // var employee_result =  result['result']['message'][0];
          var group_data = res_['message'];
          this.dialogService.open(AddUserEmployeeComponent, { closeOnBackdropClick: false,context: { rowdata: JSON.stringify(rowData), res: JSON.stringify(res), goups: JSON.stringify(group_data)} }).onClose.subscribe(
            name=>{
              console.log("----编辑-----", name);
              if (name){
                // 更新table
                // this.loading = true
                this.updategetemployee();
                this.RecordOperation("编辑用户", 1, "编辑成功")
                
                
              };
            }
          );
        }else{
          this.RecordOperation("编辑用户", 0, "编辑失败")
        }
      });
     


    }
  }

  // button按钮执行删除！
  del(active_data?){
    var rowdata
    // console.log("this.agGrid.getselectedrows()",this.agGrid.getselectedrows()) []
    console.log("------------------------\t\t\t\t\t\tactive_data",active_data)
    if (active_data){
        rowdata = active_data;
    }else{
      rowdata = this.agGrid.getselectedrows();
    }
    var that = this
    var publicservice = this.publicmethod;
    var success = this.success;
    var danger = this.danger;
    console.log("------------rowdata--------------", rowdata)
    if ( rowdata.length === 0){
      console.log("没有选中行数据", rowdata);
      // 提示选择行数据
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `请选择一行数据！`}} ).onClose.subscribe(
        name=>{
          console.log("----name-----", name);
        }
      );
    }else{
      var rowData = rowdata;
      var text = rowData.length > 1 ? "这些": "这条";
      console.log("-------------------->>>>>>>>>>>>",rowData)
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `确定要删除${text}数据吗？`, rowData: JSON.stringify(rowData)} } ).onClose.subscribe(
        name=>{
          console.log("----name-----", name);
          
          if (name){
            try {
              // 更新table
              for (let index = 0; index < rowData.length; index++) {
                const rd = rowData[index];
                console.log("++++++++++++++++++==rd", rd);
                this.loading = true
                that.getsecurity_edit('employee', 'delete_employee', rd).subscribe((result)=>{
                  var res_ = result["result"]["message"][0]; 
                  console.log("delete_employee", res_);
                  if (res_["code"] === 1){
                    console.log("删除成功")
                    this.RecordOperation("删除用户", 1, "删除成功")
                  }else if(res_["code"]===0){
                    this.RecordOperation("删除用户", 0, "删除失败");
                    throw 'error, 删除失败！'
                  }
                });
                
              }
              success(publicservice)
              this.updategetemployee();
              this.loading = false
              
            }catch(err){
              danger(publicservice)
              
            }
          }
          this.loading = false;

        }
      );

    }
  }

  action(actionmethod){
    console.log("++++++++++++++++++++action(actionmethod)++++++++++++++++++++++++++++", actionmethod);
    var method = actionmethod.split(":")[1];
    // ====================================================
    console.log("--------------->method", method)
    switch (method) {
      case 'add':
        this.add();
        break;
      case 'del':
        this.del();
        break;
      case 'edit':
        this.edit();
        break;
      case 'query':
        this.query();
        break;
      case 'import':
        this.importfile();
        break;
      case 'download':
        this.download('用户管理')
        break;
    }

  }

  // button 搜索按钮
  query(){
    var employeenumber = $("#employeenumber").val();
    if (employeenumber != ""){
      console.log("button 搜索按钮", employeenumber, "--");
      this.RecordOperation("搜索", 1, '搜索用户:' + employeenumber);
    }
  }

  //  button导出未excel
  download(title){
    this.agGrid.download(title);
    this.RecordOperation("导出"+title, 1, "导出excel表格")
  }









 

  // 导入文件
  importfile(){
    var input = document.getElementById("import");
    // js执行点击input
    input.click();
  }

  // ----------------------------导入---------------------------
  onFileChange(evt: any){
    const target: DataTransfer = <DataTransfer>(evt.target);
    console.log("导入：---------------------------", target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.importdata = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      // console.log("importdata: ", this.importdata); // 这是读取的数据转为json

      this.analysis_sheet_to_json_to_ng2(this.importdata)
    };
    reader.readAsBinaryString(target.files[0]);

  }

  // 将sheet_json转换为smart-table 数据格式！ 
  analysis_sheet_to_json_to_ng2(importdata){
    var rowData_list = importdata.slice(1,importdata.length);
    console.log("导入-----rowData_list---->", rowData_list)

    var excel_title = importdata.slice(0,1)[0];
    console.log("rowData_list----excel 除了表头的数据>", rowData_list)
    console.log("excel_title---- excel的表头>", excel_title)
    var ag_Grid_columns = this.tableDatas.columnDefs.slice(0, excel_title.length);
    console.log("ag_Grid_columns--------->ag_Grid_columns 的表头", ag_Grid_columns, "\n")
    var agGridTitle = [];
    var noexist_title = [];
    for (let index = 0; index < ag_Grid_columns.length; index++) {
      const agitem = ag_Grid_columns[index];
      const exitem = excel_title[index];

      if (agitem.headerName === exitem){
        agGridTitle.push(agitem.field);
      }else{
        console.log("字段不一致", "agTitle != exetitle", agitem.headerName, '!=', exitem);
        noexist_title.push(agitem.headerName)
      }
    }

    console.log("agGridTitle----->", agGridTitle);
    console.log("noexist_title----->", noexist_title);

    if (noexist_title.length > 0){
      this.importdanger(noexist_title);
    }else{
      var rowData = []; // rowData 就是table需要的source
      rowData_list.forEach(element => {
        var item = {};
        if(element.length != 0){
          for (let index = 0; index < element.length; index++) {
            item[agGridTitle[index]] = element[index];
          }
          rowData.push(item);
        }
        
      });
      console.log("rowData---->", rowData);
      var verify_err = [];
      var verify_after = this.verify_rowdatas(rowData, verify_err);  // 验证后的数据 得到的是验证的 错误信息！
      console.log("----------------------------------------------------------验证后的数据 err", verify_after);
      
      if (verify_after.length > 0){
        this.verify_import(verify_after);
      }else{
        try{
          // 插入数据库之前 处理数据
          var datas = this.option_table_before(rowData)
          console.log("插入数据库之前 处理数据---->", datas);
          // 将导入的数据存入数据库
          this.dev_insert_device(datas);
    
          // 将 rowData 显示到 agGrid中
          this.tableDatas.rowData = rowData
          this.agGrid.update_agGrid(this.tableDatas);
          this.RecordOperation("导入用户管理", 1, "导入excel表格")
          // this.gridData = [];
          // this.gridData.push(...rowData)
          // this.tableDatas.rowData = this.gridData;
    
          // 将导入的数据展示在table中
          // var after_datas = this.show_table_before(rowData)
          // this.table_data.source.load(rowData);
    
        }catch(err){
          alert(String(err));
          this.RecordOperation("导入用户管理", 1, String(err))
        }
      }


    }



  }

  // ----------------------------导入---------------------------

  // 将导入的数据插入到数据库中
  dev_insert_device(datas){
    const table = "employee";
    const method = 'insert_employee';
    try {
      datas.forEach(rd => {
        this.http.callRPC(table, method, rd).subscribe((result)=>{
          console.log("插入设备数据：", result)
          const status = result['result']['code'];
          if (status === 1){
          }else{
            throw `error,${status}`
          }
        })
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
      this.importsuccess()
    }catch(err){
      console.log("err: ", err)
      // this.importdanger()
    }

    
  }

  // 编辑修改前，处理一下选中的table数据
  option_table_before(datas){
    var after_datas_role: any[] =[];
    var active;
    datas.forEach(data => {
      var after_datas: any[] =[];
      switch (data["active"]) {
        case "是":
          active = 1;
          break;
          case "否":
            active = 0;
            break;
      };
      
      var after_data_: OptionEmployeeData = {
        active:active,
        department:data["department"],
        email:data["email"],
        employeeid:null,
        employeeno:data["employeeno"],
        lastupdatedby:data["lastupdatedby"],
        loginname:data["loginname"],
        name:data["name"],
        password:"3bf6e666ad793b1e2c69b3da472504d4", // 默认密码 
        phone:data["phoneno"],
      }
      after_datas.push(after_data_);
      var rids_list = this.handle_groups_and_roles(data, "role_name")
      var groups_list = this.handle_groups_and_roles(data, "groups_name")
      rids_list.forEach(item=>{
        after_datas.push(item);
      })
      groups_list.forEach(item=>{
        after_datas.push(item);
      })
      console.log("===============after_datas==========>",after_datas);
      after_datas_role.push(after_datas)
      console.log("===============rids_list==========>",rids_list);
    });
    return after_datas_role
  }
  // 处理 groups_name: "理化试验科"    role_name: "普通用户;执行方"
  handle_groups_and_roles(data, fild){
    // var groups_name = data["groups_name"].split(";");
      var names = data[fild].split(";");
      // 得到用户组和角色
      if (fild != "groups_name"){
        var get_name = JSON.parse(localStorage.getItem("employee_rolename"));
        var key = "rids";
        var key_name = "role_name"
        var id = "rid"
      }else{
        var get_name = JSON.parse(localStorage.getItem("employee_groupname"));
        var key = "gids";
        var key_name = "groups"
        var id = "groupid"
      }
      var rids_list = [];
      var res = get_name;
      names.forEach(rn => {
        var rids = {};
        res.forEach(r => {
          if (r[key_name] === rn){
            rids[key] = r[id];
            rids_list.push(rids)
          }
        });
      });
      return rids_list
      console.log("names_____________", rids_list);




  }

  
  // 验证每一行数据！ 验证excel导入的数据！
  verify_rowdatas(rowDatas, verify_err){
    rowDatas.forEach(rowdata => {

      var employeeno = rowdata["employeeno"];
      var name = rowdata["name"];
      var loginname = rowdata["loginname"];
      var email = rowdata["email"];
      var role_name = rowdata["role_name"];
      var groups_name = rowdata["groups_name"];

      // 验证！ employeeno 员工编号
      var verify_employeeno = this.verify_employeeno(employeeno);
      if (verify_employeeno != 1){
        verify_err.push({err: verify_employeeno})
      }
      // 验证！ name 姓名
      var verify_name = this.verify_name(name);
      if (verify_name != 1){
        verify_err.push({err: verify_name})
      }
      // 验证！ loginname 域账号
      var verify_loginname = this.verify_loginname(loginname);
      if (verify_loginname != 1){
        verify_err.push({err: verify_loginname})
      }
      // 验证！ email 邮箱
      var verify_email = this.verify_email(email);
      if (verify_email != 1){
        verify_err.push({err: verify_email})
      }

      // 验证！ role_name 角色名称
      var verify_role_name = this.verify_role_name(role_name);
      if (verify_role_name != 1){
        verify_err.push({err: verify_role_name})
      }
      // 验证！ groups_name 用户组
      var verify_groups_name = this.verify_groups_name(groups_name);
      if (verify_groups_name != 1){
        verify_err.push({err: verify_groups_name})
      }

      
    });
    return verify_err;
  };

  // 验证 sql 注入、 特殊字符！
  verify_sql_str(data, title){
    var special_sql = AddEmployee['special_sql']["special_sql"];
    var special_str = AddEmployee['special_sql']["special_str"];
    var sql = special_sql.test(data);
    var str = special_str.test(data);
    if(sql){
      return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
    }
    if (!str){
      return title + "不能有特殊字符！"
    }
    return 1
  }

  // 验证 employeeno 员工编号
  verify_employeeno(employeeno){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(employeeno, '员工编号');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (employeeno.length > 20){
      return "员工编号最大长度不超过20！"
    }
    return 1 // 返回1，表示 通过验证！
  }
  // 验证 name 姓名
  verify_name(name){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(name, '姓名');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (name.length > 100){
      return "姓名最大长度不超过100！"
    }

    return 1 // 返回1，表示 通过验证！
  }
  // 验证 loginname 域账号
  verify_loginname(loginname){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(loginname, '域账号');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (loginname.length > 50){
      return "域账号最大长度不超过100！"
    }

    return 1 // 返回1，表示 通过验证！
  }

  // 验证 email 邮箱
  verify_email(email){
    // sql注入和特殊字符 special_str
    var rex = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/;
    if (!rex.test(email)){
      return "邮箱格式不匹配！"
    }
    if (email.length > 50){
      return "邮箱最大长度不超过100！"
    }

    return 1 // 返回1，表示 通过验证！
  }

  // 验证 role_name 角色名称
  verify_role_name(role_name){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(role_name, '角色名称');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (role_name.length > 50){
      return "角色名称最大长度不超过100！"
    }

    return 1 // 返回1，表示 通过验证！
  }

  // 验证 groups_name 用户组
  verify_groups_name(groups_name){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(groups_name, '用户组');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (groups_name.length > 50){
      return "用户组最大长度不超过50！"
    }
    return 1 // 返回1，表示 通过验证！
  }

 

 



// 展示状态
success(publicservice){
  publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"删除成功!"});
}
danger(publicservice){
  publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"删除失败!"});
}
// 展示状态
importsuccess(){
  this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"导入成功!"});
}
importdanger(data){
  this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"缺少："+data.join(",")});
}
// 验证失败
verify_import(data){
  this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"验证不通过："+JSON.stringify(data)});
}


// option_record
RecordOperation(option, result,infodata){
  console.warn("==============>", this.userinfo.getLoginName())
  console.warn("infodata==============>", infodata)
  console.warn("==============>")
  if(this.userinfo.getLoginName()){
    var employeeid = this.userinfo.getEmployeeID();
    var result = result; // 1:成功 0 失败
    var transactiontype = option; // '新增用户';
    var info = infodata;
    var createdby = this.userinfo.getLoginName();
    this.publicmethod.option_record(employeeid, result,transactiontype,info,createdby);
  }

}




}
// table 中每行数据类型！ 这是将table中的数据改回原始数据
interface OptionEmployeeData {
  active:number,
  department:string,
  email:string,
  employeeid:number,
  employeeno:string,
  lastupdatedby:string,
  loginname:number,
  name:string,
  password:string,
  phone:string,
}
interface ROLE {
  rids: number
}

interface GROUP {
  gids: number
}