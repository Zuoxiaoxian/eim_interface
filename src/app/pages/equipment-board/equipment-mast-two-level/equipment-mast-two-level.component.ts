import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../@core/utils';
import { colors } from '../equipment-board';
let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

declare var $:any;

declare var FlipClock:any;
let staic = require('../../../../assets/eimdoard/saic/staic-');


@Component({
  selector: 'ngx-equipment-mast-two-level',
  templateUrl: './equipment-mast-two-level.component.html',
  styleUrls: ['./equipment-mast-two-level.component.scss']
})
export class EquipmentMastTwoLevelComponent implements OnInit {


  //压力状态 饼
  data_chart_2 = [
    {name:'利用率',value:85.7},
    {name:'运行',value:71.4},
    {name:'1221',value:11},
    {name:'1121',value:2},

    {name:'3451',value:12},
    {name:'5671',value:11},
    {name:'6781',value:6}
  ]
  //试验信息
  testInformation = {
    name:'悬置Mastable多轴路谱耐久振动试验',//实验名字
    duration:'2020.10.9-2020.12.31',//实验时长
    headerData:[{t:'试验信息',s:{w:'30%'}},{t:'当前进度',s:{w:'70%'}}],
    tableBodyList: [
      ['项目信息',70]
    ]
  }
  //AS34-EP2 计划&进度
  data_chart_3 = {
    xData:['A', 'B', 'C', 'D', 'E', 'F'],//x轴数据
    data_1:[502.84, 205.97, 332.79, 281.55, 398.35, 214.02, ],//线条1
    title_1:'线1',
    data_2:[281.55, 398.35, 214.02, 179.55, 289.57, 356.14, ],//线条2
    title_2:'线2',

  }

  //运行状态
  runState = [
    {title:'运行',status:'run'},
    {title:'待机',status:'standby'},
    {title:'维护',status:'maintain'},
    {title:'维修',status:'repair'},
    {title:'限制',status:'limit'},
    {title:'空间',status:'idle'},
    {title:'其他',status:'other'},
  ]
  now_timer = {
    status:'run'
  };

  img = {
    backsrc:'assets/eimdoard/equipment/images/backgroud.png'
  }

  //颜色
  colors = {
    1:'rgb(0,176,80)',
    2:'rgb(0,176,80)',//墨绿
    3:'rgb(0,176,80)',
    4:'rgb(0,176,80)',
    5:'rgb(0,176,80)',
    6:'rgb(0,176,80)',
    7:'rgb(0,176,80)',
  }
  constructor(private layoutService:LayoutService) { }

  ngOnInit(): void {
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.initChart();
      console.log('------------------------')
      console.log(1231)
    })
    
    
    window.onresize = function() {
      let chart_1 = document.getElementById('chart_1');
      if(chart_1)echarts.init(chart_1).resize();
      let chart_2 = document.getElementById('chart_2');
      if(chart_2)echarts.init(chart_2).resize();
      let chart_3 = document.getElementById('chart_3');
      if(chart_3)echarts.init(chart_3).resize();
    }
  }

  //渲染页面完成后刷新图表高宽
  ngAfterViewInit(){
    setTimeout(() => {
      this.initChart();
      this.initBgClock();
      this.initClock('0','0');
    }, 1000);
  }

  initChart(){
    let chart_1 = document.getElementById('chart_1');
    if(chart_1)
    staic.create_device_circular(
            {title:'92.21%',message:''},echarts.init(chart_1));
    let chart_2 = document.getElementById('chart_2');
    if(chart_2)
      staic.create_pie({data:this.data_chart_2,color:colors},echarts.init(chart_2));

    let chart_3 = document.getElementById('chart_3');
      if(chart_3)
          staic.create_category(this.data_chart_3,echarts.init(chart_3));
  }

  //初始化背景图上的时间
  initBgClock(){
    var clock = new FlipClock($('#my-clock-1'), 0, {
      clockFace: 'DailyCounter'
    });
    this.setUlStyle('#my-clock-1')
  }

  //两个时间初始化
  initClock(clock_num,clock_2_num){
    //累计运行时长
    if(clock_num){
      var clock = new FlipClock($('#my-clock-2'), clock_num, {
        clockFace: 'DailyCounter'
      });
      this.setUlStyle('#my-clock-2');
    }
    //本次运行时长
    if(clock_2_num){
      var clock_2 = new FlipClock($('#my-clock-3'), clock_2_num, {
      clockFace: 'DailyCounter'
      });
      this.setUlStyle('#my-clock-3');
    }
  }

  //样式
  setUlStyle(name){
    var ul = $(name+' ul');
    for(let i = ul.length -1;i>=0;i--){
      ul[i].setAttribute('style','margin-right:'+((ul.length-i)%2 == 1?'6px;':'0px;'));
    }
    $(name+' .flip-clock-label').remove();
    $(name+' .days').remove();
  }


  getleft(item){
    return item > 40?item-20+'%':'20%';
  }

  get_height(){
    return this.testInformation.headerData.length <= 2?31*this.testInformation.headerData.length+'px':'120px';
  }

}
