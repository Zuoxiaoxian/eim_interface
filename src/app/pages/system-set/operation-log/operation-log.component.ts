import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';

import { menu_button_list } from '../../../appconfig';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';

declare let $;

@Component({
  selector: 'ngx-operation-log',
  templateUrl: './operation-log.component.html',
  styleUrls: ['./operation-log.component.scss']
})
export class OperationLogComponent implements OnInit, OnDestroy {
  @ViewChild("agGrid") agGrid: any;

  constructor(private publicmethod: PublicmethodService, private http: HttpserviceService, private userinfo: UserInfoService) {
   }
  button; // 权限button
  loading = false;  // 加载
  refresh = false; // 刷新tabel

  ngOnInit(): void {
    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicmethod.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    })
  }

  ngAfterViewInit(){
    // init  table
    this.inttable();
  }
  
  ngOnDestroy(){
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

  refresh_table(){
    $("#employeenumber").val('')
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    this.inttable();
    this.refresh = false;
    this.loading = false;
  }


  // =================================================agGrid

  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度
      // { field: 'application', headerName: '应用', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true},
      { field: 'createdby', headerName: '域账号',headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true,  resizable: true, flex: 1},
      { field: 'name', headerName: '姓名', resizable: true, flex: 1},
      { field: 'result', headerName: '状态',  resizable: true, flex: 1},
      { field: 'transactiontype', headerName: '类型',  resizable: true, flex: 1},
      { field: 'info', headerName: '信息', resizable: true, flex: 1},
      { field: 'createdon', headerName: '记录时间', resizable: true, flex: 1},
    ],
    rowData: [ // data
    ]
  };

  private gridData = [];

  // 初始化table
  inttable(event?){
    var offset;
    var limit;
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
    }else{
      offset = 0;
      limit = 20;
    }
    var columns = {
      offset: offset, 
      limit: limit,
    }
    this.http.callRPC('sys_security_log', 'get_sys_transaction_log', columns).subscribe((res)=>{
      var get_sys_transaction_log = res['result']['message'][0]
      if (get_sys_transaction_log["code"]===1){
        this.loading = false;
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
        this.RecordOperation(1, '查看', "操作日志");
      }else{
        this.RecordOperation(0, '查看', "操作日志");
      }
    })
  }
  
  // 更新 表
  update_agGrid(event?){
    var offset;
    var limit;
    console.log("event------------------------------------------------", event);
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
    }else{
      offset = 0;
      limit = 20;
    }
    this.http.callRPC('sys_security_log', 'get_sys_transaction_log', {offset: offset, limit: limit}).subscribe((res)=>{
      console.log("get_sys_transaction_log", res)
      var get_sys_transaction_log = res['result']['message'][0]
      console.log("get_sys_transaction_log", get_sys_transaction_log);
      if (get_sys_transaction_log["code"]===1){
        this.loading = false;
        // 发布组件，编辑用户的组件
        // this.publicmethod.getcomponent(EditUserEmployeeComponent);
  
        var message = get_sys_transaction_log["message"];
        var totalpagenumbers = get_sys_transaction_log['numbers'][0]['numbers'];
        // formart result
        message.forEach(row => {
          row["result"] = row["result"] === 1? '成功':'失败';
        });
        this.gridData = []

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
    this.inttable(event);
  }


  // =================================================agGrid
  // option_record
  RecordOperation( result,option,infodata){
    // option:操作类型, result:操作的结果, infodata:附加信息!
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicmethod.option_record(employeeid, result,transactiontype,info,createdby);
    }

  }

}
