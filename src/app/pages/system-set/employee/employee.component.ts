import { Component, OnInit } from '@angular/core';
import { config } from 'process';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../services/http/httpservice.service';

import {Data} from "@angular/router";
import { AgGridActionComponent } from '../components/ag-table/ag-grid-action/ag-grid-action.component';

declare let layui;

declare let $;

@Component({
  selector: 'ngx-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private http: HttpserviceService, ) { }

 

  ngOnInit(): void {

    // =========================
    this.getemployee();
    // =========================

    // 需要加载所有的菜单
    var roles = 1;
    var methods = "get_menu_role"
    this.loadallMenu(roles, methods).subscribe((res)=>{
      console.log("--需要加载所有的菜单--", res)
    });

    //  加载formSelect模块
    layui.config({
        base: "./assets/pages/system-set/layui/module/"
        // base: "../../../../assets/pages/system-set/layui/module/"
        // base: "assets/pages/system-set/layui/module/"
    }).extend({
        // treeSelect2: "treeSelect/treeSelect",
        // eleTree2: "eleTree/eleTree"
    });

    layui.use(['form', 'element', 'eleTree'], function(){
      var form = layui.form;
      var element = layui.element;


      // 右侧的树状结构！
      var data=[
        {
            "id": 1,
            "label": "安徽省",
            "checked": false, // 勾选
            "parentid": 0,
            "children": [
                {
                    "id": 2,
                    "label": "马鞍山市",
                    "disabled": true,
                    "parentid": 1,
                    "children": [
                        {
                            "id": 3,
                            "label": "和县",
                            "parentid": 2,
                        },
                        {
                            "id": 4,
                            "label": "花山区",
                            "checked": false,
                            "parentid": 2,
                        }
                    ]
                },
                {
                    "id": 22,
                    "label": "淮北市",
                    "checked": false,
                    "children": [
                        {
                            "id": 23,
                            "label": "濉溪县",
                            
                        },
                        {
                            "id": 24,
                            "label": "相山区",
                        }
                    ]
                }
            ]
        },
        {
            "id": 5,
            "label": "河南省",
            "checked": true, // 勾选
            "children": [
                {
                    "id": 6,
                    "label": "郑州市",
                    "checked": false, // 勾选
                }
            ]
        },
        {
            "id": 10,
            "label": "江苏省",
            "children": [
                {
                    "id": 11,
                    "label": "苏州市"
                },
                {
                    "id": 12,
                    "label": "南京市",
                    "children": [
                        {
                            "id": 13,
                            "label": "姑苏区"
                        },
                        {
                            "id": 14,
                            "label": "相城区"
                        }
                    ]
                }
            ]
        }
      ];

      var eleTree = layui.eleTree;
      var el2=eleTree.render({
        elem: '.ele2',
        data: data, 
        // url: "../eleTree/tree.json",
        showCheckbox: true,
        defaultExpandAll: false, // 是否默认展开所有节点
        // defaultCheckedKeys: [23,24],  // 默认勾选的节点的 key 的数组
        // defaultExpandedKeys: [23,24],    // 默认展开的节点的 key 的数组
        checkStrictly: true, //在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
        done: function() {
            // el2.remove(24);
        }
      });
      // 获取选择中的节点，接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2.是否包含半选节点，默认值为 false

      // 节点点击事件
      // eleTree.on("nodeClick(data2)",function(d) {
      //   console.log("点击节点对应的数据", d.data);    // 点击节点对应的数据
      //   console.log("event对象", d.event);   // event对象
      //   console.log("点击的dom节点", d.node);    // 点击的dom节点
      //   console.log("与d.node相同",this);      // 与d.node相同
      // }) 

      // input被选中事件
      // var select_id = el2.getChecked(true,false);
      var select_id = [];
      eleTree.on("nodeChecked(data2)",function(d) {
        console.log(d.data);    // 点击节点对于的数据
        console.log(d.isChecked);   // input是否被选中
        // var select_id = [];
        if (d.isChecked){
          // 展开所有
          el2.expandNode(d.data["currentData"]["id"])
          // 表示该节点被选中！判断是否是父节点
          console.log(d.data["currentData"]);
          // select_id.push(d.data["currentData"]["id"]);
          uniq(select_id, d.data["currentData"]["id"])
          if (d.data["currentData"] != undefined){
            var children = d.data["currentData"]["children"]
            children.forEach(element => {
              if (element["children"] != undefined){
                // select_id.push(element["id"]);
                uniq(select_id, element["id"])
                var e_children = element["children"];
                e_children.forEach(e_element => {
                  // 按钮
                  // select_id.push(e_element["id"]);
                  uniq(select_id, e_element["id"])
                });
              }else{
                // 菜单
                uniq(select_id, element["id"])
              }
            });
            console.log("该节点为父节点！字节点", children);
            console.log("该节点为父节点！当前节点", d.data["currentData"]);
            // 需要
            // el2.setChecked(select_id,true);
          }
          console.log("点击父节点，默认子节点也选中", select_id)
          
        }else{
          // 取消 el2.unCheckArrNodes(22,24);
          if (d.data["currentData"] != undefined){
            var children = d.data["currentData"]["children"]
            // unselect_id.push(d.data["currentData"]["id"]);
            del_unselect(select_id, d.data["currentData"]["id"]);
            children.forEach(element => {
              if (element["children"] != undefined){
                var e_children = element["children"];
                del_unselect(select_id, element["id"])
                e_children.forEach(e_element => {
                  // 按钮
                  del_unselect(select_id, e_element["id"])
                });
              }else{
                // 菜单
                del_unselect(select_id, element["id"])
              }
            });
          }else{
            del_unselect(select_id, d.data["currentData"]["id"])
          }
          console.log("取消的节点", select_id)
        }
        
        el2.setChecked(select_id,true);
        
        // console.log(d.node);    // 点击的dom节点
        // console.log(this);      // input对于的dom
      })


      function uniq(select_id, id) {
        var index = select_id.indexOf(id);
        if (index === -1){
          select_id.push(id)
        }
        
      }

      // 勾选的列表去除，取消勾选的
      function del_unselect(select_id, unselect_id) {
        console.log("select_id, unselect_id", select_id, unselect_id);
        // select_id:勾选的列表， unselect：取消勾选的
        var index = select_id.indexOf(unselect_id);
        if (index != -1){
          select_id.splice(index, 1);
        }
        console.log("勾选的列表去除，取消勾选的 select_id", select_id)
      }
      
       

      
      // 右侧的树状结构！
      
      // 目录--》上级目录
      var $parenttitle = $("#parenttitle");
      $parenttitle.append("<option value=0>null</option>");
      $parenttitle.append("<option value=1>设备监控</option>");
      // 菜单--》上级目录
      var $caidanparentname = $("#caidanparentname");
      $caidanparentname.append("<option value=0>null</option>");
      $caidanparentname.append("<option value=1>设备监控</option>");
      $caidanparentname.append("<option value=2>工时KPI</option>");

      // 菜单--》上级目录--组


      form.render();

      // 表单赋值--目录
      form.val("mulu", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        "muluname": "首页" // "name": "value"
        ,"muluname_en": "Home" // "name": "value"
        ,"parenttitle": 1
        ,"mulumenuurl": '/pages/home'
        ,"mulu_visible": false
        ,"mululevel": 6

      });
      // 表单赋值--菜单
      form.val("caidan", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        "caidanname": "首页" // "name": "value"
        ,"caidanname_en": "Home" // "name": "value"
        ,"caidanparentname": 2
        ,"caidanmenuurl": '/pages/home/add'
        ,"caidan_visible": true
        ,"caidanpermissionValue": 'user:add'
        ,"caidanlevel": 5

      });
      // 表单赋值--按钮
      form.val("anniu", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        "anniuname": "按钮" // "name": "value"
        ,"anniuname_en": "Button" // "name": "value"
        ,"anniupermissionValue": "anniu:add"
        ,"anniulevel": 2

      });

      // 确定--目录
      form.on('submit(mulu)', function(data){
        console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });

      // 确定--按钮
      form.on('submit(anniu)', function(data){
        console.log("确定--按钮")
        console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });

      element.on('tab(docDemoTabBrief)', function(data){

      })

      // 保存按钮
      form.on('submit(save)', function(data){
        console.log("--保存按钮---", data);
        // console.log(el2.getChecked(true,false));
        console.log(el2.getChecked(false,true))
        return false;
      })


    });


    // nz-table 初始化
    // this.http.callRPC('employee', 'get_employee', {}).subscribe((data: any) => {
    //   this.listOfAllData = data['result']['message'][0];
    //  console.log("listOfAllData", this.listOfAllData)
    //  this.listOfAllData = [...this.listOfAllData];
    //  console.warn(this.listOfAllData);
    // })
  }



  item = {
    id: 0,
    title: "null"
  }




  // × 关闭diallog   及关闭弹框
  closedialog(){
    console.log("取消")
  }
  
  confirm(){
    console.log("确定")
    
  }
  
  cancel(){
    console.log("取消")

  }

  // 得到菜单--所有的菜单
  // 当点击角色是请求菜单
  loadallMenu(roles, methods){
    console.log("点击角色执行", roles, methods);
    localStorage.setItem("click_col_roles", roles);
    return new Observable((observe)=>{
      const colums = {
        languageid: this.http.getLanguageID(),
        roleid: roles
      };
      console.log("---colums--",colums)
      const table = "menu_item";
      const method = methods;
      this.http.callRPC(table, method, colums).subscribe((result)=>{
        // console.log("get_menu_role", result)
        var allmenu_selectmenu = result['result']['message'][0]
        const allmenu = result['result']['message'][0]["allmenu"];
        const selectmenu = result['result']['message'][0]["selectmenu"];
        console.log("sys_role_menu", allmenu)
        // localStorage.setItem(SYSROLEMENU, JSON.stringify(allmenu));
        // 得到特定的树状结构数据
        observe.next(allmenu_selectmenu)
        // this.sysrolemenu_to_tree(allmenu, selectmenu).subscribe((treedata)=>{
        //   observe.next(treedata)
        // });
      })
    })
    
    // this.RanderTable(data);
  }


  // // ===========================================================
  // perPageCount1 = 10;    // 后端显示页数
  // private requestPageCount = 3; // 每次请求3页
  // page(content) {
  //   this.perPageCount1 = content;
  //   console.warn(this.perPageCount1, '改变后的页数');
  // }
  //  tablename1 = 'INTERFACE_LOG';  // 表名
  //  columnName1 = [
  //   {key : 'transactionid', value: '姓名'},
  //   {key : 'result', value: '账号'},
  //   {key : 'message', value: '是否启用'},
  //   {key : 'transactiontype', value: '编号'},
  //   {key : 'createdon', value: '邮箱'},
  //   {key : 'wiporder', value: '手机号'}
  // ];
  // primaryKey1 = "id";  // 主键
  // searchBingdValue1 = [        // 双向绑定数据 搜索使用
  //   {key: 'transactionid', value: ''},
  //   {key: 'result', value: ''},
  //   {key: 'message', value: ''},
  //   {key: 'transactiontype', value: ''},
  //   {key: 'createdon', value: ''},
  //   {key: 'wiporder', value: ''},
  // ];

  // // 所有数据
  // listOfAllData: Data[] = [];
  // listOfnewData: Data[] = [];
  // listOfAllData1 = [

  // ];

  // getChildEvent1(selectList) {
  //   // 打印子组件传递的数据
  //   console.warn(selectList);
  // }

  // tableBtn = {
  //   'show': true,
  //   'title': 'CONTEXT',
  //   'key': 'context',
  // };

  // tableBtnClick(content) {
  //   console.log("tableBtnClick(content)", content)
  //  // this.remind.showSuccess("具体执行详情:", content);
  //  // console.warn(content);
  // }
  // isShowSelect = false;

  // PagenumChange1(content) {
  //   // 总页数
  //   let totalPages = Math.ceil(this.listOfAllData.length / this.perPageCount1);
  //   console.warn(this.listOfAllData, "perPageCount");
  //   console.warn(totalPages, content, '总页数，当前页');
  //   console.warn(this.perPageCount1, '当前条数');
  //   // 获取当前页码下的新数据
  //   if (content + 1 >= totalPages) {
  //     console.warn("触发");
  //     const offset = this.listOfAllData.length;
  //     const limit = this.perPageCount1 * this.requestPageCount; // 每次请求3页，每页10条
  //     console.warn(this.perPageCount1, '触发后条数');
  //     console.warn(offset, 'offset');
  //     this.getDatas('interface_log', 'get_employee', { "offset": 0, "limit": 10}, 2);
  //   }
  // }



   // 通过服务向服务器请求数据
  //  getDatas(table: string, method: string, colums: object, type: number): void {
  //   /**get data**/
  //   this.http
  //     .callRPC(table, method, colums)
  //     .subscribe((data: any) => {
  //        if (type === 1) {
  //       this.listOfAllData = data['result']['message'][0];
  //       console.log("listOfAllData", this.listOfAllData)
  //       this.listOfAllData = [...this.listOfAllData];
  //       console.warn(this.listOfAllData);
  //      } else if (type === 2) {  // 页码改变后触发新的数据
  //       this.listOfnewData = data['result']['message'][0];
  //       this.listOfAllData.push(...this.listOfnewData);
  //       this.listOfAllData = [...this.listOfAllData];
  //       console.warn(this.listOfAllData, '页码改变后的数据');
  //   }
  //     }
  //     );
  // }



