import { Component, OnInit,ViewChild } from '@angular/core';

import { BORDER_GATEWAY_SETTINGS } from '../table_settings';

import {LocalDataSource} from "@mykeels/ng2-smart-table";

@Component({
  selector: 'ngx-border-gateway',
  templateUrl: './border-gateway.component.html',
  styleUrls: ['./border-gateway.component.scss']
})
export class BorderGatewayComponent implements OnInit {
  @ViewChild("departmentselect") departmentselect:any;
  @ViewChild("device_tpye") device_tpye:any;
  @ViewChild("asset_number") asset_number:any;
  @ViewChild("daterange") daterange:any;

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

  // 下拉框---边缘网关
  assetsnumber = {
    placeholder: "请选择边缘网关",
    name: '边缘网关',
    datas: [
      { name: 'GT1918-1720TM' },
      { name: 'GT1917-1819TM' },
      { name: 'GT1916-1919TM' },
      { name: 'GT1915-2018TM' },
      { name: 'GT1914-2117TM' },
      { name: 'GT1913-2216TM' },
    ]
  }

  // 加载数据
  loading = false;

  source:LocalDataSource



  // 设备报表KPI报表 table数据
  border_gateway_table_data = {
    settings: BORDER_GATEWAY_SETTINGS,
    source: new LocalDataSource(),
  };

  constructor() { }

  ngOnInit(): void {
    // 初始化table中的数据
    this.border_gateway_table_data.source["data"] = [
      {id: '1', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
      {id: '2', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "停止",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
      {id: '3', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "维护",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
      {id: '4', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "故障",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
      {id: '5', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
      {id: '6', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
      {id: '7', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
      {id: '8', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
      {id: '9', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
      {id: '10', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
      {id: '11', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "维护",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
      {id: '12', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "故障",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
      {id: '13', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "故障",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
    ]
  }


  // 搜索按钮
  query(){
    var departmentselect_data = this.departmentselect.getselect();
    var device_tpye_data = this.device_tpye.getselect();
    var asset_number_data = this.asset_number.getselect();
    // var daterange_data = this.daterange.getselect()
    console.log("<------------搜索----------->", departmentselect_data, device_tpye_data,asset_number_data,);
    // this.test_task_table_data.source = null;
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }

  // 导出
  download(title){
    this.mytable.download(title);
  }

}
