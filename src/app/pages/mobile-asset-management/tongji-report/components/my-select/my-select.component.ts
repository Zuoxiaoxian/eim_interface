import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-my-select',
  templateUrl: './my-select.component.html',
  styleUrls: ['./my-select.component.scss']
})
export class MySelectComponent implements OnInit {
  @Input() selectdatas:any;



  // 选择的数据
  selectdata;

  constructor() { }

  ngOnInit(): void {
  }

  // 得到选择的数据
  getselect(){
    return this.selectdata;
  }

}
