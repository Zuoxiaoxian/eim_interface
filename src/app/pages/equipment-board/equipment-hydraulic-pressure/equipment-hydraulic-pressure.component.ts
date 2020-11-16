import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../@core/utils/layout.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, rgb_del_red,getMessage,painting_time,create_third_chart_line } from '../equipment-board';
let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road')
let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');

let rtm3 = require('../../../../assets/eimdoard/rtm3/js/rtm3');

// 引入jquery
declare var $:any;

@Component({
  selector: 'ngx-equipment-hydraulic-pressure',
  templateUrl: './equipment-hydraulic-pressure.component.html',
  styleUrls: ['./equipment-hydraulic-pressure.component.scss']
})
export class EquipmentHydraulicPressureComponent implements OnInit {

  xData = [];

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

  @ViewChild('chart_2')chart_2:any;
  @ViewChild('chart_1')chart_1:any;

  //安灯状态
  andon = [
    {name:'4',color:'blue',status:1},
    {name:'3',color:'green',status:1},
    {name:'2',color:'yellow',status:0},
    {name:'1',color:'red',status:0},
  ];
  //试验信息
  experiment ={
    user:'周工',
    phone:'13499998888',
    nexttest:'Geely001',
    nextdate:'20/11/01-20/11/30',
    // '实验编号','计划时长','进度'
    title:['ExperimentNum','PLanDuration','schedule'],
    data:[
      ['WSN-100010','20/10/01-20/11/01',70],
      ['WSN-100010','20/10/01-20/11/01',70],
      ['WSN-100010','20/10/01-20/11/01',70],
      ['WSN-100010','20/10/01-20/11/01',70],
      ['WSN-100010','20/10/01-20/11/01',70],
    ]
  }
//日志与警告
  log_warm = {
    // '时间','日志等级','日志信息'
    title:['time','Loglevel','logInfor'],
    data:[
    ]
  }
  //实验实时状态
  switchStatus: any ={
    title:[`stationNameCGF`,'OnOff','InternalLock','Programlock'],
    // title:[`Station name（cfg）`,'开/关','内锁','程序内锁'],
    data:[
      ['',
      {value:1,id:'circle',color:''}
      ,{value:1,id:'strip',color:''},{value:1,id:'strip',color:''},],
      ['',
      {value:0,id:'circle',color:''}
      ,{value:0,id:'strip',color:''},{value:0,id:'strip',color:''},],
      ['',
      {value:1,id:'circle',color:''}
      ,{value:1,id:'strip',color:''},{value:1,id:'strip',color:''},],
      ['',
      {value:0,id:'circle',color:''}
      ,{value:0,id:'strip',color:''},{value:0,id:'strip',color:''},],
      ['',
      {value:0,id:'circle',color:''}
      ,{value:0,id:'strip',color:''},{value:0,id:'strip',color:''},]
    ]
  }

  //分油器 open 关0 开1  high低 0 高1
  real_list = [
    {name:'1',on:0,high:0},
    {name:'2',on:0,high:0},
    {name:'3',on:0,high:0},
    {name:'4',on:0,high:0},
    {name:'5',on:0,high:0},
    {name:'6',on:0,high:0},
  ];

  img = {
    url:'assets/eimdoard/equipment/images/car_2.png',//中间图片
    name:''
  } 

  // ngx-chart-curve-v3有哪些tag
  list_2 = ['equipment.road.LeftFront.Params','equipment.road.RightFront.Params'];
  list_1 = ['equipment.road.LeftRear.Params','equipment.road.RightRear.Params'];

  //设备介绍
  str = `试验原理：--------------------------------------------------<br>
  设备构成：-------，-------，-------，--------<br>
  试验能力：------------------------------------------------<br>
   标准试验：-------------------------------------------------<br>
                    -----------------------------------------------<br>
                    --------------------------------------------<br>
   非标试验：---------------------------------------<br>`;

  click_list = [];//当前选中的tag
  deviceid: any;//设备编号


