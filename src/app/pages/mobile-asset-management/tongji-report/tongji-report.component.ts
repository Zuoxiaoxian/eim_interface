import { Component, OnInit } from '@angular/core';

import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-tongji-report',
  templateUrl: './tongji-report.component.html',
  styleUrls: ['./tongji-report.component.scss']
})
export class TongjiReportComponent implements OnInit {

  items: NbMenuItem[] = [
    {
      title: "行驶报表",
      link: "/pages/mobile-gps/tongji-report/xingshi"
    },
    {
      title: "报警报表",
      link: "/pages/mobile-gps/tongji-report/baojing"
    },
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
