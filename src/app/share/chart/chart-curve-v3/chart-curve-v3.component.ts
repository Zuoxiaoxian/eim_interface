import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutService } from '../../../@core/utils/layout.service';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road')
// 引入jquery
declare var $:any;

@Component({
  selector: 'ngx-chart-curve-v3',
  templateUrl: './chart-curve-v3.component.html',
  styleUrls: ['./chart-curve-v3.component.scss']
})
export class ChartCurveV3Component implements OnInit {

  attrs:any = [];
  xData = [];//表x轴的数据
  dashboard = [];
  @Input() title = 'equipment.real'//组件title 传i18n配置
  @Input() list = [];//实时参数选择按钮
  @Input() chartName = '';//图表的id
  @Input() dashboardName = '';//仪表盘的id
  @Input() chartVivid = '';//图表的样式 空为默认 columnar 柱形加实线   brokenline折线
  @Input() img = '';//传路径 不穿不显示 仪表盘旁边的图片
  @Output() clicEvent = new EventEmitter<any>();//tag变化
  colors = [
    ["#ff2400", "#e47833"],
    ["#ff00ff", "#ff00ff"],
    ["#d9d919", "#d9d919"],
    ["#00cc99", "#66ff66"],
    ["#0066ff", "#0099ff"],
    ["#db2365", "#fa676c"]
  ]
  myChart:any; //图表echart对象
  click_str = '';//当前选中的名字
  dashboard_click_index = -1;//当前仪表盘的下拉
  selectShow = false;//tag下拉是否显示
  dashboard_selectshow = false;//仪表盘下拉
  dashboard_cl = ['','','' ]//仪表盘下方显示当前选中参数
  dashboard_select = [[],[],[]]//仪表盘显示下拉的数据
  dashboard_tag_name = {};//每个tag下每个仪表盘的选择

//下拉显示的字段
  languageName = 'name';//默认为中文

  constructor(private layoutService:LayoutService ) { }

  ngOnInit(): void {
      //获取当前显示的语言
        let language = localStorage.getItem('currentLanguage');
        if(language == 'en-US')//英文
            this.languageName = 'nameEn'

        // 订阅左上角点击后宽度变化
        this.layoutService.onInitLayoutSize().subscribe(f=>{
            if(this.myChart)
            this.myChart.resize();
        })

        //tag默认选中
        if(this.list.length > 0){
            this.click_str = this.list[0];
            this.list.forEach(f=>{
                this.dashboard_tag_name[f] = {};
            })
        
        }
  }
  ngAfterViewInit (){
  }


  //tag重新选择
  click(str){
    if(this.click_str == str)return;
    this.click_str = str;
    this.clicEvent.emit(str);
  }

  //选择下拉数据区的数据
  radioChange(){
    
    this.choice_initleftChart();
  }

  /**
   * 
   * @param item 选中的数据
   * @param i 下标 第几个仪表盘
   * @param j 下标 下拉的第几条数据
   */
  dashboard_radioChange(item,i,k){
    this.dashboard_select[i].forEach((f,j) => {
        f.dashboardShow = false;
        if(j == k){
            f.dashboardShow = true;
            this.dashboard[i] = {name:f[this.languageName],value:f.value[f.value.length-1],unit:f.unit};
            this.dashboard_cl[i] = f[this.languageName]
        }
    });
    
    let dom = document.getElementById(this.dashboardName);
    if(!dom)return;
    let dashboardChart = echarts.init(dom);
    //获取当前tag下对应下表的仪表盘的绑定的名字
    this.dashboard_tag_name[this.click_str][i] = item[this.languageName];
    equipment_four_road.create_real_dashboard(this.dashboard,dashboardChart);
  }


  //下拉区域的显影
  select_click(){
    this.selectShow = !this.selectShow;
    console.log(this.selectShow)
  }
//   仪表盘下拉 为完成
  dashboard_select_click(i){
    this.dashboard_click_index = i == this.dashboard_click_index?-1: i;
  }

  //初始化表
  choice_initleftChart(){
      //选择初始化表格样式
    switch(this.chartVivid){
        case '':
            this.initleftChart({notMerge:true,lazyUpdate:true});
            break;
        case 'columnar':
            this.initColumnarChart({notMerge:true,lazyUpdate:true});
            break;
        case 'brokenline':
            this.initBrokenLineChart({notMerge:true,lazyUpdate:true});
            break;
    }
  }


