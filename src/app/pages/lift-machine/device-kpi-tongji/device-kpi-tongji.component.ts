import { Component, OnInit, ViewChild } from '@angular/core';

import { ALERT_REPORT_SETTINGS } from '../lift_machine_table';

import {LocalDataSource} from "@mykeels/ng2-smart-table";

@Component({
  selector: 'ngx-device-kpi-tongji',
  templateUrl: './device-kpi-tongji.component.html',
  styleUrls: ['./device-kpi-tongji.component.scss']
})
export class DeviceKpiTongjiComponent implements OnInit {
  @ViewChild('mytable') mytable:any;

  @ViewChild("departmentselect") departmentselect:any;
  @ViewChild("device_tpye") device_tpye: any;
  @ViewChild("asset_number") asset_number: any;
  @ViewChild("daterange") daterange: any;

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
  device_kpi_table_data = {
    settings: ALERT_REPORT_SETTINGS,
    source: new LocalDataSource(),
  };

  constructor() { }

  ngOnInit(): void {
    // 初始化table数据
    this.device_kpi_table_data.source["data"] = [
      { id: '1', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '2', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '故障', chargePerson: '李云龙', detail: '详情'},
      { id: '3', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '警告', chargePerson: '李云龙', detail: '详情'},
      { id: '4', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '完成', chargePerson: '李云龙', detail: '详情'},
      { id: '5', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '进行中', chargePerson: '李云龙', detail: '详情'},
      { id: '6', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '7', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '8', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '9', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '10', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '11', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '12', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '13', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
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
