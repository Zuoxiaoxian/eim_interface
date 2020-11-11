import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
declare var layui:any;
// 引入jquery
declare var $:any;

// echart
let rtmjs = require('../../../../assets/eimdoard/rtmv2/js/rtmv2');

// 全屏
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';
import {NbDialogService, NbWindowService} from "@nebular/theme";
import {EditRoleComponent} from "../../../pages-popups/system-set/edit-role/edit-role.component";
import {HttpserviceService} from "../../../services/http/httpservice.service";
import {Util} from "leaflet";
import falseFn = Util.falseFn;
import {LayoutService} from "../../../@core/utils";
import {EmqClientService} from "../../../services/emq-client/emq-client.service";

@Component({
  selector: 'ngx-real-time-monitoring-update',
  templateUrl: './real-time-monitoring-update.component.html',
  styleUrls: ['./real-time-monitoring-update.component.scss']
})
export class RealTimeMonitoringUpdateComponent implements OnInit {
  is_not_fullscreen = true; // 是否处于全屏


  flipped = false;
  // 滚动定时
  scrollerTable_timer;
  dialogShow = false;//弹窗显示状态
  dialogData:any = [];

  // table 中数据
  zhibiao_data = {
    title: ["指标", "值", "单位","预设", "凸显"],
    data: [

    ]
  };
  //当前设备id
  deviceid:any = 'device_boyang_01';

    alert_data = {
    title: ["指标", "报警规则", "紧急程度", "发生时间"],
    data: null
  };

  move = 0;//下移的距离

  // 指标数据
  zhibiao_num = this.zhibiao_data.data.length;

  // 折线 echart 数据
  line_date = {
    now: {
      name: 'C项电流',
      xdata: [
        new Date().getHours() + new Date().getMinutes() + new Date().getSeconds()
      ],
      ydate:[53.2]
    },
    time: {
      name: 'C项电流',
      xdata: ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"],
      ydate:[30,60,20, 40, 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 20,60,50, 40],
    },
    day: {
      name: 'C项电流',
      xdata: [ "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","26","28","29","30"],
      ydate:[ 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 20,60,50, 40],
    },
    month: {
      name: 'C项电流',
      xdata: ["01","02","03","04","05","06","07","08","09","10","11","12"],
      ydate: [30,60,20, 40, 30, 40, 30, 40,30, 40, 30,60],
    },
    year: {
      name: 'C项电流',
      xdata: ['2018年', '2019年', '2020年'],
      ydate:[33, 43, 49],
    },
  }

  // 关机配置
  guanji_url = "assets/eimdoard/rtm/images/light_a.png";
  kaiji_url = "assets/eimdoard/rtm/images/light_b.png";
  alert_url = "assets/eimdoard/rtm/images/light_c.png";

  // 重要开关量配置
  important_kg_data = {
    important_kg_title: '重要开关量',
    lampArr: [{
      name: '是否运行',
      url: this.kaiji_url,
    },{
      name: '断电',
      url: this.alert_url,
    },{
      name: '上电',
      url: this.guanji_url
    }]
  }
  line_chart = 'now';//第一次进去显示的表

  //当前的按钮下标
  button = {
    "biao":{2: "0", 3: "0"},
    "qushi":{1: "0"},
    "guanji":{},
  }
  //当前的按钮名字
  button_name = {
    "biao":{2: "", 3: ""},
    "qushi":{1: ""},
    "guanji":{},
  }

  // 设备基础信息
  device_base_info = {
    LB: "耐久类设备",
    WZ: "点击实验室-东南角",
    XH: "AVL-电机1",
    FZR: "李云龙",
    CJ: "AVL",
    CCRQ: new Date().getFullYear() + '-' + (new Date().getMonth() - 1) + '-' + new Date().getDay()
  };

