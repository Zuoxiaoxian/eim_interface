import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../@core/utils/layout.service';
import { colors, rgb_del_red } from '../equipment-board';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');
// echart
let rtm3 = require('../../../../assets/eimdoard/rtm3/js/rtm3');

let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');

@Component({
  selector: 'ngx-equipment-avl',
  templateUrl: './equipment-avl.component.html',
  styleUrls: ['./equipment-avl.component.scss']
})
export class EquipmentAvlComponent implements OnInit {

  attrs = [{ 
    name: "参数1",nameEn :'param1', unit: "V",value: [],show:true
    ,color:["#ff2400", "#e47833"]
  },{ 
      name: "参数2",nameEn :'param2', unit: "V",value: [],show:true,
      color:["#ff00ff", "#ff00ff"]
  },{ 
      name: "参数3",nameEn :'param3', unit: "V",value: [],show:true,
      color:["#d9d919", "#d9d919"]
  },{ 
    name: "参数4",nameEn :'param4', unit: "V",value: [],show:true,
    color:["#d9d919", "#d9d919"]
},{ 
  name: "参数5",nameEn :'param5', unit: "V",value: [],show:true,
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数6",nameEn :'param6', unit: "V",value: [],show:true,
  color:["#d9d919", "#d9d919"]
}]
  xData = [];

  attrs_1 = {};
  attrs_2 = [];
  attrs_3 = [];

  //安灯状态
  andon = [
    {name:'4',color:'blue',status:1},
    {name:'3',color:'green',status:1},
    {name:'2',color:'yellow',status:0},
    {name:'1',color:'red',status:0},
  ];
  experiment ={
    user:'新工',
    phone:'13499998888',
    nexttest:'Geely001',
    nextdate:'20/11/01-20/11/30',
    // '实验编号','计划时长','进度'
    title:['ExperimentNum','PLanDuration','schedule'],
    data:[
      ['WSN-100010','20/10/01-20/11/01',70],
      // ['WSN-100010','20/10/01-20/11/01',70],
      // ['WSN-100010','20/10/01-20/11/01',70],
      // ['WSN-100010','20/10/01-20/11/01',70],
      // ['WSN-100010','20/10/01-20/11/01',70],
    ]
  }

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

  switchStatus:any ={
    title:[`Station
    name`,'开/关',`分油器开`,`分油器高`,'内锁','程序内锁'],
    data:[['Act1 and Act2',
    {value:1,color:'green',id:'circle'},{value:1,color:'green',id:'circle'},{value:1,color:'green',id:'circle'},
    {value:1,color:'white',id:'strip'},{value:1,color:'white',id:'strip'}]]
  }

  real_data = {
    arr:[{name:'舱状态',nameEn:'CabinStatus',value:1},{name:'新封系统',nameEn:'NewSealSystem',value:1}
    ,{name:'转轮排湿',nameEn:'RunnerDehumidi',value:1},{name:'制冷除湿',nameEn:'RefrigeraDehumidifica',value:1}
    ,{name:'制冷机组1',nameEn:'RefrigerationUnit1',value:1},{name:'制冷机组2',nameEn:'RefrigerationUnit2',value:1},]
  }

  outRenturnWind = [
    {text:'21',title:'出风温度',titleEn:'OutletTemperature'},
    {text:'21',title:'出风湿度',titleEn:'OutletAirHumidity'},
    {text:'21',title:'回风温度',titleEn:'ReturnTemperature'},
    {text:'21',title:'回风湿度',titleEn:'ReturnAirHumidity'},
  ]

  discharge = [
    {value:'4.6',name:'二氧化碳',nameEn:'CO2'},
    {value:'12',name:'总碳氢',nameEn:'THC'},
    {value:'90',name:'一氧化碳',nameEn:'CO'},
    {value:'4.6',name:'甲醛',nameEn:'HCHO'},
    {value:'12',name:'氮氧化物',nameEn:'NOx'},
    {value:'90',name:'氧化亚氮',nameEn:'YHYD'},
  ]

  img = {
    url:'assets/eimdoard/equipment/images/s.png',
    name:''
  }

  list = ['12','34','56'];

  @ViewChild('chart_1')chart_1:any;

  click_list = [];//当前选中的tag
  deviceid: any;


