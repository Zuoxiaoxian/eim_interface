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
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度
      { field: 'devicename', headerName: '设备名称', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true, pinned: 'left'},
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


  // ================================================ tree input
    // 初始化 tree input
  input_tree(treedata){
    var that = this;
    console.log("**********初始化 tree input********", treedata, that)
    var selectment_lsit = [];
    var parent_list = [];
    var child_list = [];
    var child_list_id = [];
    layui.use(['layer', 'form', 'eleTree',], function(){
      var layer = layui.layer
      ,form = layui.form
      var eleTree = layui.eleTree
      // =================
      var el5=eleTree.render({
          elem: '.treeele5',
          data: treedata,
          showCheckbox: true,
          defaultExpandAll: false, // 是否默认展开所有节点
          defaultCheckedKeys: selectment_lsit,  // 默认勾选的节点的 key 的数组
          highlightCurrent: true, // 是否高亮当前选中节点，默认值是 false。
          renderAfterExpand: false, // 是否在第一次展开某个树节点后才渲染其子节点
          checkStrictly: true, //在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
      });
      // input被选中事件
      var select_id = selectment_lsit;
      eleTree.on("nodeChecked(treeele5data)",function(d) {
        // 获取选中的节点，接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
        var selected_data = el5.getChecked(true, true);
        console.log("获取选中的节点selected_data", selected_data);
        console.log("获取选中的节点selected_data", d.data["currentData"]);
        
        if (d.isChecked){
          var parentid = d.data["currentData"]["parentid"];
          if (parentid != null){
            // 表示是子节点
            // child_list 不存在子id 就加入
            if(child_list_id.indexOf(d.data["currentData"]["id"]) === -1){
              child_list.push(d.data["currentData"]["label"]);
              uniq(child_list_id, d.data["currentData"]["id"]);
            }
            // uniq(child_list_id, d.data["currentData"]["id"]);
            // uniq(child_list, d.data["currentData"]["label"]);
          }else{
            // 表示是父节点
            // parent_list 不存在父id 就加入 
            uniq(parent_list, d.data["currentData"]["label"]);
          }

          uniq(select_id, d.data["currentData"]["id"]);
          if (d.data["currentData"] != undefined && d.data["currentData"]["children"] != null){
            el5.expandNode(d.data["currentData"]["id"]);
            
            var children = d.data["currentData"]["children"];
            // console.log("----------------------------->>>children:", children);
            children.forEach(element => {
              // 展开所有
              el5.expandNode(element["id"]);
              uniq(select_id, element["id"]);
              
              // 孙子辈的
              var e_children = element["children"];
              e_children.forEach(e_element => {
                // 按钮
                // select_id.push(e_element["id"]);
                uniq(select_id, e_element["id"])
              });
            });

          }else{
          }
          
        }else{
          var parentid = d.data["currentData"]["parentid"];
          if (parentid != null){
            // 表示是子节点
            // child_list 子删除存在的
            del_unselect(child_list, d.data["currentData"]["label"])
            del_unselect(child_list_id, d.data["currentData"]["id"])
          }else{
            // 表示是父节点
            // parent_list 父删除存在的
            del_unselect(parent_list, d.data["currentData"]["label"]);
          }

          if (d.data["currentData"] != undefined && d.data["currentData"]["children"] != null){
            var children = d.data["currentData"]["children"]
            el5.unExpandNode(d.data["currentData"]["id"]);
            del_unselect(select_id, d.data["currentData"]["id"]);
            children.forEach(element => {
              if (element["children"] != undefined){
                el5.unExpandNode(element["id"]);
                var e_children = element["children"];
                del_unselect(select_id, element["id"])
                
                // 孙子辈的不管
                e_children.forEach(e_element => {
                  // 按钮
                  del_unselect(select_id, e_element["id"])
                });
              }else{
                // 菜单
                del_unselect(select_id, element["id"]);
                // child_list 子删除存在的
                del_unselect(child_list, element["id"])
              }
            });
          }else{
            del_unselect(select_id, d.data["currentData"]["id"]);
            // child_list 子删除存在的
            del_unselect(child_list, d.data["currentData"]["id"]);

          }
        }
        el5.setChecked(select_id,true);
        console.log("点击父节点，默认子节点也选中", select_id);
        console.log("得到父亲,儿子,孙子辈的不管,默认是二级树状结构! parent_list, child_list", parent_list, child_list);
        // 根据父节点id得到treedata对应的 label,列表形式赋值给 group, 同理子节点id,得到treedata对应的 label,列表形式赋值给 devicename!
        console.log("**********初始化 tree input********", treedata);
        that.updata_table_with_tree_select(parent_list,child_list);
      }) 
      // =================
      // 节点点击事件
      eleTree.on("nodeClick(treeele5data)",function(d) {
        // console.log(d.data);    // 点击节点对应的数据
        // console.log(d.event);   // event对象
        // console.log(d.node);    // 点击的dom节点
        // console.log(this);      // 与d.node相同
        // 修改 样式 eleTree-node-content
        $(".eleTree-node-group").children(".eleTree-node").children(".eleTree-node-content").children(".eleTree-node-content-label").attr("style","background-color: #eeeeee");
      });
      
    });

    function uniq(select_id, id) {
      var index = select_id.indexOf(id);
      if (index === -1){
        select_id.push(id)
      }
    }
    // 勾选的列表去除，取消勾选的
    function del_unselect(select_id, unselect_id) {
      console.log("select_id, unselect_id", select_id, unselect_id);
      // select_id:勾选的列表， unselect：取消勾选的
      var index = select_id.indexOf(unselect_id);
      if (index != -1){
        select_id.splice(index, 1);
      }
      console.log("勾选的列表去除，取消勾选的 select_id", select_id)
    }

  }

  /*
    *选择左侧树状结构,得到科室 设备名称!根据此 更具对应的table 
    *根据父节点id得到treedata对应的 label,列表形式赋值给 group, 
    *同理子节点id,得到treedata对应的 label,列表形式赋值给 devicename!
  */ 
  updata_table_with_tree_select(parent_list,child_list ){
    console.log("************选择左侧树状结构,得到科室 设备名称!根据此 更具对应的table****************\n")
    console.log("************parent_list,child_list, ****************",parent_list,child_list, "\n")
    var group = []; // 科室/功能组列表!
    var devicename = []; // 部门名称列表!
    if (parent_list.length>0 || child_list.length>0){
      // 这个时间---到时候怎么整?
      var columns = {
        limit:20,
        offset:0,
        start: "2020-10-01",
        end: "2020-11-21",
        employeeid: this.userinfo.getEmployeeID(),
        eimdevicetype: [],
        group: parent_list,
        devicename: child_list
      }
      this.http.callRPC("device", "dev_get_kpi_device_search", columns).subscribe(result=>{
        var tabledata = result['result']['message'][0];
        this.loading = false;
        if (tabledata["code"]===1){
          this.gridData = [];
          this.gridData.push(...tabledata["message"]);
          if (this.gridData.length < 1){
            this.warning();
          }
          this.tableDatas.rowData = this.gridData
          var totalpagenumbers = tabledata['numbers']? tabledata['numbers'][0]['numbers']: '未得到总条数';
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
          this.RecordOperation('树状结构->table', 1,  "设备报表")
        }else{
          this.RecordOperation('树状结构->table', 0,  "设备报表")
        }
      })
    }

    

  }

  // 得到 tree input 的数据！
  get_tree_input_data(){
    // 得到设备信息！ 树状选择框--需要
    var colmun = {
    }
    this.http.callRPC('device', 'dev_get_device_department', colmun).subscribe((res)=>{
      console.log("dev_get_device_department", res)
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

      if (!item[tditem["group"]]){
        item[tditem["group"]] = 1;
        var td_obj_ch: TREEV2 = {
          id: tditem.id,    // 节点唯一索引，
          parentid: index,    // 父节点id
          label: tditem.devicename, // 节点标题
          checked: false,// 节点是否初始为选中状态， 默认false
          disabled: false, // 节点是否为禁止状态，默认为false
          children: [],
          deviceno: tditem.deviceno,
          deviceid: tditem.deviceid,
          parent_label: tditem.group
        }
        var td_obj:TREEV2 = {
          id: index,    // 节点唯一索引，
          parentid: null,    // 父节点id
          label: tditem.group, // 节点标题
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
          parent_label: tditem.group
        }
        exit_td_obj_ch_list.push(td_obj_ch);
      }
    }
    obj_list.forEach(obj=>{ // 部门节点 + 部门下的子节点
      exit_td_obj_ch_list.forEach(exit_obj=>{  // 部门下的子节点
        if (obj.label === exit_obj.parent_label ){
          exit_obj.parentid = obj.id;
          obj.children.push(exit_obj);
        }
      })
    })
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