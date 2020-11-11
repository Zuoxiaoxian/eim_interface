import { Component, OnInit, ViewChild } from '@angular/core';



import { Observable, of } from 'rxjs';
import { map, startWith,filter  } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export interface Group {
  name: string;
  device_info:any[];
  children: string[];
}

@Component({
  selector: 'ngx-location-monitoring',
  templateUrl: './location-monitoring.component.html',
  styleUrls: ['./location-monitoring.component.scss']
})
export class LocationMonitoringComponent implements OnInit {
  @ViewChild("all") all: any;
  @ViewChild("inline") inline: any;
  @ViewChild("noinline") noinline: any;
  @ViewChild("map") map: any;

  groups: Group[] = [
    {
      name: '在线',
      device_info:[
        { title: "在线 11", lng_lat: [121.3229007700, 30.3322026400], info: "在线 11", updatatime:"2020-07-11 17:56:46(online)", positiontiome: "2020-07-06 09:56:46", positiontype: "卫星定位", deviceno:"9527"},
        { title: "在线 12", lng_lat: [121.3226007700, 30.3322026400], info: "在线 12", updatatime:"2020-08-11 17:56:46", positiontiome: "2020-08-06 09:02:46", positiontype: "卫星定位", deviceno:"9537"},
        { title: "在线 13", lng_lat: [121.3223007700, 30.3322026400], info: "在线 13", updatatime:"2020-07-13 19:56:46(online)", positiontiome: "2020-07-08 15:44:46", positiontype: "卫星定位", deviceno:"9547"},
        { title: "离线 23", lng_lat: [121.3220007700, 30.3322026400], info: "离线 23", updatatime:"2020-07-01 22:35:46", positiontiome: "2020-06-26 19:32:46", positiontype: "卫星定位", deviceno:"9557"},
      ],
      children: ['在线 11', '在线 12', '在线 13', '离线 23'],
    },
    {
      name: '离线',
      device_info:[
        { title: "离线 21", lng_lat: [121.3229007700, 30.3322026400], info: "离线 21", updatatime:"2020-07-11 17:56:46(online)", positiontiome: "2020-07-06 09:56:46", positiontype: "卫星定位", deviceno:"9527"},
        { title: "离线 22", lng_lat: [121.3226007700, 30.3322026400], info: "离线 22", updatatime:"2020-08-11 17:56:46", positiontiome: "2020-08-06 09:02:46", positiontype: "卫星定位", deviceno:"9537"},
        { title: "离线 23", lng_lat: [121.3220007700, 30.3322026400], info: "离线 23", updatatime:"2020-07-01 22:35:46", positiontiome: "2020-06-26 19:32:46", positiontype: "卫星定位", deviceno:"9557"},
      ],
      children: ['离线 21', '离线 22', '离线 23'],
    },
    {
      name: '其它',
      device_info:[
        { title: "其它 31", lng_lat: [121.3229007700, 30.3322026400], info: "其它 31", updatatime:"2020-07-11 17:56:46(online)", positiontiome: "2020-07-06 09:56:46", positiontype: "卫星定位", deviceno:"9527"},
        { title: "其它 32", lng_lat: [121.3226007700, 30.3322026400], info: "其它 32", updatatime:"2020-08-11 17:56:46", positiontiome: "2020-08-06 09:02:46", positiontype: "卫星定位", deviceno:"9537"},
        { title: "其它 33", lng_lat: [121.3220007700, 30.3322026400], info: "其它 33", updatatime:"2020-07-01 22:35:46", positiontiome: "2020-06-26 19:32:46", positiontype: "卫星定位", deviceno:"9557"},
        { title: "离线 23", lng_lat: [121.3220007700, 30.3322026400], info: "离线 23", updatatime:"2020-07-01 22:35:46", positiontiome: "2020-06-26 19:32:46", positiontype: "卫星定位", deviceno:"9557"},
      ],
      children: ['其它 31', '其它 32', '其它 33', '离线 23'],
  }];
  filteredGroups$: Observable<Group[]>;
  inputFormControl: FormControl;

  // 传递给all、inline、noinline中的数据
  datas = [];


  constructor() { }

  ngOnInit(): void {
    // this.groups = 
    this.fengzhuang_filter();
    

  }

