import { Component, OnInit, Input, ViewChild,Output, EventEmitter } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';


import { EditDelTooltipComponent } from '../../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';

import * as XLSX from 'xlsx';
import { NbDialogService } from '@nebular/theme';
import { UserInfoService } from '../../../../services/user-info/user-info.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';


interface Data {
  action: boolean,
  columnDefs: any, // 列字段
  rowData: any // 行数据
}

@Component({
  selector: 'ngx-ag-table',
  templateUrl: './ag-table.component.html',
  styleUrls: ['./ag-table.component.scss']
})
export class AgTableComponent implements OnInit {
  @Input("tableDatas") tableDatas:any;

  @ViewChild('agGrid') agGrid: AgGridAngular;   // 实例在组件可访问
  @Output() private nzpageindexchange = new EventEmitter<any>(); // 分页
  @Output() private clickrow = new EventEmitter<any>(); // 分页
  @Input() private updategetemployee:any;


  gridApi;
  gridColumnApi;
  paginationPageSize; // 每页多少条数
  paginationNumberFormatter;   // 设置每页展示条数
  suppressScrollOnNewData = true; // 更改时网格不要滚动到顶部
  suppressPaginationPanel = true; // 隐藏用于导航的默认ag-Grid控件 即隐藏自带的分页组件
  suppressRowClickSelection = false; // true 则单击行时将不会发生行选择 仅在需要复选框选择时使用

  context; // 和渲染的组件 数据交互！

  getRowNodeId; // 得到rowNodeId
  defaultColDef;
  

  rowSelection; // 选中行
  frameworkComponents; // 表格渲染组件！

  // 分页
  current = 1;  // 当前页
  totalPageNumbers=10;  // 总数据条数
  setPageCount = 10;     // 默认每页10条数据
  private requestPageCount = 5; // 每次请求的数目

  selectedRows = [];     // 行选择数据

  is_filter_data = false;  // 是否是搜索的数据

  columnDefs; // 列字段
  rowData; // 行数据
  action; // 是否操作
  alltotalPageNumbers; // 这是 从数据库得到的总的条数！

  constructor(private dialogService: NbDialogService, private userinfo: UserInfoService, private publicservice: PublicmethodService) { 
  }
  
  // action = { field: 'action', headerName: '操作', cellRendererFramework: AgGridActionComponent, pinned: 'right'};
  // action = { field: 'action', headerName: '操作', cellRendererFramework: AgGridActionComponent, pinned: 'right'};
  // action = { field: 'action', headerName: '操作', cellRenderer: 'agGridActionComponent', pinned: 'right'};
  
  ngOnInit(): void {
    // this.gridOptions();
    console.log("agGrid========================", this.agGrid)
  }
  

  ngAfterViewInit(){

    
    // setTimeout(() => {
    // }, 1000);
    
  }
  
  // ---------------
  gridOptions(employee_agGrid){
    this.columnDefs =  employee_agGrid["columnDefs"]// 列字段
    this.rowData =  employee_agGrid["rowData"]; // 行数据
    this.action =  employee_agGrid["action"]; // 是否操作
    this.alltotalPageNumbers = employee_agGrid["totalPageNumbers"]; // 数据库中的总条数
    this.defaultColDef = { // 默认的列设置
      // flex: 1,
      editable: true,
      // sortable: true,
      // filter: true,
    };
    this.getRowNodeId = function(data){
      return data.id
    };

    this.context = { componentParent: this };

    

    this.paginationPageSize = 10;
    this.rowSelection = 'multiple';

    
    console.log("*****************************************vtableDatas")
    console.log("***************************************** tableDatas", employee_agGrid)
    console.log("*****************************************tableDatas");

    if (this.action){
      console.log("action===========222222222222222========", this.action);
      console.log("this.tableDatas.columnDefs======this.tableDatas.columnDefs", this.columnDefs, "index: ");
      // this.tableDatas.columnDefs.push(this.action)
      // 表示具有操作功能
      // this.frameworkComponents = {
      //   // agGridActionComponent: AgGridActionComponent
      //   countryCellRenderer: this.tableDatas.action_action
      // }
    }
    // this.rowData = this.tableDatas.rowData;
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    console.log("^^^^^^^^^^^^^^this.rowData^^^^^^^^^^^^^^",this.rowData)
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    this.totalPageNumbers = this.rowData.length
    // this.columnDefs = this.columnDefs;
    console.log("------------------->>>>>>>>>>>>>>>>>>>>",this.columnDefs)

    console.log("tableDatas===================", this.tableDatas)
  };

  


