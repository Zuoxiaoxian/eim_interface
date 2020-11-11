import { Component, OnInit, ViewChild } from '@angular/core';

import { MAN_HOUR_KPI_REPORT_SETTINGS } from '../tongji_tablesettings';

import * as XLSX from 'xlsx';

import {LocalDataSource} from "@mykeels/ng2-smart-table";
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

import { menu_button_list } from '../../../appconfig';

@Component({
  selector: 'ngx-man-hour-kpi-report',
  templateUrl: './man-hour-kpi-report.component.html',
  styleUrls: ['./man-hour-kpi-report.component.scss']
})
export class ManHourKpiReportComponent implements OnInit {
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

  // 下拉框---资产编号
  assetsnumber = {
    placeholder: "请选择资产编号",
    name: '资产编号',
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

  // 工时KPI报表 table
  man_hour_kpi_table_data = {
    settings: MAN_HOUR_KPI_REPORT_SETTINGS,
    source: new LocalDataSource(),
  };

  // 前端要展示的button 主要是：增、删、改
  buttons;

  // 前端要展示的buttons 主要是：搜索、导入导出
  buttons2;

  
    
  constructor(private http: HttpserviceService, private publicservice: PublicmethodService) { }

  // plv8请求
  querst(table: string, method: string, colmun: Object){
    return new Observable((observe)=>{
      this.http.callRPC(table, method, colmun).subscribe((result)=>{
        observe.next(result);
      })

    })
  }

  ngOnInit(): void {
    // 初始化table
    this.inittable();

    // 初始化button
    this.getbuttons()

    // this.man_hour_kpi_table_data.source["data"] = [
    //   { id: '1', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '2', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '3', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '4', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '5', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '6', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '7', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '8', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '9', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '10', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '11', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '12', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '13', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '14', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '15', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '16', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '17', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '18', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '19', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '20', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '21', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '22', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '23', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '24', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '25', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '26', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '27', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '28', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '29', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '30', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    //   { id: '31', deviceName: "AVL电机测试台架", assetsNumber: "2200024798", departmentInfo: "新能源电机试验室", startTime: "2020-07-01", endTime: "2020-08-01", runTime: "361.2", stopTime: "6.1", maintainTime: "58.2", faultTime:"222.9", principal:"刘备",reportDetail: "详情"},
    // ]
  }

  // 初始化table
  inittable(){
    // 得到table数据
    var table = "device";
    var methond = "dev_get_device_status";
    var colmun = {
      start:"2020-10-1",end:"2020-11-21"
    }
    this.querst(table, methond, colmun).subscribe(res=>{
      console.log("-----------------res", res)
      const rowData = res['result']['message'][0];
      if (rowData.length > 0){
        // var after_datas = this.show_table_before(rowData);
        // 根据id排序
        rowData.sort(function(data1,data2){return data1.deviceid - data2.deviceid});
        this.man_hour_kpi_table_data.source.load(rowData);
      }
    })
  }

  // 得到buttons----------------------------------------------------------
  getbuttons(){
    // 根据menu_item_role得到 该页面对应的 button！
    var button_list = localStorage.getItem(menu_button_list)? JSON.parse(localStorage.getItem(menu_button_list)): false;
    if (button_list){
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log(button_list)
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      this.publicservice.get_current_pathname().subscribe(res=>{
        console.log("get_current_pathname   ", res);
        var currentmenuid = res["id"];
        var buttons = [];
        // 分离搜索、导入、导出
        var buttons2 = [];
        
        button_list.forEach(button => {
          if (currentmenuid === button["parentid"]){
            var method = button["permission"].split(":")[1];
            if ( method === "query" || method === "import" || method === "download" ){
              buttons2.push(button)
            }else{
              buttons.push(button);
            }
          }
        });

        this.buttons = buttons;
        this.buttons2 = buttons2;

        console.log("-----------buttons2--------",buttons2);
        console.log("-----------buttons--------",buttons);
      
      })
    }
  }

  // button按钮
  action(actionmethod){
    console.log("++++++++++++++++++++action(actionmethod)++++++++++++++++++++++++++++", actionmethod);
    var method = actionmethod.split(":")[1];
    console.log("--------------->method", method)
    switch (method) {
      // case 'add':
      //   this.add();
      //   break;
      // case 'del':
      //   this.del();
      //   break;
      // case 'edit':
      //   this.edit();
      //   break;
      case 'query':
        this.query();
        break;
      // case 'import':
      //   this.importfile();
      //   break;
      case 'download':
        this.download('工时KPI报表')
        break;
    }

  }


  // 搜索按钮
  query(){
    var departmentselect_data = this.departmentselect.getselect();
    var device_tpye_data = this.device_tpye.getselect();
    var asset_number_data = this.asset_number.getselect();
    var daterange_data = this.daterange.getselect()
    console.log("<------------搜索----------->", departmentselect_data, device_tpye_data,asset_number_data, daterange_data);
    // this.test_task_table_data.source = null;
  }

  // 导出文件
  download(title){
    this.mytable.download(title);
  };


}
