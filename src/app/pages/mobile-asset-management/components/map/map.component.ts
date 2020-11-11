import { Component, OnInit, Input } from '@angular/core';

// 初始map中的point
import { map_init_point } from '../../../../appconfig';

let mapjs = require('../../../../../assets/pages/mobile-asset-management/js/my_map');

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // 模拟离线
  noinlinedatas = {
    name: '离线',
    device_info:[
      { title: "离线 21", lng_lat: [121.0229007700, 30.3322026400], info: "离线 21", updatatime:"2020-07-11 17:56:46(online)", positiontiome: "2020-07-06 09:56:46", positiontype: "卫星定位", deviceno:"9527"},
      { title: "离线 22", lng_lat: [121.1226007700, 30.3422026400], info: "离线 22", updatatime:"2020-08-11 17:56:46", positiontiome: "2020-08-06 09:02:46", positiontype: "卫星定位", deviceno:"9537"},
      { title: "离线 23", lng_lat: [121.2220007700, 30.3522026400], info: "离线 23", updatatime:"2020-07-01 22:35:46", positiontiome: "2020-06-26 19:32:46", positiontype: "卫星定位", deviceno:"9557"},
    ],
    children: ['离线 21', '离线 22', '离线 23'],
  }

  constructor() { }

  ngOnInit(): void {
    // 初始化地图
    mapjs.initmap("map_map", map_init_point);

    // 初始化离线的设备！
    mapjs.initnoinline(this.noinlinedatas)

    // 添加地图控件=地图类型+ 缩放图控件
    mapjs.addmapCtrlType();

    // 添加测距
    mapjs.ranging();

    // 添加报警控件
    mapjs.alert();

    // 点击获取点击的经纬度
    // mapjs.hitgit_lng_lat()



    
  };

  // 父组件执行，告诉该组件，需要在map上展示设备详情！
  show_info_in_map(info){
    // 创建图标，设备信息
    // 创建图标，设备信息
    for (let index = 0; index < info.listitem.children.length; index++) {
      var user_deviceInfo_ ={
        it: '',
        listitem: {
          title: '',
          lng_lat: [],
          info: ''
        },
      };
      const childrenitem = info.listitem.children[index];
      if (childrenitem == info.it){
        var device_info_item = info.listitem.device_info[index];
        user_deviceInfo_.it = info.it;
        user_deviceInfo_.listitem = device_info_item;
        mapjs.device_info(user_deviceInfo_)

      }
    }
  };

}
