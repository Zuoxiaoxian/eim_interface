import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { menu_button_list } from '../../../appconfig';

import { Router } from '@angular/router'
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
declare let layui;

declare let $;

import { DeviceKpiReport2Service } from './device-kpi-report2-service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { min } from 'rxjs/operators';
@Component({
  selector: 'ngx-device-kpi-report2',
  templateUrl: './device-kpi-report2.component.html',
  styleUrls: ['./device-kpi-report2.component.scss']
})
export class DeviceKpiReport2Component implements OnInit, OnDestroy {
  @ViewChild("groups") groups_func:any;
  @ViewChild("eimdevicetpye") eimdevicetpye:any;

  @ViewChild("daterange") daterange:any;

  @ViewChild("kpitable") kpitable:any;

 
  // 科室/功能组 
  groups_placeholder = "请选择科室/功能组";
  // eim 设备类型
  eimdevicetpye_placeholder = "请选择设备类型";


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


  

  // 前端要展示的button 主要是：增、删、改
  buttons;

  // 前端要展示的buttons 主要是：搜索、导入导出
  buttons2;

  loading = false;  // 加载
  refresh = false; // 刷新tabel
  button; // 权限button
  active;  // aggrid 操作


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
    
      // 选择框
      this.get_tree_selecetdata();

  }

  ngOnInit(): void {
    this.getbuttons();
    this.initdate();
    // 得到pathname --在得到button
    console.log("得到pathname --在得到button\t\t")
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      console.log("得到pathname --在得到button\t\t", result)
      localStorage.setItem("buttons_list", JSON.stringify(result));
    })
  }

  ngOnDestroy(){
    // 删除 man-hour-kpi-report2-buttons
    localStorage.removeItem("device-kpi-report2-buttons");
    localStorage.removeItem("kpi_for_detail");
    localStorage.removeItem(this.date_ranges)
  }

  // 初始化日期范围
  initdate(){
    var date_ranges = this.date_ranges
    var init_value = "2010-10-01 - 2020-11-21"
    localStorage.setItem(date_ranges, JSON.stringify(init_value))
    layui.use('laydate', function(){
      var laydate = layui.laydate;
      //日期范围 2010-10-01 2020-11-21
      laydate.render({
        elem: '#divice_kpi_report'
        ,range: true
        // 初始化日期范围 
        ,value: init_value
        // 控件初始打开回调
        
        // ,trigger: 'click'//呼出事件改成click  控件选择完毕回调
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
      var date_list = date[0]===""?[]:date;
      
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


  // 刷新tabel
  refresh_table(){
    $("#devicename").val('')
    this.refresh = true;
    this.loading = true;
    // this.gridData = [];
    // this.inttable();
    this.refresh = false;
    this.deviceservice.changeRefresh(true);
  }


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

  // 得到下拉框的数据
  get_tree_selecetdata(){
    var columns = {
      employeeid:this.userinfo.getEmployeeID(),
    }
    this.http.callRPC("deveice","dev_get_device_groups",columns).subscribe(result=>{
      var res = result["result"]["message"][0]
      console.log("得到下拉框的数据---------------->", res)
      if (res["code"] === 1){
        var groups = res["message"][0]["groups"];
       
        this.groups_func.init_select_tree(groups);
        var eimdevicetpyedata = res["message"][0]["type"];
        this.eimdevicetpye.init_select_trees(eimdevicetpyedata);
      }
    })
  }

  // 搜索按钮
  query(){
    // 设备名称 devicename
    var devicename = $("#devicename").val();
    // 科室/功能组
    var groups_data = this.groups_func.getselect();
    // 设备类型
    var device_tpye_data = this.eimdevicetpye.getselect();
    // 日期范围
    var daterange_data = this.getselect()
    console.log("<------------搜索----------->", devicename, groups_data, device_tpye_data, daterange_data);
    // 将科室/功能组，转为列表
    var groups_data_ = groups_data ===""?[] :groups_data.split(";");
    // 搜索的 时间范围 daterange 必选，修改为 start end
    if(daterange_data.length > 1){
      // 将搜索的值发布！
      this.deviceservice.changeData(
        {
          devicename:[devicename],
          eimdevicetype:device_tpye_data,
          groups:groups_data_, 
          daterange:daterange_data,
          start:daterange_data[0],
          end:daterange_data[1],
        }
      )

    }
    // var data = "department:" + String(groups_data) + "," + 'device_tpye:' + String(device_tpye_data) +',' +',' +'daterange:' + String(daterange_data);
    // this.RecordOperation("搜索设备", 1, data);
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