  // 封装自动
  fengzhuang_filter(){
    this.filteredGroups$ = of(this.groups);
    this.inputFormControl = new FormControl();

    this.filteredGroups$ = this.inputFormControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );
  }
  
  // ---------------tabs----

  selectid = "#all";
  active(id){
    var li = document.querySelectorAll('.tabs li');
    console.log("--li----", li)
    li.forEach(element => {
      element.className = null
    });
    var select = document.querySelector(id);
    select.className = "is-active";
    this.selectid = id;

    // 根据id不同 得到不同的groups
    switch (id) {
      case "#inline":
        this.groups = [
          {
            name: '在线',
            device_info:[
              { title: "在线 11", lng_lat: [121.32145,30.332795], info: "在线 11", updatatime:"2020-07-11 17:56:46(online)", positiontiome: "2020-07-06 09:56:46", positiontype: "卫星定位", deviceno:"9527"},
              { title: "在线 12", lng_lat: [121.2226007700, 30.2622026400], info: "在线 12", updatatime:"2020-08-11 17:56:46", positiontiome: "2020-08-06 09:02:46", positiontype: "卫星定位", deviceno:"9537"},
              { title: "在线 13", lng_lat: [121.1223007700, 30.1322026400], info: "在线 13", updatatime:"2020-07-13 19:56:46(online)", positiontiome: "2020-07-08 15:44:46", positiontype: "卫星定位", deviceno:"9547"},
              { title: "离线 23", lng_lat: [121.321621,30.331782], info: "离线 23", updatatime:"2020-07-01 22:35:46", positiontiome: "2020-06-26 19:32:46", positiontype: "卫星定位", deviceno:"9557"},
            ],
            children: ['在线 11', '在线 12', '在线 13', '离线 23'],
          },
        ]
        break;
      case "#noinline":
        this.groups = [
          {
            name: '离线',
            device_info:[
              { title: "离线 21", lng_lat: [121.0229007700, 30.3322026400], info: "离线 21", updatatime:"2020-07-11 17:56:46(online)", positiontiome: "2020-07-06 09:56:46", positiontype: "卫星定位", deviceno:"9527"},
              { title: "离线 22", lng_lat: [121.1226007700, 30.3422026400], info: "离线 22", updatatime:"2020-08-11 17:56:46", positiontiome: "2020-08-06 09:02:46", positiontype: "卫星定位", deviceno:"9537"},
              { title: "离线 23", lng_lat: [121.2220007700, 30.3522026400], info: "离线 23", updatatime:"2020-07-01 22:35:46", positiontiome: "2020-06-26 19:32:46", positiontype: "卫星定位", deviceno:"9557"},
            ],
            children: ['离线 21', '离线 22', '离线 23'],
          },
        ]
        break;
    
      default:
        this.groups = [
          {
            name: '在线',
            device_info:[
              { title: "在线 11", lng_lat: [121.3229007700, 30.3322026400], info: "在线 11", updatatime:"2020-07-11 17:56:46(online)", positiontiome: "2020-07-06 09:56:46", positiontype: "卫星定位", deviceno:"9527"},
              { title: "在线 12", lng_lat: [121.3226007700, 30.3322026400], info: "在线 12", updatatime:"2020-08-11 17:56:46", positiontiome: "2020-08-06 09:02:46", positiontype: "卫星定位", deviceno:"9537"},
              { title: "在线 13", lng_lat: [121.3223007700, 30.3322026400], info: "在线 13", updatatime:"2020-07-13 19:56:46(online)", positiontiome: "2020-07-08 15:44:46", positiontype: "卫星定位", deviceno:"9547"},
              { title: "离线 23", lng_lat: [121.3220007700, 30.3322026400], info: "离线 23", updatatime:"2020-07-01 22:35:46", positiontiome: "2020-06-26 19:32:46", positiontype: "卫星定位", deviceno:"9557"},
            ],
            children: ['在线 11', '在线 12', '在线 13', '离线 23'],
          },
          {
            name: '离线',
            device_info:[
              { title: "离线 21", lng_lat: [121.3229007700, 30.3322026400], info: "离线 21", updatatime:"2020-07-11 17:56:46(online)", positiontiome: "2020-07-06 09:56:46", positiontype: "卫星定位", deviceno:"9527"},
              { title: "离线 22", lng_lat: [121.3226007700, 30.3322026400], info: "离线 22", updatatime:"2020-08-11 17:56:46", positiontiome: "2020-08-06 09:02:46", positiontype: "卫星定位", deviceno:"9537"},
              { title: "离线 23", lng_lat: [121.3220007700, 30.3322026400], info: "离线 23", updatatime:"2020-07-01 22:35:46", positiontiome: "2020-06-26 19:32:46", positiontype: "卫星定位", deviceno:"9557"},
            ],
            children: ['离线 21', '离线 22', '离线 23'],
          },
          {
            name: '其它',
            device_info:[
              { title: "其它 31", lng_lat: [121.3229007700, 30.3322026400], info: "其它 31", updatatime:"2020-07-11 17:56:46(online)", positiontiome: "2020-07-06 09:56:46", positiontype: "卫星定位", deviceno:"9527"},
              { title: "其它 32", lng_lat: [121.3226007700, 30.3322026400], info: "其它 32", updatatime:"2020-08-11 17:56:46", positiontiome: "2020-08-06 09:02:46", positiontype: "卫星定位", deviceno:"9537"},
              { title: "其它 33", lng_lat: [121.3220007700, 30.3322026400], info: "其它 33", updatatime:"2020-07-01 22:35:46", positiontiome: "2020-06-26 19:32:46", positiontype: "卫星定位", deviceno:"9557"},
              { title: "离线 23", lng_lat: [121.3220007700, 30.3322026400], info: "离线 23", updatatime:"2020-07-01 22:35:46", positiontiome: "2020-06-26 19:32:46", positiontype: "卫星定位", deviceno:"9557"},
            ],
            children: ['其它 31', '其它 32', '其它 33', '离线 23'],
        }];
        break;
    }
    console.log("groups>>>>>>>>", this.groups);
    this.fengzhuang_filter();

  }


  // 点击设备在map上展示设备信息,子组件调用
  get_device_for_show_mapinfo(e){
    console.log("--点击设备在map上展示设备信息---", e);
    this.map.show_info_in_map(e);
  }



  

  // ---------------------------------------
  private filterChildren(children: string[], filterValue: string) {
    
    var children = children.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
    return children
  }

  private filter(value: string): Group[] {
    const filterValue = value.toLowerCase();
    this.datas = [];
    return this.groups
    .map(group => {
      var item = {
        name: group.name,
        device_info: group.device_info,
        children: this.filterChildren(group.children, filterValue),
      }
      this.datas.push(item);
      console.log("--------------------datas", this.datas)
      return item;
      })
      .filter(group => group.children.length);
  }

  trackByFn(index, item) {
    return item.name;
  }


}
