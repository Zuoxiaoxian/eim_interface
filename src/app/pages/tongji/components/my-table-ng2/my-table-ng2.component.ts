import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



import * as XLSX from 'xlsx';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
type AOA = any[][];

@Component({
  selector: 'ngx-my-table-ng2',
  templateUrl: './my-table-ng2.component.html',
  styleUrls: ['./my-table-ng2.component.scss']
})
export class MyTableNg2Component implements OnInit {

  @Input() datas: any;

  @Output() private outer = new EventEmitter<any>(); // 点击行
  @Output() private del = new EventEmitter<any>(); // 删除行
  @Output() private edit = new EventEmitter<any>(); // 修改行
  @Output() private add = new EventEmitter<any>(); // 新增行
  @Output() private nzpageindexchange = new EventEmitter<any>(); // 分页





  // 导出文件名
  filename:string;
  requestPageCount = 2;     // 每次请求5页

  

  constructor(private http: HttpserviceService) {
  }
      
  current = 1; // 当前页码
  nzTotal // 总页数
  nzPageSize; // 每一页多少条数据
  ngOnInit(): void {
    this.nzPageSize = this.datas.settings.pager.perPage
    this.init_table()
  }

  // 初始化table数据--测试
  init_table(){
    this.http.callRPC("emeployee", "get_employee_limit", {"offset":0,"limit":10}).subscribe(res=>{
      var data = res["result"]["message"][0]
      console.log("res", data);
      this.nzTotal = data.length * 200;
    }

    )
  }


  

  
  // 点击行数据
  userRowSelect(event){
    this.outer.emit(event);
  }

  rowSelect(event){
    alert(event)
  }


  // 删除！
  onDeleteConfirm(event): void {
    console.log("删除时执行===============",event)
    if (window.confirm('Are you sure you want to delete?')) {
      this.del.emit(event);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  };

  // 这是编辑 确定时执行，得到数据
  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += '';
      this.edit.emit(event);
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
      event.confirm.resolve(event.newData);
      console.log("onCreateConfirm", event.newData)
    } else {
      event.confirm.reject();
    }
  }



  // 在table组件中 导出函数
  download(title){
    this.filename = title + ".xlsx";
    var columns = this.datas.settings['columns'];
    var table_header = [];
    var table_data = [];

    if (this.datas.source["data"].length != 0){
      for (let k in columns){
        if (k != 'options' && k != 'id' && k != 'reportDetail'){ // 去掉 option(操作)项， 设备kpi： id项、reportDetail项
          table_header.push(columns[k]['title']);
        }
      }
      table_data.push(table_header);
      var data = this.datas.source["data"];
      console.log("data===============", data);
      console.log("columns===============", columns);

      data.forEach(element => {
        var data_item = [];
        for (let k in columns){
          if (k != 'id' && k != 'reportDetail'){  // 去掉id项, 设备kpi： id项、reportDetail项
            data_item.push(element[k]);
          }
        }
        table_data.push(data_item);
      });
      
    }else{
      var data = this.datas.source["data"];

      for (let k in columns){
        table_header.push(columns[k]['title']);
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
    console.log("点击页数！")
    // 总页数, 默认每页10条数据
    let totalPages = Math.ceil(this.datas.source["data"].length / this.datas.settings.pager.perPage);
    // 当前页数
    let currentPage = this.datas.source['pagingConf']['page'];
    console.warn("总页数、当前页数", totalPages, currentPage);
    // 判断是否触发请求
    if (currentPage + 1 >= totalPages) {
      // 构造请求参数
      const offset = this.datas.source["data"].length;
      const limit = this.requestPageCount * this.datas.settings.pager.perPage;
      // this.getRoleSource(limit, offset);
      console.warn("offset, limit", offset, limit);
    }
    console.warn(event, this.datas);
    console.warn(totalPages, currentPage);
  }

  

  

}
