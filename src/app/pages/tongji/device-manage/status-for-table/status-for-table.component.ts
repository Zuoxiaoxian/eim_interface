import { Component, OnInit} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'ngx-status-for-table',
  templateUrl: './status-for-table.component.html',
  styleUrls: ['./status-for-table.component.scss']
})
export class StatusForTableComponent implements  OnInit,ICellRendererAngularComp {

  private params: any;

  value;
  statusClass;

  constructor() { }

  ngOnInit(): void {
    this.value = this.params.node.data.active;
    console.log("------------------------------", this.value);
    switch (this.value) {
      case '停用':
        this.statusClass = 'stop';
        break;
      case '闲置':
        this.statusClass = 'assert';
        break;
      case '封存':
        this.statusClass = 'fault';
        break;
      case '在用':
        this.statusClass = 'run';
        break;
      default:
        this.statusClass = 'other';
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
