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
    if(document.getElementById('device_circular_1')){
      let myChart_1 = echarts.init(document.getElementById('device_circular_1'));
      equipment_four_road.create_device_circular(
        {title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'LastMonth':'上个月'},myChart_1);
    }
    if(document.getElementById('device_circular_2')){
      let myChart_2 = echarts.init(document.getElementById('device_circular_2'));
      equipment_four_road.create_device_circular(
        {title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'ThisMonth':'本月'},myChart_2);
  
    }
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
    this.http.callRPC('get_device_andon_anual_status','device_monitor.get_device_andon_anual_status',{"device":this.device,"newyearsday":"2020-01-01"}).subscribe((f:any)=>{
      console.log(f)
      if(f.result.error || f.result.message[0].code == 0)return;
      f.result.message[0].message.forEach(ele => {
        arr[ele.status-1] = this._conversion(ele);
      });
      this.initDeviceStatus(arr);
    })
  }

  _conversion(data){
    var arr = [];
    var kv = {
      'january':1,'february':2,'march:':3,'april':4,'may':5,'june':6,'july':7,
      'august':8,'september':9,'october':10,'november':11,'december':12
    };
    for(let key in kv)arr.push(data[key]?data[key]:0);
    return arr;
  }










  //初始化二十四小时表格
  initOperatingRate(gauge_data_4){
    let operatingRate = echarts.init(document.getElementById('operatingRate'));
    rtm3.create_right_buttom(gauge_data_4,operatingRate);
  }

  initDeviceStatus(data){
    let data_1 = {
      d_arr:[[],[],[],[]],
      title_arr:["空闲", "占位", "运行", "维护"],
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
    xData:['1','2','3','4','5','6','7','8','9','10','11','12']
    };
    data_1.d_arr = data;
    let myChart = echarts.init(document.getElementById('device_status'));
    equipment_four_road.create_device_status(data_1,myChart);
  }
}
