import { Component, OnInit } from '@angular/core';

import { guanji_url, kaiji_url, alert_url, device_img_url} from '../../../appconfig';

// my-echart
let real_time = require('../../../../assets/pages/device-inline/js/real-time');

@Component({
  selector: 'ngx-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.scss']
})
export class RealTimeComponent implements OnInit {

  // table 中数据
  zhibiao_data = {
    title: ["指标", "值", "单位", "凸显"],
    date: [
      ["C项电流", "3.64", "A", ],
      ["B项电流", "3.52", "A", ],
      ["A项电流", "4.03", "A", ],
      ["绕Z轴角度", "69.91", "mm", ],
      ["绕Y轴角度", "66.01", "mm", ],
      ["调节池升泵", "0", "开/关", ],
      ["鼓风机", "0", "开/关", ],
      ["鼓风机2", "1", "开/关", ],
    ]
  };

  alert_data = {
    title: ["指标", "报警规则", "紧急程度", "发生时间"],
    date: null
  };

  // 折线 echart 数据
  line_date = {
    now: { 
      name: 'C项电流',
      xdata: [
        String(new Date().getHours()) + ":" + String(new Date().getMinutes())  + ":" + new Date().getSeconds()
      ], 
      ydata:[53.2]
    },
    time: { 
      name: 'C项电流',
      xdata: ["01h","02h","03h","04h","05h","06h","07h","08h","09h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h","20h","21h","22h","23h","24h"], 
      ydata:[30,60,20, 40, 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 20,60,50, 40],
    },
    day: { 
      name: 'C项电流',
      xdata: [ "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","26","28","29","30"],
      ydata:[ 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 20,60,50, 40],
    },
    month: { 
      name: 'C项电流',
      xdata: ["01","02","03","04","05","06","07","08","09","10","11","12"], 
      ydata: [30,60,20, 40, 30, 40, 30, 40,30, 40, 30,60],
    },
    year: { 
      name: 'C项电流',
      xdata: ['2018年', '2019年', '2020年'], 
      ydata:[33, 43, 49],
    },
  }

  // 指标数据
  zhibiao_num = this.zhibiao_data.date.length;

  // 关机配置
  guanji_url = guanji_url;
  kaiji_url = kaiji_url;
  alert_url = alert_url;

  // 重要开关量配置
  important_kg_data = {
    important_kg_title: '重要开关量',
    '1': {
      name: '是否运行',
      url: this.kaiji_url,
    },
    '2':{
      name: '断电',
      url: this.alert_url,
    },
    '3':{
      name: '上电',
      url: this.guanji_url
    }
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
    test_img_url: device_img_url,
    dian_liu1: {
      name: "A相对电流",
      value: 4.03
    },
    dian_liu2: {
      name: "B相对电流",
      value: 3.52
    },
    dian_liu3: {
      name: "C相对电流",
      value: 3.64
    },
  }


  constructor() { }

  ngOnInit(): void {
    // 初始化 重要开关量配置
    this.set_important_kg_data(this.important_kg_data);
    // 初始化 试验信息
    this.set_test_info(this.test_info);
    
    // 初始化仪表盘
    real_time.gauge2(0);
    real_time.gauge1(0);

    // 默认折线为当前
    var element = document.querySelector("#now");
    element.setAttribute("class", "li_active");
    console.log("当前数据：",this.line_date.now)
    real_time.line_date(this.line_date.now);

    // 初始化 设备基础信息
    this.set_device_base_info(this.device_base_info);
    
  }

