import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../@core/utils/layout.service';
import { colors, rgb_del_red,list_jion,list_copy } from '../equipment-board';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');
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

    //赋值
    list_copy(this.list,`attrs_1`,this);
    this.attrs_2 = JSON.parse(JSON.stringify(this.attrs));
    this.attrs_3 = JSON.parse(JSON.stringify(this.attrs));
    this.getData();
    setTimeout(() => {
      this.initChart();
      this.in()
    }, 1000);
  }
  

  getData(){
    // this.http.callRPC('panel_detail','get_device_panel_detail',
    //   {"deviceid":this.deviceid}).subscribe((f:any) =>{

    //   })
    
    let g = 1;
    this.timer = setInterval(() =>{
      this.xData.push(g);
      if(this.xData.length>10)this.xData.splice(0,1);
      g++;

      list_jion(this.list,'attrs_1',this);
      [2,3].forEach(f=>{
        this[`attrs_${f}`].forEach(m =>{
          m.value.push(parseInt((Math.random()*100).toString()));
          if(m.value.length >10 )m.value.splice(0,1);
        })
      })
      //只有一个公共组件
      this.chart_1.painting({attrs:this.attrs_1[this.click_list[0]],xData:this.xData,index:g});
      if(document.getElementById('discharge_chart')){
        let myChart_8 = echarts.init(document.getElementById('discharge_chart'));;
        equipment_four_road.create_real_discharge({attrs:this.attrs_2,xData:this.xData},myChart_8);
      }
      
      if(document.getElementById('discharge_chart_1')){
        let myChart_9 = echarts.init(document.getElementById('discharge_chart_1'));;
        equipment_four_road.create_real_discharge({attrs:this.attrs_3,xData:this.xData},myChart_9);
      }

    },2000)
    
  }

  timer1;

  in(){
    let myChart_7 = [];
    this.outRenturnWind.forEach((f:any,i:number) => {
      if(!document.getElementById('electric_chart_'+i))return;
      myChart_7.push(echarts.init(document.getElementById('electric_chart_'+i)));
      equipment_four_road.create_real_electric({text:f.text,title:this.language?f.titleEn:f.title},myChart_7[i]);
    });
    let myChart_4;
    if(document.getElementById('real_temperature_4')){
      myChart_4 = echarts.init(document.getElementById('real_temperature_4'));
      equipment_four_road.create_real_disk({value:55,text:this.language?'RealTEMP':'实时温度',unit:'℃'},myChart_4);
    }

    let myChart_5;
    if(document.getElementById('real_temperature_5')){
      myChart_5 = echarts.init(document.getElementById('real_temperature_5'));
      equipment_four_road.create_real_disk({value:55,text:this.language?'RealRH':'实时湿度',unit:'%RH'},myChart_5);
    }
    let myChart_6;
    if(document.getElementById('real_temperature_6')){
      myChart_6 = echarts.init(document.getElementById('real_temperature_6'));
      equipment_four_road.create_real_disk({value:55,text:this.language?'CabinPA':'舱内压差',unit:'pa'},myChart_6);
    }
    this.timer1 = setInterval(f=>{
      if(!myChart_5)myChart_5 = echarts.init(document.getElementById('real_temperature_5'));
      if(!myChart_4)myChart_4 = echarts.init(document.getElementById('real_temperature_4'));

      
      if(myChart_5)equipment_four_road.create_real_disk({value:parseInt((Math.random()*100).toString()),text:this.language?'RealTEMP':'实时温度',unit:'%RH'},myChart_5);
      if(myChart_4)equipment_four_road.create_real_disk({value:parseInt((Math.random()*100).toString()),text:this.language?'RealRH':'实时湿度',unit:'℃'},myChart_4);
      equipment_four_road.create_real_disk({value:parseInt((Math.random()*100).toString()),text:this.language?'CabinPA':'舱内压差',unit:'pa'},myChart_6);
      this.outRenturnWind.forEach((f:any,i:number) => {
        if(!echarts.init(document.getElementById('electric_chart_'+i)))return;
        myChart_7.push(echarts.init(document.getElementById('electric_chart_'+i)));
        equipment_four_road.create_real_electric({text:parseInt((Math.random()*100).toString()),title:this.language?f.titleEn:f.title},myChart_7[i]);
      });
    },3000)
  }

  initChart(){
    this.initChart_1();

    let myChart_7 = [];
    this.outRenturnWind.forEach((f:any,i:number) => {
      if(!document.getElementById('electric_chart_'+i))return;
      myChart_7.push(echarts.init(document.getElementById('electric_chart_'+i)));
      equipment_four_road.create_real_electric({text:f.text,title:this.language?f.titleEn:f.title},myChart_7[i]);
    });

  }

  initChart_1(){
    if(document.getElementById('real_temperature_4'))
      equipment_four_road.create_real_disk({value:55,text:this.language?'RealTEMP':'实时温度',unit:'℃'},echarts.init(document.getElementById('real_temperature_4')));
    if(document.getElementById('real_temperature_5'))
      equipment_four_road.create_real_disk({value:55,text:this.language?'RealRH':'实时湿度',unit:'%RH'},echarts.init(document.getElementById('real_temperature_5')));
    if(document.getElementById('real_temperature_6'))
      equipment_four_road.create_real_disk({value:55,text:this.language?'CabinPA':'舱内压差',unit:'pa'},echarts.init(document.getElementById('real_temperature_6')));
  }

  getleft(item){
    return item > 40?item-20+'%':'20%';
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
    clearInterval(this.timer);
    clearInterval(this.timer1)

    
  }

}
