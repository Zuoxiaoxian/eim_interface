import { Component, OnInit, ViewChild } from '@angular/core';


import * as XLSX from 'xlsx';

import {LocalDataSource} from "@mykeels/ng2-smart-table";

import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';

declare let layui;

declare let $;

// 要渲染的组件
import { TaskProgressForAggridComponent } from './task-progress-for-aggrid/task-progress-for-aggrid.component';

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
  @ViewChild("ag_Grid") agGrid:any;

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





  // 日期范围
  date_ranges = "device_kpi_date_range"

  // 前端要展示的button 主要是：增、删、改
  buttons;

  // 前端要展示的buttons 主要是：搜索、导入导出
  buttons2;

  // 加载table
  isloding = false;

  // 得到table method
  GETTABLE = "dev_get_device_taskinfo";

  constructor(private publicservice: PublicmethodService, private http: HttpserviceService) { }

  ngOnInit(): void {

    // 初始化 权限button
    this.getbuttons();

    this.initdate();
    
  }
  
  ngAfterViewInit(){
    // 初始化agGrid
    this.getetabledata();
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

  
  // 得到buttons----------------------------------------------------------
  getbuttons(){
    // 根据menu_item_role得到 该页面对应的 button！
    this.publicservice.get_buttons().subscribe((button_list:any[])=>{
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
  
          console.log("-----------buttons2--------",buttons2);
          console.log("-----------buttons--------",buttons);
          
  
          // ====================================================
          var isactions = {};
          buttons.forEach(button=>{
            var mdthod = button["permission"].split(":")[1];
            switch (mdthod) {
              case "add":
                break;
              case "del":
                isactions["del"] = true
                break;
              case "edit":
                isactions["edit"] = true
                break;
              
            }
          })
  
          if (!isactions["edit"]){
            isactions["edit"] = false
          }
          if (!isactions["del"]){
            isactions["del"] = false
          }
          // localStorage.setItem(device_action, JSON.stringify(isactions));
          console.log("_________________________________-isactions---------________________",isactions)
        })
      }

    })
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
        this.download('试验任务管理')
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
  }

  // 导出文件
  download(title){
    this.agGrid.download(title);
  };

  // 得到buttons----------------------------------------------------------

    // =================================================agGrid

    tableDatas = {
      action: false,
      totalPageNumbers: 0, // 总页数
      CellRender: {
        task_progress: "TaskProgressForAggridComponent",
      }, // 这是单元格要渲染的 组件！
      columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度
        { field: 'id', headerName: '序号', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true, pinned: 'left'},
        { field: 'devicename', headerName: '设备名称',  resizable: true, minWidth: 10},
        { field: 'department', headerName: '部门信息', resizable: true, minWidth: 10},
        { field: 'deviceid', headerName: '设备id',  resizable: true, minWidth: 10},
        { field: 'belonged', headerName: '负责人',  resizable: true, minWidth: 10},
        { field: 'tasknum', headerName: '任务单号', resizable: true, minWidth: 10},
        { field: 'taskchildnum', headerName: '任务子单号', resizable: true, minWidth: 10},
        
        // { field: 'departmentInfo', headerName: '自定义统计时间(默认最近一周)', 
        //   children:[
        //     { field: 'starttime', headerName: '开始时间', resizable: true},
        //     { field: 'endtime', headerName: '结束时间', resizable: true},
        //   ]
        // },

        { field: 'taskstart', headerName: '试验开始时间', resizable: true, minWidth: 10}, // 自定义设备编号！
        { field: 'taskend', headerName: '试验结束时间', resizable: true, minWidth: 10},
        { field: 'numberstime', headerName: '试验持续时长(h)', resizable: true, minWidth: 10},

        { field: 'rate', headerName: '任务进度', resizable: true, minWidth: 10, cellRendererFramework: TaskProgressForAggridComponent, pinned: 'left'},

        { field: 'lastupdateon', headerName: '数据更新时间', resizable: true, minWidth: 10},
      ],
      rowData: [ // data
      ]
    };
  
    private gridData = [];

    getetabledata(event?){
      var offset;
      var limit;
      if (event != undefined){
        offset = event.offset;
        limit = event.limit;
      }else{
        offset = 0;
        limit = 50;
      }
      var colmun = {
        start: '2020-09-1',
        end: '2020-11-21',
        offset: offset,
        limit: limit,
      }
      // 得到设备信息！
      this.http.callRPC('device', this.GETTABLE, colmun).subscribe((res)=>{
        console.log("得到设备信息=================>", res)
        var result  = res['result']['message'][0];
        if (result["code"]===1){
          this.isloding = false;
          // 发布组件，编辑用户的组件
          // this.publicservice.getcomponent(Add_Edit_DeviceManageComponent);
          // this.publicservice.getmethod("optionCellRenderer");
          var message = result["message"];
          this.gridData = [];
          this.gridData.push(...message)
          this.tableDatas.rowData = this.gridData;
          var totalpagenumbers = result['numbers']? result['numbers'][0]['numbers']: '未得到总条数';
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！

        }
      })
    }
  
    pageabledata(event?){
      var offset;
      var limit;
      console.log("event------------------------------------------------", event);
      if (event != undefined){
        offset = event.offset;
        limit = event.limit;
      }else{
        offset = 0;
        limit = 50;
      }
      var colmun = {
        start: '2020-10-1',
        end: '2020-11-21',
        offset: offset,
        limit: limit,
      }
      this.http.callRPC('device', this.GETTABLE, colmun).subscribe((res)=>{
        // console.log("get_menu_role", result)
        var result = res['result']['message'][0]
  
        this.isloding = false;
        // 发布组件，编辑用户的组件
        // this.publicservice.getcomponent(Add_Edit_DeviceManageComponent);
        // this.publicservice.getmethod("dev_delete_device");
  
        var message = result["message"];
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = result['numbers']? result['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
      })
    }
  
    updatetabledata(event?){
      var offset;
      var limit;
      if (event != undefined){
        offset = event.offset;
        limit = event.limit;
      }else{
        offset = 0;
        limit = 50;
      }
      var colmun = {
        start: '2020-10-1',
        end: '2020-11-21',
        offset: offset,
        limit: limit,
      }
      // 得到员工信息！
      this.http.callRPC('deveice', this.GETTABLE, colmun).subscribe((res)=>{
        var result = res['result']['message'][0]
        this.isloding = false;
        // 发布组件，编辑用户的组件
        // this.publicservice.getcomponent(Add_Edit_DeviceManageComponent);
        // this.publicservice.getmethod("dev_delete_device");
        var message = result["message"];
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = result['numbers']? result['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
      })
  
    }
        
  
    // nzpageindexchange 页码改变的回调
    nzpageindexchange_ag(event){
      console.log("页码改变的回调", event);
      this.pageabledata(event);
    }
    // =================================================agGrid


}
