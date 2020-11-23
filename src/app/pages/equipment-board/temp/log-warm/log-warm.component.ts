import { Component, Input, OnInit } from '@angular/core';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { getMessage } from '../../equipment-board';


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
  constructor(private http:HttpserviceService) { }

  ngOnInit(): void {
    this.timer = setInterval(f=>{
      if(this.device)this.get_device_mts_log();
    },1000)
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

  get_device_mts_log_his(){
    this.http.callRPC('get_device_mts_log','device_monitor.get_device_mts_log',{"device":this.device}).subscribe((g:any) =>{
        console.log(g)
        if(g.result.error || g.result.message[0].code == 0)return;
        getMessage(g,this.log_warm.data);
    })
  }


  //组件销毁  
  ngOnDestroy(){
    clearInterval(this.timer)
  }


}
