import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'ngx-tran-active',
  templateUrl: './tran-active.component.html',
  styleUrls: ['./tran-active.component.scss']
})
export class TranActiveComponent implements OnInit, ICellRendererAngularComp {

  private params: any;

  active;
  constructor() { }

  ngOnInit(): void {
    // console.warn("----->this.params.node.data", this.params.node.data.active);
    var active_nu = this.params.node.data.active;
    switch (active_nu) {
      case 1:
        this.active = '是'
        break;
    
      default:
        this.active = '否'
        break;
    }
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

}
