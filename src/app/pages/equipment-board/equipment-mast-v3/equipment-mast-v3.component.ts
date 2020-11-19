import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LayoutService } from '../../../@core/utils';
import { colors } from '../equipment-board';

let staic = require('../../../../assets/eimdoard/saic/staic-');

declare var $:any;

declare var FlipClock:any;

@Component({
  selector: 'ngx-equipment-mast-v3',
  templateUrl: './equipment-mast-v3.component.html',
  styleUrls: ['./equipment-mast-v3.component.scss']
})
export class EquipmentMastV3Component implements OnInit {
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
    status:''
  };

  img = {
    centerSrc:'../../../../assets/eimdoard/equipment/images/center.png',
    jkSrc:'../../../../assets/eimdoard/equipment/images/jk.png',
  }

  //压力状态
  pressureState = [
    {title:'泄压',pressure:'high'},
    {title:'低压',pressure:'low'},
    {title:'高压',pressure:'release'}
  ]
  now_pressureState = {
    pressure:''
  };


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

  //信号监控
  signalMonitoring = [
    {top: '14%',left: '33%',value:1},//最上
    {top: '81%',left: '3%',value:1},//左1
    {top: '33%',left: '3%',value:1},//左2
    {top: '81%',left: '80%',value:1},//右1
    {top: '33%',left: '80%',value:2},//右2
  ]

  //AS34-EP2 计划&进度
  data_chart_3 = {
    xData:['A', 'B', 'C', 'D', 'E', 'F'],//x轴数据
    data_1:[502.84, 205.97, 332.79, 281.55, 398.35, 214.02, ],//线条1
    data_2:[281.55, 398.35, 214.02, 179.55, 289.57, 356.14, ],//线条2
  }
  //压力状态 表
  data_chart_2 = {
    utilizationRate:[85.7,100,100,100,100.01,100,100,100,100,100,1,1],//利用率
    move:[71.4,83,91.67,100,34.38,83.33,84.56,83.33,63.33,74.17,1,1],//运行
    ready:[14.3,17,8.33,0,65.63,16.67,15.44,16.67,36.67,25.83,1,1],//准备
  }
