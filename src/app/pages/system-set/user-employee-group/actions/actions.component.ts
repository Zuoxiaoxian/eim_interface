import { Component, OnInit,Input, Output,EventEmitter  } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { NbDialogService } from '@nebular/theme';

import { EditUserEmployeeGroupComponent } from '../../../../pages-popups/system-set/edit-user-employee-group/edit-user-employee-group.component';

import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { Observable } from 'rxjs';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { employeegroup_action } from '../../../../appconfig';

import { EditDelTooltipComponent }  from '../../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';


declare let layui;

declare let $;



@Component({
  selector: 'ngx-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements ViewCell, OnInit {

  @Output() save:EventEmitter<any> = new EventEmitter();
  value;
  @Input() rowData: any;


  DelSuccess :any = {position: 'bottom-right', status: 'success', conent:"删除成功!"};
  DellDanger :any = {position: 'bottom-right', status: 'danger', conent:"删除失败！"}
  

  constructor(private dialogService: NbDialogService, private http: HttpserviceService, private publicservice: PublicmethodService) {
  }
  
  button_list;
  
  ngOnInit(): void {
    // employeegroup_action
    this.button_list = localStorage.getItem(employeegroup_action)? JSON.parse(localStorage.getItem(employeegroup_action)): false;
    this.isactive();
  }
  
  ngAfterViewInit(){
    console.log("button_list-------action----------------->",this.button_list)
    
  }

  ngOnDestory(){
    localStorage.removeItem(employeegroup_action);
    // this.reloadaction();
  }

  // 重置操作样式
  reloadaction(){
    $(".edit-edit").attr("disabled", false);
    $(".edit-edit").attr("class", "buedit edit-edit");

    $(".remove-remove").attr("disabled", false);
    $(".remove-remove").attr("class", "buremove remove-remove");
  }

  // 是否禁用button
  isactive(){
    var button_list = this.button_list;
    if (button_list){
      if (button_list["edit"]){ // 编辑存在
        $(".edit-edit").attr("disabled", false);
        $(".edit-edit").attr("class", "buedit edit-edit");
      }else{
        $(".edit-edit").attr("disabled", true);
        $(".edit-edit").attr("class", "disable_edit edit-edit");
      }

      if (button_list["del"]){ // 删除存在
        console.log("-------------------------del-----------------------")
        $(".remove-remove").attr("disabled", false);
        $(".remove-remove").attr("class", "buremove remove-remove");
      }else{
        $(".remove-remove").attr("disabled", true);
        $(".remove-remove").attr("class", "disable_remove remove-remove");
      }
      // console.log("actions_list>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",button_list);

    }

  }

  edit(){
    console.log("编辑", this.rowData);
    // var rowdata_ = this.rowData
    // rowdata_["active"] = rowdata_["active"] === "是" ? 1 :0;
    // // 得到所有的角色--数据
    // this.getsecurity('employee', 'insert_group', {}).subscribe((res)=>{
    //   console.log("insert_group", res);
    //   this.dialogService.open(EditUserEmployeeGroupComponent, { closeOnBackdropClick: false,context: { rowdata: JSON.stringify(rowdata_), res: JSON.stringify(res)} })
    // });


  }

  remove(){
    console.log("删除", this.rowData);
    this.save.emit(this.rowData);
    // 在这里执行删除 用户！


    var save = this.save;
    var http = this.http;
    var rowData = this.rowData;
    var getsecurity2 = this.getsecurity2;
    var publicservice = this.publicservice;
    var success = this.success;
    var danger = this.danger;

    // 提示选择行数据
    this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '删除用户用户组提示', content:   `确定要删除本条数据吗？`, rowData: JSON.stringify(rowData)}} ).onClose.subscribe(
      name=>{
        console.log("----name-----", name);
        if (name){
          // 调用删除功能
          save.emit(rowData);
          // 在这里执行删除 用户！
          getsecurity2('employee', 'delete_group', rowData, http).subscribe((res)=>{
            console.log("delete_group", res);
            if (res === 1){
              // publicservice.toastr(DelSuccess);
              success(publicservice)
              location.reload();
            }else{
              // publicservice.toastr(DellDanger);
              danger(publicservice)
            }
          });
        }
      }
    );
    
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

  // 展示状态
  success(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"删除成功!"});
  }
  danger(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"删除失败!"});
  }



}
