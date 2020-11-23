import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements  OnInit {
  @Output() save:EventEmitter<any> = new EventEmitter();
  value;
  icon_class; 
  @Input() rowData: any;

  constructor() { }

  ngOnInit(): void {
    // console.log("状态：-----》", this.value);

    this.icon_class = this.value_icon[this.value];

  }

  value_icon = {
    // span标签的class
    // '故障': "iconfont iconshixinyuanxing1",
    // '警告': "iconfont iconshixingyuan",
    // '完成': "iconfont iconshixingyuanxing",
    // '进行中': "iconfont iconcircle-1",
    // '停止': "iconfont iconshixinyuan1",

    '故障': "#iconshixinyuanxing1",
    '警告': "#iconshixinyuan",
    '完成': "#iconshixinyuanxing",
    '进行中': "#iconcircle-1",
    '停止': "#iconshixinyuan1",
  }
  

}
