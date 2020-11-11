import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { NbDialogService } from '@nebular/theme';

import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { Observable } from 'rxjs';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';

import { device_action } from '../../../../appconfig';

import { DeviceManageComponent } from '../../../../pages-popups/tongji/device-manage/device-manage.component';

import { EditDelTooltipComponent } from '../../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';

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
    var button_list = localStorage.getItem(device_action)? JSON.parse(localStorage.getItem(device_action)): false;
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
      console.log("actions_list>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",button_list);
    }

  }


  edit(){
    console.log("编辑角色", this.rowData);
    // 得到所有的角色--数据
    var rowDataList = [];
    rowDataList.push(this.rowData);
     var rowData =  this.option_table_before(rowDataList)
    this.dialogService.open(DeviceManageComponent, {closeOnBackdropClick: false,context: { title: '编辑设备提示', content: `true`,  rowData: JSON.stringify(rowData)} });
  }

  remove(){
    var rowData = this.rowData;
    console.log("remove>>>>>rowData",rowData)


    this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '删除设备提示', content:   `确定要删除本条数据吗？`,rowData: JSON.stringify(rowData)}} ).onClose.subscribe(
      name=>{
        console.log("----name-----", name);
        if (name){
          // 在这里执行删除
          var table = 'device';
          var method = 'dev_delete_device';
          this.http.callRPC(table, method, rowData).subscribe((res)=>{
            console.log("delete_role", res);
            var result = res["result"]["message"][0]
            if (result === 1){
              this.success()
              setTimeout(() => {
                location.reload();
              }, 1000);
            }else{
              // publicservice.toastr(DellDanger)
              this.danger()
            }
          });
        }
      }
    );


    console.log("删除", this.rowData, "is_remove");
    

    
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
  success(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"删除成功!"});
  }
  danger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"删除失败!"});
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