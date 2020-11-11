import { Component, OnInit, ViewChild } from '@angular/core';


import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceKpiReport2Service } from '../device-kpi-report2-service';
import { UserInfoService } from '../../../../services/user-info/user-info.service';

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
  isloding: boolean = false;
  // kpi_for_detail localstorage 点击的行数据

  // =============================agGrid
  constructor(private publicservice: PublicmethodService, private http: HttpserviceService, 
    private deviceservice: DeviceKpiReport2Service, private router: Router) { 
    
  }

  ngOnInit(): void {
    // 初始化agGrid==============
    this.getetabledata();
    // 初始化agGrid==============

    console.log("======导出=====", this.isdownload);
    // 订阅方,得到属性
    this.deviceservice.currentMessage.subscribe(res=>{
      console.log("订阅方：", res);
      if (res){
        this.download()
      }
    });

    // 订阅方得到数据
    this.deviceservice.currentData.subscribe(res=>{
      console.log("查询：", res)
    })

    // 得到树状data、并渲染：get_tree_input_data()
    this.get_tree_input_data();

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

  
  // =================================================agGrid

  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度
      { field: 'devicename', headerName: '设备名称', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true, pinned: 'left'},
      { field: 'deviceid', headerName: '设备id',  resizable: true, minWidth: 10},
      { field: 'department', headerName: '部门信息', resizable: true, minWidth: 10},
      
      { field: 'CustomTime', headerName: '自定义统计时间', 
        children:[
          { field: 'starttime', headerName: '开始时间', resizable: true},
          { field: 'endtime', headerName: '结束时间', resizable: true},
        ]
      },


      { field: 'sumruntime', headerName: '累计运行时长(h)', resizable: true, minWidth: 10},
      
      { field: 'avgtime', headerName: '平均运行时长(h)', resizable: true, minWidth: 10},
      { field: 'ratetime', headerName: '开动率(%)', resizable: true, minWidth: 10}, // 自定义设备编号！
      { field: 'belonged', headerName: '负责人', resizable: true, minWidth: 10},
      // 这个是跳转到详情kpi的 https://www.ag-grid.com/javascript-grid-cell-rendering-components/
      // { field: 'option', headerName: '详情', resizable: true, minWidth: 10, cellRenderer: 'optionCellRenderer'},
      {
        field: 'option', 
        headerName: '详情', 
        resizable: true, 
        minWidth: 10,
        pinned: 'right',
        cellRenderer: function(params){
          var div = document.createElement('div');
          div.innerHTML = `<a href=${params.value} style="text-decoration: blink;" id="btn-simple">设备详情</a>`
          return div
        }
      }

    ],
    rowData: [ // data
      { name: 'Toyota', loginname: 'Celica', role_name: 35000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,department: "ZJX", lastsignondate:"2020"},
      // { name: 'Ford', loginname: 'Mondeo', role_name: 32000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,department: "ZJX", lastsignondate:"2020" },
      // { name: 'Porsche', loginname: 'Boxter', role_name: 72000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,department: "ZJX", lastsignondate:"2020" }
    ]
  };

  private gridData = [];
  
  getetabledata(event?){
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
    // 得到设备信息！
    this.http.callRPC('device', 'dev_get_kpi_device_limit', colmun).subscribe((res)=>{
      console.log("得到设备信息=================>", res)
      var get_employee_limit = res['result']['message'][0]

      this.isloding = false;
      // 发布组件，编辑用户的组件
      // this.publicservice.getcomponent(Add_Edit_DeviceManageComponent);
      // this.publicservice.getmethod("optionCellRenderer");

      var message = res["result"]["message"][0]["message"];
      this.add_detail_kpi(message);
      this.gridData = [];
      this.gridData.push(...message)
      this.tableDatas.rowData = this.gridData;
      var totalpagenumbers = get_employee_limit['numbers']? get_employee_limit['numbers'][0]['numbers']: '未得到总条数';
      this.tableDatas.totalPageNumbers = totalpagenumbers;
      this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
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
    // this.getsecurity('sys_security_log', 'get_security_log_limit', {offset:event.offset,limit:10});
    // 得到员工信息！{offset: offset, limit: limit}
    this.http.callRPC('device', 'dev_get_kpi_device_limit', colmun).subscribe((res)=>{
      // console.log("get_menu_role", result)
      var get_employee_limit = res['result']['message'][0]
      console.log("device---", get_employee_limit);

      this.isloding = false;
      // 发布组件，编辑用户的组件
      // this.publicservice.getcomponent(Add_Edit_DeviceManageComponent);
      // this.publicservice.getmethod("dev_delete_device");

      var message = res["result"]["message"][0]["message"];

      this.gridData.push(...message)
      this.tableDatas.rowData = this.gridData;
      var totalpagenumbers = get_employee_limit['numbers']? get_employee_limit['numbers'][0]['numbers']: '未得到总条数';
      this.tableDatas.totalPageNumbers = totalpagenumbers;
      this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
    })
  }

  updatetabledata(event?){
    var offset;
    var limit;
    console.log("event------------------------------------------------", event, this.agGrid);
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
    // 得到员工信息！
    this.http.callRPC('deveice', 'dev_get_kpi_device_limit', colmun).subscribe((res)=>{
      console.log("updatetabledata\n\n", res)
      var get_employee_limit = res['result']['message'][0]
      console.log("deveice", get_employee_limit, "this.agGrid",this.agGrid);

      this.isloding = false;
      // 发布组件，编辑用户的组件
      // this.publicservice.getcomponent(Add_Edit_DeviceManageComponent);
      // this.publicservice.getmethod("dev_delete_device");
      var message = res["result"]["message"][0]["message"];
      this.gridData.push(...message)
      this.tableDatas.rowData = this.gridData;
      var totalpagenumbers = get_employee_limit['numbers']? get_employee_limit['numbers'][0]['numbers']: '未得到总条数';
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


  // ================================================ tree input
    // 初始化 tree input
  input_tree(treedata){
    var that = this;
    console.log("**********初始化 tree input********", treedata, that)
    //  加载 eleTree 模块
    // layui.config({
    //   base: "./assets/pages/system-set/layui/module/"
    // }).extend({
    //     eleTree3: "eleTree/eleTree"
    // });

    layui.use(['layer', 'form', 'eleTree',], function(){
      var layer = layui.layer
      ,form = layui.form
      var eleTree = layui.eleTree
      // =================
      var el5=eleTree.render({
          elem: '.ele5',
          data: treedata,
          showCheckbox: true,
          defaultExpandAll: false, // 是否默认展开所有节点
          highlightCurrent: true, // 是否高亮当前选中节点，默认值是 false。
          renderAfterExpand: false, // 是否在第一次展开某个树节点后才渲染其子节点
          // checkStrictly: true, //在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
      });
      // input被选中事件
      eleTree.on("nodeChecked(treedata)",function(d) {
        console.log(d.data);    // 点击节点对应的数据
        console.log(d.isChecked);   // input是否被选中
        // console.log(d.node);    // 点击的dom节点
        // console.log(this);      // input对应的dom
        // 获取选中的节点，接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
        var selected_data = el5.getChecked(true, true);
        // console.log("获取选中的节点selected_data", selected_data);
        that.get_agdata_with_selected_tree(selected_data);
      }) 
      // =================
      // 节点点击事件
      eleTree.on("nodeClick(treedata)",function(d) {
        // console.log(d.data);    // 点击节点对应的数据
        // console.log(d.event);   // event对象
        // console.log(d.node);    // 点击的dom节点
        // console.log(this);      // 与d.node相同
        // 修改 样式 eleTree-node-content
        $(".eleTree-node-group").children(".eleTree-node").children(".eleTree-node-content").children(".eleTree-node-content-label").attr("style","background-color: #eeeeee");
      });
      
    });
  }


  // 得到 tree input 的数据！
  get_tree_input_data(){
    // 得到设备信息！ 树状选择框--需要
    var colmun = {
    }
    this.http.callRPC('device', 'dev_get_device_department', colmun).subscribe((res)=>{
      // console.log("get_menu_role", result)
      var tree_data = res['result']['message'][0]
      if (tree_data.code === 1){
        var treedata = tree_data.message;
        console.log("dev_get_device_department---------------------------->>>", treedata);
        var handled_treedata = this.handle_treedata_befare(treedata); // 将数据处理成 tree data 需要的格式！
        // tree input             
        this.input_tree(handled_treedata);
      }else{
        // 没有得到 tree data
      }
    })
  }

  // 将原始数据处理成 tree data 需要的数据！
  handle_treedata_befare(treedata:any[]){
    var item = {}
    var obj_list = [];
    var exit_td_obj_ch_list = [];
    for (let index = 0; index < treedata.length; index++) {
      const tditem = treedata[index];

      if (!item[tditem["department"]]){
        item[tditem["department"]] = 1;
        var td_obj_ch: TREEV2 = {
          id: tditem.id,    // 节点唯一索引，
          parentid: index,    // 父节点id
          label: tditem.devicename, // 节点标题
          checked: false,// 节点是否初始为选中状态， 默认false
          disabled: false, // 节点是否为禁止状态，默认为false
          children: [],
          deviceno: tditem.deviceno,
          deviceid: tditem.deviceid,
          parent_label: tditem.department
        }
        var td_obj:TREEV2 = {
          id: index,    // 节点唯一索引，
          parentid: null,    // 父节点id
          label: tditem.department, // 节点标题
          checked: false,// 节点是否初始为选中状态， 默认false
          disabled: false, // 节点是否为禁止状态，默认为false
          children: [
            td_obj_ch,
          ], // 子节点，支持设定项同父节点
          deviceno: null,
          deviceid: null,
          parent_label: null
        }
        obj_list.push(td_obj)
      }else{
        // 表明 是 部门（父节点），需要添加子节点
        var td_obj_ch: TREEV2 = {
          id: tditem.id,    // 节点唯一索引，
          parentid: index,    // 父节点id
          label: tditem.devicename, // 节点标题
          checked: false,// 节点是否初始为选中状态， 默认false
          disabled: false, // 节点是否为禁止状态，默认为false
          children: [],
          deviceno: tditem.deviceno,
          deviceid: tditem.deviceid,
          parent_label: tditem.department
        }
        exit_td_obj_ch_list.push(td_obj_ch);
      }
    }
    console.log("----------------->>>>> 部门\t不\t重复的", obj_list);
    console.log("\n\n\n----------------->>>>> 部门重复的", exit_td_obj_ch_list);
    obj_list.forEach(obj=>{ // 部门节点 + 部门下的子节点
      exit_td_obj_ch_list.forEach(exit_obj=>{  // 部门下的子节点
        if (obj.label === exit_obj.parent_label ){
          exit_obj.parentid = obj.id;
          obj.children.push(exit_obj);
        }
      })
    })
    console.log("----------------->>>>> 部门\t不\t重复的=====处理后的！  ", obj_list);
    return obj_list;
  };
  // 得到选择的树状数据，根据这些数据 得到table 
  get_agdata_with_selected_tree(selected_tree:any){
    console.log("得到选择的树状数据，根据这些数据 得到table ", selected_tree);

  }
  // ================================================ tree input

  // 设备详情---跳转的设备详情界面
  goto_kpi_detail(url){
    alert(url)
    // this.router.navigate([''])
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