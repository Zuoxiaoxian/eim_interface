import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

// my-echart
let second_level = require('../../../../assets/pages/device-inline/js/second-level');

@Component({
  selector: 'ngx-second-level',
  templateUrl: './second-level.component.html',
  styleUrls: ['./second-level.component.scss']
})
export class SecondLevelComponent implements OnInit {

  first_level;
  constructor(
    private localstorage:LocalStorageService,
  ) {
    // 得到从first-leve级传递的数据
    this.first_level = this.localstorage.get("first_level");
    console.log("得到从first-leve级传递的数据: ", this.first_level)
   }

  ngOnInit(): void {
    // 关键指标
    second_level.key_index();
    // 设备开动率、完好lv
    second_level.device_rate(70);

    // map 地图
    second_level.nibo_map();
  }

    // 点击设备开动率
    kaidong(){
      var kaidogn = document.getElementById('kaidogn');
      kaidogn.setAttribute("class", "span_active");
      var wanhao = document.getElementById('wanhao');
      wanhao.setAttribute("class", "span_noactive");
  
      // 设备开动率数据
      var data = 69
      second_level.device_rate(data);
    }
    // 点击设备完好率
    wanhao(){
      var wanhao = document.getElementById('wanhao');
      wanhao.setAttribute("class", "span_active");
      var kaidogn = document.getElementById('kaidogn');
      kaidogn.setAttribute("class", "span_noactive");
      // 设备完好率数据
      var data = 96
      second_level.device_rate(data);
    }

}
