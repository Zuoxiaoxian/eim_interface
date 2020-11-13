import { Component, OnInit,Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

declare let layui;

declare let $;

@Component({
  selector: 'ngx-expired-token',
  templateUrl: './expired-token.component.html',
  styleUrls: ['./expired-token.component.scss']
})
export class ExpiredTokenComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  constructor(private dialogRef: NbDialogRef<ExpiredTokenComponent>,) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.commit();
    
  }


  // × 关闭diallog   及关闭弹框
  closedialog(){
    this.dialogRef.close(false);
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
        return false;
      });

    });
  }

}
