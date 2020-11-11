import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../@core/utils';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road')
@Component({
  selector: 'ngx-equipment-mast-v2',
  templateUrl: './equipment-mast-v2.component.html',
  styleUrls: ['./equipment-mast-v2.component.scss']
})
export class EquipmentMastV2Component implements OnInit {

  attrs_1 = [{ 
    name: "参数1", unit: "V",value: ["10", "29", "49", "31", "31", "31", "31", "31", "30", "17"],show:true
    ,color:["#00FF00", "#00FF00"]
  },{ 
      name: "参数2", unit: "V",value: ["0", "19", "32", "30", "32", "30", "31", "31", "30", "0"],
      color:["#ff00ff", "#ff00ff"]
  },{ 
      name: "参数3", unit: "V",value: ["0", "2", "31", "30", "31", "43", "51", "50", "46", "9"],
      color:["#d9d919", "#d9d919"]
  },{ 
    name: "参数4", unit: "V",value: ["0", "3", "45", "30", "31", "43", "51", "50", "46", "4"],
    color:["#d9d919", "#d9d919"]
},{ 
  name: "参数5", unit: "V",value: ["0", "4", "41", "30", "31", "43", "51", "50", "46", "3"],
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数6", unit: "V",value: ["0", "5", "32", "30", "31", "43", "51", "50", "46", "6"],
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数7", unit: "V",value: ["0", "6", "2", "30", "31", "43", "51", "50", "46", "1"],
  color:["#d9d919", "#d9d919"]
}]
  xData = ["2020-01", "2020-02", "2020-03", "2020-04", "2020-05", "2020-06", "2020-07", "2020-08", "2020-09", "2020-10"];

  attrs_2 = JSON.parse(JSON.stringify(this.attrs_1));
  attrs_3 = JSON.parse(JSON.stringify(this.attrs_2));


testInformation = {
  name:'悬置Mastable多轴路谱耐久振动试验',
  content: '悬置Mastable多轴路谱耐久振动试验悬置Mastable多轴路谱耐久振动试验悬置Mastable多轴路谱',
  duration:'2020.10.9-2020.12.31'
}

//试验信息
experiment ={
  header:[{t:'项目信息',s:{w:'33%'}},{t:'当前进度',s:{w:'66%'}}],
  data:[
    ['AS32',70],
  ],
  people:[
    {name:'温奇炜 ',imgSrc:'../../../../assets/eimdoard/equipment/images/people1.png',job:'责任工程师',frequency:'白班',phone:'1231231231312'},
    {name:'吴鹏',imgSrc:'../../../../assets/eimdoard/equipment/images/people2.png',job:'责任技师',frequency:'晚班',phone:'1231231231312'}
  ]
}

//设备介绍
introduce = {
  src : '../../../../assets/eimdoard/equipment/images/equipment.png',
  str:`MAST多轴振动台由液压伺服控制进行6自由度振动模拟试验，可以进行悬置多轴振动试验、冷却模块多轴振动试验、新能源电池包振动试验、仪表台总成振动试验、座椅总成振动试验等系统试验。`,
}

//运行状态
runningS = [
  {name:'设备运行状态',status:1},
  {name:'设备压力状态',status:0}
]

// 1 高压 0 自动 -1离线
hudHighPressure = [
  {name:'油泵1',value:1},
  {name:'油泵2',value:0},
  {name:'油泵3',value:0},
  {name:'油泵4',value:1},
  {name:'油泵5',value:-1},
  {name:'油泵6',value:0},
]

//动力参数
dashboardList = [
  {id:'dashboard_1',name:'平均油压',value:12,percentage:'6.15',lampcolor:'green',s:1,title:'油压'},
  {id:'dashboard_2',name:'平均油温',value:12,percentage:'6.15',lampcolor:'green',s:1,title:'油温'},
  {id:'dashboard_3',name:'冷却进水压',value:12,percentage:'6.15',lampcolor:'green',s:1,title:''},
  {id:'dashboard_4',name:'冷却出水压',value:12,percentage:'6.15',lampcolor:'yellow',s:0,title:''},
  {id:'dashboard_5',name:'冷却水温',value:12,percentage:'6.15',lampcolor:'green',s:1,title:''},
];

//传感器状态
sensorList = [
  {name:'漏油检测A1-1',type:'lamp',value:1,},
  {name:'漏油检测A1-2',type:'lamp',value:1,},
  {name:'温度',type:'number',value:27.3,},
  {name:'漏油检测A2-1',type:'lamp',value:1,},
  {name:'漏油检测A2-2',type:'lamp',value:1,},
  {name:'温度',type:'number',value:74.2,},
  {name:'环境噪声1',type:'number',value:45,},
  {name:'环境噪声2',type:'number',value:47,},
]

@ViewChild('chart_1')chart_1:any;
@ViewChild('chart_2')chart_2:any;
@ViewChild('chart_3')chart_3:any;

constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute) { }

ngOnInit(): void {
  this.layoutService.onInitLayoutSize().subscribe(f=>{
    this.initChart();
  })

  this.activateInfo.params.subscribe(f =>{
    console.log(f);
    if(document.getElementById('head_title'))
      document.getElementById('head_title').innerText = f.title;
  })

  
}

//
initChart(){
  //设备利用率
  let chart_1 = echarts.init(document.getElementById('percentage'));
  equipment_four_road.create_device_circular({title:'93.2%',message:''},chart_1);

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

  let myChart_1 = {};
  this.dashboardList.forEach((f,i)=>{
    myChart_1[f.id] = echarts.init(document.getElementById(f.id));
    equipment_four_road.create_real_single_dashboard(
      {
        record:{value:f.value,name:f.name},percentage:f.percentage,
        max:325,//仪表盘最大值
        splitNumber:5,//刻度平均分的份数
      }
      ,myChart_1[f.id]);
  })

  this.chart_1.painting({attrs:this.attrs_1,xData:this.xData});
  this.chart_2.painting({attrs:this.attrs_2,xData:this.xData});
  this.chart_3.painting({attrs:this.attrs_3,xData:this.xData});
}


clicEvent(e,i){
  this[`chart_${i}`].painting({attrs:this[`attrs_${i}`][e],xData:this.xData});
}

getleft(item){
  return item > 40?item-20+'%':'20%';
}

get_height(){
  return this.experiment.data.length <= 2?31*this.experiment.data.length+'px':'120px';
}

getWidth(num){
  return 100/num+'%'
}


}
