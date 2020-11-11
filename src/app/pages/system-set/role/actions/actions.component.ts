import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { NbDialogService } from '@nebular/theme';

import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { Observable } from 'rxjs';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';

import { EditRoleComponent } from '../../../../pages-popups/system-set/edit-role/edit-role.component';

import { SYSROLE,role_action } from '../../../../appconfig'; 


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
  
  
  constructor(private dialogService: NbDialogService, private http: HttpserviceService, private publicservice: PublicmethodService) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(){
    this.isactive();
    
  }


  // 是否禁用button
  isactive(){
    var button_list = localStorage.getItem(role_action)? JSON.parse(localStorage.getItem(role_action)): false;
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


  edit(){
    console.log("编辑角色", this.rowData);
    // 得到所有的角色--数据
    this.dialogService.open(EditRoleComponent, {closeOnBackdropClick: false,context: { rowdata: JSON.stringify(this.rowData)} });
    // this.getsecurity('employee', 'get_rolename', {}).subscribe((res)=>{
    //   console.log("role_result", res);
    //   this.dialogService.open(EditRoleComponent, { context: { rowdata: JSON.stringify(this.rowData), res: JSON.stringify(res)} })
    // });
    // this.dialogService.open(EditUserEmployeeComponent, { context: { rowdata: JSON.stringify(this.rowData)} })


  }

  remove(){
    var save = this.save;
    var http = this.http;
    var rowData = this.rowData;
    console.log("remove>>>>>rowData",rowData)
    var getsecurity = this.getsecurity;
    var publicservice = this.publicservice;
    var DelSuccess = this.DelSuccess;
    var DellDanger = this.DellDanger;
    var success = this.success;
    var danger = this.danger;

    var text = "本条";
    this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '删除角色提示', content:   `确定要删除${text}数据吗？`,rowData: JSON.stringify(rowData)}} ).onClose.subscribe(
      name=>{
        console.log("----name-----", name);
        if (name){
          save.emit(rowData);
          // 在这里执行删除 用户！
          getsecurity('employee', 'delete_role', rowData, http).subscribe((res)=>{
            console.log("delete_role", res);
            if (res["code"] === 1){
              // publicservice.toastr(DelSuccess)
              success(publicservice)
              localStorage.removeItem(SYSROLE);
              setTimeout(() => {
                location.reload();
              }, 1000);
            }else{
              // publicservice.toastr(DellDanger)
              danger(publicservice)
            }
          });
        }
      }
    );


    console.log("删除", this.rowData, "is_remove");
    

    
  }


  // 请求得到 表get_employee中的数据！
  getsecurity(table: string, method: string, colums: object, http){
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
