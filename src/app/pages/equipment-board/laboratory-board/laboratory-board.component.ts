import { Component, OnInit } from '@angular/core';
let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');
@Component({
  selector: 'ngx-laboratory-board',
  templateUrl: './laboratory-board.component.html',
  styleUrls: ['./laboratory-board.component.scss']
})
export class LaboratoryBoardComponent implements OnInit {

  timer;
  constructor() { }

  ngOnInit(): void {
    if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = '实验室布局';
    setTimeout(() => {
      // this.initChart();
    }, 1000);
    this.timer = setInterval(f =>{
      this.initChart();
    },1000)
  }

  initChart(){
    let mychart = document.getElementById('chart_1');
    mychart = echarts.init(mychart)
    rtm3a.create_semicircle(parseInt((Math.random()*100).toString()),mychart);
  }

  //组件销毁
  ngOnDestroy(){
    clearInterval(this.timer)
  }

}
