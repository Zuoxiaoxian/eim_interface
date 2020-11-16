import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'ngx-task-progress-for-aggrid',
  templateUrl: './task-progress-for-aggrid.component.html',
  styleUrls: ['./task-progress-for-aggrid.component.scss']
})
export class TaskProgressForAggridComponent implements OnInit, ICellRendererAngularComp, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  }

  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public valueSquared(): Object {
    // this.params.value 为 cell 中的值
    // return this.params.value * this.params.value;
    var status = this.status(this.params.value)
    var value_status = {status: status, value: this.params.value};
    return value_status
  }

  ngOnDestroy() {
    // console.log(`Destroying SquareComponent`);
  }

  refresh(): boolean {
    return false;
  }

  // 由值改变颜色
  status(value) {
    if (value <= 25) {
      return 'danger';
    } else if (value <= 50) {
      return 'warning';
    } else if (value <= 75) {
      return 'info';
    } else {
      return 'success';
    }
  }


}
