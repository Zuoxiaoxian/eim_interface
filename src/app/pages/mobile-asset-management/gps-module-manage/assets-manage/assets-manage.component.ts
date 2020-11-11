import { Component, OnInit,ViewChild } from '@angular/core';

import { ASSETS_MANAGE_SETTINGS } from '../gps_module_manage_table';

import {LocalDataSource} from "@mykeels/ng2-smart-table";

import * as XLSX from 'xlsx';
type AOA = any[][];


@Component({
  selector: 'ngx-assets-manage',
  templateUrl: './assets-manage.component.html',
  styleUrls: ['./assets-manage.component.scss']
})
export class AssetsManageComponent implements OnInit {

  @ViewChild("device_datas") device_datas:any;
  @ViewChild("mytable") mytable: any;

  importdata: AOA = [[1,2], [3,4]];

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

  source:LocalDataSource

  // 设备报表KPI报表 table数据
  assets_manage_table_data = {
    settings: ASSETS_MANAGE_SETTINGS,
    source: new LocalDataSource(),
  };

  constructor() { }

  ngOnInit(): void {
    // 初始化table
    this.assets_manage_table_data.source["data"] = [
      { id: '1', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '2', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '3', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '4', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '5', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '6', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '7', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '8', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '9', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '10', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '11', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '12', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '13', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '14', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '15', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '16', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '17', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
      { id: '18', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    ]
  }


  // 搜索按钮
  query(){
    var device_datas = this.device_datas.getselect();
    // var daterange_data = this.daterange.getselect()
    console.log("<------------搜索----------->", device_datas);
  
  }


  // 导出
  download(title){
    this.mytable.download(title);
  }

  // 导入数据
  import(){
    var input = document.getElementById("import");
    // js执行点击input
    input.click();
  }


    // -------------------------------------------------------
    onFileChange(evt: any){
      const target: DataTransfer = <DataTransfer>(evt.target);
      console.log("导入：---------------------------", target);
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
  
        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
        /* save data */
        this.importdata = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
        // console.log("importdata: ", this.importdata); // 这是读取的数据转为json
  
        this.analysis_sheet_to_json_to_ng2(this.importdata)
      };
      reader.readAsBinaryString(target.files[0]);
  
    }
  
    // 将sheet_json转换为smart-table 数据格式！ 
    analysis_sheet_to_json_to_ng2(importdata){
      var rowData_list = importdata.slice(1,importdata.length);
      console.log("rowData_list---->", rowData_list)
      var columns = this.assets_manage_table_data.settings['columns'];
      var columnsList = [];
      for (let k in columns){
        columnsList.push(k);
      };
  
      var rowData = []; // rowData 就是table需要的source
      rowData_list.forEach(element => {
        var item = {};
        if(element.length != 0){
          for (let index = 0; index < element.length; index++) {
            item[columnsList[index]] = element[index];
          }
          rowData.push(item);
        }
        
      });
      console.log("rowData---->", rowData)
  
      this.assets_manage_table_data.source["data"] = rowData;
    }
  
    // -------------------------------------------------------

}
