import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../@core/utils/layout.service';
import { colors, rgb_del_red,list_jion,list_copy,create_third_chart_line } from '../equipment-board';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road')
// echart
let rtm3 = require('../../../../assets/eimdoard/rtm3/js/rtm3');

let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');

@Component({
  selector: 'ngx-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.scss']
})
export class EquipmentDetailsComponent implements OnInit {

  
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

  attrs_1 = {}
  attrs_2 = {}
  attrs_3 ={}

  //安灯状态
  andon = [
    {name:'4',stauts:1},
    {name:'3',stauts:0},
    {name:'2',stauts:0},
    {name:'1',stauts:0},
  ];
 

  switchStatus:any ={
    title:[`stationName`,'OnOff',`OilSeparatorOn`,`HighOilSeparator`,'InternalLock','Programlock'],
    // title:[`Station
    // name`,'开/关',`分油器开`,`分油器高`,'内锁','程序内锁'],
    data:[['Act1 and Act2',
    {value:1,color:'green',id:'circle'},{value:1,color:'green',id:'circle'},{value:1,color:'green',id:'circle'},
    {value:1,color:'white',id:'strip'},{value:1,color:'white',id:'strip'}]]
  }


  str=`试验原理：--------------------------------------------------<br>
  设备构成：-------，-------，-------，--------<br>
  试验能力：------------------------------------------------<br>
   标准试验：-------------------------------------------------<br>
                    -----------------------------------------------<br>
                    --------------------------------------------<br>
   非标试验：---------------------------------------<br>`;



  img = {
    url:'assets/eimdoard/equipment/images/car_2.png',
    name:''
  }

  list_1 = ['equipment.param1','equipment.param2'];
  list_2 = ['equipment.param1','equipment.param2'];
  list_3 = ['equipment.param1','equipment.param2'];

  @ViewChild('chart_3')chart_3:any;
  @ViewChild('chart_2')chart_2:any;
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
    //路由订阅
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

    this.click_list = [this.list_1[0],this.list_2[0],this.list_3[0]]

    //赋值
    list_copy(this.list_1,`attrs_1`,this);
    list_copy(this.list_2,`attrs_2`,this);
    list_copy(this.list_3,`attrs_3`,this);
    this.getData();
    setTimeout(() => {
      this.initChart();
      this.in();
    }, 1000);

    
  }
  
  getData(){
    // this.http.callRPC('panel_detail','get_device_panel_detail',
    //   {"deviceid":this.deviceid}).subscribe((f:any) =>{

    //   })
    
    let g = 1;
    this.timer = setInterval(f =>{
      this.xData.push(g);
      if(this.xData.length>10)this.xData.splice(0,1);
      g++;
      list_jion(this.list_1,'attrs_1',this);
      list_jion(this.list_2,'attrs_2',this);
      list_jion(this.list_3,'attrs_3',this);
      let array = ['chart_1','chart_2','chart_3'].forEach((f,i)=>{
        this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.click_list[i]],xData:this.xData,index:g});
      })
    },1000)
    
  }
timer1;
timer2;
  in(){
    let myChart_4 = echarts.init(document.getElementById('real_temperature_1'));
    let myChart_5 = echarts.init(document.getElementById('real_temperature_2'));
    equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_4);
    equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_5);
    this.timer1 = setInterval(f=>{
      equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_4);
    },3000)
    this.timer2 = setInterval(f=>{
      equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_5);
    },3000)
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
    
    
    // this.list.forEach((f,i)=>{
    //   this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.list[0]],xData:this.xData});
    // })
    
    create_third_chart_line(rtm3a,this);

    

  }


  get_td_width(num){
    return 100/num+'%'
  }


  clicEvent(e,i){
    //记录选定
    this.click_list[i-1] = e;  
    this[`chart_${i}`].painting({attrs:this[`attrs_${i}`][e],xData:this.xData});
  }

  

  ngOnDestroy(){
    clearInterval(this.timer)
    clearInterval(this.timer1)
    clearInterval(this.timer2)
  }

}
