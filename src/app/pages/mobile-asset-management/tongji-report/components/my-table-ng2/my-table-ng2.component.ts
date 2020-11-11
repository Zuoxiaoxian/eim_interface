import { Component, OnInit, Input } from '@angular/core';

import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'ngx-my-table-ng2',
  templateUrl: './my-table-ng2.component.html',
  styleUrls: ['./my-table-ng2.component.scss']
})
export class MyTableNg2Component implements OnInit {

  @Input() datas: any;

  // 导出文件名
  filename:string;

  requestPageCount = 5;     // 每次请求5页
  
  constructor() { }

  ngOnInit(): void {
  }

  // 删除！
  onDeleteConfirm(event): void {
    console.log("删除时执行===============",event)
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  };

  // 这是编辑 确定时执行，得到数据
  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += '';
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
        table_header.push(columns[k]['title']);
      }
      table_data.push(table_header);
      var data = this.datas.source["data"];
      data.forEach(element => {
        var data_item = [];
        for (let k in element){
          data_item.push(element[k]);
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
