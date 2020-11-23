import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../../../@core/utils';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
let equipment_four_road = require('../../../../../assets/eimdoard/equipment/js/equipment-four-road');
// echart
let rtm3 = require('../../../../../assets/eimdoard/rtm3/js/rtm3');

/**
 * 设备状态
 */
@Component({
  selector: 'ngx-equipment-status',
  templateUrl: './equipment-status.component.html',
  styleUrls: ['./equipment-status.component.scss']
})
export class EquipmentStatusComponent implements OnInit {

  @Input()device
  flipped = false;
   //安灯状态
   andon = [
     {name:'运行',color:'green',t:1},
     {name:'占位',color:'yellow',t:2},
    {name:'等待',color:'blue',t:3},
    {name:'维护',color:'red',t:4},
  ];
  andon_now = 1;
  language;
  
  constructor(private layoutService:LayoutService,private http:HttpserviceService) { }


  ngOnInit(): void {
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.initChart();
    })
    setTimeout(() => {
      this.initChart();
      this.get_andon_data();
      this.get_andon_data_year();
    }, 1000);
  }

  initChart(){
    // if(document.getElementById('device_circular_1')){
    //   let myChart_1 = echarts.init(document.getElementById('device_circular_1'));
    //   equipment_four_road.create_device_circular(
    //     {title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'ThisMonth':'本月',value:[]},myChart_1);
    // }
    // if(document.getElementById('device_circular_2')){
    //   let myChart_2 = echarts.init(document.getElementById('device_circular_2'));
    //   equipment_four_road.create_device_circular(
    //     {title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'LastMonth':'上个月',value:[]},myChart_2);
  
    // }
    // if(document.getElementById('device_circular_3')){
    //   let myChart_3 = echarts.init(document.getElementById('device_circular_3'));
    //   equipment_four_road.create_device_circular(
    //     {title:this.language?'LastYearAverage':'上年均值',message:'',value:[]},myChart_3);
  
    // }
    this.initOperatingRate(undefined);
    let myChart = echarts.init(document.getElementById('device_status'));
    equipment_four_road.create_device_status(undefined,myChart);

  }

  //获取安灯数据
  get_andon_data(){
    let arr = [];
    this.http.callRPC('get_device_andon_status','device_monitor.get_device_andon_status',{"device":this.device,"status":1}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      // this.andon_now = f.result.message[0].message[0].status;//灯亮哪个
      for(let i = 0;i<24;i++){
        arr.push(f.result.message[0].message[0][`hour${i}`])
      }
      this.initOperatingRate({
          xAxisData:['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'
            ,'18','19','20','21','22','23'],
          seriesData:arr,
      })
    })
   
  }

  //获取年度统计
  get_andon_data_year(){
    let arr = [[],[],[],[]];
    this.http.callRPC('get_device_andon_anual_status','device_monitor.get_device_andon_anual_status',{"device":this.device,"newyearsday":new Date().getFullYear()+"-01-01"}).subscribe((f:any)=>{
      console.log(f)
      if(f.result.error || f.result.message[0].code == 0)return;
      f.result.message[0].message.forEach(ele => {
        arr[ele.status-1] = this._conversion(ele);
      });
      this.initDeviceStatus(arr);
      let i = new Date().getMonth();//本月月份
      let  sum = arr[0][i]+arr[1][i]+arr[2][i]+arr[3][i];//总和
      let status = [{
            value: arr[0][i]
        }, {
            value: arr[1][i]
        }, {
            value: arr[2][i]
        }, {
            value: arr[3][i]
        }];
      this.initDeviceCircula({title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'ThisMonth':'本月',value:status},'device_circular_1');
      status[0].value = arr[0][i-1],status[1].value = arr[1][i-1],status[2].value = arr[2][i-1],status[3].value = arr[3][i-1];
      this.initDeviceCircula({title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'LastMonth':'上个月',value:status},'device_circular_2');
      //在渲染完前两个之后再请求防止异步请求导致同时调用
      this.get_andon_data_lastyear();
    })
  }
//获取上一年度统计
  get_andon_data_lastyear(){
    let status = [{
      value: 0
    }, {
        value: 0
    }, {
        value: 0
    }, {
        value: 0
    }];
    this.http.callRPC('get_device_andon_anual_status','device_monitor.get_device_andon_anual_status',{"device":this.device,"newyearsday":new Date().getFullYear()-1+"-01-01"}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      f.result.message[0].message.forEach(ele => {
        for(let key in kv)
          status[ele.status-1].value += ele[key]?ele[key]:0;
      });
      if(document.getElementById('device_circular_3')){
        let myChart_3 = echarts.init(document.getElementById('device_circular_3'));
        equipment_four_road.create_device_circular(
          {title:this.language?'LastYearAverage':'上年均值',message:'',value:status},myChart_3);
      }
    })
  }


  _conversion(data){
    var arr = [];
    for(let key in kv)arr.push(data[key]?data[key]:0);
    return arr;
  }


  array_to_sum(arr){
    var sum = 0;
    arr.forEach(el => {
      sum += el
    });
    return sum;
  }







  //初始化二十四小时表格
  initOperatingRate(gauge_data_4){
    let operatingRate = echarts.init(document.getElementById('operatingRate'));
    rtm3.create_right_buttom(gauge_data_4,operatingRate);
  }
  //渲染年表格
  initDeviceStatus(data){
    let data_1 = {
      d_arr:[[],[],[],[]],
      title_arr:["运行", "占位","等待", "维护"],
      color_arr:[{
        start: "rgb(74, 181, 107)",
        end: "rgb(74, 181, 107)"
    },
    {
        start: "#faa755",
        end: "#faa755"
    },
    {
        start: "#006ced",
        end: "#006ced"
    },
    {
        color: " #d71345"
    }
  ],
    xData:['1','2','3','4','5','6','7','8','9','10','11','12']
    };
    data_1.d_arr = data;
    let myChart = echarts.init(document.getElementById('device_status'));
    equipment_four_road.create_device_status(data_1,myChart);
  }
  //渲染圆盘
  initDeviceCircula(data,id){
    if(document.getElementById(id)){
      let myChart = echarts.init(document.getElementById(id));
      equipment_four_road.create_device_circular(data,myChart);
    }
  }
  
}


export const kv = {
  'january':1,'february':2,'march':3,'april':4,'may':5,'june':6,'july':7,
  'august':8,'september':9,'october':10,'november':11,'december':12
};
