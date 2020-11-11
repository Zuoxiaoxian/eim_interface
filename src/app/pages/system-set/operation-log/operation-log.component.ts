import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';

import { menu_button_list } from '../../../appconfig';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

@Component({
  selector: 'ngx-operation-log',
  templateUrl: './operation-log.component.html',
  styleUrls: ['./operation-log.component.scss']
})
export class OperationLogComponent implements OnInit, OnDestroy {
  @ViewChild("agGrid") agGrid: any;

  constructor(private publicmethod: PublicmethodService, private http: HttpserviceService) {
   }

   // 前端要展示的button 主要是：增、删、改
   buttons;

   // 前端要展示的buttons 主要是：搜索、导入导出
   buttons2;

   // 加载table
   isloding = false;
   operation_log_agGrid = null;


  ngOnInit(): void {
    this.getbuttons();
  }

  ngAfterViewInit(){
    this.http.callRPC('sys_security_log', 'get_sys_transaction_log', {offset: 0, limit: 50}).subscribe((res)=>{
      var get_sys_transaction_log = res['result']['message'][0]
      if (get_sys_transaction_log["code"]===1){
        this.isloding = false;
        this.gridData = []
        var message = get_sys_transaction_log['message'];
        var totalpagenumbers = get_sys_transaction_log['numbers'][0]['numbers'];
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        // formart result
        message.forEach(row => {
          row["result"] = row["result"] === 1? '成功':'失败';
        });
        this.gridData.push(...message);
        this.tableDatas.rowData = this.gridData;
        this.agGrid.init_agGrid(this.tableDatas);
      }
    })
  }
  
  ngOnDestroy(){
  }

  // 得到buttons----------------------------------------------------------
  getbuttons(){
    // 根据menu_item_role得到 该页面对应的 button！
    var button_list = localStorage.getItem(menu_button_list)? JSON.parse(localStorage.getItem(menu_button_list)): false;
    if (button_list){
      this.publicmethod.get_current_pathname().subscribe(res=>{
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
        this.download('操作日志');
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
      { field: 'createdby', headerName: '用户名称',headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true,  resizable: true, flex: 1},
      // { field: 'employeeid', headerName: '用户ID',resizable: true, flex: 1},
      { field: 'result', headerName: '状态',  resizable: true, flex: 1},
      { field: 'transactiontype', headerName: '类型',  resizable: true, flex: 1},
      { field: 'info', headerName: '信息', resizable: true, flex: 1},
      { field: 'createdon', headerName: '记录时间', resizable: true, flex: 1},
    ],
    rowData: [ // data
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
    this.http.callRPC('sys_security_log', 'get_sys_transaction_log', {offset: offset, limit: limit}).subscribe((res)=>{
      console.log("get_sys_transaction_log", res)
      var get_sys_transaction_log = res['result']['message'][0]
      console.log("get_sys_transaction_log", get_sys_transaction_log);
      if (get_sys_transaction_log["code"]===1){
        this.isloding = false;
        // 发布组件，编辑用户的组件
        // this.publicmethod.getcomponent(EditUserEmployeeComponent);
  
        var message = get_sys_transaction_log["message"];
        var totalpagenumbers = get_sys_transaction_log['numbers'][0]['numbers'];
        // formart result
        message.forEach(row => {
          row["result"] = row["result"] === 1? '成功':'失败';
        });
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
      }else{
        console.error("未得到日志",get_sys_transaction_log)
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
