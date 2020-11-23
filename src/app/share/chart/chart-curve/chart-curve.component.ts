import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutService } from '../../../@core/utils/layout.service';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road')
// 引入jquery
declare var $:any;
/**
 * 已废弃
 */
@Component({
  selector: 'ngx-chart-curve',
  templateUrl: './chart-curve.component.html',
  styleUrls: ['./chart-curve.component.scss']
})
export class ChartCurveComponent implements OnInit {

  attrs = [];
  xData = [];//表x轴的数据
  @Input() title = '';//表的title
  @Input() chartName = '';
  @Input() chartTitle = '';
  @Input() rightChartName = '';
  @Output() clicEvent = new EventEmitter<any>();
  colors = [
    ["#ff2400", "#e47833"],
    ["#ff00ff", "#ff00ff"],
    ["#d9d919", "#d9d919"],
    ["#00cc99", "#66ff66"],
    ["#0066ff", "#0099ff"],
    ["#db2365", "#fa676c"]
  ]
  selectShow = false;
  _rightChartShow = false;
  @Input() set  rightChartShow(bol:boolean){
    if(bol){
        this._rightChartShow = bol;
        
    }
  };//是否显示表
  myChart:any;
  rightChart:any;

  constructor(private layoutService:LayoutService) { }

  ngOnInit(): void {
    //   this.layoutService.onInitLayoutSize().subscribe(f=>{
    //       if(this.myChart)
    //         this.myChart.resize();
    //       else
    //         this.initleftChart();
    //       if(this._rightChartShow)this.initRightChart();
    //   })
  }
  ngAfterViewInit (){
  }

  //下拉
  select_click(){
    this.selectShow = !this.selectShow;
    console.log(this.selectShow)
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
  initleftChart(echartConfig?:any){
    let isthis = this;
    var dom = document.getElementById(this.chartName);
    if (!dom) return;
    this.myChart = echarts.init(dom);
    
    let series = [];
    this.attrs.filter(f=> f.show).forEach((f:any,i:number)=>{
      series.push(this.create_series(f.name,f.value,f.color));
    })
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
        legend: {
            show: true,
            icon: 'circle',
            type:'scroll',
            orient: 'horizontal',
            top: '83.5%',
            width: '100%',
            right: 'center',
            itemWidth: 16.5,
            itemHeight: 6,
            padding :1,
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
                formatter: function(value) {
                    var str = "";
                    if(value.length>5)
                        str += value.substring(5, 10);
                    else 
                        str = value;
                    // str += value.substring(0, 4) + "\n";
                    return str;
                }
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

    if(this.chartTitle)option.title = {
        show:true,
        text:this.chartTitle,
        left: "center",
        top:'0%',
        textStyle:{
            color:'rgba(247, 238, 238, 1)',
            fontSize:12,
        },
    };
    window.onresize = function() {
        isthis.myChart.resize();
    }
    this.myChart.setOption(option,echartConfig);

  }

  initRightChart(){
    let isthis = this;
    var dom = document.getElementById(this.rightChartName);
    this.rightChart = echarts.init(dom);
    window.addEventListener('resize', function() {
        console.log("重置的屏幕大小！")
        isthis.rightChart.resize();
    });
    equipment_four_road.create_real_temperature({value:55.33},this.rightChart)
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

  radioChange(){
      this.initleftChart({notMerge:true,lazyUpdate:true});
  }


  /**
   * 
   */
  public painting(data) {
      this.attrs = data.attrs;
      this.xData = data.xData;
    if(this.myChart)
      this.myChart.resize();
    else
      this.initleftChart();
    if(this._rightChartShow)this.initRightChart();
  }

}
