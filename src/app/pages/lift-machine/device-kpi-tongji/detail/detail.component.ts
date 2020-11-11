import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements ViewCell, OnInit {
  @Output() save:EventEmitter<any> = new EventEmitter();
  value;
  @Input() rowData: any;

  constructor() { }

  ngOnInit(): void {
    // console.log("详情：-----》", this.value)
  }

  // 详情！
  getodetail(){
    alert("详情！")
  }

}
