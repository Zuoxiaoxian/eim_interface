import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../@core/utils/layout.service';
import { colors, rgb_del_red,list_jion,list_copy,create_third_chart_line } from '../equipment-board';

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
    list_copy(this.list_1,`attrs_1`,this);
    list_copy(this.list_2,`attrs_2`,this);
    list_copy(this.list_3,`attrs_3`,this);

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
      if(this.xData.length >10)this.xData.splice(0,1)
      g++;
      list_jion(this.list_1,'attrs_1',this);
      list_jion(this.list_2,'attrs_2',this);
      list_jion(this.list_3,'attrs_3',this);
      let array = ['chart_1','chart_2','chart_3'].forEach((f,i)=>{
        this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.click_list[i]],xData:this.xData,index:1});
      })
    },1000)
    setTimeout(() => {
      this.initChart();
      this.in();
    }, 1000);
  }

 
  timer1 ;
  timer2 ;

  in(){
    
    let myChart_5 = echarts.init(document.getElementById('real_temperature_2'));
    equipment_four_road.create_real_temperature({value:55.33},myChart_5);

    let myChart_4 = echarts.init(document.getElementById('real_temperature_1'));
    equipment_four_road.create_real_temperature({value:55.33},myChart_4);
    this.timer1 = setInterval(f=>{
      equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_4);
    },3000)
    this.timer2 = setInterval(f=>{
      equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_5);
    },3000)
  }
  
  //初始化图表
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

    // let myChart_4 = echarts.init(document.getElementById('real_temperature_1'));
    // equipment_four_road.create_real_temperature({value:55.33},myChart_4);

    // let myChart_5 = echarts.init(document.getElementById('real_temperature_2'));
    // equipment_four_road.create_real_temperature({value:55.33},myChart_5);
    // setInterval(f=>{
    //   equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_4);
    // },3000)
    // setInterval(f=>{
    //   equipment_four_road.create_real_temperature({value:Math.floor(Math.random() * 101)},myChart_5);
    // },3000)

    // this.list.forEach((f,i)=>{
    //   this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.list[0]],xData:this.xData});
    // })

    create_third_chart_line(rtm3a,this);

  }



  //计算宽度
  get_td_width(num){
    return 66/num+'%'
  }


  //选中改变重新画表格
  clicEvent(e,i){
    //记录选定
    this.click_list[i-1] = e;
    this[`chart_${i}`].painting({attrs:this[`attrs_${i}`][e],xData:this.xData});
  }

  //组件销毁
  ngOnDestroy(){
    clearInterval(this.timer)
  }

}
