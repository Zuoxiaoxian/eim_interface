import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss']
})
export class ShortcutComponent implements OnInit {

  // 快捷方式的数据
  data = [
    [
      { svg: "#iconjiankong", title: "监控看板" },
      { svg: "#iconlishi", title: "历史数据" },
      { svg: "#iconyunying", title: "运营看板" },
    ],
    [
      { svg: "#icontongji", title: "统计分析" },
      { svg: "#iconxiaoxi1-copy", title: "消息通知" },
      { svg: "#iconbaojing", title: "报警分析" },
    ],
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
