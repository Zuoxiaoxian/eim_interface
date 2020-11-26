import { Component, OnInit, ViewChild } from '@angular/core';


import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceKpiReport2Service } from '../device-kpi-report2-service';
import { UserInfoService } from '../../../../services/user-info/user-info.service';
import { TableDetailComponent } from './table-detail/table-detail.component';

declare let $;

declare let layui;


@Component({
  selector: 'ngx-kpi-table',
  templateUrl: './kpi-table.component.html',
  styleUrls: ['./kpi-table.component.scss']
})
export class KpiTableComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid:any;




  // 是否导出
  isdownload: boolean = false;
  // =============================agGrid
  loading: boolean = false;
  // kpi_for_detail localstorage 点击的行数据

  // =============================agGrid
  constructor(private publicservice: PublicmethodService, private http: HttpserviceService, 
    private deviceservice: DeviceKpiReport2Service, private router: Router,
    private userinfo: UserInfoService) { 
    
  }

  ngOnInit(): void {
    // 初始化agGrid==============
    this.inttable();
    // 初始化agGrid==============

    // 订阅方,得到属性
    this.deviceservice.currentMessage.subscribe(res=>{
      console.log("订阅方：", res);
      if (res){
        this.download()
      }
    });

    // 订阅方得到数据
    this.deviceservice.currentData.subscribe(res=>{
      console.log("查询：", res);
      var columns = {
        offset: 0, 
        limit: 20,
        employeeid: this.userinfo.getEmployeeID(),
        devicename: res['devicename'],
        group: res["groups"],
        start:res["start"],
        end:res["end"],
        eimdevicetype:res["eimdevicetype"]
      }
      console.log("查询：", columns);
      // 执行搜索函数！
      this.http.callRPC('device', "dev_get_kpi_device_search",columns).subscribe(result=>{
        console.log("执行搜索函数！\n\n\n",result)
        var tabledata = result["result"]["message"][0];
        this.loading = false;
        if (tabledata["code"] === 1){
          var message = tabledata["message"];
          this.gridData = [];
          this.gridData.push(...message);
          this.tableDatas.rowData = this.gridData;
          var totalpagenumbers = tabledata['numbers']? tabledata['numbers'][0]['numbers']: '未得到总条数';
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
          this.RecordOperation('搜索', 1,  "设备报表")
        }else{this.RecordOperation('搜索', 0,  "设备报表")}
      })
    })

    // 订阅属性，是否刷新
    this.deviceservice.is_refresh.subscribe(result=>{
      if (result){
        this.refresh_table();
      }
    })


    

  }

  ngAfterViewInit(){
    
  }
  

  // plv8请求
  querst(table: string, method: string, colmun: Object){
  return new Observable((observe)=>{
    this.http.callRPC(table, method, colmun).subscribe((result)=>{
      observe.next(result);
    })

  })
  }



  download(){
    console.log("这是----download，kpi 报表");
    this.agGrid.download('设备报表');

  }

  // 刷新tabel
  refresh_table(){
    this.loading = true;
    this.gridData = [];
    this.inttable();
  }

  
  // =================================================agGrid

  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度 pinned: 'left' 固定到左侧！
      { field: 'devicename', headerName: '设备名称', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true, },
      { field: 'deviceid', headerName: '设备id',  resizable: true, minWidth: 10},
      { field: 'group', headerName: '试验室', resizable: true, minWidth: 10},
      
      { field: 'CustomTime', headerName: '自定义统计时间(默认最近一周)', 
        children:[
          { field: 'starttime', headerName: '开始时间', resizable: true},
          { field: 'endtime', headerName: '结束时间', resizable: true},
        ]
      },


      { field: 'sumruntime', headerName: '累计运行时长(h)', resizable: true, minWidth: 10},
      
      { field: 'avgtime', headerName: '平均运行时长(h)', resizable: true, minWidth: 10},
      { field: 'ratetime', headerName: '开动率(%)', resizable: true, minWidth: 10}, // 自定义设备编号！
      { field: 'andenstatus', headerName: '实时安灯状态', resizable: true, minWidth: 10},
      // 这个是跳转到详情kpi的 https://www.ag-grid.com/javascript-grid-cell-rendering-components/
      { field: 'option', headerName: '详情', resizable: true, minWidth: 10, cellRendererFramework: TableDetailComponent, pinned: 'right'},
      // {
      //   field: 'option', 
      //   headerName: '详情', 
      //   resizable: true, 
      //   minWidth: 10,
      //   pinned: 'right',
      //   cellRenderer: function(params){
      //     var div = document.createElement('div');
      //     div.innerHTML = `<a href=${params.value} style="text-decoration: blink;" id="btn-simple">设备详情</a>`
      //     return div
      //   }
      // }

    ],
    rowData: [ // data
      // { name: 'Toyota', loginname: 'Celica', role_name: 35000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,group: "ZJX", lastsignondate:"2020"},
      // { name: 'Ford', loginname: 'Mondeo', role_name: 32000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,group: "ZJX", lastsignondate:"2020" },
      // { name: 'Porsche', loginname: 'Boxter', role_name: 72000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,group: "ZJX", lastsignondate:"2020" }
    ]
  };

  private gridData = [];
  
  inttable(event?){
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
      employeeid: this.userinfo.getEmployeeID()
    }
    // 得到设备信息！
    this.http.callRPC('device', 'dev_get_kpi_device_limit', colmun).subscribe((res)=>{
      console.log("得到设备信息=================>", res)
      var get_employee_limit = res['result']['message'][0];
      if(get_employee_limit["code"]===1){
        this.loading = false;
        var message = res["result"]["message"][0]["message"];
        this.add_detail_kpi(message);
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = get_employee_limit['numbers']? get_employee_limit['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        this.RecordOperation('查看', 1,  "设备报表")
      }else{
        this.RecordOperation('查看', 0,  "设备报表")
      }
    })
  }

  update_agGrid(event?){
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
    // this.getsecurity('sys_security_log', 'get_security_log_limit', {offset:event.offset,limit:10});
    // 得到员工信息！{offset: offset, limit: limit}
    this.http.callRPC('device', 'dev_get_kpi_device_limit', colmun).subscribe((result)=>{
      // console.log("get_menu_role", result)
      var res = result['result']['message'][0];
      this.loading = false;
      if (res["code"] === 1){
        var message = result["result"]["message"][0]["message"];
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = res['numbers']? res['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
        this.RecordOperation('更新', 1, "设备报表");
      }else{
        this.RecordOperation('更新', 0, "设备报表");
      }
    })
  }


      

  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event){
    console.log("页码改变的回调", event);
    this.loading = true;
    this.inttable(event);
  }


  // =================================================agGrid
  // { field: 'option', headerName: '详情', resizable: true, minWidth: 10, cellRenderer: 'optionCellRenderer'},
  // 添加详情link
  add_detail_kpi(datas:any[]){
    var option = '/pages/tongji/deviceKpiReport/kpidetail';
    datas.forEach(data=>{
      data["option"] =  option
    })
    
  }

  // 点击行数据 子组件调用
  clickrow(data){
    localStorage.setItem("kpi_for_detail", JSON.stringify(data))
  }






  // 设备详情---跳转的设备详情界面
  goto_kpi_detail(url){
    alert(url)
    // this.router.navigate([''])
  }


   // option_record
   RecordOperation(option, result,infodata){
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(employeeid, result,transactiontype,info,createdby);
    }

  }
 
  // 展示状态
  success(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"导入成功!"});
  }
  warning(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'warning', conent:"搜索的结果为空!"});
  }

}
interface TREEV2 {
  id: number,    // 节点唯一索引，对应数据库中id
  parentid: number | null,    // 父节点id
  label: string, // 节点标题
  checked: boolean,// 节点是否初始为选中状态， 默认false
  disabled: boolean, // 节点是否为禁止状态，默认为false
  children: TREEV2[] | [], // 子节点，支持设定项同父节点
  deviceno: string | null, // 设备编号
  deviceid: string | null, // 设备id
  parent_label: string | null // 父节点 label

}

// 树状结构 实例！
var data =  [
  {
      "id": 1,
      "label": "安徽省",
      "children": [
          {
              "id": 2,
              "label": "马鞍山市",
              "disabled": true,
              "children": [
                  {
                      "id": 3,
                      "label": "和县"
                  },
                  {
                      "id": 4,
                      "label": "花山区",
                      "checked": true
                  }
              ]
          },
          {
              "id": 22,
              "label": "淮北市",
              "children": [
                  {
                      "id": 23,
                      "label": "濉溪县"
                  },
                  {
                      "id": 24,
                      "label": "相山区",
                      "checked": true
                  }
              ]
          }
      ]
  },
  {
      "id": 5,
      "label": "河南省",
      "children": [
          {
              "id": 6,
              "label": "郑州市"
          }
      ]
  },
  {
      "id": 10,
      "label": "江苏省",
      "children": [
          {
              "id": 11,
              "label": "苏州市"
          },
          {
              "id": 12,
              "label": "南京市",
              "children": [
                  {
                      "id": 13,
                      "label": "姑苏区"
                  },
                  {
                      "id": 14,
                      "label": "相城区"
                  }
              ]
          }
      ]
  }
]