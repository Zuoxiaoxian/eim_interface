import { Component, OnInit, ViewChild } from '@angular/core';

import { facility_health_SETTINGS } from './facility_health_data_center_table';

import {LocalDataSource} from "@mykeels/ng2-smart-table";

@Component({
  selector: 'ngx-facility-health-data-center',
  templateUrl: './facility-health-data-center.component.html',
  styleUrls: ['./facility-health-data-center.component.scss']
})
export class FacilityHealthDataCenterComponent implements OnInit {

  @ViewChild("departmentselect") departmentselect:any;
  @ViewChild("device_tpye") device_tpye: any;
  @ViewChild("asset_number") asset_number: any;
  @ViewChild("daterange") daterange: any;
  @ViewChild("mytable") mytable: any;

  // 下拉框---部门
  departments = {
    name: "部门信息",
    placeholder: '请选择部门',
    groups:[
      { title: '动力', datas: [{ name: '动力-1' },{ name: '动力-2' },{ name: '动力-3' },{ name: '动力-4' }] },
      { title: '资产', datas: [{ name: '资产-1' },{ name: '资产-2' },{ name: '资产-3' },{ name: '资产-4' }] },
      { title: '新能源', datas: [{ name: '新能源-1' },{ name: '新能源-2' },{ name: '新能源-3' },{ name: '新能源-4' }] },
    ]
  };

  // 下拉框---设备类型
  devicetpye = {
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
  // 下拉框---资产编号
  assetnumber = {
    placeholder: "请选择资产编号",
    name: '资产编号',
    datas: [
      { name: 'GT-2030-123' },
      { name: 'GT-2030-149' },
      { name: 'GT-2030-230' },
      { name: 'GT-2030-359' },
      { name: 'GT-2030-666' },
    ]
  }


  source:LocalDataSource
  // 设备KPI统计 table数据
  table_data = {
    settings: facility_health_SETTINGS,
    source: new LocalDataSource(),
  };

  constructor() { }

  ngOnInit(): void {   // 初始化table
    this.table_data.source["data"] = [
      { id: 1, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "严重报警",  operation: "确认" },
      { id: 2, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 3, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 4, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "报警",  operation: "确认" },
      { id: 5, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 6, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "报警",  operation: "确认" },
      { id: 7, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 8, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "严重报警",  operation: "确认" },
      { id: 9, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 10, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 11, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 12, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 13, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 14, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 15, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "严重报警",  operation: "确认" },
      { id: 16, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 17, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 18, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 19, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 20, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 21, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 22, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 23, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "严重报警",  operation: "确认" },
    ]
  }

  // 搜索按钮
  query(){
    var departmentselect_datas = this.departmentselect.getselect();
    var device_tpye_data = this.device_tpye.getselect();
    var asset_number_data = this.asset_number.getselect();
    var daterange_data = this.daterange.getselect();
    console.log("<------------搜索----------->", departmentselect_datas, device_tpye_data,asset_number_data,daterange_data);
  
  }


  // 导出
  download(title){
    this.mytable.download(title);
  }


}
