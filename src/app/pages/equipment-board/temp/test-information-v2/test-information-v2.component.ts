import { Component, Input, OnInit } from '@angular/core';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import {dateformat} from '../../equipment-board';

@Component({
  selector: 'ngx-test-information-v2',
  templateUrl: './test-information-v2.component.html',
  styleUrls: ['./test-information-v2.component.scss']
})
export class TestInformationV2Component implements OnInit {
  @Input()device;
  experiment ={
    user:'新工',
    phone:'13499998888',
    nexttest:'Geely001',
    nextdate:'20/11/01-20/11/30',
    //试验编号	开始时间	计划时长/轮次	实际时长/轮次
    title:['ExperimentNum','StartTime','PLanTimeRound','ActualTimeRound'],
    now:[
      {table:['WT0001-202011',	'20/11/05',	'100小时/30次',	'70小时/21次'],progres:70},
      // {table:['WT0001-202011',	'20/11/05',	'100小时/30次',	'70小时/21次'],progres:70},
    ],
    // 试验编号	计划开始	计划时长	计划轮次
    lastTitle:['ExperimentNum','PlanStart','PLanDuration','PlannedRound'],
    last:[
      {table:['WT0001-202011',	'20/11/05',	'100小时/30次',	'70小时/21次'],progres:0},
    ]
  }
  timer60s;

  constructor(private http:HttpserviceService) { }

  ngOnInit(): void {
    this.timer60s = setInterval(f =>{
      if(this.device)this.get_device_mst_progress();
    },60000)
    if(this.device)this.get_device_mst_progress();
  }

    /**
   * 获取进度
   */
  get_device_mst_progress(){
    this.http.callRPC('get_device_mts_progress','device_monitor.get_device_mts_progress',{
      "device":this.device,"arr":"status"
    }).subscribe((f:any) =>{
    console.log(f);
    if(f.result.error || f.result.message[0].code == 0)return;
      this.experiment.now = f.result.message[0].message.map(m =>
        ({table:[m[1],'——','——','——'],progres:parseInt((m[2]*100).toString())})
        );
    })
  }

  get_height(){
    return this.experiment.now.length <= 2?'75px':'120px';
  }

  getleft(item){
    return item > 40?item-20+'%':'20%';
  }

   //组件销毁  
   ngOnDestroy(){
    clearInterval(this.timer60s)
  }

}
