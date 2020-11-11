import { Component, OnInit, Input,ViewChild,TemplateRef, Output, EventEmitter } from '@angular/core';

// 初始化应用程序的翻译服务
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

// 设备跟踪
import { DeviceTraceComponent } from '../device-trace/device-trace.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-inline',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.scss']
})
export class InlineComponent implements OnInit {

  @Input() datas: any;
  @Output() private send_user_deviceInfo = new EventEmitter<any>();
  @ViewChild('tabs', { read: TemplateRef }) templateTabs: TemplateRef<any>;

  component:any = "Hello";

  // 根据得到的用户得到设备信息
  user_deviceInfo = {
    it: '',
    listitem: '',
  };


  // more
  moreitems = [
    { title: '设备指令'},
    { title: '设备详情' },
  ];

  currentLangue = 'zh-CN';


  constructor(private translate: TranslateService,
    private dialogService: NbDialogService,) {

    // 当切换语言时执行
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("监听语言变化： ", event.lang);
      if (event.lang != this.currentLangue){
        this.moreitems = [{ title: 'Device order'},{ title: 'Device detail' },]
      }else{
        this.moreitems = [{ title: '设备指令'},{ title: '设备详情' },]
      }
    })
    // 加载时，进行翻译
    this.translate.setDefaultLang(this.currentLangue);

   }

  ngOnInit(): void {
    

  }


  // 点击下拉框
  changeComponent(child, a){
    this.user_deviceInfo.it = child;
    this.user_deviceInfo.listitem = a;
    this.component = this.templateTabs;
    // 将数据传递给父组件！
    this.send_user_deviceInfo.emit(this.user_deviceInfo);
  }
  
  // 轨迹 事件
  path(user_deviceInfo){
    console.log("=====轨迹 事件====", user_deviceInfo)
    // this.locastoragservice.set("user_deviceInfo", user_deviceInfo);

    // this.router.navigate(['/pages/gps/path/']);

  }


  // 编辑-弹出组件
  edit(user_deviceInfo){
    const context = { text: user_deviceInfo }
    // this.dialogService.open(DeviceEditComponent, { hasBackdrop: false, hasScroll: true, context }, // 无背景、可滚动、参数
    //   )
  }
  // 设备跟踪
  trace(user_deviceInfo){
    const context = { text: user_deviceInfo }
    this.dialogService.open(DeviceTraceComponent, { hasBackdrop: true, hasScroll: true, context }, // 无背景、可滚动
    )

  }

}
