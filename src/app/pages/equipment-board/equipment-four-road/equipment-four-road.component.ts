import { Component, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {  TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../../../@core/utils/layout.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, dateformat, rgb_del_red,getMessage,painting_time,create_third_chart_line } from '../equipment-board';

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



  xData:any = {};

  attrs_1:any = {
    'equipment.road.LeftRear.Params':[{ 
      name: "左后输出",nameEn :'LeftRearOutput', unit: "V",value: [],show:true
      ,color:["", ""]
    },{ 
        name: "左后位移",nameEn :'LeftRearDisplacement', unit: "V",value: [],show:true,
        color:["", ""]
    },{ 
      name: "左后活动Fdbk",nameEn :'LeftRearActiveFdbk', unit: "V",value: [],show:true,
      color:["", ""]
    },{ 
      name: "左后指令频率",nameEn :'LeftRearCommandFrequency', unit: "V",value: [],
      color:["", ""]
  },{ 
    name: "左后位移绝对误差",nameEn :'LeftRearDisplacementAbs.Error', unit: "V",value: [],
    color:["", ""]
  },{ 
    name: "左后位移误差",nameEn :'LeftRearDisplacementError', unit: "V",value: [],
    color:["", ""]
  },{ 
    name: "左后DeltaP",nameEn :'LeftRearDeltaP', unit: "V",value: [],
    color:["", ""]
  }],
      'equipment.road.RightRear.Params':[{ 
        name: "右后输出",nameEn :'RightRearOutput', unit: "V",value: [],show:true
        ,color:["", ""]
      },{ 
          name: "右后位移",nameEn :'RightRearDisplacement', unit: "V",value: [],show:true,
          color:["", ""]
      },{ 
        name: "右后活动Fdbk",nameEn :'RightRearActiveFdbk', unit: "V",value: [],show:true,
        color:["", ""]
      },{ 
        name: "右后指令频率",nameEn :'RightRearCommandFrequency', unit: "V",value: [],
        color:["", ""]
    },{ 
      name: "右后位移绝对误差",nameEn :'RightRearDisplacementAbs.Error', unit: "V",value: [],
      color:["", ""]
    },{ 
      name: "右后位移误差",nameEn :'RightRearDisplacementError', unit: "V",value: [],
      color:["", ""]
    },{ 
      name: "右后DeltaP",nameEn :'RightRearDeltaP', unit: "V",value: [],
      color:["", ""]
  }],
  xData:[]
    };
  attrs_2:any = {
      'equipment.road.LeftFront.Params':[{ 
        name: "左前输出",nameEn :'LeftFrontOutput', unit: "V",value: [],show:true
        ,color:["", ""]
      },{ 
          name: "左前位移",nameEn :'LeftFrontDisplacement', unit: "V",value: [],show:true,
          color:["", ""]
      },{ 
        name: "左前活动Fdbk",nameEn :'LeftFrontActiveFdbk', unit: "V",value: [],show:true,
        color:["", ""]
      },{ 
        name: "左前指令频率",nameEn :'LeftFrontCommandFrequency', unit: "V",value: [],
        color:["", ""]
    },{ 
      name: "左前位移绝对误差",nameEn :'LeftFrontDisplacementAbs.Error', unit: "V",value: [],
      color:["", ""]
    },{ 
      name: "左前位移误差",nameEn :'LeftFrontDisplacementError', unit: "V",value: [],
      color:["", ""]
    },{ 
      name: "左前DeltaP",nameEn :'LeftFrontDeltaP', unit: "V",value: [],
      color:["", ""]
  }],
      'equipment.road.RightFront.Params':[{ 
        name: "右前输出",nameEn :'RightFrontOutput', unit: "V",value: [],show:true
        ,color:["", ""]
      },{ 
          name: "右前位移",nameEn :'RightFrontDisplacement', unit: "V",value: [],show:true,
          color:["", ""]
      },{ 
        name: "右前活动Fdbk",nameEn :'RightFrontActiveFdbk', unit: "V",value: [],show:true,
        color:["", ""]
      },{ 
        name: "右前指令频率",nameEn :'RightFrontCommandFrequency', unit: "V",value: [],
        color:["", ""]
    },{ 
      name: "右前位移绝对误差",nameEn :'RightFrontDisplacementAbs.Error', unit: "V",value: [],
      color:["", ""]
    },{ 
      name: "右前位移误差",nameEn :'RightFrontDisplacementError', unit: "V",value: [],
      color:["", ""]
    },{ 
      name: "右前DeltaP",nameEn :'RightFrontDeltaP', unit: "V",value: [],
      color:["", ""]
  }],
  xData:[]
    };
  attrs_3:any = {"equipment.dataChannelList":[{ 
      name: "左后输出",nameEn :'RightFrontDisplacement', unit: "V",value: [],show:true
      ,color:["", ""]
    }],
    xData:[]};

  //安灯状态
  andon = [
    {name:'4',color:'blue',status:1},
    {name:'3',color:'green',status:1},
    {name:'2',color:'yellow',status:0},
    {name:'1',color:'red',status:0},
  ];
 
  //设备介绍
  str = `试验原理：--------------------------------------------------<br>
  设备构成：-------，-------，-------，--------<br>
  试验能力：------------------------------------------------<br>
   标准试验：-------------------------------------------------<br>
                    -----------------------------------------------<br>
                    --------------------------------------------<br>
   非标试验：---------------------------------------<br>`;
  
  //实验实时数据
  switchStatus:any ={
    title:[`stationName`,'OnOff',`OilSeparatorOn`,`HighOilSeparator`,'InternalLock','Programlock'],
    data:[['',
    {value:1,color:'',id:'circle'},{value:1,color:'',id:'circle'},{value:1,color:'green',id:'circle'},
    {value:1,color:'',id:'strip'},{value:1,color:'',id:'strip'}]]
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
  timer60s:any;//定时器60s
  language = '';//语言 空为zh-CN中文

  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute
    ,private http:HttpserviceService,private translate:TranslateService) { }

  ngOnInit(): void {
    // let mqservice = new EmqClientService();
    // let mqBean :any= {
    //   hostname: mq_config.hostname,
    //   port: mq_config.port,
    //   clientId: guid2(),
    //   mqttConnectFail:function(data){
    //     console.log(data)
    //   },
    //   topic:'#'
    // }
    // mqservice.getmqtt(mqBean);
    //记录初始化默认选中tag
    this.click_list = [this.list_1[0],this.list_2[0],this.list_3[0]];
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    //订阅左上角点击后宽度变化
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.initChart();
    })

    //路由订阅
    this.activateInfo.params.subscribe(f =>{
      console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })
    //颜色的赋值
    this.color();
    
    //获取数据
    this.getData();

    this.get_device_mts_timerangedata();

    
  }

  getData(){
    // 定时添加数据
    let table,method = '';
    this.timer = setInterval(f =>{
      let param = this.create_param();
      this.get_device_mts_01_status();
      if(param[1].length > 0){
        table = 'get_device_mts_realtimedata',method = 'device_monitor.get_device_mts_realtimedata';
        this.get_device_mts_realtimedata(table,method,param);
      }
      if(param[0].length > 0){
        table = 'get_device_mts_time',method = 'device_monitor.get_device_mts_timerangedata';
        this.get_device_mts_time(table,method,param);
      }
      this.get_device_mts_weiss();
    },1000)
    

    setTimeout(() => {
      this.initChart();
    }, 1000);
   
  }
  
  //初始化表格
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
    if(document.getElementById('warning')){
      let myChart_3 = echarts.init(document.getElementById('warning'));
      equipment_four_road.create_warning_chart(data,myChart_3);
    }

    let array = ['chart_1','chart_2','chart_3'].forEach((f,i)=>{
      if(this[`chart_${i+1}`])this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.click_list[i]],xData:[],index:1});
    })
    create_third_chart_line(rtm3a,this);

  }

  clicEvent(e,i){
    //记录选定
    this.click_list[i-1] = e;  
    this[`list_${i}`].forEach(f=>{
      if(e!=f)this[`attrs_${i}`][f].forEach(el => {
        el.value = [];
        this[`attrs_${i}`][f].xData = [];
      });
    })
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


  //生成实时数据需要的参数
  create_param(){
    let arr10s = [];
    let arr1s = [];
    this.click_list.forEach((f,i)=>{
      this[`attrs_${i+1}`][f].forEach(el => {
        if(el.value){
          el.value.length <= 0?arr10s.push(el.nameEn.replace(".","").toLocaleLowerCase()):arr1s.push(el.nameEn.replace(".","").toLocaleLowerCase());
        }
      });
    })
    return [arr10s,arr1s];
  }

  /**
   *   中间的表的数据 开关这些数据     
   */
  get_device_mts_01_status(){
      this.http.callRPC('get_device_mts_01_status','device_monitor.get_device_mts_01_status',{}).subscribe((f:any) =>{
        if(f.result.error || f.result.message[0].code == 0)return;
        this.switchStatus.data[0][0] =  f.result.message[0][0].stationname;
        //起停状态
        this.switchStatus.data[0][1].value =  f.result.message[0][0].runstop;
        this.switchStatus.data[0][1].color =  this.switchStatus.data[0][1].value == 1?'green':'#C0C0C0';
        //分油器开
        this.switchStatus.data[0][2].value =  f.result.message[0][0].hsmt9j28aon;
        this.switchStatus.data[0][2].color =  this.switchStatus.data[0][1].value == 1?'green':'#C0C0C0';
        //分油器高
        this.switchStatus.data[0][3].value =  f.result.message[0][0].hsmt9j28ahigh;
        this.switchStatus.data[0][3].color =  this.switchStatus.data[0][1].value == 1?'green':'#C0C0C0';
        //内锁
        this.switchStatus.data[0][4].value =  f.result.message[0][0].interlock;
        this.switchStatus.data[0][4].color =  this.switchStatus.data[0][1].value == 1?'white':'orange';
        //程序锁
        this.switchStatus.data[0][5].value =  f.result.message[0][0].programinterlock;
        this.switchStatus.data[0][5].color =  this.switchStatus.data[0][1].value == 1?'white':'orange';
      })
  }




  

  /**
   * 图表 获取一段时间
   * @param table 
   * @param method 
   * @param param 
   */
  get_device_mts_time(table,method,param){
    // let datestr = dateformat(new Date(),'yyyy-MM-dd hh:mm');
    // let datestr_ = dateformat(new Date(),'yyyy-MM-dd hh:mm');
    this.http.callRPC(table,method,{"start":"2020-11-09 14:02:00","end":"2020-11-10 20:20:00","device":"device_mts_01",
    arr:param[0].join(',')}).subscribe((f:any) =>{
      if(f.result.error || f.result.message[0].code == 0)return;
      painting_time(f,10,this,['chart_1','chart_2','chart_3']);
      
    })
  }

  /**
   *  图表  获取一秒
   * @param table 
   * @param method 
   * @param param 
   */
  get_device_mts_realtimedata(table,method,param){
    this.http.callRPC(table,method,{"device":"device_mts_01",
    arr:param[1].join(',')}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      painting_time(g,1,this,['chart_1','chart_2','chart_3']);
    })
  }

  //环境实时信息
  get_device_mts_weiss(){
    // temp温度
    //  humi湿度
    this.http.callRPC('get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata'
    ,{device:"device_weiss_01",arr:"tempreal,tempset,humireal,humiset"}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      let obj = this.temp_humi_change(g.result.message[0].message);
      //渲染温度
      if(document.getElementById('real_temperature_1'))
        equipment_four_road.create_real_temperature_v2(
          {value:obj.tempreal[0][0],title:'温度',max:70,setValue:obj.tempset[0][0]},
          echarts.init(document.getElementById('real_temperature_1')));
      //渲染湿度
      if(document.getElementById('real_temperature_2'))
        equipment_four_road.create_real_temperature_v2(
          {value:obj.humireal[0][0],title:'湿度',max:100,setValue:obj.humireal[0][0]},
          echarts.init(document.getElementById('real_temperature_2')));
    })
  }

  //环境历史信息
  get_device_mts_timerangedata(){
    this.http.callRPC('get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata'
    ,{start:"2020-01-01 14:02:00",end:"2020-11-21 20:20:00",device:"device_weiss_01",arr:"tempreal,humireal"}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      console.log(this.temp_humi_change(g.result.message[0].message));
      let arrj = this.temp_humi_change(g.result.message[0].message)
      let yearPlanData,yearOrderData,differenceData=[],visibityData=[],xAxisData=[];
      yearPlanData = arrj.tempreal.map(m => (m[0]));//温度
      yearOrderData = arrj.humireal.map(m => (m[0]));;//湿度度
      xAxisData = arrj.humireal.map(m => (dateformat(new Date(m[1]),'MM-dd hh:mm:ss')))
      // create_third_chart_line(rtm3a,this);
      rtm3a.create_third_chart_line({
        yearPlanData:yearPlanData,
        yearOrderData:yearOrderData,
        differenceData:differenceData,
        visibityData:visibityData,
        xAxisData:xAxisData,
        title:this.language?'MonthlyChartOfTemperatureAndHumidity':'温湿度月度图线'
      }, 'third_second');
    })
  }

  //环境转换
  temp_humi_change(data){
    let obj = {
      tempset:[],//温度设定值
      tempreal:[],// 温度
      humiset:[],//湿度设定值
      humireal:[],// 湿度
    }
    data.forEach(el => {
      for(let key in el)obj[key].push(el[key][0]);
    });
    return obj
  }



  //样式 逻辑方法
  
  get_td_width(num){
    return 100/num+'%'
  }
  
  //组件销毁  
  ngOnDestroy(){
    clearInterval(this.timer)
    clearInterval(this.timer60s)
    // clearInterval(this.timer1)
    // clearInterval(this.timer2)
  }



}
