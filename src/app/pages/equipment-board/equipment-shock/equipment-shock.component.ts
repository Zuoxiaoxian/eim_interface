import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../@core/utils/layout.service';
import { colors, rgb_del_red } from '../equipment-board';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');
let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');

let rtm3 = require('../../../../assets/eimdoard/rtm3/js/rtm3');

@Component({
  selector: 'ngx-equipment-shock',
  templateUrl: './equipment-shock.component.html',
  styleUrls: ['./equipment-shock.component.scss']
})
export class EquipmentShockComponent implements OnInit {
  attrs = [{ 
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

  //ngx-chart-curve-v3对象
  @ViewChild('chart_3')chart_3:any;
  @ViewChild('chart_2')chart_2:any;
  @ViewChild('chart_1')chart_1:any;

  //安灯状态
  andon = [
    {name:'4',color:'blue',status:1},
    {name:'3',color:'green',status:1},
    {name:'2',color:'yellow',status:0},
    {name:'1',color:'red',status:0},
  ];
  //实验信息
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

  // 实验实时状态表的实时数据
  switchStatus:any ={
    title:[`stationName`,'OnOff','InternalLock','Programlock'],
    data:[['Act1 and Act2',
      {value:1,id:'circle',color:'green'},{value:1,id:'strip',color:'white'},{value:1,id:'strip',color:'white'},]]
  }


  //图片
  img = {
    url:'assets/eimdoard/equipment/images/car_2.png',//中间的图片
    name:''
  }

  // 实验实时状态表的实时数据
  real_list = [
    {name:'MAST',value:'关',color:'red'},
    {name:'TIF 1',value:'低',color:'green'},
    {name:'TIF 2',value:'高',color:'green'},
  ]

  //每一个ngx-chart-curve-v3 中有哪些tag
  list_1 = ['equipment.param1','equipment.param2'];
  list_2 = ['equipment.param1','equipment.param2']
  list_3 = ['equipment.dataChannelList']
  click_list = [];//当前选中的tag

  timer:any;//定时器
  language = '';//语言 空为zh-CN中文
  //设备介绍
  str = `试验原理：--------------------------------------------------<br>
  设备构成：-------，-------，-------，--------<br>
  试验能力：------------------------------------------------<br>
   标准试验：-------------------------------------------------<br>
                    -----------------------------------------------<br>
                    --------------------------------------------<br>
   非标试验：---------------------------------------<br>`;

  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    //订阅左上角打开关闭
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.initChart();
    })
    //订阅路由返回的标题
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
        rgb =  colors[i];f
      f.color = [rgb,rgb];
    })

    // ngx-chart-curve-v3进来默认的选中中记录
    this.click_list = [this.list_1[0],this.list_2[0],this.list_3[0]]

    //赋值
    this.list_1.forEach((f,i)=>{
      this[`attrs_1`][f] = JSON.parse(JSON.stringify(this.attrs));
    })
    this.list_2.forEach((f,i)=>{
      this[`attrs_2`][f] = JSON.parse(JSON.stringify(this.attrs));
    })
    this.list_3.forEach((f,i)=>{
      this[`attrs_3`][f] = JSON.parse(JSON.stringify(this.attrs));
    })
    //获取数据
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
      g++;
      this.list_1.forEach((f,i)=>{
        this[`attrs_1`][f].forEach(element => {
          element.value.push(parseInt((Math.random()*100).toString()))
        });
      })
      this.list_2.forEach((f,i)=>{
        this[`attrs_2`][f].forEach(element => {
          element.value.push(parseInt((Math.random()*100).toString()))
        });
      })
      this.list_3.forEach((f,i)=>{
        this[`attrs_3`][f].forEach(element => {
          element.value.push(parseInt((Math.random()*100).toString()))
        });
      })
      let array = ['chart_1','chart_2','chart_3'].forEach((f,i)=>{
        this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.click_list[i]],xData:this.xData,index:1});
      })
      
    },1000)
  }
  
  //初始化图表
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
    equipment_four_road.create_device_circular({title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'LastMonth':'上个月'},myChart_1);

    let myChart_2 = echarts.init(document.getElementById('device_circular_2'));
    equipment_four_road.create_device_circular({title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'ThisMonth':'本月'},myChart_2);

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

    let operatingRate = echarts.init(document.getElementById('operatingRate'));
    var gauge_data_4 = {
      xAxisData:['0时','1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时'
        ,'18时','19时','20时','21时','22时','23时'],
      seriesData:[710, 312, 321,754, 500, 830, 710, 521, 504, 660, 530, 410,710, 312, 321,754, 500, 830, 710, 521, 504, 660, 530, 410],
    } 
    rtm3.create_right_buttom(gauge_data_4,operatingRate);

    this.create_third_chart_line();
  }

  //计算定位 左
  getleft(item){
    return item > 40?item-20+'%':'20%';
  }

  //计算宽度
  get_td_width(num){
    return 66/num+'%'
  }
  //计算高度
  get_height(){
    return this.experiment.data.length <= 2?31*this.experiment.data.length+'px':'120px';
  }

  //选中改变重新画表格
  clicEvent(e,i){
    //记录选定
    this.click_list[i-1] = e;
    this[`chart_${i}`].painting({attrs:this[`attrs_${i}`][e],xData:this.xData});
  }

  //温湿度图表
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
  //组件销毁
  ngOnDestroy(){
    clearInterval(this.timer)
  }

}