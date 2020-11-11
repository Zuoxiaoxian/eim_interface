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
    })

  }

  agInit(params: any) {
    this.params = params;
  }

  ngOnInit(): void {
    // console.log("-----------------------------------------")
    // console.log("-----------------------------------------")
  }
 

  // 调用父方法
  public device_info(item) {
    console.log("-----------------item-------------------", item)
    console.log("-----------------this.params.node.-------------------", this.params.node.data);
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

  refresh(): boolean {
    return false;
  }

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


  // =============================================调用 agGrid中的方法
  exeagGrid_method(rowData){
    this.params.context.componentParent.methodFromParent(rowData);

  }

  edit(rowData){
    console.log("ag-grid-action============================", rowData, 'rowData\n');
    var rowdata = this.option_table_before([rowData])
    this.dialogService.open(this.change_component, {closeOnBackdropClick: false,context: { title: '编辑设备提示', content: `true`,  rowData: JSON.stringify(rowdata)} }).onClose.subscribe(name=>{
      if (name){
        this.exeagGrid_method({value: name, action: "edit"});
        // this.edditsuccess();
        // setTimeout(() => {
        //   location.reload();
        // }, );
      }else{
        // this.edditdanger();
      }
    });

  }

  remove(rowData){
    var http = this.http;
    var rowData = rowData;
    var e_name =  rowData["name"]
    var e_email =  rowData["email"]

    var getsecurity2 = this.getsecurity2;
    var publicservice = this.publicservice;
    var success = this.success;
    var danger = this.danger;

    this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '删除用户提示', content:   `确定要删除本条吗？`, rowData: JSON.stringify(rowData)}} ).onClose.subscribe(
      name=>{
        console.log("----name-----", name);
        if (name){
          // 在这里执行删除 用户！
          var method = this.plv8; // delete_employee
          getsecurity2(method, method, rowData, http).subscribe((res)=>{
            console.log(method,"==============================>", res);
            
            if (res === 1 || res["code"] == 1){
              this.exeagGrid_method({value: rowData, action: "remove"});
              // this.success()
              // setTimeout(() => {
              //   location.reload();
              // }, );
            }else{
              // this.danger()
            }
          });
        }
      }
    );

    

  }

  // 展示状态
  success(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"删除成功!"});
  }
  danger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"删除失败!"});
  }
  // 展示状态
  edditsuccess(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"修改成功!"});
  }
  edditdanger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"修改失败!"});
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

   // 编辑修改前，处理一下选中的table数据
  option_table_before(datas){
    var after_datas: OptionDeviceData[] =[];
    var type;
    var devicestatus;
    datas.forEach(data => {
      switch (data["type"]) {
        case "台架设备":
          type = 1;
          break;
          case "移动资产":
            type = 2;
            break;
          case "举升机":
            type = 3;
          break;
          default:
            type = 402;
          break;
      };
      switch (data["devicestatus"]) {
        case "在用":
          devicestatus = 1;
          break;
          case "封存":
            devicestatus = 2;
            break;
          case "停用":
            devicestatus = 3;
          break;
          case "闲置":
            devicestatus = 4;
            break;
          default:
            devicestatus = 402;
          break;
      }
      var after_data: OptionDeviceData = {
        id: data.id,
        devicename:data.devicename,
        deviceno:data.deviceno,
        type:type,
        active:data.active === "是"? 1: 0,
        assetno:data.assetno,
        factoryno:data.factoryno,
        deviceid:data.deviceid,
        purchaseon:data.purchaseon,
        supplier:data.supplier,
        location:data.location,
        department:data.department,
        groups:data.groups,
        belonged:data.belonged,
        devicestatus:devicestatus,
        createdby:data.createdby,
        createdon:data.createdon
      }
      after_datas.push(after_data)
    });
    return after_datas
  }



}
// table 中每行数据类型！ 这是将table中的数据改回原始数据
interface OptionDeviceData {
  id: number,
  devicename:string,
  deviceno:string,
  type:number,
  active:number,
  assetno:string,
  factoryno:string,
  deviceid:number,
  purchaseon:string,
  supplier:string,
  location:string,
  department:string,
  groups:string,
  belonged:string,
  devicestatus:number,
  createdby:string,
  createdon:string
}