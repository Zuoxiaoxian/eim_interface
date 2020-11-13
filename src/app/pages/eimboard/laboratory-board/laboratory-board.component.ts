import { Component, OnInit } from '@angular/core';
let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');
@Component({
  selector: 'ngx-laboratory-board',
  templateUrl: './laboratory-board.component.html',
  styleUrls: ['./laboratory-board.component.scss']
})
export class LaboratoryBoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    setTimeout(() => {
      this.initChart();
    }, 1000);
  }

  initChart(){
    let mychart = document.getElementById('chart_1');
    rtm3a.create_semicircle(parseInt((Math.random()*100).toString()),mychart);
  }

}
