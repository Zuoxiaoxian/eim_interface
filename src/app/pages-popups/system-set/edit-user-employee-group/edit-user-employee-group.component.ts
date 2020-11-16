import { Component, OnInit, Input,  } from '@angular/core';

import { NbDialogRef } from '@nebular/theme';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';

declare let layui;

declare let $;

// 验证表单！
import { EmployeeGroup } from '../form_verification';



@Component({
  selector: 'ngx-edit-user-employee-group',
  templateUrl: './edit-user-employee-group.component.html',
  styleUrls: ['./edit-user-employee-group.component.scss']
})
export class EditUserEmployeeGroupComponent implements OnInit {
  @Input() rowdata: string;

  
  constructor(protected dialogRef: NbDialogRef<EditUserEmployeeGroupComponent>, private http: HttpserviceService, 
    private publicmethod: PublicmethodService, private userinfo: UserInfoService) { 
      
    }
  
  
  UpSuccess :any = {position: 'bottom-end', status: 'success', conent:"修改成功!"};
  UpDanger :any = {position: 'bottom-end', status: 'danger', conent:"修改失败！"}
  

  ngOnInit(): void {
    this.layuiform();
  }
  // form
  ngAfterViewInit(){
  }

  ngOnDestory(){
  
  }


  layuiform(){
    // 得到的编辑数据
    // console.log("this.rowdata ", this.rowdata);
    var rowdata = JSON.parse(this.rowdata);
    // rowdata['active'] = rowdata['active'] === "是"? true: false;
    // rowdata["active"] = rowdata["active"] === 1? '是': '否';
    rowdata['active'] = rowdata['active'] === 1? true: false;
    console.log("layuiform ", rowdata);
    // 得到all角色---
    // var res = JSON.parse(this.res);
    // var rids = rowdata["rids"];

    

    
    var dialogRef = this.dialogRef;
    var http = this.http;
    var getsecurity = this.getsecurity;
    var publicmethod = this.publicmethod;
    var success = this.success;
    var danger = this.danger;

    var that = this;
    layui.use('form', function(){
      var form = layui.form;
      form.render(); // 刷新所有！

      // 初始化表单
      var formdata = {}
      formdata = rowdata;
      console.log("----初始化表单----formdata", formdata)
      form.val("employeegroup", formdata); 


      // 验证 表单
      form.verify({
        group_: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = EmployeeGroup['special_sql']["special_sql"];
          var special_str = EmployeeGroup['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "组名称不能有特殊字符！"
          }
          if (value.length > 20){
            return "组名称最大长度不超过20！"
          }
          // if (! new RegExp(EmployeeGroup["group_"]).test(value)){
          //   return "组名称不能有特殊字符或中文字符"
          // }
          
        },
        group_name: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = EmployeeGroup['special_sql']["special_sql"];
          var special_str = EmployeeGroup['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "组名称不能有特殊字符！"
          }
          
          if (value.length > 100){
            return "组名称最大长度不超过100！"
          }
          // if (! new RegExp(EmployeeGroup["group_name"]).test(value)){
          //   return "组名称不能有特殊字符"
          // }
          
          
        },
        
      })

      
      // form.render("checkbox"); // 刷新复选框！

      form.on("submit(submit)", function(data){
        //获取表单区域所有值
        console.log("v======获取表单区域所有值",data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        console.log(data.field) //被执行事件的元素DOM对象，一般为button对象
        var send_data = data.field;
        // send_data["active"] = send_data["active"] === undefined? 1: 0;
        send_data["active"] = send_data["active"] === "on"? 1: 0;
        send_data["groupid"] = rowdata["groupid"];
        send_data["id"] = rowdata["id"];
        send_data["createdon"] = rowdata["createdon"];
        send_data["createdby"] = rowdata["createdby"];
        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}


        // 更新修改的数据！ update_employee
        getsecurity("groups", "update_group",send_data,http).subscribe((res)=>{
          if (res ===1 ){
            // publicmethod
            // publicmethod.toastr(UpSuccess);
            success(publicmethod);
            dialogRef.close(send_data);

            var option = "编辑用户组";
            var infodata = "组名称:" + send_data["group"] + "," + "组名称(en):" + send_data["group_name"];
            that.RecordOperation( 1, option,infodata)

          }else{
            danger(publicmethod);
            var option = "编辑用户组";
            var infodata = "组名称:" + send_data["group"] + "," + "组名称(en):" + send_data["group_name"];
            that.RecordOperation( 0, option, infodata);
          }
        })
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

  getsecurity(table: string, method: string, colums: object, http){
    return new Observable((res)=>{
      http.callRPC(table, method, colums).subscribe((result)=>{
        // console.log("更新用户信息！", result)
        var result =  result['result']['message'][0];
        res.next(result)
      })
    })
  }


  // 展示状态
  success(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"修改成功!"});
  }
  danger(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"修改失败!"});
  }

  // option_record
  RecordOperation(result,transactiontype, infodata){
    console.warn("==============>", this.userinfo.getLoginName())
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = transactiontype; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicmethod.option_record(employeeid, result, transactiontype, info, createdby);
    }

  }

}
