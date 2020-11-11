import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// my-echart
let first_level = require('../../../../assets/pages/device-inline/js/first-level');



// 全屏
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';

@Component({
  selector: 'ngx-first-level',
  templateUrl: './first-level.component.html',
  styleUrls: ['./first-level.component.scss']
})
export class FirstLevelComponent implements OnInit {

  is_not_fullscreen = true; // 是否处于全屏

  // 定时器
  currenttime_timer;

  constructor( private router: Router) { }

  ngOnInit(): void {
    // 关键指标
    first_level.key_index();
    // 设备开动率、完好lv
    first_level.device_rate(60);

    // map 地图
    first_level.chian_map();

    this.currenttime_timer = setInterval(this.currenttime, 1000);
    

  }

  ngOnDestroy(){
    clearInterval(this.currenttime_timer); // 销毁组件时，取消定时任务

  };

  // 返回首页
  gohome(){
    this.router.navigate(['/pages']);
  }

  // 全屏切换
  showAllTemplate(){
    const board = document.getElementById("rtmv2");
    const sf = <Screenfull>screenfull;
    if (sf.isEnabled){ // sf.isEnabled 布尔值，判断是否允许进入全屏！
      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board)
    }
  };

  // 时间展示
  currenttime(){
    var dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth() + 1;
    var day = dt.getDate();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();
    var CurrentTime = document.querySelector('.currenttime');
    CurrentTime.innerHTML = y + '-' + mt + '-' + day + '  ' + h + ':' + m + ':' + s;
  }


  // 点击设备开动率
  kaidong(){
    var kaidogn = document.getElementById('kaidogn');
    kaidogn.setAttribute("class", "span_active");
    var wanhao = document.getElementById('wanhao');
    wanhao.setAttribute("class", "span_noactive");

    // 设备开动率数据
    var data = 78
    first_level.device_rate(data);
  }
  // 点击设备完好率
  wanhao(){
    var wanhao = document.getElementById('wanhao');
    wanhao.setAttribute("class", "span_active");
    var kaidogn = document.getElementById('kaidogn');
    kaidogn.setAttribute("class", "span_noactive");
    // 设备完好率数据
    var data = 87
    first_level.device_rate(data);
  }

}