  timer:any;//定时器
  language = '';//语言 空为zh-CN中文


  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute,private http:HttpserviceService) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    //订阅左上角点击后宽度改变
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.initChart();
    })
    //路由参数  标题
    this.activateInfo.params.subscribe(f =>{
      console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })

    //颜色赋值
    this.color();

    //记录默认进去选中的tag
    this.click_list = [this.list_1[0],this.list_2[0]]
    this.getData();
    setTimeout(() => {
      this.initChart();
      this.in();
        
      }, 1000);
    
  }
  timer1;
  timer2;

  in(){
    let myChart_4 = echarts.init(document.getElementById('real_temperature_1'));
    let myChart_5 = echarts.init(document.getElementById('real_temperature_2'));
    equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_4);
    equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_5);
    this.timer1= setInterval(f=>{
      equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_4);
    },3000)
    this.timer2 = setInterval(f=>{
      equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_5);
    },3000)
    // let arr = [this.chart_1,this.chart_2].forEach((f,i)=>{
    //   this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.click_list[i]],xData:[],index:1});

    // })
   
    
  }

  getData(){
     // 定时添加数据
     let table,method = '';
    this.timer = setInterval(f =>{
      this.get_device_mts_01_status();//实时状态表
      this.get_device_mst_oilseparator();//开油器
      let param = this.create_param();
      this.get_device_mts_01_status();
      this.get_device_mts_log();
      if(param[1].length > 0){
        table = 'get_device_mts_realtimedata',method = 'device_monitor.get_device_mts_realtimedata';
        this.get_device_mts_realtimedata(table,method,param);
      }
      if(param[0].length > 0){
        table = 'get_device_mts_timerangedata',method = 'device_monitor.get_device_mts_timerangedata';
        this.get_device_mts_time(table,method,param);
      }
      
    },1000)

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
    let myChart_3 = echarts.init(document.getElementById('warning'));
    equipment_four_road.create_warning_chart(data,myChart_3);

    if(document.getElementById('real_temperature_1')){
      let myChart_4 = echarts.init(document.getElementById('real_temperature_1'));
      equipment_four_road.create_real_temperature({value:55.33},myChart_4);
    }

    if(document.getElementById('real_temperature_2')){

      let myChart_5 = echarts.init(document.getElementById('real_temperature_2'));
      equipment_four_road.create_real_temperature({value:55.33},myChart_5);
    }

    // setInterval(f=>{
    //   equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_4);
    // },3000)
    // setInterval(f=>{
    //   equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_5);
    // },3000)


    create_third_chart_line(rtm3a,this);

  }

   //重新画
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
    ['attrs_1','attrs_2'].forEach(element => {
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
   *        "interlock"="内锁"
            "programinterlock"="程序锁"
            "runstop"='起停状态
            "stationname"="台架试验"
            "hsmt9j28aon"="分油器开"
            "hsmt9j28ahigh"="分油器高"
   */
  get_device_mts_01_status(){
    this.http.callRPC('get_device_mts_01_status','device_monitor.get_device_mts_01_status',{}).subscribe((g:any) =>{
      this.switchStatus.data.forEach((f,i) => {
        f[0] =  g.result.message[0][0].stationname;
        //起停状态
        f[1].value =  g.result.message[0][0].runstop;
        f[1].color =  f[1].value == 1?'green':'#C0C0C0';
        //内锁
        f[2].value =  g.result.message[0][0].interlock;
        f[2].color =  f[2].value == 1?'white':'orange';
        //程序锁
        f[3].value =  g.result.message[0][0].programinterlock;
        f[3].color =  f[3].value == 1?'white':'orange';
      });
      
    })
  }


/**
   * 获取一段时间
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
      painting_time(f,10,this,['chart_1','chart_2']);
      
    })
  }

  /**
   * 分油器
   */
  get_device_mst_oilseparator(){
    this.http.callRPC('get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata',
    {'device':'device_mts_04',arr:"hsmt9j28aon,hsmt9j28ahigh,hsmt9j28bon,hsmt9j28bhigh,hsmt8j28aon,hsmt8j28ahigh,hsmt8j28bon,hsmt8j28bhigh,hsmt7j28aon,hsmt7j28ahigh,hsmt7j28bon,hsmt7j28bhigh"}
    ).subscribe((f:any)=>{
      console.log(f);
      let _key = "";//请求到的数据字段前面部分固定的
      let o = -1;//real_time数据的下标
      if(f.result.error || f.result.message[0].code == 0)return;
      f.result.message[0].message.forEach(el => {
        for(let key in el){
          switch(true){
            case key.includes('hsmt9j28a'):
                _key = 'hsmt9j28a';
                o = 0;
              break;
              case key.includes('hsmt9j28b'):
                _key = 'hsmt9j28b';
                o = 1;
              break;
              case key.includes('hsmt8j28a'):
                _key = 'hsmt8j28a';
                o = 2;
              break;
              case key.includes('hsmt8j28b'):
                _key = 'hsmt8j28b';
                o = 3;
              break;
              case key.includes('hsmt7j28a'):
                _key = 'hsmt7j28a';
                o = 4;
              break;
              case key.includes('hsmt7j28b'):
                _key = 'hsmt7j28b';
                o = 5;
              break;
          }
          // console.log(_key);
          this.real_list[o][key.split(_key)[1]] = el[key][0][0];
        }
      });

    })
  }

  /**
   * 获取一秒
   * @param table 
   * @param method 
   * @param param 
   */
  get_device_mts_realtimedata(table,method,param){
    this.http.callRPC(table,method,{"device":"device_mts_01",
    arr:param[1].join(',')}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      painting_time(g,1,this,['chart_1','chart_2']);
    })
  }

  /**
   * 获取日志数据
   * @param table 
   * @param method 
   */
  get_device_mts_log(){
    this.http.callRPC('get_device_mts_log','device_monitor.get_device_mts_log',{"device":"device_mts_01"}).subscribe((g:any) =>{
        console.log(g)
        if(g.result.error || g.result.message[0].code == 0)return;
        getMessage(g,this.log_warm.data);

    })
  }

   

  // 分油器的按钮显示
  getbtnStatus(item,i){
    let j = -1;
    //如果开着 需要看高还是低
    let bol = false;
    j = item.on == 0 ?1:item.high == 1?3:2;
    if(i == j)return true;
    else return false;
  }

  //样式 逻辑方法
  getleft(item){
    return item > 40?item-20+'%':'20%';
  }
  get_td_width(num,i){
    if(i == 0)return '23%'
    return 77/num+'%'
  }
  get_height(){
    return this.experiment.data.length <= 2?31*this.experiment.data.length+'px':'120px';
  }
  get_height_real(){
    return 100/this.real_list.length +'%'
  }

  ngOnDestroy(){
    clearInterval(this.timer);
    clearInterval(this.timer1)
    clearInterval(this.timer2)

  }

}
