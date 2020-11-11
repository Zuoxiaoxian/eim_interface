import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ICellRendererAngularComp } from 'ag-grid-angular';


// ===========================

import { ViewCell } from 'ng2-smart-table';

import { NbDialogService } from '@nebular/theme';

import { EditUserEmployeeComponent } from '../../../../../pages-popups/system-set/edit-user-employee/edit-user-employee.component';
import { HttpserviceService } from '../../../../../services/http/httpservice.service';
import { Observable } from 'rxjs';
import { PublicmethodService } from '../../../../../services/publicmethod/publicmethod.service';

import { EditDelTooltipComponent }  from '../../../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';

import {employeegroup_action } from '../../../../../appconfig';

declare let layui;

declare let $;

// ===========================
@Component({
  selector: 'ngx-ag-grid-action',
  templateUrl: './ag-grid-action.component.html',
  styleUrls: ['./ag-grid-action.component.scss']
})
export class AgGridActionComponent implements OnInit, ICellRendererAngularComp {
  private params: any;

  // 动态改变组件，如编辑组件
  change_component;
  // 当前删除的plv8函数！
  plv8;



  constructor(private router: Router,private dialogService: NbDialogService, private http: HttpserviceService, private publicservice: PublicmethodService) { 

    
    

  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  ngOnInit(): void {
    // 接受编辑的组件！
    this.publicservice.currentcomponent.subscribe(currentcomponent=>{
      // {component: EditUserEmployeeComponent, plv8: "delete_employee"}
      this.change_component = currentcomponent
      

      // console.log("得到编辑的组件！", this.change_component);
    })
    
    // 接受plv8方法
    this.publicservice.currentmethod.subscribe(currentmethod=>{
      this.plv8 = currentmethod
      // console.log("得到当前删除的plv8函数！", this.plv8);
    });

    // 编辑用户要用到的
    var rowData = this.params.node.data
    this.getsecurity('employee', 'get_rolename', {}).subscribe((res)=>{
      this.res = res
    })

    var column = {
      employeeid:  rowData["employeeid"] // 用户id
    }
    this.getsecurity("groups", "get_groups", column).subscribe((goups:any[])=>{
      this.goups = goups
    });
    console.log("根据用户角色得到res，用户对应的组goups:", this.goups, "res", this.res);

  }
 

  // 调用父方法
  public device_info(item) {
    console.log("-----------------item-------------------", item)
    console.log("-----------------this.params.node.data 点击的数据！-------------------", this.params.node.data);
    var rowData = this.params.node.data
    console.log("-----------------params-------------------", this.params)
    switch (item) {
      case "edit":
        this.edit(rowData);
        break;
      case "del":
        this.remove(rowData);
        break;
    }

    
    console.log("解析值：《《《《《《《《《《《《《《《《《《《《《《", this.params.context)
    
  }

  // 编辑用户需要用到的！
  goups;
  res;


  ngAfterViewInit(){
    this.isactive();
    console.log("**********************************************")
    
    // this.publicservice.get_current_pathname().subscribe(res=>{console.log(res)});
    
  }


  // 是否禁用button
  isactive(){
    var button_list = localStorage.getItem(employeegroup_action)? JSON.parse(localStorage.getItem(employeegroup_action)): false;
    // var button_list = localStorage.getItem("employee_action")? JSON.parse(localStorage.getItem("employee_action")): false;
    if (button_list){
      if (button_list["edit"]){ // 编辑存在
        $(".edit-edit").attr("disabled", false);
        $(".edit-edit").attr("class", "buedit edit-edit");
      }else{
        $(".edit-edit").attr("disabled", true);
        $(".edit-edit").attr("class", "disable_edit edit-edit");
      }

      if (button_list["del"]){ // 删除存在
        $(".remove-remove").attr("disabled", false);
        $(".remove-remove").attr("class", "buremove remove-remove");
      }else{
        $(".remove-remove").attr("disabled", true);
        $(".remove-remove").attr("class", "disable_remove remove-remove");
      }

          

      // console.log("actions_list>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",button_list);

    }

  }

  edit(rowData){
    console.log("=============ag-grid-action============", rowData);
    console.log("根据用户角色得到res，用户对应的组goups:", this.goups, "res", this.res);
    var method = this.plv8; 
    if (method === "delete_employee"){
      this.dialogService.open(this.change_component, { closeOnBackdropClick: false,context: { rowdata: JSON.stringify(rowData), res: JSON.stringify(this.res), goups: JSON.stringify(this.goups)} }).onClose.subscribe(name=>{
        if(name){
          console.log("-------table  icon  编辑", name)
          setTimeout(() => {
            // location.reload();
            this.exeagGrid_method({value: name, action: "edit"});
          }, );
        }
      })


    }else{
      // 用户组 编辑
      console.log("用户组 编辑------------------->>>>>>>>>>>>>>>>>",method,this.change_component,rowData)
      rowData["active"] = rowData["active"] === "是" || rowData["active"] === 1|| rowData["active"] === true? 1 :0;
      this.dialogService.open(this.change_component, { closeOnBackdropClick: false,context: { rowdata: JSON.stringify(rowData)} }).onClose.subscribe(name=>{
        if(name){
          console.log("-------table  icon  编辑", name)
          setTimeout(() => {
            // location.reload();
            this.exeagGrid_method({value: name, action: "edit"});
          }, );
        }
      })
    }
    



  }

  // =============================================调用 agGrid中的方法
  exeagGrid_method(rowData){
    this.params.context.componentParent.methodFromParent(rowData);

  }


  // =============================================调用 agGrid中的方法

  remove(rowData){
    var http = this.http;
    var rowData = rowData;
    var e_name =  rowData["name"]
    var e_email =  rowData["email"]

    var getsecurity2 = this.getsecurity2;
    var publicservice = this.publicservice;
    var success = this.success;
    var danger = this.danger;

    this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `确定要删除本条数据吗？`, rowData: JSON.stringify(rowData)}} ).onClose.subscribe(
      name=>{
        console.log("----name-----", name, rowData);
        if (name){
          // 在这里执行删除 用户！
          var method = this.plv8; // delete_employee
          getsecurity2(method, method, rowData, http).subscribe((res)=>{
            console.log(method,"==============================>", res);
            
            if (res === 1 || res["code"] == 1){
              success(publicservice)
              setTimeout(() => {
                // location.reload();
                this.exeagGrid_method({value: rowData, action: "remove"});
              }, );
            }else{
              // publicservice.toastr(DellDanger);
              danger(publicservice)
            }
          });
        }
      }
    );

    
  }

  // 展示状态
  success(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"删除成功!"});
  }
  danger(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"删除失败!"});
  }

  // 请求得到 表get_employee中的数据！
  getsecurity(table: string, method: string, colums: object){
    return new Observable((res)=>{

      this.http.callRPC(table, method, colums).subscribe((result)=>{
        var employee_result =  result['result']['message'][0];
        console.log("employee_result", employee_result);
        res.next(employee_result)
      })
    })
  }
  // 请求得到 表get_employee中的数据！
  getsecurity2(table: string, method: string, colums: object, http){
    return new Observable((res)=>{

      http.callRPC(table, method, colums).subscribe((result)=>{
        var employee_result =  result['result']['message'][0];
        console.log("employee_result", employee_result);
        res.next(employee_result)
      })
    })
  }



}
