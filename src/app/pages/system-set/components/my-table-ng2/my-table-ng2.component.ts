import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



import * as XLSX from 'xlsx';
@Component({
  selector: 'ngx-my-table-ng2',
  templateUrl: './my-table-ng2.component.html',
  styleUrls: ['./my-table-ng2.component.scss']
})
export class MyTableNg2Component implements OnInit {
  


  @Input() datas: any;
  @Input() pages: any;

  @Output() private outer = new EventEmitter<any>(); // 点击行
  @Output() private delrole = new EventEmitter<any>(); // 删除行
  @Output() private uprole = new EventEmitter<any>(); // 修改行
  @Output() private addrole = new EventEmitter<any>(); // 新增行
  @Output() private nzpageindexchange = new EventEmitter<any>(); // 分页
  @Output() private nzpagesizechange = new EventEmitter<any>(); // 分页  选中每页条数
  
  @Output() private pagechange = new EventEmitter<any>(); // 分页  选中每页条数



  // 导出文件名
  filename:string;

  requestPageCount = 10;     // 每次请求5页

  
  constructor() {
    
  }
  
  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(){

  }

  // 父组件调用
  change_count(count){
    console.log("父组件调用--得到总的数据", count);
  }

  // 删除！
  onDeleteConfirm(event): void {
    console.log("删除时执行===============",event)
    if (window.confirm('您是否要删除该角色?')) {
      this.delrole.emit(event);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  };

  // 这是编辑 确定时执行，得到数据
  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += '';
      this.uprole.emit(event)
      event.confirm.resolve(event.newData);
      console.log("&&&&&&&&&&&&&&&", event.newData)

    } else {
      event.confirm.reject();
    }            
  }


  // 创建时执行
  onCreateConfirm(event) {
    console.log("创建时执行===============",event)
    if (window.confirm('Are you sure you want to create?')) {
      // event.newData['name'] += ' + added in code';
      this.addrole.emit(event);
      event.confirm.resolve(event.newData);
      console.log("onCreateConfirm", event.newData);
      // switch(event.newData["videoServiceStatus"]){
      //   case '故障':
      //     event.newData["videoServiceStatus"] = "<div class='fault'><span>故障</span></div>"
      //     break;
      //   case '运行':
      //     event.newData["videoServiceStatus"] = "<div class='run'><span>运行</span></div>"
      //     break
      //   case '停止':
      //     event.newData["videoServiceStatus"] = "<div class='stop'><span>停止</span></div>"
      //     break
      //   case '维护':
      //     event.newData["videoServiceStatus"] = "<div class='assert'><span>维护</span></div>"
      //     break

      // }
    } else {
      event.confirm.reject();
    }
  }

  // 点击行数据
  userRowSelect(event){
    this.outer.emit(event);
  }

  rowSelect(event){
    alert(event)
  }



  // 在table组件中 导出函数
  download(title){
    this.filename = title + ".xlsx";
    console.log("csv名称----", this.filename);
    var columns = this.datas.settings['columns'];
    var table_header = [];
    var table_data = [];

    if (this.datas.source["data"].length != 0){
      for (let k in columns){
        if(k != "options"){ // 去掉 操作(options)选项
          table_header.push(columns[k]['title']);
        }
      }
      table_data.push(table_header);
      var data = this.datas.source["data"];
      console.log("导出数据>>>>>>>>", data)
      data.forEach(element => {
        var data_item = [];
        var keys = [];
        // 适用于用户管理
        // var keys = ["name", "loginname", "role_name", "role", "active", "employeeno", "email", "phoneno", "pictureurl", "department", "lastsignondate"]
        // 适用于用户组管理
        // var keys = ["group", "group_name", "createdon", "createdby", "active"];
        
        // 适用于角色管理
        // var keys = ["role_name", "role", "active", "createdby", "createdon", "lastupdatedby", "lastupdateon"];
        
        // 适用于安全日志
        // var keys = ["application", "source", "machinename", "info", "logintime"];
        
        switch (title) {
          case "用户管理":
            keys = ["name", "loginname", "role_name", "groups_name", "active", "employeeno", "email", "phoneno", "pictureurl", "department", "lastsignondate"];
            break;
          case "用户组管理":
            keys = ["group", "group_name", "createdon", "createdby", "active"]
            break;
          case "角色管理":
            keys = ["role_name", "role", "active", "createdby", "createdon", "lastupdatedby", "lastupdateon"];
            break;
          case "安全日志":
            keys = ["application", "source", "machinename", "info", "logintime"];
            break;
          default:
            break;
        }

        if (keys != []){
          console.log("key 部位null")
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
      
    }else{
      var data = this.datas.source["data"];
      
      for (let k in columns){
        if(k != "options"){ // 去掉 操作(options)选项
          table_header.push(columns[k]['title']);
        }
      }
      table_data.push(table_header);
      data.forEach(element => {
        var data_item = [];
        for (let d in element){
          data_item.push(element[d]);
        }
        table_data.push(data_item);
      })
    }
    console.log("table_data=====", table_data);
    this.export(table_data);


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

  // 页面更改事件  
  pageChange(event) {
    // 总页数, 默认每页10条数据
    // let totalPages = Math.ceil(this.datas.source['data'].length / this.datas.settings.pager.perPage);
    let totalPages = Math.ceil(this.datas.source['data'].length / this.datas.source['pagingConf']['perPage']);
    // let totalPages = Math.ceil(this.allitem / this.datas.source['pagingConf']['perPage']);
    // 当前页数
    let currentPage = this.datas.source['pagingConf']['page'];
    // 判断是否触发请求
    if (currentPage + 1 >= totalPages) {
      // 构造请求参数
      const offset = this.datas.source['data'].length;
      const limit = this.requestPageCount * this.datas.settings.pager.perPage;

      this.pagechange.emit({offset: offset, limit: limit, totalpages: totalPages});
      console.warn("offset, limit", offset,limit);
      console.warn(totalPages, currentPage, "111111111111111111");
    }
    console.warn(event, this.datas);
    console.warn(totalPages, currentPage, "===============");
  }




}
