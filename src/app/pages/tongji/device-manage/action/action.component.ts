import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { ICellRendererAngularComp } from 'ag-grid-angular';


declare let layui;

declare let $;

import { employeegroup_action } from '../../../../appconfig';

@Component({
  selector: 'ngx-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit, ICellRendererAngularComp {
  private params: any;
  constructor() { }

  ngOnInit(): void {
    this.isactive();
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  // 调用父方法
  public device_info(item) {
    var rowData = this.params.node.data
    // console.log("-----------------params-------------------", this.params)
    switch (item) {
      case "edit":
        this.edit(rowData);
        break;
      case "del":
        this.remove(rowData);
        break;
    }

    
    // console.log("解析值：《《《《《《《《《《《《《《《《《《《《《《", this.params.context)
    
  }

  // 是否禁用button
  isactive(){
    var button_lists = JSON.parse(localStorage.getItem("buttons_list"));
    // console.log("是否禁用button----------->", button_lists)
    var button_list = {}
    if(button_lists["edit"]){
      button_list["edit"] = button_lists["edit"]["active"] === 1?  true: false;
    }else{
      button_list["edit"] = false;
    }
    if(button_lists["del"]){
      button_list["del"] = button_lists["del"]["active"] === 1?  true: false;
    }else{
      button_list["del"] = false;
    }
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
    console.log("=============编辑============", {active: 'edit', rowData});
    // 用户
    this.params.data = {active: 'edit', data: rowData}
    this.params.clicked(this.params.data);
  }
  
  
  remove(rowData){
    console.log("=============删除============", {active: 'remove', rowData});
    this.params.data = {active: 'remove', data: rowData}
    this.params.clicked(this.params.data);
  }



}