  timer:any;//定时器
  language = '';//语言 空为zh-CN中文

  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.initChart();
    })

    this.activateInfo.params.subscribe(f =>{
      console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })
    let rgb = '';
    this.attrs.forEach((f,i)=>{
      if(i > colors.length-1)
        rgb =  rgb_del_red();
      else
        rgb =  colors[i];
      f.color = [rgb,rgb];
    })

    this.click_list = [this.list[0],this.list[0],this.list[0]]

    this.list.forEach((f,i)=>{
      this[`attrs_1`][f] = JSON.parse(JSON.stringify(this.attrs));
    })
    this.attrs_2 = JSON.parse(JSON.stringify(this.attrs));
    this.attrs_3 = JSON.parse(JSON.stringify(this.attrs));
    this.getData();
  }
  

  getData(){
    // this.http.callRPC('panel_detail','get_device_panel_detail',
    //   {"deviceid":this.deviceid}).subscribe((f:any) =>{

    //   })
    
    let g = 1;
    this.timer = setInterval(() =>{
      this.xData.push(g);
      g++;
      this.list.forEach((f,i)=>{
        this[`attrs_1`][f].forEach(element => {
          element.value.push(parseInt((Math.random()*100).toString()))
        });
      })
      this.attrs_2.forEach(element => {
        if(this.language)element.name = element.nameEn;
        element.value.push(parseInt((Math.random()*100).toString()))
      });
      this.attrs_3.forEach(element => {
        if(this.language)element.name = element.nameEn;
        element.value.push(parseInt((Math.random()*100).toString()))
      });
      //只有一个公共组件
      this.chart_1.painting({attrs:this.attrs_1[this.click_list[0]],xData:this.xData,index:g});

      let myChart_8 = echarts.init(document.getElementById('discharge_chart'));;
      equipment_four_road.create_real_discharge({attrs:this.attrs_2,xData:this.xData},myChart_8);
  
      let myChart_9 = echarts.init(document.getElementById('discharge_chart_1'));;
      equipment_four_road.create_real_discharge({attrs:this.attrs_3,xData:this.xData},myChart_9);

    },1000)
  }

  initChart(){
    let data_1 = {
      d_arr:[[12, 56, 36, 86, 98, 86],
               [45, 20, 36, 106, 80, 16],
              [90, 10, 36, 96, 80, 10],
              [90, 56, 36, -6, -50, -70]],
      title_arr:["空闲", "占位", "运行", "利用率"],
      color_arr:[{
        start: "rgba(155, 101, 229)",
        end: "rgba(18, 58, 86,0.5)"
    },
    {
        start: "rgba(71, 173, 245)",
        end: "rgba(18, 58, 86,0.5)"
    },
    {
        start: "rgba(82, 249, 107)",
        end: "rgba(18, 58, 86,0.5)"
    },
    {
        color: "#00EAFF"
    }
  ],
    xData:[1,2,3,4,5,6]
    }
    let myChart = echarts.init(document.getElementById('device_status'));
    equipment_four_road.create_device_status(data_1,myChart);

    let myChart_1 = echarts.init(document.getElementById('device_circular_1'));
    equipment_four_road.create_device_circular(
      {title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'LastMonth':'上个月'},myChart_1);

    let myChart_2 = echarts.init(document.getElementById('device_circular_2'));
    equipment_four_road.create_device_circular(
      {title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'ThisMonth':'本月'},myChart_2);

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
    equipment_four_road.create_real_disk({value:55,text:this.language?'RealTEMP':'实时温度',unit:'℃'},myChart_4);

    let myChart_5 = echarts.init(document.getElementById('real_temperature_2'));
    equipment_four_road.create_real_disk({value:55,text:this.language?'RealRH':'实时湿度',unit:'%RH'},myChart_5);

    let myChart_6 = echarts.init(document.getElementById('real_temperature_3'));
    equipment_four_road.create_real_disk({value:55,text:this.language?'CabinPA':'舱内压差',unit:'pa'},myChart_6);
    

    let myChart_7 = [];
    this.outRenturnWind.forEach((f:any,i:number) => {
      myChart_7.push(echarts.init(document.getElementById('electric_chart_'+i)));
      equipment_four_road.create_real_electric({text:f.text,title:this.language?f.titleEn:f.title},myChart_7[i]);
    });

    // let myChart_8 = echarts.init(document.getElementById('discharge_chart'));;
    // equipment_four_road.create_real_discharge({attrs:this.attrs,xData:this.xData},myChart_8);

    // let myChart_9 = echarts.init(document.getElementById('discharge_chart_1'));;
    // equipment_four_road.create_real_discharge({attrs:JSON.parse(JSON.stringify(this.attrs)),xData:this.xData},myChart_9);

    // ['chart_1'].forEach((f,i)=>{
    //   this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.list[0]],xData:this.xData});
    // })


    let operatingRate = echarts.init(document.getElementById('operatingRate'));
    var gauge_data_4 = {
      xAxisData:['0时','1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时'
        ,'18时','19时','20时','21时','22时','23时'],
      seriesData:[710, 312, 321,754, 500, 830, 710, 521, 504, 660, 530, 410,710, 312, 321,754, 500, 830, 710, 521, 504, 660, 530, 410],
    } 
    rtm3.create_right_buttom(gauge_data_4,operatingRate);

    setInterval(f=>{
      equipment_four_road.create_real_disk({value:parseInt((Math.random()*100).toString()),text:this.language?'RealTEMP':'实时温度',unit:'%RH'},myChart_5);
      equipment_four_road.create_real_disk({value:parseInt((Math.random()*100).toString()),text:this.language?'RealRH':'实时湿度',unit:'℃'},myChart_4);
      equipment_four_road.create_real_disk({value:parseInt((Math.random()*100).toString()),text:this.language?'CabinPA':'舱内压差',unit:'pa'},myChart_6);
      this.outRenturnWind.forEach((f:any,i:number) => {
        myChart_7.push(echarts.init(document.getElementById('electric_chart_'+i)));
        equipment_four_road.create_real_electric({text:parseInt((Math.random()*100).toString()),title:this.language?f.titleEn:f.title},myChart_7[i]);
      });
    },3000)
  }

  getleft(item){
    return item > 40?item-20+'%':'20%';
  }


  get_td_width(num){
    return 100/num+'%'
  }

  get_height(){
    return this.experiment.data.length <= 2?31*this.experiment.data.length+'px':'120px';
  }

  clicEvent(e,i){
    //记录选定
    this.click_list[i-1] = e;
    this[`chart_${i}`].painting({attrs:this[`attrs_${i}`][e],xData:this.xData});
  }

  ngOnDestroy(){
    clearInterval(this.timer)
  }

}
