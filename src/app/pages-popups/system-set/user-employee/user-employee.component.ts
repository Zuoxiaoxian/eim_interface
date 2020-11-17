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

      
      
    
    this.login_name = this.userinfo.getName();
  }

  // 登录用户名
  login_name;

  title;

  // role-group
  roles_group = {
    roles: JSON.parse(localStorage.getItem("roles")),
    groups: JSON.parse(localStorage.getItem("groups"))
  };



  ngOnInit(): void {
    var isnot_edit = JSON.parse(this.rowdata)
    if (isnot_edit != 'add'){
      this.title = '编辑用户'
    }else{
      this.title = '添加用户'

    }
  }

  ngAfterViewInit(){
    // this.http.callRPC('', 'sys_get_all_role_and_group', {}).subscribe(result=>{
    //   console.log("---result-----------------------------------------------", result);
    //   if (result["result"]["message"][0]["code"]===1){
    //     this.roles_group =  result["result"]["message"][0];
    //   }
    // })
    console.log("^^^^^^^^^^^^^^^^^^^")
    console.log("^^^^^^^^^^^^^^^^^^^roles_group", this.roles_group)
    console.log("^^^^^^^^^^^^^^^^^^^")
    this.layuiform();
  }



  ngOnDestroy(){
    // 删除 man-hour-kpi-report2-buttons
    // localStorage.removeItem("employee_role_all_");
    // localStorage.removeItem("employee_group_all_");
  }



  // layui from
  layuiform(){
    var that = this;
    var login_name = this.login_name;
    var publicservice = this.publicservice;
    var dialogRef = this.dialogRef;
    
    var success = this.success;
    var danger = this.danger;
    // roleinput
    var isnot_edit = JSON.parse(this.rowdata)
    if ( isnot_edit != 'add'){
      that.title = '编辑用户'
      // 编辑！
      console.log("LLLLLLLLLLLLLLLLLLLLLL\n")
      console.log("LLLLLLLLLLLLLLLLLLLLLL\n",JSON.parse(this.rowdata))
      console.log("LLLLLLLLLthat.roles_groupLLLLLLLLLLLLL\n",that.roles_group)
      // 填充from的对象
      var formdata = {}
      var rowdata = JSON.parse(this.rowdata);
      var res:any[] = that.roles_group["roles"];
      
      var select_goups:any[] = rowdata["groupids"];
      formdata["employeeno"] = rowdata["employeeno"] // 账号
      // formdata["active"] = rowdata["active"]=== '是'? 0: 1 // 是否有效
      formdata["active"] = rowdata["active"]=== 1? true: false // 是否启用
      formdata["name"] = rowdata["name"] // 姓名
      formdata["loginname"] = rowdata["loginname"] // 登录名
      formdata["email"] = rowdata["email"] // 邮箱
      formdata["phoneno"] = rowdata["phoneno"] // 手机号
      formdata["department"] = rowdata["department"] // 部门
      formdata["employeeid"] = rowdata["employeeid"] // 用户id

      
      // 得到的用户组数据 和 用户的角色
      var groups = that.roles_group["groups"]
      var rids:any[] = rowdata["rids"];
      formdata[res["rid"]] = true
      // res 所以的角色，rids选择的角色
      console.log("===============res=================\n",res, rids)
      res.forEach(re => {
        rids.forEach(element => {
          if (element["rid"] === re["rid"]){
            formdata[element["rid"]] = "on"
          }
        });
      });

      // 初始化用户组 select_goups
      groups.forEach(gps => {
        select_goups.forEach(g => {
          if (g["gid"] === gps["groupid"]){
            formdata[g["gid"] + "_g"] = "on"
          }
        });
      });

    
    
    
    }

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
      
      var res = that.roles_group["roles"];
      var groups = that.roles_group["groups"];
      
    // 在用户的初始化时，得到，放到缓存中！
      console.log("----------初始化角色名",res,"\n\n", res)
      console.log("----------初始化角色名",groups,"\n\n", groups)
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
          that.getsecurity("employee", "update_employee",send_data_list).subscribe((res)=>{
            console.log("更新修改的数据！ update_employee>>>>>>>>>>>>>>>>>>>>>>",res)
            var res_ = res["result"]["message"][0];
            switch (res_["code"]) {
              case 401:
                that.editdanger()
                that.RecordOperation( 0, "编辑用户",'会话结束')
                that.dialogRef.close(false)
                break;
                case 1:
                  that.editsuccess();
                  localStorage.removeItem("employee_agGrid");
                  that.dialogRef.close(true)
                  
                  
                  break;
                  case 0:
                    that.editdanger()
                    that.dialogRef.close(false)
                that.RecordOperation( 0, "编辑用户",String(res_["message"]))
                break;

            }
            
          })
          return false;
        }else{

          console.log("employeegroupinput》》》》》》》》》》》》》》", data.field)
          var send_data = {};
          send_data["employeeid"] = null;
          send_data["active"] = data.field["active"] === 'on'? 1: 0;
          send_data["employeeno"] = data.field["employeeno"];
          send_data["loginname"] = data.field["loginname"];
          var send_data_list = [];
          send_data_list.push(send_data);

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
            that.getsecurity("employee", "insert_employee", send_data_list).subscribe((result)=>{
              var res_ = result['result']["message"][0]["code"];
              switch (res_) {
                case 401:
                  var operationdata = "会话结束";
                  var option = '新增用户'; 
                  that.RecordOperation(0, option, operationdata)
                  dialogRef.close(false);
                  break;
                case 1:
                  // 成功
                  dialogRef.close(true);
                  success(publicservice);
                  var operationdata = "姓名:" + send_data_list[0]["name"] + "," + "域账号:" + send_data_list[0]["loginname"];
                  var option = '新增用户'; 
                  that.RecordOperation(1, option, operationdata)
                  break;
                case 0:
                  danger(publicservice);
                  var operationdata = String(result['result']["message"][0]["message"])
                  that.RecordOperation(0, option, operationdata)
                  break;
              }
              
            })
          }
       
          return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        }

        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}


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
  getsecurity(table: string, method: string, colums: object){
    return new Observable((res)=>{
      this.http.callRPC(table, method, colums).subscribe((result)=>{
        console.log("*************---------------------****************", result)
        
        res.next(result)
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
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"编辑成功!"});
  }
  editdanger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"编辑失败!"});
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
