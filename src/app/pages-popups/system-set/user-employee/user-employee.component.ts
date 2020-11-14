import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../services/http/httpservice.service';

declare let layui;

declare let $;

// Md5 加密
import { Md5 } from 'ts-md5';
import { salt, ssopassword } from '../../../appconfig';
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

// 验证表单！
import { AddEmployee } from '../form_verification';

@Component({
  selector: 'ngx-user-employee',
  templateUrl: './user-employee.component.html',
  styleUrls: ['./user-employee.component.scss']
})
export class UserEmployeeComponent implements OnInit {
  @Input() rowdata: string;
  @Input() res: string;
  @Input() goups: string;

  SavSuccess :any = {position: 'bottom-end', status: 'success', conent:"添加成功!"};
  SavDanger :any = {position: 'bottom-end', status: 'danger', conent:"添加失败！"}
  SavWarning :any = {position: 'bottom-end', status: 'warning', conent:"添加失败！请确认是否选择了`角色`"}


  constructor(protected dialogRef: NbDialogRef<UserEmployeeComponent>, private http: HttpserviceService,private userinfo: UserInfoService, 
    private publicservice: PublicmethodService, ) { 

    // this.getsecurity('employee', 'get_rolename', {}, this.http).subscribe((res: any[])=>{
    //   // 初始化角色名
    //   localStorage.setItem("employee_role_all_", JSON.stringify(res));
    // });

    // this.getsecurity('groups', 'get_group', {}, this.http).subscribe((res: any[])=>{
    //   // 初始化用户组
    //   localStorage.setItem("employee_group_all_", JSON.stringify(res));
    // });
    
    this.login_name = this.userinfo.getName();
  }