  // 试验信息
  test_info = {
    test_title: 'AVL-试验',
    is_not_line: {
      isonline: '在线',
      isrun: '运行',
    },
    ji_liang: {
      name: "计量",
      value: 0
    },
    gong_lv: {
      name: "功率",
      value: 0
    },
    test_img_url: 'assets/eimdoard/rtm/images/长沙1号.png',
    dian_liu_arr: [{
      name: "A相对电流",
      value: 4.03
    },{
      name: "B相对电流",
      value: 3.52
    }, {
      name: "C相对电流",
      value: 3.64
    }],
  }
  component_status = true;

  constructor(private router:Router,public activatedRoute:ActivatedRoute,
              private http: HttpserviceService,private layoutService:LayoutService,
              private mqService:EmqClientService,private activateInfo:ActivatedRoute
              ) { }

  ngOnInit(): void {
    // this.scrollerTable_timer = setInterval(this.timer, 70); // 40ms

    $('.zhibiao_table').mouseover(function(e){
        console.log('鼠标移入')
      this.move = 0;
    });
    $('.zhibiao_table').mouseout(function(e){
      console.log('鼠标移出')
      this.move = 0;
      // if(!this.scrollerTable_timer)this.scrollerTable_timer = setInterval(this.timer, 70);
    });

    //订阅路由发送过来的数据
    // this.activatedRoute.params.subscribe(f =>{
    // });
    // this.getInitData({});

    // 初始化仪表盘
    rtmjs.gauge2(0);
    rtmjs.gauge1(0);

    // 默认折线为当前
    // var element = document.querySelector("#now");
    // element.setAttribute("class", "li_active");
    rtmjs.line_date(this.line_date[this.line_chart]);

    // 初始化 重要开关量配置
    // this.set_important_kg_data(this.important_kg_data)

    // 初始化 设备基础信息
    // this.set_device_base_info(this.device_base_info);

    // 初始化 试验信息
    // this.set_test_info(this.test_info);
    // get_device_panel_detail
    // this.http.callRPC('panel_detail','get_device_panel_detail',
    //   {"deviceid":"device_boyang_01"}).subscribe(f =>{
    //   console.log(f)
    // })
    this.getData(0);
    // let i = 0;
    // setInterval(f =>{
    //   i++;
    //   this.getData(i);
    // },1000)
  }


  ngAfterViewInit(){
    this.layoutService.onInitLayoutSize().subscribe(f =>{
      var data = {
        name: '',
        xdata: [new Date().getHours() + new Date().getMinutes() + new Date().getSeconds()],
        ydate: [0]
      }
      rtmjs.line_date(data);
    })
    this.activateInfo.queryParams.subscribe(f =>{
      if(f.deviceid)this.deviceid = f.deviceid;
    })

  }

  getData(i){
    console.log('第'+i+'次获取数据')
    this.http.callRPC('panel_detail','get_device_panel_detail',
      {"deviceid":this.deviceid}).subscribe((f:any) =>{
      console.log('第'+i+'次获取数据成功');
      let arr = f.result.message[0]
      this.zhibiao_data.data = arr.map(d =>{
        if(d[0].value_min || d[0].value_max){
          if(parseFloat(d[0].value).toFixed(2)>parseFloat(d[0].value_max).toFixed(2)){
            console.log('当前数值超出二档');
            this.mqService.sendMqttMessaege('error', JSON.stringify(d[0]));
          }else if(parseFloat(d[0].value).toFixed(2)>parseFloat(d[0].value_min).toFixed(2)){
            console.log('当前数值超出一档');
            this.mqService.sendMqttMessaege('warm', JSON.stringify(d[0]));
          }
        }
        return {title:d[0].channelcn,
        value:(parseFloat(d[0]['value']).toFixed(2)),
        unit:d[0]['channelunit'], preinstall : [{
          color:d[0]['color_min']||'',
          value:d[0]['value_min']
        },{
          color:d[0]['color_max']||'',
          value:d[0]['value_max']
        }],titleEn:d[0].channelen }
      });
      // this.zhibiao_data.data[5].unit = '开/关';
      // this.zhibiao_data.data[5].value = '1';
      // this.zhibiao_data.data[6].unit = '开/关';
      // this.zhibiao_data.data[6].value = '0';
      let j = 0;
      for(let key_one in this.button) {
        for(let key_two in this.button[key_one]) {
          if(this.button_name[key_one][key_two])
            i = this.zhibiao_data.data.findIndex(f => f.title == this.button_name[key_one][key_two]);
          this.hit_tuxian(this.zhibiao_data.data[this.button[key_one][j?j:key_two]],
            `${key_one}-${key_two}-${this.button[key_one][j?j:key_two]}`,'get');
          // this.replaceChart(key_one,key_two,arr[this.button[key_one][key_two]]);
          if(j)console.log('选中下标改变');
          console.log(`${key_one}-${key_two}-${this.button[key_one][key_two]}`)
        }
      }
    });
  }


