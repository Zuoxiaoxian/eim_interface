import { Component, OnInit } from '@angular/core';
import {Screenfull} from "screenfull";
import * as screenfull from "screenfull";
import {HttpserviceService} from "../../../services/http/httpservice.service";
import {LayoutService} from "../../../@core/utils";
import { ActivatedRoute, Router } from '@angular/router';

// echart
let rtm3 = require('../../../../assets/eimdoard/rtm3/js/rtm3');
let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');
let rtmjs = require('../../../../assets/eimdoard/rtmv2/js/rtmv2');
// 引入jquery
declare var $:any;

@Component({
  selector: 'ngx-real-time-fourwd-second',
  templateUrl: './real-time-fourwd-second.component.html',
  styleUrls: ['./real-time-fourwd-second.component.scss'],
})
export class RealTimeFourwdSecondComponent implements OnInit {
  color = {//运行状态 颜色
    'red': '#ef063c',
    'green': '#7fee1d',
  };
  //看板整体图表名字
  panel = {
    equipment_params: '设备参数',
    center_picture: '中间图片',
    equipment_curve: '设备曲线',
    KPI: 'KPI分析',
    health: '健康分析'
  };
  equipment_params: any = {
      title: ["指标", "值", "单位", "凸显"],//表头
      data: [],
  };
  //设备编号
  deviceid = 'device_boyang_01';
  //路由跳转带过来的参数
  fromRouter: any = {
    url:'',//从哪个页面跳转过来的
  }
  //当前是都是全屏
  is_not_fullscreen = true;
  //实时数据
  real_time_data = {
    title: '整车四驱排放测试设备',
    address: 'S1111环境试验室',//地址
    //第二行数据
    second_data:{
      running_state: {
        text: '运行',
        color: this.color.green,
      },
      task_name: '排放排放',
      task_number: '123456789',
      task_pace: '60%',
      user_name: '张三',
      user_phone: '123456789',
    }
  };
  //图片
  img = {
    head: {
      name:' 头像',
      src: 'assets/eimdoard/rtm3/images/head.png'
    },
    car: {
      name: '',
      src: 'assets/eimdoard/rtm3/images/center2.png',
    }
  }


  //当前的按钮下标
  button = {
    "biao":{2: "", 3: ""},
    "biaoName":{2: "", 3: ""},
    "biaoValue":{2: "", 3: ""},
    "qushi":[],
    "qushiName":[],
    "qushiValue":[],
    "guanji":{},
    "guanjiName":{},
    "guanjiValue":{},
  }
  kpi_chart_arr = [ 
    // 'third_first_3', 'third_first_4'
  ];
  messageInterval: any;

  constructor(private http: HttpserviceService,private layoutService: LayoutService,
    private activateInfo:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getData();
    //重新生成echart表格
    this.layoutService.onChangeLayoutSize().subscribe(f =>{
      this.initChart();
    })  
    this.initChart();
    

    let i = 1;
    this.messageInterval = setInterval(f =>{
      this.getMessageData(i);
      i++;
    },3000)
  }

  initChart(){
    rtm3a.create_second_chart({
      xAxis:this.button.qushiName,
      seriesData:this.button.qushiValue,
    });
    this.kpi_chart_arr.forEach(f =>{
      rtm3a.create_third_chart({}, echarts.init(document.getElementById(f)));
    });
    rtm3a.create_third_chart_line({}, 'third_second');
    rtmjs.gauge1(this.button['biaoValue'][2]);
    rtmjs.gauge1(this.button['biaoValue'][3]);
  }

  ngAfterViewInit(){
    //路由跳转
    this.activateInfo.queryParams.subscribe(f =>{
      if(f.deviceid)this.deviceid = f.deviceid;
      this.fromRouter = f
    })
  }


  getData(){
    this.http.callRPC('panel_detail','get_device_panel_detail',
      {"deviceid":this.deviceid}).subscribe((f:any) => {
      let arr = f.result.message[0]
      this.equipment_params.data = arr.map(d => (
      {
        title: d[0].channelcn,
        value: (parseFloat(d[0]['value']).toFixed(2)),
        unit: d[0]['channelunit'], preinstall: [{
          color: d[0]['color_min'] || '',
          value: d[0]['value_min']
        }, {
          color: d[0]['color_max'] || '',
          value: d[0]['value_max']
        }], titleEn: d[0].channelen
      }
      ));
      this.hit_tuxian(this.equipment_params.data[0],'biao-2-0','get');
      this.hit_tuxian(this.equipment_params.data[0],'biao-3-0','get');
    });
  }

  //插入消息数据
  getMessageData(i){
    let message = + i + '、插入消息插入消息插入消息插入消息插入消息' ;
    $('#ul_message').prepend(`<li id="li_${i}" title="${message}"><div>${message}</div></li>`);
    $(`#ul_message li`).attr('class', 'li_c');
  }

  /**
   * 头部左边的左右跳转阿牛
   * @param clickName
   */
  top_left_click(clickName){
    switch (clickName) {
      case 'left':
        console.log('点击向左按钮');
        this.router.navigate([this.fromRouter.url],{queryParams:{}})
        break;
      case 'right':
        console.log('点击向右按钮');
        break
    }
  }

  //获取左边表的按钮的颜色
  get_button_color(str, i){
    switch (str){
      case 'qushi':
        if(this.button['qushi'].find(f=> i == f))
          return 'green';
        break;
      case 'biao':
        break;
      case 'guanji':
        break;

    }
    return '';
  }

  /**
   *
   * @param item
   * @param id 页面按钮绑定的按钮id
   * @param buttonid get循环获取数据时穿的参数
   */
  hit_tuxian(item, id, buttonid?: string){

    const id_list = id.split("-");
    
    switch (id_list[0]){
        case 'qushi':
          this.button['qushi'].push(id_list[2]);
          this.button['qushiValue'].push(item.value);
          this.button['qushiName'].push(item.title);
          if(this.button['qushi'].length > 3 ){
            this.button['qushi'].splice(0,1);
            this.button['qushiValue'].splice(0,1);
            this.button['qushiName'].splice(0,1);
          }
          rtm3a.create_second_chart({
            xAxis:this.button.qushiName,
            seriesData:this.button.qushiValue,
          })
          break;
        case 'biao':
          if(id_list[1] == 2)
            rtmjs.gauge1(item.value);
          else 
            rtmjs.gauge2(item.value);
          break;
        case 'guanji':
          break;
  
    }
    if(id_list[0] != 'qushi'){
      this.button[id_list[0]][id_list[1]] = id_list[2];
      this.button[`${id_list[0]}Name`][id_list[1]] = item.title;
      this.button[`${id_list[0]}Value`][id_list[1]] = item.value;
    };
    console.log('当前选中的状态',this.button['qushi'])
  };



  //获取文字颜色
  get_font_color(item:any){
    let color = '';
    // if(!item.preinstall )return color;
    // for(let i = 0; i < item.preinstall.length; i++ ){
    //   if(item.preinstall[i].value > parseFloat(item.value))break;
    //   else color = item.preinstall[i].color
    // }
    return color;
  }

  //全屏
  showAllTemplate(){
    const board = document.getElementsByTagName('ngx-eimboard')[0];
    const sf = <Screenfull>screenfull;
    if (sf.isEnabled){ // sf.isEnabled 布尔值，判断是否允许进入全屏！
      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board)
    }
  };

  ngOnDestroy(){
    clearInterval(this.messageInterval);
  }

}
