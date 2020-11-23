import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

declare let layui;

declare let $;

@Component({
  selector: 'ngx-expired-token',
  templateUrl: './expired-token.component.html',
  styleUrls: ['./expired-token.component.scss']
})
export class ExpiredTokenComponent implements OnInit,OnDestroy {

  // @Input() title: string;
  // @Input() content: string;
  constructor(private dialogRef: NbDialogRef<ExpiredTokenComponent>,) { }

  ngOnInit(): void {
  }

  title = "提示";
  content = "您的登录已失效，请重新登录";

  ngAfterViewInit(){
    this.commit();
    
  }

  ngOnDestroy(){
    // 删除 man-hour-kpi-report2-buttons
    localStorage.removeItem("token_expired");
  }


  // × 关闭diallog   及关闭弹框
  closedialog(){
    this.dialogRef.close(false);
    // localStorage.setItem("token_expired", 'false');
  }
  
  // 取消
  cancel(){
    this.dialogRef.close(false);
  }

  // 确定按钮
  commit(){
    var dialogRef = this.dialogRef;
    console.log("-----------------------?????????????", this.title, this.content)
    layui.use(['layer','form'], function(){
      var form = layui.form;
      form.render();
      form.on('submit(tooltip)', function(data){
        dialogRef.close(true);
        // localStorage.setItem("token_expired", 'false');
        return false;
      });

    });
  }

}
