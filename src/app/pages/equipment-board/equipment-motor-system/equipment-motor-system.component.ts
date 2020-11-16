import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../@core/utils/layout.service';
import { colors, rgb_del_red,list_jion,list_copy,create_third_chart_line } from '../equipment-board';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road')
let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');

let rtm3 = require('../../../../assets/eimdoard/rtm3/js/rtm3');


@Component({
  selector: 'ngx-equipment-motor-system',
  templateUrl: './equipment-motor-system.component.html',
  styleUrls: ['./equipment-motor-system.component.scss']
})
export class EquipmentMotorSystemComponent implements OnInit {
  attrs =[{ 
    name: "参数1",nameEn: "param1", unit: "V",value: [],show:true,dashboardShow:true
    ,color:["#00FF00", "#00FF00"]
  },{ 
      name: "参数2",nameEn: "param2", unit: "V",value: [],
      color:["#ff00ff", "#ff00ff"],dashboardShow:true
  },{ 
      name: "参数3",nameEn: "param3", unit: "V",value: [],
      color:["#d9d919", "#d9d919"],dashboardShow:true
  },{ 
    name: "参数4",nameEn: "param4", unit: "V",value: [],
    color:["#d9d919", "#d9d919"]
},{ 
  name: "参数5",nameEn: "param5", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数6",nameEn: "param6", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数7",nameEn: "param7", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
}]
  xData = [];

  attrs_1 = {};
  attrs_2 = {};
  attrs_3 = {};

  //设备介绍
  str = ` 主要测试电机低速及控制系统性能，如：电机标定、转矩-转速特性、<br> 效率、温升、堵转试验、转矩控制精度、转速控制精度、峰值转矩、
  <br> 峰值功率`;

  //安灯状态
  andon = [
    {name:'4',color:'blue',status:1},
    {name:'3',color:'green',status:1},
    {name:'2',color:'yellow',status:0},
    {name:'1',color:'red',status:0},
  ];
  //试验信息
  experiment ={
    user:'新工',
    phone:'13499998888',
    nexttest:'Geely001',
    nextdate:'20/11/01-20/11/30',
    // '实验编号','计划时长','进度'
    title:['ExperimentNum','PLanDuration','schedule'],
    data:[
      ['WSN-100010','20/10/01-20/11/01',69],
      ['WSN-100010','20/10/01-20/11/01',70],
      // ['WSN-100010','20/10/01-20/11/01',70],
      // ['WSN-100010','20/10/01-20/11/01',70],
      // ['WSN-100010','20/10/01-20/11/01',70],
    ]
  }
  //日志与警告
  log_warm = {
    // '时间','日志等级','日志信息'
    title:['time','Loglevel','logInfor'],
    data:[
      ['2020-09-08','warning','Not ready'],
      ['2020-10-01','error','Broken！'],
      ['2020-10-01','error','Broken！'],
      ['2020-10-01','error','Broken！'],
      ['2020-10-01','error','Broken！'],
    ]
  }
  //图片
  img = {
    url:'assets/eimdoard/equipment/images/car_2.png',//中间图片
    name:'',
    electric_url:'assets/eimdoard/equipment/images/electric.png',//电机图片
  }

  //实验实时状态
  real_list = [
    {name:'LF分油器',value:'关',color:'red'},
    {name:'LR分油器',value:'低',color:'green'},
    {name:'RR分油器',value:'高',color:'green'},
    {name:'RF分油器',value:'高',color:'green'},
  ]


  @ViewChild('chart_3')chart_3:any;
  @ViewChild('chart_2')chart_2:any;
  @ViewChild('chart_1')chart_1:any;

  //每一个ngx-chart-curve-v3 中有哪些tag
  list_2 = ['equipment.param1','equipment.param2'];
  list_1 = ['equipment.param1','equipment.param2'];
  list_3 = ['equipment.param1','equipment.param2'];
  click_list = [];//当前选中的tag

  timer:any;//定时器
  language = '';//语言 空为zh-CN中文


  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    //订阅左上角点击宽度改变
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.initChart();
    })
    //订阅路由
    this.activateInfo.params.subscribe(f =>{
      console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })
    //颜色赋值
    let rgb = '';
    this.attrs.forEach((f,i)=>{
      if(i > colors.length-1)
        rgb =  rgb_del_red();
      else
        rgb =  colors[i];
      f.color = [rgb,rgb];
    })

    //默认进去选中的tag记录
    this.click_list = [this.list_1[0],this.list_3[0],this.list_3[0]]

    //赋值
    list_copy(this.list_1,`attrs_1`,this);
    list_copy(this.list_2,`attrs_2`,this);
    list_copy(this.list_3,`attrs_3`,this);
    this.getData();
    setTimeout(() => {
    this.initChart();
    }, 1000);
  }
  

  getData(){
    // this.http.callRPC('panel_detail','get_device_panel_detail',
    //   {"deviceid":this.deviceid}).subscribe((f:any) =>{

    //   })
    
    let g = 1;
    //定时添加数据
    this.timer = setInterval(f =>{
      this.xData.push(g);
      if(this.xData.length >10)this.xData.splice(0,1)
        g++;
        list_jion(this.list_1,'attrs_1',this);
      list_jion(this.list_2,'attrs_2',this);
      list_jion(this.list_3,'attrs_3',this);
        let array = ['chart_1','chart_2','chart_3'].forEach((f,i)=>{
        this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.click_list[i]],xData:this.xData,index:g});
      })
      
    },1000)

  }

  ngAfterViewInit(){
  }
  

  initChart(){

    let data = {
      title:['一级警告','二级警告'],
      yAxis:['周一','周二','周三','周四','周五','周六','周日'],
      firstData:[120, 132, 101, 134, 90, 230, 210],
      secondData:[220, 182, 191, 234, 290, 330, 310]

    }
    if(this.language){
      data.title = ['LV1Warn','LV2Warn'];
      data.yAxis = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    }
    let myChart_3 = echarts.init(document.getElementById('warning'));
    equipment_four_road.create_warning_chart(data,myChart_3);

    let myChart_4 = echarts.init(document.getElementById('real_temperature_1'));
    equipment_four_road.create_real_temperature({value:55},myChart_4);

    let myChart_5 = echarts.init(document.getElementById('real_temperature_2'));
    equipment_four_road.create_real_temperature({value:55},myChart_5);

    

    // ['chart_1','chart_2','chart_3'].forEach((f,i)=>{
    //   this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.list[0]],xData:this.xData});
    // })

    create_third_chart_line(rtm3a,this);


  }


  //重新画
  clicEvent(e,i){
    //记录选定
    this.click_list[i-1] = e;
    this[`chart_${i}`].painting({attrs:this[`attrs_${i}`][e],xData:this.xData});
  }

  getleft(item){
    return item > 40?item-20+'%':'20%';
  }


  get_td_width(num){
    return 66/num+'%'
  }

  get_height(){
    return this.experiment.data.length <= 2?31*this.experiment.data.length+'px':'120px';
  }


  ngOnDestroy(){
    clearInterval(this.timer)
  }
}