  // 分页！
  onPaginationChanged(event) {
    console.warn("onPaginationChanged>>", event);
  }

  

  // 点击行数据
  onRowClicked(event) {
    console.log("点击行数据",event);
    this.clickrow.emit(event)
  }
  

  // 页码改变的回调
  pageIndexChange(event) {
    
    // 页面跳转
    this.gridApi.paginationGoToPage(event - 1);

    // 总页数
    let totalPages = this.totalPageNumbers / this.setPageCount;
    // 当前页数
    let currentPage = event - 1;
    // 判断是否触发请求
    if (currentPage + 1 >= totalPages) {
      // 构造请求参数
      const offset = this.totalPageNumbers;
      // 每次请求的条数 * 每页的条数
      const limit = this.requestPageCount * this.setPageCount;
      // this.get_interface_cockpit(limit, offset);
      console.log("页码改变的回调 offset  limit", offset, limit);
      this.nzpageindexchange.emit({offset: offset, limit: limit})
    }
  }

  // 每页条数改变的回调
  pageSizeChange(event) {
    console.log("ag-table.component.ts==pageSizeChange", event)
    console.warn("pageSizeChange 每页条数改变的回调>>", event);
    // 更新每页展示条数
    this.setPageCount = event;
    this.gridApi.paginationSetPageSize(Number(event));
  }

  // onPageSizeChanged()
  onPageSizeChanged(){
    this.setPageCount = this.paginationPageSize
    console.log("----------------\nonPageSizeChanged---\n", this.paginationPageSize)
    this.gridApi.paginationSetPageSize(Number(this.paginationPageSize));
  }

  // 选中行数
  onSelectionChanged(event) {
    this.selectedRows = this.gridApi.getSelectedRows();
    console.warn(this.selectedRows);
  }

  // 父组件调用，得到选中的数据
  getselectedrows(){
    return this.selectedRows;
  }

  // 过滤器已修改，但未应用。当过滤器具有“应用”按钮时使用。
  onfilterModified(event) {
    this.totalPageNumbers = this.gridApi.getModel().rootNode.childrenAfterFilter.length;
    this.is_filter_data = this.totalPageNumbers === this.tableDatas.rowData.length ? false : true;
  }




  // 得到选中的数据！
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    const selectedDataStringPresentation = selectedData.map(node => node.name + ' ' + node.loginname).join(', ');
    console.log("得到选中的数据！", )
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  //************************************************  导入信息



  // 导出文件名
  filename;

