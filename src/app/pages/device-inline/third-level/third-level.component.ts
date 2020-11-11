import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

// my-echart
let third_level = require('../../../../assets/pages/device-inline/js/third-level');

@Component({
  selector: 'ngx-third-level',
  templateUrl: './third-level.component.html',
  styleUrls: ['./third-level.component.scss']
})
export class ThirdLevelComponent implements OnInit {

  second_level;
  constructor(
    private localstorage:LocalStorageService,
  ) { 
    // 得到从secod-leve级传递的数据
    this.second_level = this.localstorage.get('second_level');
    console.log("得到从secod-leve级传递的数据: ", this.second_level)
  }

  ngOnInit(): void {
    // 关键指标
    third_level.key_index();
    // 设备开动率、完好lv
    third_level.device_rate(70);
  }

  // 点击设备开动率
  kaidong(){
    var kaidogn = document.getElementById('kaidogn');
    kaidogn.setAttribute("class", "span_active");
    var wanhao = document.getElementById('wanhao');
    wanhao.setAttribute("class", "span_noactive");

    // 设备开动率数据
    var data = 78
    third_level.device_rate(data);
  }
  // 点击设备完好率
  wanhao(){
    var wanhao = document.getElementById('wanhao');
    wanhao.setAttribute("class", "span_active");
    var kaidogn = document.getElementById('kaidogn');
    kaidogn.setAttribute("class", "span_noactive");
    // 设备完好率数据
    var data = 87
    third_level.device_rate(data);
  }

}
