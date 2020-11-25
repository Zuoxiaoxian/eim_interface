import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { DeviceKpiReport2Service } from '../device-kpi-report2-service';

let kpi_detail = require("../../../../../assets/pages/system-set/js/kpi_detail")
@Component({
  selector: 'ngx-kpi-detail',
  templateUrl: './kpi-detail.component.html',
  styleUrls: ['./kpi-detail.component.scss']
})
export class KpiDetailComponent implements OnInit {

  // 得到出入的数据 kpi_for_detail
  kpi_for_detail;
  constructor( private http: HttpserviceService, private publicservice: PublicmethodService, private deviceservice: DeviceKpiReport2Service ) {
    this.kpi_for_detail = JSON.parse(localStorage.getItem("kpi_for_detail"));
  }

   // plv8请求
  querst(table: string, method: string, colmun: Object){
    return new Observable((observe)=>{
      this.http.callRPC(table, method, colmun).subscribe((result)=>{
        observe.next(result);
      })
  
    })
  }

  ngOnInit(): void {
    // 得到选则的日期 selectedMoments
    // 订阅方得到数据
    this.deviceservice.currentData.subscribe(res=>{
      console.log("查询：", res)
    })

    console.log("kpi_detail----", this.kpi_for_detail);

    // // 这是 左侧第一个柱状图
    // this.init_left_one();
    
    // // 这是 右侧第一个饼图 right-one
    // this.init_right_ong();

    
    // // 这是左侧第二个饼图 left_two
    // this.init_left_two();

    // // 这是 右侧第二个 柱状图 right-two
    // this.init_right_two();
    

  };


  // 初始化 左侧第一个echart设备时间统计
  init_left_one(){
    // 得到数据
    this.querst("", "dev_get_device_columnar", {start: "2020-10-1", end: "2020-11-21"}).subscribe(res=>{
      // 得到 x 轴！
      var resdatas = res['result']['message'][0];
      console.log("左侧第一个：", resdatas)
      var xData = [];
      var running = [];
      var stop = [];
      var warning = [];
      var placeon = [];

      var afterdata = {};
      resdatas.forEach(resdata => {
        xData.push(resdata["dates"]);
        running.push(resdata["running"]);
        stop.push(resdata["stop"]);
        warning.push(resdata["warning"]);
        placeon.push(resdata["placeon"]);
      });
      afterdata["xData"] = xData;
      afterdata["running"] = running;
      afterdata["stop"] = stop;
      afterdata["warning"] = warning;
      afterdata["placeon"] = placeon;

      console.log("得到左侧第一个数据： ", afterdata);
      kpi_detail.left_one('.left-one', afterdata);
    });
  };

  // 初始化右侧 第一个 echart 百分比
  init_right_ong(){
    // 得到数据
    this.querst("", "dev_get_device_pie", {start: "2020-10-1", end: "2020-11-21"}).subscribe(res=>{
      // 得到 x 轴！
      var resdatas = res['result']['message'][0][0];
      
      var afterdatas = [];
      for(let k in resdatas){
        var afterdata = {};
        var key;
        switch (k) {
          case "running":
            key = "运行"
            break;
          case "stop":
            key = "停止"
            break;
          case "warning":
            key = "故障"
            break;
          case "placeon":
            key = "非占位"
            break;
        }
        afterdata["name"] = key;
        afterdata["value"] = resdatas[k];
        afterdatas.push(afterdata)
      }
      // console.log("得到右侧第一个数据： ", afterdatas);
      kpi_detail.right_one('.right-one', afterdatas);
    })
  }

  // 初始化左侧 第二个 echart 月份数据
  init_left_two(){
    // 得到数据
    this.querst("", "dev_get_device_month", {start: "2020-9-1", end: "2020-11-21"}).subscribe(res=>{
      // 得到 x 轴！
      var resdatas = res['result']['message'][0];
      var afterdatas = {};
      var xData = [];
      var yData = [];
      var yData2 = [];
      resdatas.forEach(data => {
        xData.push(data["dates"] + '月');
        yData.push(data["runtime"]);
        yData2.push(data["runtime"] + 0.5);
      });
      afterdatas["xData"] = xData;
      afterdatas["yData"] = yData;
      afterdatas["yData2"] = yData2;
      
      // console.log("得到左侧 第二个数据： ", afterdatas);
      kpi_detail.left_two('.left-two', afterdatas);
    })
  }

  // 初始化右侧 第二个 echart 年份数据
  init_right_two(){
    // 得到数据
    this.querst("", "dev_get_device_year", {start: "2020-9-1", end: "2020-11-21"}).subscribe(res=>{
      // 得到 x 轴！
      var resdatas = res['result']['message'][0];
      var afterdatas = {};
      var xData = [];
      var yData = [];
      var yData2 = [];
      resdatas.forEach(data => {
        xData.push(data["dates"] + '年');
        yData.push(data["runtime"]);
        yData2.push(data["runtime"] + 0.5);
      });
      afterdatas["xData"] = xData;
      afterdatas["yData"] = yData;
      afterdatas["yData2"] = yData2;
      
      // console.log("得到左侧 第二个数据： ", afterdatas);
      kpi_detail.right_two('.right-two', afterdatas);
    })
  }


}
