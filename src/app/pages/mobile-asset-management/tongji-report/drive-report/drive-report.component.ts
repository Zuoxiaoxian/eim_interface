import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-drive-report',
  templateUrl: './drive-report.component.html',
  styleUrls: ['./drive-report.component.scss']
})
export class DriveReportComponent implements OnInit {

  @ViewChild("device_datas") device_datas:any;
  @ViewChild("daterange") daterange:any;

  // 下拉框---设备类型
  deviceDatas = {
    placeholder: "请选择设备类型",
    name: '设备类型',
    datas: [
      { name: 'GT-2030-123' },
      { name: 'GT-2030-149' },
      { name: 'GT-2030-230' },
      { name: 'GT-2030-359' },
      { name: 'GT-2030-666' },
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

  // 搜索按钮
  query(){
    var device_datas = this.device_datas.getselect();
    var daterange_data = this.daterange.getselect()
    console.log("<------------搜索----------->", device_datas, daterange_data);
 
  }


  // 导出
  download(title){
    // this.mytable.download(title);
  }

}
