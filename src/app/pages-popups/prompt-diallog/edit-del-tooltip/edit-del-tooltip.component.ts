import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

declare let layui;

declare let $;


@Component({
  selector: 'ngx-edit-del-tooltip',
  templateUrl: './edit-del-tooltip.component.html',
  styleUrls: ['./edit-del-tooltip.component.scss']
})
export class EditDelTooltipComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;
  @Input() rowData: string;

  loading = false; // 加载，当点击保存
  constructor(private dialogRef: NbDialogRef<EditDelTooltipComponent>,private http: HttpserviceService, private publicservice: PublicmethodService) { }




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
    var rowData = this.rowData;
    console.log("-----------------------?????????????", this.title, this.content)

    layui.use(['layer','form'], function(){
      console.log("单层----",rowData)
      var layer = layui.layer;
      var form = layui.form;
      form.render();
      form.on('submit(tooltip)', function(data){
        
        if (rowData){
          // layer.alert(rowData, {
          //   title: '目录'
          // });
          dialogRef.close(true);
          
        }else{
          dialogRef.close(false);
        }
        
        return false;
      });

    });
  }



}
