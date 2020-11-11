import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';

@Component({
  selector: 'ngx-kpireport-link-fortable',
  templateUrl: './kpireport-link-fortable.component.html',
  styleUrls: ['./kpireport-link-fortable.component.scss']
})
export class KpireportLinkFortableComponent implements ViewCell, OnInit {
  @Output() save:EventEmitter<any> = new EventEmitter();
  value;
  @Input() rowData: any;

  constructor(private router: Router, private localstorage: LocalStorageService) { }

  ngOnInit(): void {
  }
  
  // 点击详情，跳转到详情界面
  gotodetail(){
    console.log("rowData: ", this.rowData)
    this.localstorage.set("kpi_for_detail", { name: "设备kpi报表", value: this.rowData });
    this.router.navigate(['/pages/tongji/kpidetail'])
  }

}
