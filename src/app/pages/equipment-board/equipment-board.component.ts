import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';

@Component({
  selector: 'ngx-equipment-board',
  templateUrl: './equipment-board.component.html',
  styleUrls: ['./equipment-board.component.scss']
})
export class EquipmentBoardComponent implements OnInit {
  is_not_fullscreen = true; // 是否处于全屏

  title = '';//标题
  date = {
    year: 0,
    month: 0,
    day: 0,
    hours: 0,
    minute: 0,
    second: 0,
  };//时间
  dateInterval:any;//定时器

  constructor(private activateInfo:ActivatedRoute) { }

  ngOnInit(): void {
    this.creatDateInterval();
    this.activateInfo.queryParams.subscribe(f =>{
      console.log(f);
    })
    var isthis = this;
    //监听键盘 esc键
    document.onkeydown=function(event){
      var e = event || window.event || arguments.callee.caller.arguments[0];   
      if(e&& e.keyCode==27){
        console.log('关闭全屏')
        isthis.is_not_fullscreen = true;
      }
    }
  }

  //获取当前时间对象
  getDate(){
    var date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hours: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    }
  }

  //点击返回按钮
  return_btn_click(){
    
    console.log('返回上一级')
    window.history.go(-1);
  }

  //点击菜单
  menu_btn_click(){
    console.log('点击菜单')
  }

  //创建时间 定时
  creatDateInterval(){
    this.dateInterval = setInterval(f=>{
      this.date = this.getDate();
    },1000)
  }

  //组件销毁
  ngOnDestroy(){
    clearInterval(this.dateInterval);
  }

   // 全屏切换
   showAllTemplate(){
    var board = document.getElementById('equipment')
    // var board = document.getElementsByTagName('ngx-equipment-board')[0];
    var sf = <Screenfull>screenfull;
    if (sf.isEnabled){ // sf.isEnabled 布尔值，判断是否允许进入全屏！
      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board)
    }
  };

}
