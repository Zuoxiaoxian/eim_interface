import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-total-time',
  templateUrl: './total-time.component.html',
  styleUrls: ['./total-time.component.scss']
})
export class TotalTimeComponent implements ViewCell, OnInit {
  @Output() save:EventEmitter<any> = new EventEmitter();
  value;
  @Input() rowData: any;

  constructor() { }

  ngOnInit(): void {
    // console.log("累计作业时长：-----》", this.value)
  }

  // 详情！
  getodetail(){
    alert("详情！")
  }

}
