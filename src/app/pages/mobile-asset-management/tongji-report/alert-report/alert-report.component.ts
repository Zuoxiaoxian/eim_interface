import { Component, OnInit, ViewChild } from '@angular/core';

import { ALERT_REPORT_SETTINGS } from '../tong_ji_report_table';

import {LocalDataSource} from "@mykeels/ng2-smart-table";

@Component({
  selector: 'ngx-alert-report',
  templateUrl: './alert-report.component.html',
  styleUrls: ['./alert-report.component.scss']
})
export class AlertReportComponent implements OnInit {
  @ViewChild("device_datas") device_datas:any;
  @ViewChild("daterange") daterange:any;
  @ViewChild("mytable") mytable: any;

  // 下拉框---设备类型
  deviceDatas = {
    placeholder: "请选择设备类型",
    name: '设备类型',
    datas: [
      { name: 'GT-2030-123' },
      { name: 'GT-2030-149' },
      { name: 'GT-2030-230' },
      { name: 'GT-2030-359' },
      { name: 'GT-2030-666' },
    ]
  }
  // 加载数据
  loading = false;

  source:LocalDataSource

  // 设备报表KPI报表 table数据
  border_gateway_table_data = {
    settings: ALERT_REPORT_SETTINGS,
    source: new LocalDataSource(),
  };

  constructor() { }

  ngOnInit(): void {
    // 初始化table中的数据
    this.border_gateway_table_data.source["data"] = [
      {id: '1', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '2', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '3', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '4', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '5', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '6', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '7', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '8', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '9', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '10', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '11', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '12', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '13', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '14', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '15', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '16', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '17', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '18', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '19', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '20', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
      {id: '21', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
   
    ]
  }

  // 搜索按钮
  query(){
    var device_datas = this.device_datas.getselect();
    var daterange_data = this.daterange.getselect()
    console.log("<------------搜索----------->", device_datas, daterange_data);
 
  }


  // 导出
  download(title){
    this.mytable.download(title);
  }

}
