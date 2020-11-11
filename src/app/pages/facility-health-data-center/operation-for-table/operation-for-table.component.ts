import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
  selector: 'ngx-operation-for-table',
  templateUrl: './operation-for-table.component.html',
  styleUrls: ['./operation-for-table.component.scss']
})
export class OperationForTableComponent implements ViewCell, OnInit {
  @Output() save:EventEmitter<any> = new EventEmitter();
  value;
  @Input() rowData: any;

  constructor() { }

  ngOnInit(): void {
    console.log("操作：-----》", this.value)
  }

  // 确认
  confirm(){
    alert(JSON.stringify(this.rowData));
  }

}
