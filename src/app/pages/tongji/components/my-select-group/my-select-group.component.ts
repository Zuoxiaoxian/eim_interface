import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-my-select-group',
  templateUrl: './my-select-group.component.html',
  styleUrls: ['./my-select-group.component.scss']
})
export class MySelectGroupComponent implements OnInit {

  @Input() selectdatas:any;
  
  // 选择的
  selectdata;
  constructor() { }

  ngOnInit(): void {
  }

  // 得到选择的数据
  getselect(){
    return this.selectdata;
  }

}
