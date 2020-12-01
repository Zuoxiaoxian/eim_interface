import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../../../@core/utils';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { dateformat, getMessage } from '../../equipment-board';
let equipment_four_road = require('../../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-log-warm',
  templateUrl: './log-warm.component.html',
  styleUrls: ['./log-warm.component.scss']
})
export class LogWarmComponent implements OnInit {
  @Input()device
 
  log_warm = {
    // '时间','日志等级','日志信息'
    title:['time','Loglevel','logInfor'],
    data:[

    ]
  }
  timer;
  language = '';
  errorC = true;
  constructor(private http:HttpserviceService,private layoutService:LayoutService) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      if(document.getElementById('warning'))
        echarts.init(document.getElementById('warning')).resize();
    })
    this.timer = setInterval(f=>{
      if(this.device)this.get_device_mts_log();
    },1000)
    
    this.get_device_mts_log_his();
    this.get_device_mts_log_daily();
  }

  /**
   * 获取日志数据
   * @param table 
   * @param method 
   */
  get_device_mts_log(){
    // device_mts_01
    this.http.callRPC('get_device_mts_log','device_monitor.get_device_mts_log',{"device":this.device}).subscribe((g:any) =>{
      console.log(g)
        if(g.result.error || g.result.message[0].code == 0)return;
        getMessage(g,this.log_warm.data);
    })
  }


  /**
   * 日志历史记录
   */
  get_device_mts_log_his(){
    this.http.callRPC('get_device_log_daily_count','device_monitor.get_device_log_daily_count',{"device":this.device,"monday":this.getFirstDayOfWeek()}).subscribe((g:any) =>{
        console.log(g)
        if(g.result.error || g.result.message[0].code == 0)return;
        let arr = g.result.message[0].message;
        var LV1Warn = [];
        var LV2Warn = [];
        for(let i = 0;i<arr.length;i++){
          if(arr[i].level == 1)LV1Warn.push(arr[i].sumresult);
          if(arr[i].level == 2)LV2Warn.push(arr[i].sumresult);
        }
        this.initLogChart(LV1Warn,LV2Warn);
    })
  }
  //日志历史记录图表
  initLogChart(firstData,secondData){
    let data = {
      title:['一级警告','二级警告'],
      yAxis:['周一','周二','周三','周四','周五','周六','周日'],
      firstData:firstData,
      secondData:secondData
    }
    if(this.language){
      data.title = ['LV1Warn','LV2Warn'];
      data.yAxis = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    }
    if(document.getElementById('warning')){
      let myChart_3 = echarts.init(document.getElementById('warning'));
      equipment_four_road.create_warning_chart(data,myChart_3);
    }
  }

  getFirstDayOfWeek () {
    var date = new Date();
    var day = date.getDay() || 7;
    return dateformat(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day),'yyyy-MM-dd');
  };

  /**
   * 获取报警状态
   */
  get_device_mts_log_daily(){

    this.http.callRPC('get_device_log_daily_error_status','device_monitor.get_device_log_daily_error_status',
    {"device":this.device,"today":dateformat(new Date(),'yyyy-MM-dd'),"thishour":"hour"+new Date().getHours(),"level":1}).subscribe((g:any) =>{
      console.log(g)
      if(g.result.error || g.result.message[0].code == 0)return;
      let arr = g.result.message[0].message[0];
      if(arr && arr.errorcount == 1)this.errorC = true;

    })
    // device_monitor.get_device_log_daily_error_status('{"device":"device_mts_01","today":"2020-11-23","thishour":"hour14","level":1}');
  }


  //组件销毁  
  ngOnDestroy(){
    clearInterval(this.timer)
  }


}
