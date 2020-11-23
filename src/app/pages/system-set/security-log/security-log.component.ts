import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpserviceService } from '../../../services/http/httpservice.service';
declare let $;
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';
@Component({
  selector: 'ngx-security-log',
  templateUrl: './security-log.component.html',
  styleUrls: ['./security-log.component.scss']
})
export class SecurityLogComponent implements OnInit {
  @ViewChild("agGrid") agGrid: any;

  constructor(private http: HttpserviceService, private publicmethod: PublicmethodService, private userinfo: UserInfoService) { 

    

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
    // ====================================agGrid
      // 初始化table
      this.inttable()
    // ====================================agGrid 
    
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
        this.download('安全日志');
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
      { field: 'createdby', headerName: '域账号',headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, resizable: true, flex: 1},
      { field: 'name', headerName: '姓名', resizable: true, flex: 1},
      { field: 'source', headerName: '访问IP',  resizable: true, flex: 1},
      { field: 'info', headerName: '信息', resizable: true, flex: 1},
      { field: 'createdon', headerName: '记录时间', resizable: true, flex: 1},
    ],
    rowData: [ // data
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
      limit = 20;
    }
    var columns = {
      offset: offset, 
      limit: limit,
    }
    this.http.callRPC('sys_security_log', 'get_sys_login_log', columns).subscribe((res)=>{
      var get_sys_login_log = res['result']['message'][0]
      if (get_sys_login_log["code"]===1){
        var message = get_sys_login_log['message'];
        var totalpagenumbers = get_sys_login_log['numbers'][0]['numbers'];
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        this.agGrid.init_agGrid(this.tableDatas);
        this.RecordOperation(1, '查看', "安全日志");
      }else{
        this.RecordOperation(0, '查看', "安全日志");

      }
    })
  }
  
  // 更新table
  update_agGrid(event?){
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
    // 得到员工信息！
    this.http.callRPC('sys_security_log', 'get_sys_login_log', columns).subscribe((res)=>{
      console.log("get_sys_login_log", res)
      var get_sys_login_log = res['result']['message'][0]
      console.log("get_sys_login_log", get_sys_login_log);
      if (get_sys_login_log["code"]===1){
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
    this.inttable(event);
  }

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
  

  // =================================================agGrid

}
