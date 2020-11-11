import { Component, OnInit, Input } from '@angular/core';
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

  SavSuccess :any = {position: 'bottom-end', status: 'success', conent:"添加成功!"};
  SavDanger :any = {position: 'bottom-end', status: 'danger', conent:"添加失败！"}
  SavWarning :any = {position: 'bottom-end', status: 'warning', conent:"添加失败！请确认是否选择了`角色`"}


  constructor(protected dialogRef: NbDialogRef<UserEmployeeComponent>, private http: HttpserviceService,private userinfo: UserInfoService, 
    private publicservice: PublicmethodService, ) { 

    this.getsecurity('employee', 'get_rolename', {}, this.http).subscribe((res: any[])=>{
      // 初始化角色名
      localStorage.setItem("employee_role_all_", JSON.stringify(res));
    });

    this.getsecurity('groups', 'get_group', {}, this.http).subscribe((res: any[])=>{
      // 初始化用户组
      localStorage.setItem("employee_group_all_", JSON.stringify(res));
      
    });
    
    this.login_name = this.userinfo.getName();
    console.log("LLLLLLLLLLLLLLLLLLL", this.login_name);

  }

  // 登录用户名
  login_name;



  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.layuiform();
    
  }


  // layui from
  layuiform(){
    var getsecurity = this.getsecurity;
    var http = this.http;

    var login_name = this.login_name;
    var publicservice = this.publicservice;
    var SavSuccess = this.SavSuccess;
    var SavDanger = this.SavDanger;
    var SavWarning = this.SavWarning;
    var dialogRef = this.dialogRef;
    
    var success = this.success;
    var danger = this.danger;
    // roleinput

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

      form.on('radio(filter)', function(data){
        console.log(data.elem); //得到radio原始DOM对象
        console.log(data.value); //被点击的radio的value值
      });
      var select_roleid = [];
      var select_group = [];
      var res_list;
      var $parenttitle = $("#roleinput");

      var res = JSON.parse(localStorage.getItem("employee_role_all_"));
      var groups = JSON.parse(localStorage.getItem("employee_group_all_"))["message"];;
      console.log("----------初始化角色名",res,"\n\n")
      console.log("----------初始化角色名",groups,"\n\n")
      // 初始化角色名
      for (let r of res){
        // var r_str = `<input type="checkbox" name="${r["role"]}" title="${r["role_name"]}">`;
        // select_roleid.push(r["role"])
        var r_str = `<input type="checkbox" name="${r["rid"]}" title="${r["role_name"]}">`;
        select_roleid.push(r["rid"])
        $parenttitle.append(r_str);
      }
      res_list = res


      // 初始化 用户组-----------------------
      var employee_group = [
        {group: "huanbao", group_name: "环保试验室", groupid: 11},
        {group: "huanjing", group_name: "环境试验室", groupid: 22},
        {group: "jiegou", group_name: "结构试验室", groupid: 33},
        {group: "lihua", group_name: "理化试验室",groupid: 44},
        {group: "xinnengyuan", group_name: "新能源试验室", groupid: 55}
      ]
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
      

      form.on("submit(employee)", function(data){
        console.log("employeegroupinput》》》》》》》》》》》》》》", data.field)
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        var send_data = {};
        var send_data_ = {};
        send_data["employeeid"] = null;
        send_data["active"] = data.field["active"] === 'on'? 1: 0;
        send_data["employeeno"] = data.field["employeeno"];
        send_data["loginname"] = data.field["loginname"];

        var send_data_list = [];
        send_data_list.push(send_data);
        getsecurity('employee', 'get_rolename', {}, http).subscribe((res: any[])=>{
          console.log("-------------------->>>>>", select_roleid, res_list)
          var send_data_item = {};
          res_list.forEach(res => {
            send_data_item[res["rid"]] = data.field[res["rid"]]? true: false;
          });

          console.log("************************",res)
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
                dialogRef.close(send_data_list);
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

  // option_record
  RecordOperation(result,transactiontype, infodata){
    console.warn("==============>", this.userinfo.getLoginName())
    console.warn("infodata==============>", infodata)
    console.warn("==============>")
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