  //更新图片更新
  replaceChart(key_one,key_two,item){
    if(this.line_chart!='now')return;
    switch (key_one) {
      case 'qushi':
        this.noguanji(item,key_two);
        break;
      case 'biao':
        this.noguanji(item,key_two);
        break;
      case 'guanji':
        this.guanji(item, key_two);
        break;

    }
  }


  // 全屏切换
  showAllTemplate(){
    const board = document.getElementsByTagName('ngx-eimboard')[0];
    const sf = <Screenfull>screenfull;
    if (sf.isEnabled){ // sf.isEnabled 布尔值，判断是否允许进入全屏！
      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board)
    }
  };

  // 跳转Home界面
  gotoHome(){
    this.router.navigate(['/pages']);
  };

  // 点击凸显  is_no_run3 是否运行?! img的id ; id_no_run_title3 是否运行?! span的id
  /**
   *
   * @param item
   * @param id 页面按钮绑定的按钮id
   * @param buttonid get循环获取数据时穿的参数
   */
  hit_tuxian(item, id,buttonid?:string){

    const id_list = id.split("-");
    if(['get','click'].includes(buttonid))
      this.button_name[id_list[0]][id_list[1]] = item.title;

    if(id_list[0]==='qushi'){
      this.noguanji(item,id_list[1]);
    }
    if(id_list[0]==='biao'){ // biaobiao
      this.noguanji(item,id_list[1]);
     }
    if(id_list[0] ==='guanji'){

      var item_array = {
        title:item.title,
        src:this.important_kg_data.lampArr[id_list[1]-1].url,
        value:item.value
      };
      this.guanji(item_array, id_list[1])
    }
    this.button[id_list[0]][id_list[1]] = id_list[2];
    // this.button[id_list[0]]['name_'+id_list[1]] = item.titleEn;

    // if(item.unit == '开/关'){
    //   var item_array = {
    //     title:this.important_kg_data.lampArr[id_list[1]-1].name,
    //     src:this.important_kg_data.lampArr[id_list[1]-1].url,
    //   };
    //   this.guanji(item_array, id_list[1])
    // }
    // console.log("item: ", item, id); // 将item赋值给折线图
    // var element = document.getElementById(id);
    // var curr_style = element.getAttribute("style");
    // const id_list = id.split("-");
    // this.button[id_list[0]][id_list[1]] = id_list[2];
    // console.log("curr_style  |",curr_style, "id: ", id, "id_list: ", id_list);
    // if(id_list[0]==='qushi'){ // biaobiao
    //   if(buttonid != 'get'){
    //     var element_svg = document.querySelectorAll('.'+id_list[0]);
    //     element_svg.forEach((item)=>{
    //       item.setAttribute("style", "color: null")
    //     })
    //   }
    //   element.style.color = 'green';
    //   this.noguanji(item,id_list[1]);
    // }
    // if(id_list[0]==='biao'){ // biaobiao
    //   if(buttonid != 'get'){
    //     var biao_all = document.querySelectorAll("."+id_list[0]+id_list[1]);
    //     biao_all.forEach((item)=>{
    //       item.setAttribute("style", "color: null")
    //     })
    //     element.style.color = 'green';
    //   }
    //   this.noguanji(item,id_list[1]);
    // }
    // if(id_list[0] ==='guanji'){ //guanji
    //   if(buttonid != 'get'){
    //     var guanji_all = document.querySelectorAll("."+id_list[0]+id_list[1]);
    //     guanji_all.forEach((item)=>{
    //       item.setAttribute("style", "color: null")
    //     })
    //     element.style.color = 'green';
    //   }
    //   this.guanji(item, id_list[1]);
    // }


    // // 有active 转到unactive！
    // if(curr_style == 'color: null' || curr_style == null || buttonid == 'get'){
    //   element.style.color = 'green';
    // }else{
    //   element.setAttribute("style", "color: null");
    //   var item_array = {
    //     title:this.important_kg_data.lampArr[id_list[1]-1].name,
    //     src:this.important_kg_data.lampArr[id_list[1]-1].url,
    //   };
    //   this.guanji(item_array, id_list[1])
    // }
  };



  // guanji 调用函数
  guanji(item, index){
    console.log("guanji: ", item);
    var is_no_run;
    var id_no_run_title;
    if (index === '1'){
      is_no_run = document.querySelector('#is_no_run1');
      id_no_run_title = document.querySelector("#id_no_run_title1");
    }
    if (index === '2'){
      is_no_run = document.querySelector('#is_no_run2');
      id_no_run_title = document.querySelector("#id_no_run_title2");
    }
    if (index === '3'){
      is_no_run = document.querySelector('#is_no_run3');
      id_no_run_title = document.querySelector("#id_no_run_title3");
    };
    if (item.value === '0'){
      is_no_run.setAttribute("src", this.guanji_url)
    }
    if (item.value === '1'){
      is_no_run.setAttribute("src", this.kaiji_url)
    }
    if(item.value !='0' && item.value !='1'){
      is_no_run.setAttribute("src", item.src)
    }
    id_no_run_title.innerHTML = item.title;
  };

  // 不是关键
  noguanji(item,index){
    // rtmjs.gauge2(gauge2_data);
    // rtmjs.gauge1(gauge1_data);
    console.log("执行第二个！",index)
    console.log("不是关机: ", item);

    if (index === '1'){
      // 这是折线的
      var data = {
        name: item.title,
        xdata: [new Date().getHours() + new Date().getMinutes() + new Date().getSeconds()],
        ydate: [item.value]
      }
      rtmjs.line_date(data);
    }
    if (index === '2'){
      document.getElementById('gauge1_title').innerHTML = item.title;
      rtmjs.gauge1(item.value);
    }
    if (index === '3'){
      document.getElementById('gauge2_title').innerHTML = item.title;
      rtmjs.gauge2(item.value);
    }
  }

  // 折线中时间选择
  get_line_date(item){
    this.line_chart = item;
    // console.log($("#"+item).text(), item)
    // console.log(document.querySelector("#"+item).innerHTML,item);
    // var element = document.querySelector("#"+item);
    // document.querySelectorAll(".echart_date li")[0].setAttribute('class', "li_default")
    // document.querySelectorAll(".echart_date li")[1].setAttribute('class', "li_default")
    // document.querySelectorAll(".echart_date li")[2].setAttribute('class', "li_default")
    // document.querySelectorAll(".echart_date li")[3].setAttribute('class', "li_default")
    // document.querySelectorAll(".echart_date li")[4].setAttribute('class', "li_default")
    // element.setAttribute("class", "li_active");
    // 更新数据
    var data = this.line_date[item];
    console.log("data: ", data);
    rtmjs.line_date(data);
  };

  // 初始化--重要开关量配置
  // set_important_kg_data(data){
  //   document.getElementById('important_kg_title').innerHTML = data.important_kg_title;
  //
  //   document.getElementById('id_no_run_title1').innerHTML = data['1'].name;
  //   document.getElementById('is_no_run1').setAttribute("src", data['1'].url);
  //   document.getElementById('id_no_run_title2').innerHTML = data['2'].name;
  //   document.getElementById('is_no_run2').setAttribute("src", data['2'].url);
  //   document.getElementById('id_no_run_title3').innerHTML = data['3'].name;
  //   document.getElementById('is_no_run3').setAttribute("src", data['3'].url);
  // }

  // // 赋值--试验数据
  // set_test_info(data){
  //   // test_info
  //   document.getElementById("test_title").innerHTML = data.test_title;
  //   document.getElementById("isonline").innerHTML = data.is_not_line.isonline;
  //   document.getElementById("isrun").innerHTML = data.is_not_line.isrun;
  //
  //   document.getElementById("JL_name").innerHTML = data.ji_liang.name;
  //   document.getElementById("JL").innerHTML = data.ji_liang.value;
  //
  //   document.getElementById("GL_name").innerHTML = data.gong_lv.name;
  //   document.getElementById("GL").innerHTML = data.gong_lv.value;
  //
  //   document.getElementById("test_img_url").setAttribute("src", data.test_img_url);
  //
  //   document.getElementById("A_I_name").innerHTML = data.dian_liu1.name;
  //   document.getElementById("A_I").innerHTML = data.dian_liu1.value;
  //
  //   document.getElementById("B_I_name").innerHTML = data.dian_liu2.name;
  //   document.getElementById("B_I").innerHTML = data.dian_liu2.value;
  //
  //   document.getElementById("C_I_name").innerHTML = data.dian_liu3.name;
  //   document.getElementById("C_I").innerHTML = data.dian_liu3.value;
  //
  // }

  // 赋值--设备基础信息
  // set_device_base_info(data){
  //   // device_base_info
  //   document.getElementById('LB').innerHTML = data.LB;
  //   document.getElementById('WZ').innerHTML = data.WZ;
  //   document.getElementById('XH').innerHTML = data.XH;
  //   document.getElementById('FZR').innerHTML = data.FZR;
  //   document.getElementById('CJ').innerHTML = data.CJ;
  //   document.getElementById('CCRQ').innerHTML = data.CCRQ;
  // };

  get_font_color(item:any){
    let color = '';
    if(!item.preinstall )return color;
    for(let i = 0; i < item.preinstall.length; i++ ){
      if(item.preinstall[i].value > parseFloat(item.value))break;
      else color = item.preinstall[i].color
    }
    return color;
  }

  preinstall_dialog_show(item){
    if(item.unit == '开/关')return;
    this.dialogData = JSON.parse(JSON.stringify(item));
    this.dialogData.deviceid = this.deviceid;
    // this.dialogData.channelen = item.titleEn;
    this.dialogShow = true;
  }

  preinstall_dialog_close(e:any){
    if(e.sumbit){
      this.zhibiao_data.data.find(f => f.title == e.data.title).preinstall = e.data.preinstall
    }
    this.dialogShow = false;
  }


    timer = ()=>{
      var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
      var nScrollTop = 0; //滚动到的当前位置
      var nDivHight = $(".zhibiao_table").height(); // div高度
      var y = 0; //距离顶部距离
      if (!$(".zhibiao_table")[0]) {
        return;
      }
      nScrollHight = $(".zhibiao_table")[0].scrollHeight;
      nScrollTop = $(".zhibiao_table")[0].scrollTop;
      y = nScrollTop;
      //每次滚动距离
      y = y + this.move;
      //   //滚动到底部时 ，回到顶部重新滚
      if (y+nDivHight >= nScrollHight) {
        y = 0;
      }
      $(".zhibiao_table").scrollTop(y);
    }



  ngOnDestroy(){
    console.log("声明周期：组件销毁");
    clearInterval(this.scrollerTable_timer); // 销毁组件时，取消定时任务
    this.component_status = false;//跳出递归
  }



}

