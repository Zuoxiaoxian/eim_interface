import { Component, OnInit } from '@angular/core';

import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-gps-module-manage',
  templateUrl: './gps-module-manage.component.html',
  styleUrls: ['./gps-module-manage.component.scss']
})
export class GpsModuleManageComponent implements OnInit {

  items: NbMenuItem[] = [
    {
      title: "资产管理",
      link: "/pages/mobile-gps/gpsmodule-manage/assets",
      pathMatch: 'prefix',
    },
    {
      title: "充电管理",
      link: "/pages/mobile-gps/gpsmodule-manage/power"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
