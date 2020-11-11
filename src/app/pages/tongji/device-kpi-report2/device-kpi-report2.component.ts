import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { menu_button_list } from '../../../appconfig';

import { Router } from '@angular/router'
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
declare let layui;

declare let $;

import { DeviceKpiReport2Service } from './device-kpi-report2-service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';
@Component({
  selector: 'ngx-device-kpi-report2',
  templateUrl: './device-kpi-report2.component.html',
  styleUrls: ['./device-kpi-report2.component.scss']
})
export class DeviceKpiReport2Component implements OnInit, OnDestroy {
  @ViewChild("departmentselect") departmentselect:any;
  @ViewChild("device_tpye") device_tpye:any;
  @ViewChild("asset_number") asset_number:any;
  @ViewChild("daterange") daterange:any;

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


  // 下拉框---设备编号！
  assetsnumber = {
    placeholder: "请选择设备编号",
    name: '设备编号',
    datas: [
      { name: 'GT1918-1720TM' },
      { name: 'GT1917-1819TM' },
      { name: 'GT1916-1919TM' },
      { name: 'GT1915-2018TM' },
      { name: 'GT1914-2117TM' },
      { name: 'GT1913-2216TM' },
    ]
  }

  // 前端要展示的button 主要是：增、删、改
  buttons;

  // 前端要展示的buttons 主要是：搜索、导入导出
  buttons2;

  // 发送给 日期
  divice_kpi_report = {
    divice_kpi_report: true,
    test_task_manage: false,
    man_hourkpi: false,
  };

  // 日期范围
  date_ranges = "device_kpi_date_range"



  constructor( private router: Router, private publicservice: PublicmethodService, 
    private deviceservice: DeviceKpiReport2Service, private http: HttpserviceService,
    private userinfo: UserInfoService) { 
    

  }

  ngOnInit(): void {
    this.getbuttons();
    this.initdate();
  }

  ngOnDestroy(){
    // 删除 man-hour-kpi-report2-buttons
    localStorage.removeItem("device-kpi-report2-buttons");
    localStorage.removeItem("kpi_for_detail");
  }

  // 初始化日期范围
  initdate(){
    var date_ranges = this.date_ranges
    layui.use('laydate', function(){
      var laydate = layui.laydate;
      //日期范围
      laydate.render({
        elem: '#divice_kpi_report'
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


  // kpi报表
  kpireport(){
    this.router.navigate(['/pages/tongji/deviceKpiReport/kpitable'])
  }
  // kpi 详情
  kpidetail(){
    this.router.navigate(['/pages/tongji/deviceKpiReport/kpidetail'])
  }

  // 得到buttons----------------------------------------------------------
  getbuttons(){
    // 根据menu_item_role得到 该页面对应的 button！
    var button_list = localStorage.getItem(menu_button_list)? JSON.parse(localStorage.getItem(menu_button_list)): false;
    if (button_list){
      var man_hour_kpi_report2_buttons = localStorage.getItem("device-kpi-report2-buttons") ===null? false: JSON.parse(localStorage.getItem("device-kpi-report2-buttons"))

      if (man_hour_kpi_report2_buttons){
        this.buttons = man_hour_kpi_report2_buttons["buttons"];
        this.buttons2 = man_hour_kpi_report2_buttons["buttons2"];
      }else{
        this.publicservice.get_current_pathname().subscribe(res=>{
          console.log("get_current_pathname   ", res);
          var currentmenuid = res["id"];
          var buttons = [];
          // 分离搜索、导入、导出
          var buttons2 = [];
          
          button_list.forEach(button => {
            if (currentmenuid === button["parentid"]){
              var method = button["permission"].split(":")[1];
              // 该界面--设备kpi报表！按钮功能 搜索、导出 method === "import"
              if ( method === "query" ||  method === "download" ){
                buttons2.push(button)
              }else{
                buttons.push(button);
              }
            }
          });
  
          // 对button进行排序 根据 title(导入、导出), 或者是 permission(menu:import)
          buttons2.forEach(b=>{
            switch (b["permission"].split(":")[1]) {
              case "query":
                b["order_"] = 0;
                break;
              case "import":
                b["order_"] = 1;
                break;
              case "download":
                b["order_"] = 2;
                break;
  
            }
          })
  
          // -----排序
          buttons2.sort(function(item1, item2){
            return item1["order_"] - item2["order_"]
          });
          
          this.buttons = buttons;
          this.buttons2 = buttons2;
          
          localStorage.setItem("device-kpi-report2-buttons", JSON.stringify({buttons: buttons, buttons2: buttons2}))
          console.log("-----------buttons2--------",buttons2);
          console.log("-----------buttons--------",buttons);
  
        })

      }
    }
  };




  // button按钮
  action(actionmethod){
    console.log("++++++++++++++++++++action(actionmethod)++++++++++++++++++++++++++++", actionmethod);
    var method = actionmethod.split(":")[1];
    console.log("--------------->method", method)
    switch (method) {
      // case 'add':// 没有新增功能！
      //   this.add("新增");
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
      // case 'import': // 没有导入功能！
      //   this.import("导入");
      //   break;
      case 'download':
        // this.download('设备KPI报表')
        this.download()
        break;
    }

  }

  // 搜索按钮
  query(){
    var departmentselect_data = this.departmentselect.getselect();
    var device_tpye_data = this.device_tpye.getselect();
    var asset_number_data = this.asset_number.getselect();
    var daterange_data = this.getselect()
    console.log("<------------搜索----------->", departmentselect_data, device_tpye_data,asset_number_data, daterange_data);
    // 将搜索的值发布！
    this.deviceservice.changeData(
      {
        department:departmentselect_data, 
        device_tpye:device_tpye_data,
        asset_number: asset_number_data,
        daterange:daterange_data
      }
    )
    var data = "department:" + String(departmentselect_data) + "," + 'device_tpye:' + String(device_tpye_data) +','+ 'asset_number:' + String(asset_number_data) +',' +'daterange:' + String(daterange_data);
    this.RecordOperation("搜索设备", 1, data);
    // this.test_task_table_data.source = null;
  }

  // 导出文件
  download(){
    // this.mytable.download(title);
    // localStorage.setItem("device_kpi_table_down", JSON.stringify(true))
    // 发布方
    this.deviceservice.changeMessage(true)

  };


// option_record
RecordOperation(option, result,infodata){
  console.warn("==============>", this.userinfo.getLoginName())
  console.warn("infodata==============>", infodata)
  console.warn("==============>")
  if(this.userinfo.getLoginName()){
    var employeeid = this.userinfo.getEmployeeID();
    var result = result; // 1:成功 0 失败
    var transactiontype = option; // '新增用户';
    var info = infodata;
    var createdby = this.userinfo.getLoginName();
    this.publicservice.option_record(employeeid, result,transactiontype,info,createdby);
  }

}
  


}