  // 导出功能
  download(title){
    // 修改为导出的是，选中的行数据！ this.selectedRows = this.gridApi.getSelectedRows();
    this.filename = title + ".xlsx";
    console.log("csv名称----", this.filename);
    console.log("this.columnDefs----", this.columnDefs);
    var columns = this.columnDefs;
    var table_header = [];
    var table_data = [];

    
    var keys = [];
    for (let k of columns){ // columns []
      if(k["field"] != "action" && k["field"] != 'option'){ // 去掉 操作(options)选项
        if(k["children"]){
          var childrens = k["children"];
          childrens.forEach(children => {
            table_header.push(children['headerName']);
            keys.push(children["field"]);
          });
        }else{
          table_header.push(k['headerName']);
          keys.push(k["field"]);
        }
      }
    }
    
    if (this.selectedRows.length != 0){
      
      console.log("table_header----", table_header);
      table_data.push(table_header);
      // var data = this.rowData;
      var data = this.selectedRows;
      data.forEach(element => {
        var data_item = [];
        // var keys = [];
        // 适用于用户管理
        // var keys = ["name", "loginname", "role_name", "role", "active", "employeeno", "email", "phoneno", "pictureurl", "department", "lastsignondate"]
        // 适用于用户组管理
        // var keys = ["group", "group_name", "createdon", "createdby", "active"];
        
        // 适用于角色管理
        // var keys = ["role_name", "role", "active", "createdby", "createdon", "lastupdatedby", "lastupdateon"];
        
        // 适用于安全日志
        // var keys = ["application", "source", "machinename", "info", "logintime"];
        
        // switch (title) {
        //   case "用户管理":
        //     keys = ["name", "loginname", "role_name", "groups_name", "active", "employeeno", "email", "department", "lastsignondate"];
        //     break;
        //   case "用户组管理":
        //     keys = ["group", "group_name", "createdon", "createdby", "active"]
        //     break;
        //   case "角色管理":
        //     keys = ["role_name", "role", "active", "createdby", "createdon", "lastupdatedby", "lastupdateon"];
        //     break;
        //   case "安全日志":
        //     keys = ["source", "employeeid", "info", "createdby"];
        //     break;
        //   case "操作日志":
        //     keys = ["employeeid", "result", "transactiontype", "info", "createdby"];
        //     break;
        //   default:
        //     break;
        // }

        if (keys != []){
          for (let k of keys){
            data_item.push(element[k]);
          }
        }else{
          for (let k in element){
            data_item.push(element[k]);
          }
        }
        

        table_data.push(data_item);
      });
      this.export(table_data);
      
    }else{
      
      table_data.push(table_header);
      // 没有选择导出的数据
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `请选择要导出的数据！\n 确定 则继续导出`,rowData: JSON.stringify(true)}} ).onClose.subscribe(
        name=>{
          if(name){
            this.export(table_data);
            this.RecordOperation("导出"+title, 1, "导出excel表格");
          }
  
        }
      );
    }
  }

  // -----------------------将data写入workbook中-----------------------------
  async export(datas) {
    const wb: XLSX.WorkBook = this.write(datas);
    // const filename: string = "SheetJSIonic.xlsx"; // 导出的文件名！
    /* save to file */
    XLSX.writeFile(wb, this.filename);
  };

  // -----------------------创建worksheet和workbook-----------------------------
  write(datas): XLSX.WorkBook {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datas);
    
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    return wb;
  };



  // 父组件调用，告诉该组件数值改变了！
  update_agGrid(tableDatas){
    this.rowData = tableDatas.rowData;
    console.log("父组件调用，告诉该组件数值改变了！=========",tableDatas)
    console.log("父组件调用，告诉该组件数值改变了！=========this.rowData",this.rowData)
    // 刷新
    
    // this.agGrid.api.setRowData(rowData);
    this.totalPageNumbers = tableDatas.rowData.length;
    this.alltotalPageNumbers = tableDatas.totalPageNumbers; // 数据库中的总条数
    this.gridApi.setRowData(this.rowData);
  }

  // 父组件调用！ 填充表格
  init_agGrid(employee_agGrid){
    console.log("初始化-------父组件调用！ 填充表格=======", employee_agGrid)
    this.gridOptions(employee_agGrid);
  }

  // onGridReady
  onGridReady(params) {
    console.warn("params>>", params);

    console.warn(params);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  // ============================== 渲染组件\和他的父组件都  调用的方法 这是ag-grid中的 操作！
  // methodFromParent(rowdata){ // parent： 是否是父组件调用！
    
  //   // {value: name, action: "edit"}
  //   var action = rowdata.action;
  //   var value = rowdata.value;
  //   switch (action) {
      
  //     case "edit":
  //       console.log("edit--------------》》》》》》》》》》》》》》》》》》》》》》》",action, value);
  //       // this.children_call_for_updata_table(); // 调用父组件，没用到
  //       // true 表示编辑、删除成功
  //       // var rowNode  = this.gridApi.getRowNode(String(cell.id));
  //       // rowNode.setData(cell); // Cannot read property 'setData' of undefined 未能解决
  //       this.rowData.forEach(row => {
  //         // 用户组管理
  //         if (row.id === value.id && row.id){
  //           var row_index = this.rowData.indexOf(row);
  //           value.active = value.active === 1 || value.active === true|| value.active === "是"? "是": "否";
  //           this.rowData[row_index] = value
  //         }
  //         // 用户管理
  //         if (row.employeeid === value.employeeid && row.employeeid){
  //           var row_index = this.rowData.indexOf(row);
  //           value.active = value.active === 1 || value.active === true|| value.active === "是"? "是": "否";
  //           this.rowData[row_index] = value
  //         }
  //         // 角色管理 roleid
  //         if (row.roleid === value.roleid && row.roleid){
  //           var row_index = this.rowData.indexOf(row);
  //           value.active = value.active === 1 || value.active === true|| value.active === "是"? "是": "否";
  //           this.rowData[row_index] = value;

            
  //         }

  //       });
    
  //       this.totalPageNumbers = this.rowData.length
  //       this.gridApi.setRowData(this.rowData);
  //       // 清空选择的！
  //       this.selectedRows = [];
        
        
  //       break;
  //     case "remove":
  //       console.log("remove--------------》》》》》》》》》》》》》》》》》》》》》》》",action, value);
  //       this.rowData.forEach(row => {
  //         // 用户组管理
  //         if (row.id === value.id && row.id){
  //           // console.log("remove--------------row》》》》》》》》》》》》》》》》》》》》》》》",row);
  //           var row_index = this.rowData.indexOf(row);
  //           this.rowData.splice(row_index, 1);
  //           var operationdata = "组名称:" + value["group"] + "," + "组名称(en):" + value["group_name"];
  //           var option = '删除用户组'; 
  //           this.RecordOperation(option, 1, operationdata);
  //           this.alltotalPageNumbers = this.alltotalPageNumbers -1;
  //         }
  //         // 用户管理
  //         if (row.employeeid === value.employeeid && row.employeeid){
  //           var row_index = this.rowData.indexOf(row);
  //           this.rowData.splice(row_index, 1);
  //           var operationdata = "姓名:" + value["name"] + "," + "域账号:" + value["loginname"];
  //           var option = '删除用户'; 
  //           this.RecordOperation(option, 1, operationdata);
  //           this.alltotalPageNumbers = this.alltotalPageNumbers -1;
  //         }
  //         // 角色管理 roleid
  //         if (row.roleid === value.roleid && row.roleid){
  //           var row_index = this.rowData.indexOf(row);
  //           this.rowData.splice(row_index, 1);
  //           var operationdata = "姓名:" + value["name"] + "," + "域账号:" + value["loginname"];
  //           var option = '删除角色';
  //           var operationdata = '角色名称(en):' + value["role"] + ',' + '角色名称:' + value["role_name"];
  //           this.RecordOperation(option, 1, operationdata);
  //           this.alltotalPageNumbers = this.alltotalPageNumbers -1;
  //         }
  //       });
  //       this.totalPageNumbers = this.rowData.length
  //       this.gridApi.setRowData(this.rowData)
  //       break;
  //     case "add":
  //       console.log("--------------》》》》》》》》》》》》》》》》》》》》》》》",action, value);
  //       // value.active = value.active === 1?"是":"否";
  //       this.rowData = value
  //       this.totalPageNumbers = this.rowData.length
  //       this.gridApi.setRowData(this.rowData);
  //       this.alltotalPageNumbers = this.alltotalPageNumbers +1;
  //       break;

  //   };

    
    
 
  // };

  



  // ============================== 渲染组件调用的方法
  

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
