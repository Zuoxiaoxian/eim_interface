import { Component, OnInit } from '@angular/core';

// 初始map中的point
import { map_init_point } from '../../../../appconfig';

import { NbDialogRef } from '@nebular/theme';

// 全屏
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';

let map_trace = require('../../../../../assets/pages/mobile-asset-management/js/map_trace');

@Component({
  selector: 'ngx-device-trace',
  templateUrl: './device-trace.component.html',
  styleUrls: ['./device-trace.component.scss']
})
export class DeviceTraceComponent implements OnInit {

  text; // 得到传递的数据

  isnot_fullscreen:boolean = true; // 是否处于全屏
  loading = false; // 加载，当点击保存

  constructor(protected dialogRef: NbDialogRef<DeviceTraceComponent>) { }

  ngOnInit(): void {
    console.log("---跟踪 得到的设备数据----", this.text);
    // 初始化map
    map_trace.initmap("map_trace", map_init_point);

    // 定位设备位置
    map_trace.localtion_device(this.text)
  }

  // 全屏功能
  showAllTemplate(){
    const editcar = document.getElementById("editcar")
    const sf = <Screenfull>screenfull;
    if (sf.isEnabled){ // sf.isEnabled 返回一个Boolean 是否允许进入全屏！
      this.isnot_fullscreen = sf.isFullscreen
      console.log("是否处于全屏：", this.isnot_fullscreen);
      sf.toggle(editcar);
    }
  }
  // × 关闭diallog
  closedialog(){
    this.dialogRef.close();
  }


}
