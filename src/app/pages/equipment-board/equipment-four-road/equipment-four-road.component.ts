import { Component, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../../../@core/utils/layout.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, rgb_del_red } from '../equipment-board';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');
let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');
// echart
let rtm3 = require('../../../../assets/eimdoard/rtm3/js/rtm3');

@Component({
  selector: 'ngx-equipment-four-road',
  templateUrl: './equipment-four-road.component.html',
  styleUrls: ['./equipment-four-road.component.scss']
})
export class EquipmentFourRoadComponent implements OnInit {


  attrs:any = [{ 
    name: "参数1", unit: "V",value: [],show:true
    ,color:["", ""]
  },{ 
      name: "参数2", unit: "V",value: [],
      color:["#ff00ff", "#ff00ff"]
  },{ 
      name: "参数3", unit: "V",value: [],
      color:["#d9d919", "#d9d919"]
  },{ 
    name: "参数4", unit: "V",value: [],
    color:["#d9d919", "#d9d919"]
},{ 
  name: "参数5", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数6", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数7", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
}]
  xData = [];

  attrs_1:any = {
    'equipment.road.LeftRear.Params':[{ 
      name: "左后输出",nameEn :'LeftRearOutput', unit: "V",value: [],show:true
      ,color:["", ""]
    },{ 
        name: "左后位移",nameEn :'LeftRearDisplacement', unit: "V",value: [],show:true,
        color:["", ""]
    },{ 
        name: "左后DeltaP",nameEn :'LeftRearDeltaP', unit: "V",value: [],show:true,
        color:["", ""]
    },{ 
      name: "左后指令频率",nameEn :'LeftRearCommandFrequency', unit: "V",value: [],
      color:["", ""]
  },{ 
    name: "左后活动Fdbk",nameEn :'LeftRearActiveFdbk', unit: "V",value: [],
    color:["", ""]
  },{ 
    name: "左后位移误差",nameEn :'LeftRearDisplacementError', unit: "V",value: [],
    color:["", ""]
  },{ 
    name: "左后位移绝对误差",nameEn :'LeftRearDisplacementAbs.Error', unit: "V",value: [],
    color:["", ""]
  }],
    'equipment.road.RightRear.Params':[{ 
      name: "右后输出",nameEn :'RightRearOutput', unit: "V",value: [],show:true
      ,color:["", ""]
    },{ 
        name: "右后位移",nameEn :'RightRearDisplacement', unit: "V",value: [],show:true,
        color:["", ""]
    },{ 
        name: "右后DeltaP",nameEn :'RightRearDeltaP', unit: "V",value: [],show:true,
        color:["", ""]
    },{ 
      name: "右后指令频率",nameEn :'RightRearCommandFrequency', unit: "V",value: [],
      color:["", ""]
  },{ 
    name: "右后活动Fdbk",nameEn :'RightRearActiveFdbk', unit: "V",value: [],
    color:["", ""]
  },{ 
    name: "右后位移误差",nameEn :'RightRearDisplacementError', unit: "V",value: [],
    color:["", ""]
  },{ 
    name: "右后位移绝对误差",nameEn :'RightRearDisplacementAbs.Error', unit: "V",value: [],
    color:["", ""]
  }]
  };
  attrs_2:any = {
    'equipment.road.LeftFront.Params':[{ 
      name: "左前输出",nameEn :'LeftFrontOutput', unit: "V",value: [],show:true
      ,color:["", ""]
    },{ 
        name: "左前位移",nameEn :'LeftFrontDisplacement', unit: "V",value: [],show:true,
        color:["", ""]
    },{ 
        name: "左前DeltaP",nameEn :'LeftFrontDeltaP', unit: "V",value: [],show:true,
        color:["", ""]
    },{ 
      name: "左前指令频率",nameEn :'LeftFrontCommandFrequency', unit: "V",value: [],
      color:["", ""]
  },{ 
    name: "左前活动Fdbk",nameEn :'LeftFrontActiveFdbk', unit: "V",value: [],
    color:["", ""]
  },{ 
    name: "左前位移误差",nameEn :'LeftFrontDisplacementError', unit: "V",value: [],
    color:["", ""]
  },{ 
    name: "左前位移绝对误差",nameEn :'LeftFrontDisplacementAbs.Error', unit: "V",value: [],
    color:["", ""]
  }],
    'equipment.road.RightFront.Params':[{ 
      name: "右前输出",nameEn :'RightFrontOutput', unit: "V",value: [],show:true
      ,color:["", ""]
    },{ 
        name: "右前位移",nameEn :'RightFrontDisplacement', unit: "V",value: [],show:true,
        color:["", ""]
    },{ 
        name: "右前DeltaP",nameEn :'RightFrontDeltaP', unit: "V",value: [],show:true,
        color:["", ""]
    },{ 
      name: "右前指令频率",nameEn :'RightFrontCommandFrequency', unit: "V",value: [],
      color:["", ""]
  },{ 
    name: "右前活动Fdbk",nameEn :'RightFrontActiveFdbk', unit: "V",value: [],
    color:["", ""]
  },{ 
    name: "右前位移误差",nameEn :'RightFrontDisplacementError', unit: "V",value: [],
    color:["", ""]
  },{ 
    name: "右前位移绝对误差",nameEn :'RightFrontDisplacementAbs.Error', unit: "V",value: [],
    color:["", ""]
  }]
  };
  attrs_3:any = {"equipment.dataChannelList":[{ 
    name: "左后输出",nameEn :'RightFrontDisplaceme', unit: "V",value: [],show:true
    ,color:["", ""]
  }]};

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
      ['WSN-100010','20/10/01-20/11/01',70],
      // ['WSN-100010','20/10/01-20/11/01',70],
      // ['WSN-100010','20/10/01-20/11/01',70],
      // ['WSN-100010','20/10/01-20/11/01',70],
      // ['WSN-100010','20/10/01-20/11/01',70],
    ]
  }
  //设备介绍
  str = `试验原理：--------------------------------------------------<br>
  设备构成：-------，-------，-------，--------<br>
  试验能力：------------------------------------------------<br>
   标准试验：-------------------------------------------------<br>
                    -----------------------------------------------<br>
                    --------------------------------------------<br>
   非标试验：---------------------------------------<br>`;
  //警告与认知
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
  //实验实时数据
  switchStatus:any ={
    title:[`stationName`,'OnOff',`OilSeparatorOn`,`HighOilSeparator`,'InternalLock','Programlock'],
    data:[['Act1 and Act2',
    {value:1,color:'green',id:'circle'},{value:1,color:'green',id:'circle'},{value:1,color:'green',id:'circle'},
    {value:1,color:'white',id:'strip'},{value:1,color:'white',id:'strip'}]]
  }



  img = {
    url:'assets/eimdoard/equipment/images/car_2.png',
    name:''
  }

  // ngx-chart-curve-v3对象
  @ViewChild('chart_3')chart_3:any;
  @ViewChild('chart_2')chart_2:any;
  @ViewChild('chart_1')chart_1:any;

  // ngx-chart-curve-v3有哪些tag
  list_2 = ['equipment.road.LeftFront.Params','equipment.road.RightFront.Params'];
  list_1 = ['equipment.road.LeftRear.Params','equipment.road.RightRear.Params'];
  list_3 = ['equipment.dataChannelList'];
  click_list = [];//当前选中的tag
  deviceid: any;//设备信息


  timer:any;//定时器
  language = '';//语言 空为zh-CN中文

  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute
    ,private http:HttpserviceService,private translate:TranslateService,
    private translatePipe: TranslatePipe) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    //订阅左上角点击后宽度变化
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.initChart();
    })

    // this.initChart();

    // this.i18();
    //路由订阅
    this.activateInfo.params.subscribe(f =>{
      console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })
    //颜色的赋值
    this.color();
    //记录初始化默认选中tag
    this.click_list = [this.list_1[0],this.list_2[0],this.list_3[0]];

    this.getData();
  }

  getData(){
    // this.http.callRPC('panel_detail','get_device_panel_detail',
    //   {"deviceid":this.deviceid}).subscribe((f:any) =>{

    //   })
    //定时添加数据
    let g = 1;
    this.timer = setInterval(f =>{
      this.xData.push(g);
      if(this.xData.length > 10)this.xData.splice(0,1);
      g++;
      this.click_list.forEach((f,i)=>{
        this[`attrs_${i+1}`][f].forEach(el => {
          if(el.show){
            if(el.value.length == 0){
              for(let i = 1;i<10;i++){
                // el.value.splice(0,1);
                el.value.push(parseInt((Math.random()*100).toString()));
              };
            } if(el.value.length < 10)
              el.value.push(parseInt((Math.random()*100).toString()));
            else if(el.value.length >= 10){
              el.value.splice(0,1);
              el.value.push(parseInt((Math.random()*100).toString()));
            }

          }
        });
        // if(this[`attrs_${i+1}`][f].show){

        // }
        // this[`attrs_${i+1}`][f]
      })
      // this.list_1.forEach((f,i)=>{
      //   this[`attrs_1`][f].forEach(element => {
      //     element.value.push(parseInt((Math.random()*100).toString()))
      //   });
      // })
      // this.list_2.forEach((f,i)=>{
      //   this[`attrs_2`][f].forEach(element => {
      //     element.value.push(parseInt((Math.random()*100).toString()))
      //   });
      // })
      // this.list_3.forEach((f,i)=>{
      //   this[`attrs_3`][f].forEach(element => {
      //     element.value.push(parseInt((Math.random()*100).toString()))
      //   });
      // })
      let array = ['chart_1','chart_2','chart_3'].forEach((f,i)=>{
        this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.click_list[i]],xData:this.xData,index:g});
      })
      
    },1000)

  }
  
  //初始化表格
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
    equipment_four_road.create_real_temperature({value:55.33},myChart_4);

    let myChart_5 = echarts.init(document.getElementById('real_temperature_2'));
    equipment_four_road.create_real_temperature({value:55.33},myChart_5);

    setInterval(f=>{
      equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_4);
    },3000)
    setInterval(f=>{
      equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_5);
    },3000)

    // this.list.forEach((f,i)=>{
    //   this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.list[0]],xData:this.xData});
    // })

    this.create_third_chart_line();

    let operatingRate = echarts.init(document.getElementById('operatingRate'));
    var gauge_data_4 = {
      xAxisData:['0时','1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时'
        ,'18时','19时','20时','21时','22时','23时'],
      seriesData:[710, 312, 321,754, 500, 830, 710, 521, 504, 660, 530, 410,710, 312, 321,754, 500, 830, 710, 521, 504, 660, 530, 410],
    } 
    rtm3.create_right_buttom(gauge_data_4,operatingRate);

  }

  clicEvent(e,i){
    //记录选定
    this.click_list[i-1] = e;  
    // this[`chart_${i}`].painting({attrs:this[`attrs_${i}`][e],xData:this.xData});
    this[`list_${i}`].forEach(f=>{
      if(e!=f)this[`attrs_${i}`][f].value = [];
    })
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


  create_third_chart_line(){
    var yearPlanData=[],yearOrderData = [],differenceData = [],visibityData = [],xAxisData = [];
    for (var i = 0; i < 12; i++) {
      yearPlanData.push(Math.round(Math.random() * 900) + 100);
      yearOrderData.push(Math.round(Math.random() * yearPlanData[i]));
      differenceData.push(yearPlanData[i] - yearOrderData[i]);
      visibityData.push(yearOrderData[i]);
      xAxisData.push((i + 1).toString() + "月");
    }
    rtm3a.create_third_chart_line({
      yearPlanData:yearPlanData,
      yearOrderData:yearOrderData,
      differenceData:differenceData,
      visibityData:visibityData,
      xAxisData:xAxisData,
      title:this.language?'MonthlyChartOfTemperatureAndHumidity':'温湿度月度图线'
    }, 'third_second');
  }

//颜色的赋值
  color(){
    
    let rgb = '';
    ['attrs_1','attrs_2','attrs_3'].forEach(element => {
      for(let item in this[element]){
        this[element][item].forEach((f,i)=>{
          if(i > colors.length-1)
            rgb =  rgb_del_red();
          else
            rgb =  colors[i];
          f.color = [rgb,rgb];
        })
      }
    });
  }


  ngOnDestroy(){
    clearInterval(this.timer)
  }


  // async i18(){
  //   let f = await this.translate.get('equipment.road').toPromise();
  // }

  //生成实时数据需要的参数
  create_param(){
    let arr10s = [];
    let arr1s = [];
    this.click_list.forEach((f,i)=>{
      this[`attrs_${i}`][f].forEach(el => {
        if(el.show && el.data){
          el.value.lenght <= 0?arr10s.push(el.nameEn.toUpperCase()):arr1s.push(el.nameEn.toUpperCase());
        }
      });
    })

  }

}
