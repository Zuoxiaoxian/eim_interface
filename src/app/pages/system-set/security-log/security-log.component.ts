import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpserviceService } from '../../../services/http/httpservice.service';

import { SECURITY_TABLE } from '../table_setting';
import {LocalDataSource} from "@mykeels/ng2-smart-table";

import { menu_button_list } from '../../../appconfig';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

@Component({
  selector: 'ngx-security-log',
  templateUrl: './security-log.component.html',
  styleUrls: ['./security-log.component.scss']
})
export class SecurityLogComponent implements OnInit {
  @ViewChild("agGrid") agGrid: any;

  constructor(private http: HttpserviceService, private publicmethod: PublicmethodService) { 

    this.http.callRPC('sys_security_log', 'get_sys_login_log', {offset: 0, limit: 50}).subscribe((res)=>{
      console.log("******************************");
      console.log("**************安全日志****************",res);
      console.log("******************************");
      
      var get_sys_login_log = res['result']['message'][0]
      console.log("get_sys_login_log", get_sys_login_log);
      if (get_sys_login_log["code"]===1){
        this.isloding = false;
        // 发布组件，编辑用户的组件
        // this.publicmethod.getcomponent(EditUserEmployeeComponent);
        this.gridData = []
        var message = get_sys_login_log['message'];
        var totalpagenumbers = get_sys_login_log['numbers'][0]['numbers'];
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        console.log("***************message***************",message);
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        localStorage.setItem("system_log_agGrid", JSON.stringify(this.tableDatas))
      }
    })

  }




  // 前端要展示的button 主要是：增、删、改
  buttons;

  // 前端要展示的buttons 主要是：搜索、导入导出
  buttons2;


  // 加载table
  isloding = false;
  system_log_agGrid;

  ngOnInit(): void {

    // ====================================agGrid
      // 初始化table
      // ====================================agGrid
      this.getbuttons();
    }
    
    ngAfterViewInit(){
      this.http.callRPC('sys_security_log', 'get_sys_login_log', {offset: 0, limit: 50}).subscribe((res)=>{
        console.log("**************安全日志****************",res);
        var get_sys_login_log = res['result']['message'][0]
        if (get_sys_login_log["code"]===1){
          this.isloding = false;
          this.gridData = []
          var message = get_sys_login_log['message'];
          var totalpagenumbers = get_sys_login_log['numbers'][0]['numbers'];
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.gridData.push(...message)
          this.tableDatas.rowData = this.gridData;
          this.agGrid.init_agGrid(this.tableDatas);
        }
      })
    }

    
ngOnDestroy(){
  localStorage.removeItem("system_log_agGrid");
}


  // 得到buttons----------------------------------------------------------
  getbuttons(){
    // 根据menu_item_role得到 该页面对应的 button！
    var button_list = localStorage.getItem(menu_button_list)? JSON.parse(localStorage.getItem(menu_button_list)): false;
    if (button_list){
      this.publicmethod.get_current_pathname().subscribe(res=>{
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

        // console.log("-----------buttons2--------",buttons2)
      })
    }
  }
  action(actionmethod){
    // console.log("++++++++++++++++++++action(actionmethod)++++++++++++++++++++++++++++", actionmethod);
    var method = actionmethod.split(":")[1];
    // ====================================================
    switch (method) {
      // case 'import':
        // this.import();
        // break;
      case 'download':
        this.download('安全日志');
        break;
    }
  }

  //  button导出未excel
  download(title){
    this.agGrid.download(title);
  }





  // =================================================agGrid

  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度
      // { field: 'application', headerName: '应用', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true},
      { field: 'createdby', headerName: '用户名称',headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, resizable: true, flex: 1},
      { field: 'source', headerName: '访问IP',  resizable: true, flex: 1},
      // { field: 'employeeid', headerName: '用户ID', resizable: true, flex: 1},
      { field: 'info', headerName: '信息', resizable: true, flex: 1},
      { field: 'createdon', headerName: '记录时间', resizable: true, flex: 1},
    ],
    rowData: [ // data
      // { name: 'Toyota', loginname: 'Celica', role_name: 35000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,department: "ZJX", lastsignondate:"2020"},
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
    // this.getsecurity('sys_security_log', 'get_sys_login_log', {offset:event.offset,limit:10});
    // 得到员工信息！
    this.http.callRPC('sys_security_log', 'get_sys_login_log', {offset: offset, limit: limit}).subscribe((res)=>{
      console.log("get_sys_login_log", res)
      var get_sys_login_log = res['result']['message'][0]
      console.log("get_sys_login_log", get_sys_login_log);
      if (get_sys_login_log["code"]===1){
        this.isloding = false;
        // 发布组件，编辑用户的组件
        // this.publicmethod.getcomponent(EditUserEmployeeComponent);
  
        var message = get_sys_login_log["message"];
        var totalpagenumbers = get_sys_login_log['numbers'][0]['numbers'];
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
      }else{
        console.error("未得到日志",get_sys_login_log)
      }
    })
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event){
    console.log("页码改变的回调", event);
    this.getetabledata(event);
  }


  // =================================================agGrid

}
