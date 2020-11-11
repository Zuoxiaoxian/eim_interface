import { Component, OnInit, ViewChild } from '@angular/core';

import { TEST_TASK_MANAGE_SETTINGS } from '../tongji_tablesettings';

import * as XLSX from 'xlsx';

import {LocalDataSource} from "@mykeels/ng2-smart-table";


declare let layui;

declare let $;

@Component({
  selector: 'ngx-test-task-manage',
  templateUrl: './test-task-manage.component.html',
  styleUrls: ['./test-task-manage.component.scss']
})
export class TestTaskManageComponent implements OnInit {
  @ViewChild("departmentselect") departmentselect:any;
  @ViewChild("device_tpye") device_tpye:any;
  @ViewChild("asset_number") asset_number:any;
  @ViewChild("daterange") daterange:any;
  @ViewChild("mytable") mytable:any;

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

  // 下拉框---任务单号
  testnumber = {
    placeholder: "请选择任务单号",
    name: '任务单号',
    datas: [
      { name: 'GT1918-1720TM' },
      { name: 'GT1917-1819TM' },
      { name: 'GT1916-1919TM' },
      { name: 'GT1915-2018TM' },
      { name: 'GT1914-2117TM' },
      { name: 'GT1913-2216TM' },
    ]
  }

  // 导出文件名
  filename;
  source:LocalDataSource

  // 发送给日期
  test_task_manage = {
    divice_kpi_report: false,
    test_task_manage: true,
    man_hourkpi: false,
  };



  // 试验任务管理 table
  test_task_table_data = {
    settings: TEST_TASK_MANAGE_SETTINGS,
    source: new LocalDataSource(),
  };

  // 日期范围
  date_ranges = "device_kpi_date_range"

  constructor() { }

  ngOnInit(): void {
    this.test_task_table_data.source["data"] = [
      { id: '1', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"无", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "60", testTime: "17.6", principal: "楚云飞", dataUpdateTime: "1小时内"},
      { id: '2', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"性能", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "20", testTime: "20.6", principal: "楚飞", dataUpdateTime: "1小时内"},
      { id: '3', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"性能", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "80", testTime: "20.6", principal: "楚飞", dataUpdateTime: "1小时内"},
      { id: '4', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"性能", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "90", testTime: "20.6", principal: "楚飞", dataUpdateTime: "1小时内"},
      { id: '5', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"性能", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "60", testTime: "20.6", principal: "楚飞", dataUpdateTime: "1小时内"},
      { id: '6', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"性能", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "50", testTime: "20.6", principal: "楚飞", dataUpdateTime: "1小时内"},
      { id: '7', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"性能", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "40", testTime: "20.6", principal: "楚飞", dataUpdateTime: "1小时内"},
      { id: '8', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"性能", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "30", testTime: "20.6", principal: "楚飞", dataUpdateTime: "1小时内"},
      { id: '9', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"性能", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "20", testTime: "20.6", principal: "楚飞", dataUpdateTime: "1小时内"},
      { id: '10', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"性能", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "70", testTime: "20.6", principal: "楚飞", dataUpdateTime: "1小时内"},
      { id: '11', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"性能", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "80", testTime: "20.6", principal: "楚飞", dataUpdateTime: "1小时内"},
      { id: '12', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"性能", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "90", testTime: "20.6", principal: "楚飞", dataUpdateTime: "1小时内"},
      { id: '13', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"性能", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "100", testTime: "20.6", principal: "楚飞", dataUpdateTime: "1小时内"},
      { id: '14', deviceName: "AVL电机测试台架", taskNumber: "11000176", departmentInfo: "新能源电机试验室", describe:"性能", testStartTime:"2020-08-07 12:23", testEndTime: "2020-08-09 12:23", taskProgress: "85", testTime: "20.6", principal: "楚飞", dataUpdateTime: "1小时内"},
    ]

    this.initdate();
  }

  // 初始化日期范围
  initdate(){
    var date_ranges = this.date_ranges
    layui.use('laydate', function(){
      var laydate = layui.laydate;
      //日期范围
      laydate.render({
        elem: '#test_task_manage'
        ,range: true
        // ,trigger: 'click'//呼出事件改成click
        ,done: function(value, date, endDate){
          localStorage.setItem(date_ranges, JSON.stringify(value))
          console.log(value); //得到日期生成的值，如：2017-08-18
          console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
          console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
      });


    })
  }

  // 得到日期
  getselect(){
    var date_range = localStorage.getItem(this.date_ranges)? localStorage.getItem(this.date_ranges): false;
    if (date_range){
      var date = JSON.parse(date_range).split(' - ');
      console.log("date--->", date)
      var date_list = date;
      localStorage.removeItem(this.date_ranges)
      return date_list
    }
    // var date_list = [this.datepipe.transform(this.selectedMoments[0],'yyyy-MM-dd'), this.datepipe.transform(this.selectedMoments[1],'yyyy-MM-dd')];
    // return date_list;
  }

  // 搜索按钮
  query(){
    var departmentselect_data = this.departmentselect.getselect();
    var device_tpye_data = this.device_tpye.getselect();
    var asset_number_data = this.asset_number.getselect();
    var daterange_data = this.getselect()
    console.log("<------------搜索----------->", departmentselect_data, device_tpye_data,asset_number_data, daterange_data);
    this.test_task_table_data.source = null;
  }

  // 导出文件
  download(title){
    this.mytable.download(title);
  };

}
