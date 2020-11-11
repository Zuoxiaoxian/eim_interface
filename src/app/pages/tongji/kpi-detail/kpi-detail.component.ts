import { Component, OnInit } from '@angular/core';


let kpi_detail = require("../../../../assets/pages/system-set/js/kpi_detail")
@Component({
  selector: 'ngx-kpi-detail',
  templateUrl: './kpi-detail.component.html',
  styleUrls: ['./kpi-detail.component.scss']
})
export class KpiDetailComponent implements OnInit {

  // 得到出入的数据 kpi_for_detail
  kpi_for_detail;
  constructor( ) {
    this.kpi_for_detail = JSON.parse(localStorage.getItem("kpi_for_detail"));
   }

  ngOnInit(): void {
    console.log("kpi_detail----", this.kpi_for_detail);

    // 这是 左侧第一个柱状图
    kpi_detail.left_one('.left-one');
    
    // 这是 右侧第一个饼图 right-one
    kpi_detail.right_one('.right-one');
    
    // 这是 右侧第一个饼图 left_two
    kpi_detail.left_two('.left-two');

  }

}
