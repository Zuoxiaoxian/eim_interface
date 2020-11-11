import { Component, OnInit } from '@angular/core';
import {Screenfull} from "screenfull";
import * as screenfull from "screenfull";
import {LayoutService} from "../../../@core/utils";
import { ActivatedRoute } from '@angular/router';

// echart
let rtm3 = require('../../../../assets/eimdoard/rtm3/js/rtm3');

// 引入jquery
declare var $:any;

@Component({
  selector: 'ngx-real-time-fourwd-discharge',
  templateUrl: './real-time-fourwd-discharge.component.html',
  styleUrls: ['./real-time-fourwd-discharge.component.scss']
})
export class RealTimeFourwdDischargeComponent implements OnInit {
  is_not_fullscreen = true; // 是否处于全屏
  real_time_data:any = {
    title:'整车四驱排放测试设备'
  };
  img = {
    name: '图片',
    url: 'assets/eimdoard/rtm3/images/center.png',
  }
  task_data = {
    title: [
      {name:'任务名称',bind:'taskname'},
      {name:'参数',bind:'param'},
      {name:'状态',bind:'plan'},
      {name:'工程师',bind:'user'},
    ],
    data:[
      {taskname:'MTS 329',param:'55',plan:'已完成',user:'章一'},
      {taskname:'MTS HPU',param:'48',plan:'已完成',user:'章二'},
      {taskname:'MTS MAST',param:'66',plan:'80%',user:'章三'},
      {taskname:'TESTLINE',param:'88',plan:'60%',user:'章四'},
      {taskname:'TESTLINE',param:'88',plan:'60%',user:'章四'},
      {taskname:'TESTLINE',param:'88',plan:'60%',user:'章四'},
      {taskname:'TESTLINE',param:'88',plan:'60%',user:'章四'},
      {taskname:'TESTLINE',param:'88',plan:'60%',user:'章四'},
    ]
  }
  first_row_data = {
    equipment:[
      {title: '设备总数',number:'12569'},
      {title: '运行设备',number:'12375'},
      {title: '月修设备',number:'178'},
    ]
  }
  deviceid = '';
  fromRouter: any = {
    url:'',//从哪个页面跳转过来的
  }

  constructor(private layoutService:LayoutService,private activateInfo:ActivatedRoute) { }

  ngOnInit(): void {
    var gauge_data = {
      yAxisData:['text1','text2','text3','text4','text5'],
      seriesData:[100,21, 52,23,42]
    }
    rtm3.create_first_second(gauge_data);
    var gauge_data_1 = {
      radiusAxisData: ['周一', '周二', '周三', '周四'],
      seriesData:[{
        type: 'bar',
        data: [1, 2, 3, 4],
        coordinateSystem: 'polar',
        name: 'A',
        stack: 'a'
      }, {
        type: 'bar',
        data: [2, 4, 6, 8],
        coordinateSystem: 'polar',
        name: 'B',
        stack: 'a'
      }, {
        type: 'bar',
        data: [1, 2, 3, 4],
        coordinateSystem: 'polar',
        name: 'C',
        stack: 'a'
      }],
      legendData:['A','B','C']
    }
    rtm3.create_box3_left(gauge_data_1);

    
    // this.create_right_buttom();
    this.initChart();
  }

  ngAfterViewInit(){
    this.layoutService.onInitLayoutSize().subscribe(f =>{
      this.initChart();
    });

    this.activateInfo.queryParams.subscribe(f =>{
      if(f.deviceid)this.deviceid = f.deviceid;
      this.fromRouter = f;
    })
  }


  initChart(){
    this.create_right_buttom();
    this.create_box3_right();
    this.create_box3_right();
    this.create_line_chart();
    // 第三列第一行
    rtm3.create_third_first({number: '11条', title: '警告条数'}, 'third_first_one');
    rtm3.create_third_first({number: '11条', title: '警告条数'}, 'third_first_two');
    rtm3.create_third_first({number: '11条', title: '警告条数'}, 'third_first_three');
  }

  /**
   * 第三列第2行
   */
  create_line_chart(){
    var color = ['#F35331','#2499F8','#3DF098','#33B734'];
    var plan_data1 = [];
    var plan_data2 = [];
    var plan_xAxis = [];
    for (var i = 1; i <= 7; i++) {
      plan_xAxis.push("3月"+i+"日");
      plan_data1.push(Math.round(Math.random() * 100));
      plan_data2.push(Math.round(Math.random() * 100));
    }
    var gauge_data_3 = {
      plan_xAxis:plan_xAxis,
      plan_data1:plan_data1,
      plan_data2:plan_data2,
      seriesData:[
        {
          name: '计划完成数',
          type: 'bar',
          itemStyle:
            {
              normal: {color: color[1]},
              emphasis: {color: color[2]}
            },
          barWidth : 12,
          data:plan_data1
        },
        {
          name: '实际完成数',
          type: 'line',
          itemStyle: {
            normal: {
              color: '#F90',
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#CCC',
                  fontSize:12
                }
              },
              lineStyle:{
                color:'#F90',
                width:4
              }
            },
            emphasis: {
              color: '#FF0'
            }
          },
          symbolSize: 4,
          data: plan_data2
        }
      ],
      legendData:['计划完成数','实际完成数']
    };

    rtm3.create_line_chart(gauge_data_3);
  }
  /**
   * 第1列第1行 表
   */
  create_box3_right(){
    var gauge_data_2 = {
      legendData:['行业一', '行业二', '行业三', '行业四', '行业五'],
      xAxisData:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      seriesData:[
        {
          name:'行业一',
          type:'line',
          stack: '总量',
          areaStyle: {},
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'行业二',
          type:'line',
          stack: '总量',
          areaStyle: {},
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'行业三',
          type:'line',
          stack: '总量',
          areaStyle: {},
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          name:'行业四',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          name:'行业五',
          type:'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {normal: {}},
          data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
      ],
    };
    rtm3.create_box3_right(gauge_data_2);
  }
  /**
   * 第2列第3行
   */
  create_right_buttom(){
    var gauge_data_4 = {
      xAxisData:['0时','1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时'
        ,'18时','19时','20时','21时','22时','23时'],
      seriesData:[710, 312, 321,754, 500, 830, 710, 521, 504, 660, 530, 410,710, 312, 321,754, 500, 830, 710, 521, 504, 660, 530, 410],
    }
    rtm3.create_right_buttom(gauge_data_4);
  }


  showAllTemplate(){
    const board = document.getElementsByTagName('ngx-eimboard')[0];
    const sf = <Screenfull>screenfull;
    if (sf.isEnabled){ // sf.isEnabled 布尔值，判断是否允许进入全屏！
      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board)
    }
  };

}
