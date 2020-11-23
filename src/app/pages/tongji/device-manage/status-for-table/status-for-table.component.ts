import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-status-for-table',
  templateUrl: './status-for-table.component.html',
  styleUrls: ['./status-for-table.component.scss']
})
export class StatusForTableComponent implements  OnInit {
  @Output() save:EventEmitter<any> = new EventEmitter();
  value;
  @Input() rowData: any;

  statusClass;

  constructor() { }

  ngOnInit(): void {
    // console.log("------------------------------", this.value);
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

}
