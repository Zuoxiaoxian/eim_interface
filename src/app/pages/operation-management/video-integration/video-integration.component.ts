import { Component, OnInit,ViewChild } from '@angular/core';

import { VIDEO_INTEGRATION_SETTINGS } from '../table_settings';

import {LocalDataSource} from "@mykeels/ng2-smart-table";

@Component({
  selector: 'ngx-video-integration',
  templateUrl: './video-integration.component.html',
  styleUrls: ['./video-integration.component.scss']
})
export class VideoIntegrationComponent implements OnInit {

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

  // 下拉框---摄像头
  camera = {
    placeholder: "请选择摄像头",
    name: '摄像头',
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
  video_table_data = {
    settings: VIDEO_INTEGRATION_SETTINGS,
    source: new LocalDataSource(),
  };
  constructor() { }

  ngOnInit(): void {
    this.video_table_data.source["data"] = [
      { id: '1', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '2', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"停止", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '3', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"维护", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '4', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"故障", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '5', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '6', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '7', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '8', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '9', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '10', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '11', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '12', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '13', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '14', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '15', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '16', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '17', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '18', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '19', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '20', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '21', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '22', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '23', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
      { id: '24', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
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
