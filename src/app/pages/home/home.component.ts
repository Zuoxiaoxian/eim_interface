import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // 数量数据 danger、info、default、warning
  number_data = [
    { title: '设备数量', value: 14, class: "default" },
    { title: '运行数量', value: 15, class: "info" },
    { title: '停止数量', value: 16, class: "warning" },
    { title: '故障数量', value: 17, class: "danger" },
  ];
  // data
  data = [
    { col1: "电机耐久台架", col2: "位置", col3: "电机试验室" },
    { col1: "assets/images/camera4.jpg", col2: ["负责人","累计运行时间","运行状态","查看监控"], col3: ["张工","100.1","运行中","点击查看"]}
  ]

  // 卡的数据
  car_data = [
    [
      {
        data: [
          { col1: "电机耐久台架", col2: "位置", col3: "电机试验室" },
          { col1: "assets/images/camera4.jpg", col2: ["负责人","累计运行时间","运行状态","查看监控"], col3: ["张工","100.1","运行中","点击查看"]}
        ]
      },
      {
        data: [
          { col1: "电机耐久台架", col2: "位置", col3: "电机试验室" },
          { col1: "assets/images/camera4.jpg", col2: ["负责人","累计运行时间","运行状态","查看监控"], col3: ["张工","100.1","运行中","点击查看"]}
        ]
      },
      {
        data: [
          { col1: "电机耐久台架", col2: "位置", col3: "电机试验室" },
          { col1: "assets/images/camera4.jpg", col2: ["负责人","累计运行时间","运行状态","查看监控"], col3: ["张工","100.1","运行中","点击查看"]}
        ]
      },
    ],
    [
      {
        data: [
          { col1: "电机耐久台架", col2: "位置", col3: "电机试验室" },
          { col1: "assets/images/camera4.jpg", col2: ["负责人","累计运行时间","运行状态","查看监控"], col3: ["张工","100.1","运行中","点击查看"]}
        ]
      },
      {
        data: [
          { col1: "电机耐久台架", col2: "位置", col3: "电机试验室" },
          { col1: "assets/images/camera4.jpg", col2: ["负责人","累计运行时间","运行状态","查看监控"], col3: ["张工","100.1","运行中","点击查看"]}
        ]
      },
      {
        data: [
          { col1: "电机耐久台架", col2: "位置", col3: "电机试验室" },
          { col1: "assets/images/camera4.jpg", col2: ["负责人","累计运行时间","运行状态","查看监控"], col3: ["张工","100.1","运行中","点击查看"]}
        ]
      },
    ],
  ]
  constructor() { }

  ngOnInit(): void {
    localStorage.removeItem("token_expired");
  }

}