  // 点击凸显  is_no_run3 是否运行?! img的id ; id_no_run_title3 是否运行?! span的id
  hit_tuxian(item, id){
    console.log("item: ", item, id); // 将item赋值给折线图
    var element = document.getElementById(id);
    var curr_style = element.getAttribute("style");
    const id_list = id.split("-");
    console.log("curr_style  |",curr_style, "id: ", id, "id_list: ", id_list);
    if(id_list[0]==='qushi'){ // biaobiao
      var element_svg = document.querySelectorAll('.'+id_list[0]);
      element_svg.forEach((item)=>{
        item.setAttribute("style", "color: null")
      })
      element.style.color = 'green';
      this.noguanji(item,id_list[1]);
    }
    if(id_list[0]==='biao'){ // biaobiao
      var biao_all = document.querySelectorAll("."+id_list[0]+id_list[1]);
      biao_all.forEach((item)=>{
        item.setAttribute("style", "color: null")
      })
      element.style.color = 'green';
      this.noguanji(item,id_list[1]);
    }
    if(id_list[0] ==='guanji'){ //guanji
      var guanji_all = document.querySelectorAll("."+id_list[0]+id_list[1]);
      guanji_all.forEach((item)=>{
        item.setAttribute("style", "color: null")
      })
      element.style.color = 'green';
      this.guanji(item, id_list[1])
    }
    

    // 有active 转到unactive！
    if(curr_style == 'color: null' || curr_style == null){
      element.style.color = 'green';
    }else{
      element.setAttribute("style", "color: null");
      var item_array = [this.important_kg_data[id_list[1]].name, this.important_kg_data[id_list[1]].url];
      this.guanji(item_array, id_list[1])
    }


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
    if (item[1] === '0'){
      is_no_run.setAttribute("src", this.guanji_url)
    }
    if (item[1] === '1'){
      is_no_run.setAttribute("src", this.kaiji_url)
    }
    if(item[1] !='0' && item[1] !='1'){
      is_no_run.setAttribute("src", item[1])
    }
    id_no_run_title.innerHTML = item[0];
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
        name: item[0],
        xdata: [String(new Date().getHours()) + ":" + String(new Date().getMinutes())  + ":" + new Date().getSeconds()],
        ydate: [item[1]]
      }
      real_time.line_date(data);
    }
    if (index === '2'){
      document.getElementById('gauge1_title').innerHTML = item[0];
      real_time.gauge1(item[1]);
    }
    if (index === '3'){
      document.getElementById('gauge2_title').innerHTML = item[0];
      real_time.gauge2(item[1]);
    }
  }

  // 折线中时间选择
  get_line_date(item){
    // console.log($("#"+item).text(), item)
    console.log(document.querySelector("#"+item).innerHTML,item);
    var element = document.querySelector("#"+item);
    document.querySelectorAll(".echart_date li")[0].setAttribute('class', "li_default")
    document.querySelectorAll(".echart_date li")[1].setAttribute('class', "li_default")
    document.querySelectorAll(".echart_date li")[2].setAttribute('class', "li_default")
    document.querySelectorAll(".echart_date li")[3].setAttribute('class', "li_default")
    document.querySelectorAll(".echart_date li")[4].setAttribute('class', "li_default")
    element.setAttribute("class", "li_active");
    // 更新数据
    var data = this.line_date[item];
    console.log("更新数据data: ", data);
    real_time.line_date(data);
  };

  // 初始化--重要开关量配置
  set_important_kg_data(data){
    document.getElementById('important_kg_title').innerHTML = data.important_kg_title;

    document.getElementById('id_no_run_title1').innerHTML = data['1'].name;
    document.getElementById('is_no_run1').setAttribute("src", data['1'].url);
    document.getElementById('id_no_run_title2').innerHTML = data['2'].name;
    document.getElementById('is_no_run2').setAttribute("src", data['2'].url);
    document.getElementById('id_no_run_title3').innerHTML = data['3'].name;
    document.getElementById('is_no_run3').setAttribute("src", data['3'].url);
  }

  // 赋值--试验数据
  set_test_info(data){
    // test_info
    document.getElementById("test_title").innerHTML = data.test_title;
    document.getElementById("isonline").innerHTML = data.is_not_line.isonline;
    document.getElementById("isrun").innerHTML = data.is_not_line.isrun;
    
    document.getElementById("JL_name").innerHTML = data.ji_liang.name;
    document.getElementById("JL").innerHTML = data.ji_liang.value;

    document.getElementById("GL_name").innerHTML = data.gong_lv.name;
    document.getElementById("GL").innerHTML = data.gong_lv.value;

    document.getElementById("test_img_url").setAttribute("src", data.test_img_url);
    
    document.getElementById("A_I_name").innerHTML = data.dian_liu1.name;
    document.getElementById("A_I").innerHTML = data.dian_liu1.value;
    
    document.getElementById("B_I_name").innerHTML = data.dian_liu2.name;
    document.getElementById("B_I").innerHTML = data.dian_liu2.value;
    
    document.getElementById("C_I_name").innerHTML = data.dian_liu3.name;
    document.getElementById("C_I").innerHTML = data.dian_liu3.value;

  }

  // 赋值--设备基础信息
  set_device_base_info(data){
    // device_base_info
    document.getElementById('LB').innerHTML = data.LB;
    document.getElementById('WZ').innerHTML = data.WZ;
    document.getElementById('XH').innerHTML = data.XH;
    document.getElementById('FZR').innerHTML = data.FZR;
    document.getElementById('CJ').innerHTML = data.CJ;
    document.getElementById('CCRQ').innerHTML = data.CCRQ;
  };

}
