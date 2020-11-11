import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
  selector: 'ngx-alert-grade-for-table',
  templateUrl: './alert-grade-for-table.component.html',
  styleUrls: ['./alert-grade-for-table.component.scss']
})
export class AlertGradeForTableComponent implements ViewCell, OnInit {
  @Output() save:EventEmitter<any> = new EventEmitter();
  value;
  @Input() rowData: any;


  // 报警等级状态
  alert = false;
  common = false;
  severityAlert = false;

  constructor() { }

  ngOnInit(): void {
    // console.log("报警等级：-----》", this.value);
    switch (this.value) {
      case "严重报警":
        this.severityAlert = true;
        break;
      case "报警":
        this.alert = true;
        break;
      default:
        this.common = true;
        break;
    }
  }


}