  // 登录用户名
  login_name;



  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.layuiform();
  }



  ngOnDestroy(){
    // 删除 man-hour-kpi-report2-buttons
    // localStorage.removeItem("employee_role_all_");
    // localStorage.removeItem("employee_group_all_");
  }


  // layui from
  layuiform(){
    var getsecurity = this.getsecurity;
    var http = this.http;

    var login_name = this.login_name;
    var publicservice = this.publicservice;
    var dialogRef = this.dialogRef;
    
    var success = this.success;
    var danger = this.danger;
    // roleinput
    var isnot_edit = JSON.parse(this.rowdata)
    if ( isnot_edit != 'add'){
      // 编辑！
      console.log("LLLLLLLLLLLLLLLLLLLLLL\n")
      console.log("LLLLLLLLLLLLLLLLLLLLLL\n",JSON.parse(this.rowdata),"groups",JSON.parse(this.goups))
      console.log("LLLLLLLLLLLLLLLLLLLLLL\n")
      // 填充from的对象
      var formdata = {}
      var rowdata = JSON.parse(this.rowdata);
      var res:any[] = JSON.parse(this.res);
      var rids:any[] = rowdata["rids"];
      var select_goups:any[] = JSON.parse(this.goups);
      formdata["employeeno"] = rowdata["employeeno"] // 账号
      // formdata["active"] = rowdata["active"]=== '是'? 0: 1 // 是否有效
      formdata["active"] = rowdata["active"]=== '是'? true: false // 是否启用
      formdata["name"] = rowdata["name"] // 姓名
      formdata["loginname"] = rowdata["loginname"] // 登录名
      formdata["email"] = rowdata["email"] // 邮箱
      formdata["phoneno"] = rowdata["phoneno"] // 手机号
      formdata["department"] = rowdata["department"] // 部门
      formdata["employeeid"] = rowdata["employeeid"] // 用户id

      
      // 得到的用户组数据
      var groups= JSON.parse(localStorage.getItem("employee_group_all_"))["message"];



      formdata[res["rid"]] = true
      // res 所以的角色，rids选择的角色
      console.log("================================\n")
      console.log("===============res=================\n",res, rids)
      console.log("================================\n")
      res.forEach(re => {
        rids.forEach(element => {
          if (element["rid"] === re["rid"]){
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", element)
            formdata[element["rid"]] = "on"
          }
        });
      });

      // 初始化用户组 select_goups
      groups.forEach(gps => {
        select_goups.forEach(g => {
          if (g["groupid"] === gps["groupid"]){
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", g)
            formdata[g["groupid"] + "_g"] = "on"
          }
        });
      });

    
    
    
    }

    var that = this
    layui.use(['form', ], function(){
      var form = layui.form;
      form.render(); // 刷新所有！
      
      // 验证 表单
      form.verify({
        // 员工编号
        employeeno: function(value, item){
          console.log("验证、表单: AddEmployee",AddEmployee);
          console.log("验证、表单: employeeno",AddEmployee["employeeno"]);
          console.log("验证、表单: value",value);
          console.log("验证、表单: item",item);
          // sql注入和特殊字符 special_str
          var special_sql = AddEmployee['special_sql']["special_sql"];
          var special_str = AddEmployee['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);

          if(sql){

            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (!str){
            return "员工编号不能有特殊字符！"
          }
          if (value.length > 20){
            return "员工编号最大长度不超过20！"
          }
          // if (! new RegExp(AddEmployee["employeeno"]).test(value)){
          //   return "员工编号只能输入数字、字母、下划线！"
          // }
          
        },
        // 姓名
        name: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = AddEmployee['special_sql']["special_sql"];
          var special_str = AddEmployee['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "不能有特殊字符！"
          }
          if (value.length > 100){
            return "姓名最大长度不超过100！"
          }
          // if (! new RegExp(AddEmployee["name"]).test(value)){
          //   return "姓名不能有特殊字符！"
          // }
          
        },
        // 域账号
        loginname: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = AddEmployee['special_sql']["special_sql"];
          var special_str = AddEmployee['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "域账号不能有特殊字符！"
          }
          if (value.length > 50){
            return "域账号最大长度不超过50！"
          }
          // if (! new RegExp(AddEmployee["loginname"]).test(value)){
          //   return "域账号不能有特殊字符"
          // }
          
        }
      })

      
      var select_roleid = [];
      var $parenttitle = $("#roleinput");
      var select_group = [];
      var res_list;


      // var res;
      // var groups;

      
      var res = JSON.parse(localStorage.getItem("employee_rolename"));
      var groups = JSON.parse(localStorage.getItem("employee_group_all_"))["message"];

      
    // 在用户的初始化时，得到，放到缓存中！
      console.log("----------初始化角色名",res,"\n\n", localStorage.getItem("employee_rolename"))
      console.log("----------初始化角色名",groups,"\n\n", localStorage.getItem("employee_group_all_"))
      // 初始化角色名
      for (let r of res){
        var r_str = `<input type="checkbox" name="${r["rid"]}" title="${r["role_name"]}">`;
        select_roleid.push(r["rid"])
        $parenttitle.append(r_str);
      }
      res_list = res
      // 初始化 用户组-----------------------
    
      var $employee_group = $("#employeegroupinput");
      for (let g of groups){
        // var g_str = `<input type="checkbox" name="${g["group_name"]}" title="${g["group"]}">`;
        // select_group.push(g["group_name"]);
        var g_str = `<input type="checkbox" name="${g["groupid"]}_g" title="${g["group"]}">`;
        select_group.push(g["groupid"]+ "_g");
        $employee_group.append(g_str);
      }
      // 初始化 用户组-----------------------
      form.render("radio"); // 刷新单选框！
      form.render("select"); // 刷新下拉框！
      form.render("checkbox"); // 刷新复选框！

      // ----------编辑
      if(isnot_edit != 'add'){
        form.val("employee", formdata); 
      }

      form.on("submit(employee)", function(data){
        // 编辑用户！
        if (isnot_edit != 'add'){
          var send_data = {};
          var send_data_list = [];
          var send_data_ = {};
          send_data["employeeid"] = rowdata["employeeid"];
          send_data["active"] = data.field["active"] === 'on'? 1: 0;
          send_data["department"] = data.field["department"];
          send_data["email"] = data.field["email"];
          send_data["name"] = data.field["name"];
          send_data["phoneno"] = data.field["phoneno"];
          send_data["employeeno"] = data.field["employeeno"];
          send_data["loginname"] = data.field["loginname"];
          send_data_list.push(send_data);
          
          var send_data_item = {};
          res.forEach(res => {
            send_data_item[res["rid"]] = data.field[res["rid"]]? true: false;
          });
  
  
          res.forEach(r => {
            select_roleid.forEach((item)=>{
              var select_role_dict = {};
              if (send_data_item[item] && r["rid"]===item){
                select_role_dict["rids"] = r["rid"]
                // select_roleids.push(select_role_dict);
                send_data_list.push(select_role_dict)
              }
            })
          });
  
          // -------------------------------------------
          // 模拟用户组 select_group [huanbao, huanjing,jiegou,lihua,xinnengyuan]
          var send_group_item_list = []
          select_group.forEach(item =>{
            var send_group_item = {};
            send_group_item["groupid"] = data.field[item]? true: false;
            send_group_item["group"] = item;
            send_group_item_list.push(send_group_item)
          })
  
          console.log("employee_group,   send_group_item_list,   ", groups,  send_group_item_list )
  
  
          groups.forEach(group=>{
            var select_group_item = {};
            send_group_item_list.forEach(select=>{
              if (select["groupid"] && group["groupid"] == select["group"].split('_')[0]){
                select_group_item["gids"] = group["groupid"];
                console.log("select_group_item", select_group_item)
                send_data_list.push(select_group_item);
              }
  
            })
          })
          // -------------------------------------------
  
  
          console.log("提交修改的",  send_data_list) //被执行事件的元素DOM对象，一般为button对象
          // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
          // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
  
  
          // 更新修改的数据！ update_employee
          getsecurity("employee", "update_employee",send_data_list,http).subscribe((res)=>{
            if (res ===1 ){
              that.editsuccess();
              localStorage.removeItem("employee_agGrid");
              var empid = send_data_list[0].employeeid;
              var column = {employeeid: empid};
              // this.http.callRPC('emeployee', 'get_employee_withid', column)
              getsecurity("employee", "get_employee_withid",column,http).subscribe(res=>{
                if( res["code"] === 0){
                  // 表示token过期了，跳转到 / 
                }
                // 处理data
                var result_data = res["message"].reverse();
                var other_result_data_after = [];
                result_data.forEach(result => {
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
          
                send_data_list[0] = unique_result[0]
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
                console.log("&&&    unique_result[0]                &", unique_result[0])
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                dialogRef.close(unique_result[0]);
                // 记录操作
                var infodata = "姓名:" + unique_result[0]["name"] + "," + "域账号:" + unique_result[0]["loginname"] + "id:" + unique_result[0]["employeeid"];
                that.RecordOperation( 1, "编辑用户",infodata)
                
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
              
            }else{
              this.editdanger()
              that.RecordOperation( 0, "编辑用户",String(res["message"]))
            }
          })
          return false;
        }
        console.log("employeegroupinput》》》》》》》》》》》》》》", data.field)
        var send_data = {};
        send_data["employeeid"] = null;
        send_data["active"] = data.field["active"] === 'on'? 1: 0;
        send_data["employeeno"] = data.field["employeeno"];
        send_data["loginname"] = data.field["loginname"];
        var send_data_list = [];
        send_data_list.push(send_data);
        getsecurity('employee', 'get_rolename', {}, http).subscribe((res: any[])=>{
          var send_data_item = {};
          res_list.forEach(res => {
            send_data_item[res["rid"]] = data.field[res["rid"]]? true: false;
          });
          res.forEach(r => {
            var select_role_dict = {};
            select_roleid.forEach((item)=>{
              if (send_data_item[item] && r["rid"]===item){
                select_role_dict["rids"] = r["rid"]
                send_data_list.push(select_role_dict)
              }
            })
          });
          // -------------------------------------------
          // 模拟用户组 select_group [huanbao, huanjing,jiegou,lihua,xinnengyuan]
          var send_group_item_list = []
          select_group.forEach(item =>{
            var send_group_item = {};
            send_group_item["groupid"] = data.field[item]? true: false;
            send_group_item["group"] = item;
            send_group_item_list.push(send_group_item)
          })
          console.log("employee_group,   send_group_item_list,   ", groups,  send_group_item_list )
          groups.forEach(group=>{
            send_group_item_list.forEach(select=>{
              if (select["groupid"] && group["groupid"] == select["group"].split('_')[0]){
                var select_group_item = {};
                select_group_item["gids"] = group["groupid"];
                console.log("select_group_item", select_group_item)
                send_data_list.push(select_group_item);
              }

            })
          })
          // -------------------------------------------
          

          // 调用新增函数！
          
          
          send_data["name"] = data.field["name"]; // 姓名
          send_data["phoneno"] = data.field["phoneno"];      // 手机号
          send_data["email"] = data.field["email"];      // 域账号清单 list 转换为str
          // send_data["id"] = data.field["data"]["userId"];      // 用户中心用户ID
          send_data["lastupdatedby"] = login_name;      // 操作人
          send_data["active"] = 1;      
          send_data["department"] = data.field["department"];      // 部门 
          send_data["password"] =  Md5.hashStr(ssopassword  + salt );;      // 默认的初始密码

          console.log("新增",send_data_list) //被执行事件的元素DOM对象，一般为button对象
          if (send_data_list.length <= 1){
            // publicservice.toastr(SavWarning);
            that.warning();
            that.RecordOperation(0, '新增用户', '警告:没有选择角色')
          }
          else{
            getsecurity("employee", "insert_employee", send_data_list, http).subscribe((res)=>{
              if (res === 1){
                // 成功
                dialogRef.close(true);
                // dialogRef.close(send_data_list);
                success(publicservice);
                var operationdata = "姓名:" + send_data_list[0]["name"] + "," + "域账号:" + send_data_list[0]["loginname"];
                var option = '新增用户'; 
                that.RecordOperation(1, option, operationdata)
              }else{
                // 失败
                // SavDanger["conent"] = res
                // publicservice.toastr(SavDanger)
                danger(publicservice);
                var operationdata = String(res)
                that.RecordOperation(0, option, operationdata)
              }
            })
          }

        });

        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。


      })


    });


  }

  // × 关闭diallog   及关闭弹框
  closedialog(){
    this.dialogRef.close(false);
  }

  // 取消
  cancel(){
    this.dialogRef.close(false);
  }




  // 请求得到 表get_employee中的数据！
  getsecurity(table: string, method: string, colums: object, http){
    return new Observable((res)=>{
      http.callRPC(table, method, colums).subscribe((result)=>{
        console.log("*************---------------------****************", result)
        var employee_result =  result['result']['message'][0];
        res.next(employee_result)
      })
    })
  }

  // 展示状态
  success(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"添加成功!"});
  }
  danger(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"添加失败!"});
  }
  warning(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"添加失败！请确认是否选择了`角色`"});
  }
  editsuccess(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"添加成功!"});
  }
  editdanger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"添加失败!"});
  }
  
  // option_record
  RecordOperation(result,transactiontype, infodata){
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = transactiontype; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(employeeid, result, transactiontype, info, createdby);
    }

  }

}