  /**
   * notMerge
    可选，是否不跟之前设置的 option 进行合并，默认为 false，即合并。
    lazyUpdate
    可选，在设置完 option 后是否不立即更新图表，默认为 false，即立即更新。
    silent
    可选，阻止调用 setOption 时抛出事件，默认为 false，即抛出事件。
   * @param echartConfig 
   */
  initleftChart(echartConfig:any){
    let isthis = this;
    var dom = document.getElementById(this.chartName);
    if (!dom) return;
    this.myChart = echarts.init(dom);
    
    let series = [];
    this.attrs.filter(f=> f.show).forEach((f:any,i:number)=>{
      series.push(this.create_series(f[this.languageName],f.value,f.color));
    })
    if(series.length  == 0)series = [this.create_series('',0,['rgb(0,0,0,0)','rgb(0,0,0,0)'])];
    // console.log(this.myChart.getOption());
    var option:any = {
        background:'rgb(10,65,121)',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'none',
            padding: 6,
            formatter: function(param) {
                var resultTooltip = "";
                resultTooltip =
                    "<div style='background:rgba(13,5,30,.6);border:1px solid rgba(255,255,255,.2);padding:5px;border-radius:3px;'>" +
                    "<div style='text-align:center;'>" + param[0].name + "</div>" +
                    "<div style='padding-top:5px;'>"
                for (var i = 0; i < param.length; i++) {

                    if (i > 0) {
                        resultTooltip += "<div style='padding-top:2px;'>"
                    }

                    resultTooltip +=
                        "<span style='display: inline-block; width: 4px; height:10px; border-radius: 5px;background-color: " + param[i].color + ";'></span>" +
                        "<span style=''> " + param[i].seriesName + ": </span>" +
                        "<span style='color:" + param[i].color + "'>" + param[i].value + "</span><span>" + isthis.attrs[i].unit + "</span>"

                }
                resultTooltip +=
                    "</div>" +
                    "</div>";
                return resultTooltip
            }

        },
        title:{
            show:false,
            text:'',
        },
        grid: {
            left: '15%',
            top: '7%',
            right: '5%',
            bottom: '15%',
            height:'60%',

        },
        dataZoom : [
            {
                show: false,
                realtime: true,
                start: 100-((10/(series[0].data.length))*100),
                end: 100,
            },
            {
                type: 'inside',
                realtime: true,
                start:  100-((10/(series[0].data.length))*100),
                end: 100,
            }
        ],
        legend: {
            show: true,
            icon: 'circle',
            type:'scroll',
            orient: 'horizontal',
            top: '80.5%',
            width: '100%',
            right: 'center',
            itemWidth: 16.5,
            itemHeight: 6,
            padding :1,
            pageIconColor :'rgba(217, 244, 45, 1)',
            textStyle: {
                color: 'white',
                fontSize: 12
            },
        },
        xAxis: [{
            type: 'category',
            data: this.xData,
            axisLabel: {
                show: true,
                fontSize: 9,
                color:'white',//X轴文字颜色
                // formatter: function(value) {
                //     var str = "";
                //     if(value &&  value.length>5)
                //         str += value.substring(5, 10);
                //     else 
                //         str = value;
                //     // str += value.substring(0, 4) + "\n";
                //     return str;
                // }
            },
            axisLine: {
                show: false //不显示x轴
            },
            axisTick: {
                show: false //不显示刻度
            },
            boundaryGap: false,
            splitLine: {
                show: true,
                width: 0.08,
                lineStyle: {
                    type: "solid",
                    color: "white"
                }
            },
            axisPointer: { //轴指示器
                type: 'shadow',
                z: 1,
                shadowStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(18,155,249,0)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(18,155,249,1)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 5
                }
            },

        }],
        yAxis: [{
            type: 'value',
            scale: true, //坐标轴起点不限制0
            axisLabel: {
                show: true,
                color:'white',//X轴文字颜色
                textStyle: {
                    fontSize: 9,
                    // color: "rgb(116,142,171)" //X轴文字颜色s
                }
            },
            splitLine: {
                show: false,

            },
            axisTick: {
                show: false, //不显示刻度
            },
            axisLine: {
                show: false,
            },
            nameTextStyle: {
                color: "#FFFFFF"
            },
            splitArea: {
                show: false
            }
        }],
        series: series
    };
    //判断当前是否已经有legend配置
    if(this.myChart.getOption()){
        option.legend = this.myChart.getOption().legend
        // option.dataZoom = this.myChart.getOption().dataZoom
    }
    window.onresize = function() {
        if(isthis.myChart)isthis.myChart.setOption(option,echartConfig);
    }
    this.myChart.setOption(option,echartConfig);

  }

  //柱形加折线
  initColumnarChart(echartConfig:any){
    let data = this.attrs.filter(f=> f.show);
    let data_1 = {
        d_arr:[],
        title_arr:[],
        color_arr:[],
      xData:this.xData
      }
    data.forEach((f:any,i:number)=>{
        data_1.d_arr.push(f.value);
        data_1.title_arr.push(f[this.languageName]);
        if(i == data.length -1)
        data_1.color_arr.push({color:f.color[0]})
        else
            data_1.color_arr.push({
                start: f.color[0],
                end: f.color[1]
            });
    })

    var dom = document.getElementById(this.chartName);
    if (!dom) return;
    this.myChart = echarts.init(dom);
    equipment_four_road.create_device_status_real(data_1,this.myChart,echartConfig);
  }

    //折线
  initBrokenLineChart(echartConfig:any){
    let data = this.attrs.filter(f=> f.show);
    let data_1 = {
        series:[],
        xData: []
    };
    data.forEach(f=>{
        f.color.forEach((element,i) => {
            element = this.colorRgb(element,i == 0?'0.3':0.7) 
        });
        data_1.series.push({
            name:f[this.languageName],
            color:f.color,
            value:f.value
        });
    })
    data_1.xData = this.xData;
    var dom = document.getElementById(this.chartName);
    if (!dom) return;
    this.myChart = echarts.init(dom);
    equipment_four_road.create_broken_line(data_1,this.myChart,echartConfig);
  }


  /**
   * 
   * @param name 名字
   * @param lines 具体数据
   * @param colors 颜色数组 长度2
   */
  create_series(name,lines,colors){
    return {
        name: name,
        type: 'line',
        data: lines,
        lineStyle: {
            normal: {
                width: 2,
                // color: '#3374EB',
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                        offset: 0,
                        color: colors[0] // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: colors[1] // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
                shadowColor: colors[1],
                shadowBlur: 4,
                shadowOffsetY: 3
            }
        },
        symbol: 'emptyCircle',
        showSymbol: false,
        itemStyle: {
            normal: {
                color: colors[1],
                shadowColor: colors[1],
                shadowBlur: 2,
                borderWidth: 2,
                borderColor: "#F8F8FF"
            }
        },
        smooth: true
    }
  }


  //初始化仪表盘
  initDashboard(){
    if(this.dashboardName){
        let dom = document.getElementById(this.dashboardName);
        if(!dom)return;
        let dashboardChart = echarts.init(dom);
        let json = this.dashboard_tag_name[this.click_str];
        let i = 0;

        // 仪表盘可选 逻辑 未写完成
        // this.attrs.forEach(f=>{
        //     if(i==3)return;
        //     if(json && ([json[0],json[1],json[2]].includes(f[this.languageName]))){
        //         this.dashboard[i] = {name: f[this.languageName],unit: f.unit,value:f.value[f.value.length-1]}
        //         this.dashboard_cl[i] =  f[this.languageName];
        //         i++;
        //     }
        // })
        //如果参数不满足三个补足三个
        if(i < 3)
            for(let j = 0;j<3-i;j++)this.dashboard[2-j] = {name: '',unit: '',value:0};

        this.dashboard = this.attrs.slice(0,3).map(m =>({name: m[this.languageName],unit: m.unit,value:m.value && m.value[0]?m.value[m.value.length-1]:0}))
        this.dashboard_cl =  this.attrs.slice(0,3).map(m =>  m[this.languageName])
        equipment_four_road.create_real_dashboard(this.dashboard,dashboardChart);
    }
  }




  /**
   * 父组件调用 
   */
  public painting(data) {
    this.attrs = data.attrs;
    //仪表盘下拉数据
    // this.dashboard_select[0] = JSON.parse(JSON.stringify(data.attrs));
    // this.dashboard_select[1] = JSON.parse(JSON.stringify(data.attrs));
    // this.dashboard_select[2] = JSON.parse(JSON.stringify(data.attrs));
    // if(this.dashboard_tag_name[this.click_str] ){
    //     this.dashboard_cl[0] = this.dashboard_tag_name[this.click_str][0];
    //     this.dashboard_cl[1] = this.dashboard_tag_name[this.click_str][1];
    //     this.dashboard_cl[2] = this.dashboard_tag_name[this.click_str][2];
    // }

    //初始化
    // this.xData = data.xData[this.click_str] ?data.xData[this.click_str]:[];
    this.xData = data.xData.slice();
    if(this.attrs.xData)delete this.attrs.xData; 
    //更新表的数据
    this.choice_initleftChart();
    //更新仪表盘的数据
    this.initDashboard();
  }

  //rgb转换16进制
  colorRgb(sColor,transparency){
    sColor = sColor.toLowerCase();
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
        }
        sColor = "RGB(" + sColorChange.join(",") + ","+transparency+")";
    }
    return sColor;
 };


}
