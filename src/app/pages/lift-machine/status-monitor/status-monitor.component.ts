import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-status-monitor',
  templateUrl: './status-monitor.component.html',
  styleUrls: ['./status-monitor.component.scss']
})
export class StatusMonitorComponent implements OnInit {


  @ViewChild("departmentselect") departmentselect:any;
  @ViewChild("device_tpye") device_tpye: any;
  @ViewChild("asset_number") asset_number: any;
  @ViewChild("daterange") daterange: any;

  // 下拉框---部门
  departments = {
    name: "部门信息",
    placeholder: '请选择部门',
    groups:[
      { title: '动力', datas: [{ name: '动力-1' },{ name: '动力-2' },{ name: '动力-3' },{ name: '动力-4' }] },
      { title: '资产', datas: [{ name: '资产-1' },{ name: '资产-2' },{ name: '资产-3' },{ name: '资产-4' }] },
      { title: '新能源', datas: [{ name: '新能源-1' },{ name: '新能源-2' },{ name: '新能源-3' },{ name: '新能源-4' }] },
    ]
  };

  // 下拉框---设备类型
  devicetpye = {
    placeholder: "请选择设备类型",
    name: '设备类型',
    datas: [
      { name: 'GT-2030-123' },
      { name: 'GT-2030-149' },
      { name: 'GT-2030-230' },
      { name: 'GT-2030-359' },
      { name: 'GT-2030-666' },
    ]
  }
  // 下拉框---资产编号
  assetnumber = {
    placeholder: "请选择资产编号",
    name: '资产编号',
    datas: [
      { name: 'GT-2030-123' },
      { name: 'GT-2030-149' },
      { name: 'GT-2030-230' },
      { name: 'GT-2030-359' },
      { name: 'GT-2030-666' },
    ]
  }


  // 举升机数量
  datas = {
    number:[20, 13],
    row_col_title: '1号',
    row_col:[
      {
        src: "",
        time: '7.8',
        title: 'PWG-DP01'
      },
      {
        src: "assets/pages/lift-machine/images/ico_car_green.png",
        time: '7.8',
        title: 'PWG-DP01'
      },
      {
        src: "assets/pages/lift-machine/images/ico_car_green.png",
        time: '7.8',
        title: 'PWG-DP01'
      },
      {
        src: "",
        time: '7.8',
        title: 'PWG-DP01'
      },
      {
        src: "assets/pages/lift-machine/images/ico_car_green.png",
        time: '7.8',
        title: 'PWG-DP01'
      },
      {
        src: "assets/pages/lift-machine/images/ico_car_green.png",
        time: '7.8',
        title: 'PWG-DP01'
      },
    ],
    row2_col_title: '2号',
    row2_col:[
      {
        src: "",
        time: '7.8',
        title: 'PWG-DP02'
      },
      {
        src: "",
        time: '7.8',
        title: 'PWG-DP02'
      },
      {
        src: "assets/pages/lift-machine/images/ico_car_green.png",
        time: '7.8',
        title: 'PWG-DP02'
      },
      {
        src: "",
        time: '7.8',
        title: 'PWG-DP02'
      },
      {
        src: "",
        time: '7.8',
        title: 'PWG-DP02'
      },
      {
        src: "assets/pages/lift-machine/images/ico_car_red.png",
        time: '7.8',
        title: 'PWG-DP02'
      },
    ],
    row3_col:[
      {
        src: "",
        time: '7.8',
        title: 'PWG-DP03'
      },
      {
        src: "",
        time: '7.8',
        title: 'PWG-DP03'
      },
      {
        src: "",
        time: '7.8',
        title: 'PWG-DP03'
      },
      {
        src: "assets/pages/lift-machine/images/ico_car_green.png",
        time: '7.8',
        title: 'PWG-DP03'
      },
      {
        src: "",
        time: '7.8',
        title: 'PWG-DP03'
      },
      {
        src: "",
        time: '7.8',
        title: 'PWG-DP03'
      },
      {
        src: "assets/pages/lift-machine/images/ico_car_green.png",
        time: '7.8',
        title: 'PWG-DP03'
      },
      {
        src: "",
        time: '7.8',
        title: 'PWG-DP03'
      },
    ],
  }
  constructor() { }

  ngOnInit(): void {
  }


  // 搜索按钮
  query(){
    var departmentselect_datas = this.departmentselect.getselect();
    var device_tpye_data = this.device_tpye.getselect();
    var asset_number_data = this.asset_number.getselect();
    var daterange_data = this.daterange.getselect();
    console.log("<------------搜索----------->", departmentselect_datas, device_tpye_data,asset_number_data,daterange_data);
 
  }

}
