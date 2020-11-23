import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'ngx-task-progress-for-table',
  templateUrl: './task-progress-for-table.component.html',
  styleUrls: ['./task-progress-for-table.component.scss']
})
export class TaskProgressForTableComponent implements  OnInit {
  @Output() save:EventEmitter<any> = new EventEmitter();
  value;
  @Input() rowData: any;

  constructor() { }

  ngOnInit(): void {
    console.log("任务进度：-----》", this.value)
  }


  // 由值改变颜色
  get status() {
    if (this.value <= 25) {
      return 'danger';
    } else if (this.value <= 50) {
      return 'warning';
    } else if (this.value <= 75) {
      return 'info';
    } else {
      return 'success';
    }
  }
  

}
