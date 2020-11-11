import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

// 全屏
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';

@Component({
  selector: 'ngx-device-inline',
  templateUrl: './device-inline.component.html',
  styleUrls: ['./device-inline.component.scss']
})
export class DeviceInlineComponent implements OnInit {
  is_not_fullscreen = true; // 是否处于全屏

  constructor(
    private router: Router,
  ) { }

  // 定时器
  currenttime_timer;
  ngOnInit(): void {
    // this.currenttime_timer = setInterval(this.currenttime, 1000);
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
    CurrentTime.innerHTML = '当前时间：' + y + '年' + mt + '月' + day + '-' + h + '时' + m + '分' + s + '秒';
  }

  // 返回首页
  gohome(){
    this.router.navigate(['/pages']);
  }

  ngOnDestroy(){
    clearInterval(this.currenttime_timer); // 销毁组件时，取消定时任务

  };



}