// SearchInputComponent
  // =============================================================agGrid

  tableDatas = {
    action: true,
    actioncomponent: "",
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection
      { field: 'name', headerName: '姓名', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,},
      { field: 'loginname', headerName: '域账号',  },
      { field: 'role_name', headerName: '角色名称', },
      { field: 'groups_name', headerName: '用户组', },
      { field: 'active', headerName: '是否启用', },
      { field: 'employeeno', headerName: '编号', },
      { field: 'email', headerName: '邮箱', },
      { field: 'phoneno', headerName: '手机号', },
      { field: 'pictureurl', headerName: '头像地址', },
      { field: 'department', headerName: '部门', },
      { field: 'lastsignondate', headerName: '最后登录时间', },
      
    ],
    rowData: [ // data
      { name: 'Toyota', loginname: 'Celica', role_name: 35000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,department: "ZJX", lastsignondate:"2020"},
      // { name: 'Ford', loginname: 'Mondeo', role_name: 32000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,department: "ZJX", lastsignondate:"2020" },
      // { name: 'Porsche', loginname: 'Boxter', role_name: 72000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,department: "ZJX", lastsignondate:"2020" }
    ],
  }

  private gridData = [];
  
  getemployee(event?){
    var offset;
    var limit;
    console.log("event------------------------------------------------", event);
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
      var get_employee_limit = res['result']['message'][0]
      console.log("get_employee_limit", get_employee_limit);

      var message = res["result"]["message"][0];
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

      console.log("***************************************************")
      console.log("*******************unique_result****************", unique_result)
      this.gridData.push(...unique_result)
      // this.tableDatas.rowData = this.gridData;
      this.tableDatas.rowData = unique_result;
      
      console.log("***************************************************")
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

    })
  }


  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event){
    console.log("页码改变的回调", event);
    this.getemployee(event);
  }



  // ================================================================
}