//压力状态 饼
  data_chart_1 = [
    // {name:'利用率',value:93.5+100+92.8+93.27+93.27+91.67+91.7+91.67+91.67+91.67+100+100+100},
    // {name:'2019 运行',value:93.5+100+92.8+93.27+93.27+91.67+91.7+91.67+91.67+91.67+100+100+100},
    // {name:'2019 准备',value:0},
    {name:'利用率',value:85.7},
    {name:'运行',value:71.4},
    {name:'1221',value:11},
    {name:'1121',value:2},

    {name:'3451',value:12},
    {name:'5671',value:11},
    {name:'6781',value:6}
  ]

  //设备介绍
  str = "Masttable动力总成多轴整栋实验在开发早期对<span class = 'font_big'>悬置系统、冷却模块系统</span>的耐久性能进行验证，相较短试"
  +"<span class = 'font_big font_yellow'>60%</span>的实验周期,为产品验证及数据发布提供支持,节省试验费用<span class = 'font_big font_yellow'>68</span>万元/项";

  //定时器
  timer:any;

  timer_1:any;
  constructor(private layoutService:LayoutService) { }



  ngOnInit(): void {
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.initChart();
      console.log('------------------------')
      console.log(1231)
    })
    
    this.clock('00000000', '00000000');
    
    window.onresize = function() {
      let chart_1 = document.getElementById('chart_1');
      if(chart_1)echarts.init(chart_1).resize();
      let chart_2 = document.getElementById('chart_2');
      if(chart_2)echarts.init(chart_2).resize();
      let chart_3 = document.getElementById('chart_3');
      if(chart_3)echarts.init(chart_3).resize();
      let chart_4 = document.getElementById('chart_4');
      if(chart_4)echarts.init(chart_4).resize();
      let chart_5 = document.getElementById('chart_5');
      if(chart_5)echarts.init(chart_5).resize();
    }
    
    this.get_runState();
    this.get_pressureState();
    //模拟运行状态切换
    this.timer_1 = setInterval(f=>{
      this.get_runState();
      this.get_pressureState();
    },10000)
    
  }

  //渲染页面完成后刷新图表高宽
  ngAfterViewInit(){
    setTimeout(() => {
      this.initChart();
    }, 1000);
  }

  initChart(){
    let chart_1 = document.getElementById('chart_1');
    if(chart_1)
      staic.create_pie({data:this.data_chart_1,color:colors},echarts.init(chart_1));
    let chart_2 = document.getElementById('chart_2');
    if(chart_2)
        staic.create_line_bar(this.data_chart_2,echarts.init(chart_2));
    let chart_3 = document.getElementById('chart_3');
    if(chart_3)
        staic.create_category(this.data_chart_3,echarts.init(chart_3));

    let data = [{
      title:'名字1',
      splitNumber:8,//有几个大刻度
      max:1000,//刻度最大值
      value:1000,//到达的值
      YS:[
        [0.4, '#119eff'],
        [0.5, '#30da74'],
        [1, '#f3390d']
    ],//是否显示刻度盘是否显示红色
    },{
      title:'名字1',
      splitNumber:8,//有几个大刻度
      max:1000,//刻度最大值
      value:1000,//到达的值
      YS:[
        [0.4, '#119eff'],
        [0.5, '#30da74'],
        [1, '#f3390d']
    ],//是否显示刻度盘是否显示红色
    },{
      title:'名字1',
      splitNumber:8,//有几个大刻度
      max:1000,//刻度最大值
      value:1000,//到达的值
      YS:[
        [0.4, '#119eff'],
        [0.5, '#30da74'],
        [1, '#f3390d']
    ],//是否显示刻度盘是否显示红色
    }]
    let chart_4 = document.getElementById('chart_4');
    if(chart_4)
      staic.create_gauge_pie_3(data,echarts.init(chart_4));

    let chart_5 = document.getElementById('chart_5');
    if(chart_5)
      staic.create_gauage_pie_2([
        {title:'温度',value:30,unit:'℃',dangerous:false}
        ,{title:'湿度',value:30,unit:'%',dangerous:false}]
        ,echarts.init(chart_5));

  }

  //获取运行时间
  get_runState(){
    //随机选中一个
    this.random_text_runState().subscribe(f=>{
      if(f.code == 1){
        this.change_mtsrun_states(f.message.status,f.message.totalruntime);
      }
    })
  }
  //运行状态改变
  change_mtsrun_states(status,totalruntime){
    this.now_timer.status = status;
    this.clock('00000000' , this.calculation_m(totalruntime));
  }

  //获取压力状态
  get_pressureState(){
    this.random_text_pressureState().subscribe(f=>{
      if(f.code == 1){
        this.change_hpu_pressure(f.message.pressure);
      }
    })
  }
  change_hpu_pressure(pressure) {
    this.now_pressureState.pressure = pressure;
  }


  //获取颜色
  getColor(i,j,item){
    var color;//颜色class
    switch (i) {
      case 0:
        color = j == 4 ?'dark_red':'';
        break;
      case 1:
        color = [2,4].includes(j) ?'red':'';
        break;
      case 2:
        color = j%2 == 0? 'green':'';
        break;
         
    }
    //当对应的颜色有值，但是不是当前压力状态变成灰色
    if(color && item.pressure != this.now_pressureState.pressure)color = 'gray';
    
    return color;

  }


  /**
   * 计算成秒
   * @param item 
   * @param totalruntime 
   */
  calculation_m(totalruntime){
    let num = 1;
    for(let key in totalruntime){
      num *= totalruntime[key];
    }
    return num
  }

  //两个时间初始化
  clock(clock_num,clock_2_num){
    //累计运行时长
    if(clock_num){
      var clock = new FlipClock($('#your-clock'), clock_num, {
        clockFace: 'DailyCounter'
      });
      this.setUlStyle('#your-clock');
    }
    //本次运行时长
    if(clock_2_num){
      var clock_2 = new FlipClock($('#your-clock-2'), clock_2_num, {
      clockFace: 'DailyCounter'
      });
      this.setUlStyle('#your-clock-2');
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

   //组件销毁  
   ngOnDestroy(){
     clearInterval(this.timer);
     clearInterval(this.timer_1)
   }

   //运行时间状态随机生成模拟
   random_text_runState(): Observable<any>{
    let totalruntime = {
      "day": 200,
      "hour": 20,
      "minute":5,
      "second":44
    }
    return new Observable(serve =>{
      //随机生成0-7对应下标
      let i = parseInt((Math.random()*7).toString())
      
      //随机生成日时分秒
      totalruntime.day =  parseInt((Math.random()*100).toString());
      totalruntime.hour =  parseInt((Math.random()*25).toString());
      totalruntime.minute =  parseInt((Math.random()*61).toString());
      totalruntime.second =  parseInt((Math.random()*61).toString());

      serve.next({code:1,message:{
        status:this.runState[i].status,
        totalruntime:totalruntime
      }})
      
    }).pipe(take(1))
   }

   //压力状态随机生成模拟
   random_text_pressureState(): Observable<any>{
    return new Observable(serve =>{
      let i = parseInt((Math.random()*3).toString())

      serve.next({code:1,message:{
        pressure:this.pressureState[i].pressure
      }})
      
    }).pipe(take(1))
   }

}
