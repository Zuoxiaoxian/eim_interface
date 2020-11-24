import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
// import {CallDataService} from '../../../../service/call-data.service';
// import {UserInfoService} from '../../../../service/user-info.service';
import {NbDialogService} from '@nebular/theme';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import {Observable, Observer} from 'rxjs';
import {EditDelTooltipComponent} from "../../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";

@Component({
  selector: 'ngx-gocron-form-node',
  templateUrl: './gocron-form-node.component.html',
  styleUrls: ['./gocron-form-node.component.scss'],
})
export class GocronFormNodeComponent implements OnInit {

 @Input() task_item;
  @Input() task_list;
  @Input() type;
  @Output() isback = new EventEmitter<boolean>();
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private RPCService: HttpserviceService,
              private dialogService: NbDialogService,
              private http: HttpClient ) { }

  ngOnInit() {
    this.initForm();
  }

  back() {
     this.isback.emit(true);
  }
  submitForm(): void {
    if (this.validateForm.valid) {
          console.warn('表格提交', this.validateForm.valid);
          this.store_task();
      }
  }
  initForm() {
    this.validateForm = this.fb.group({

      alias: ['', [Validators.required]],
      name: ['', [Validators.required]],
      port: ['', [Validators.required]],
      remark: [''],
    });
}
  resetForm(e: MouseEvent) {
     e.preventDefault();
    this.validateForm.reset();
    this.initForm();
  }

  store_task() {
    const form_value = this.validateForm.value;
    const params = {
          ...form_value,
    };
    const body = new URLSearchParams();
    for (let key in params) {
      body.set(key, params[key]);
    }
    console.warn('body.toString()', body.toString());
    const url = '/api/host/store';
    const go_cron_token = localStorage.getItem('gocron_token');
    const hearder = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Auth-Token': go_cron_token,
        }),
    };
    this.http.post(url, body.toString(), hearder).subscribe(res => {
      console.warn('res', res);
      if (res['message'] === '保存成功') {
              console.warn('添加任务节点成功', res);
       this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false, context: { title: '提示', content:   `添加任务节点成功！`}} ).onClose.subscribe(
         name => {
              console.warn( 'name', name);
        },
      );
      this.back();
    } else {
             console.warn('添加任务节点失败', res);
 this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false, context: { title: '提示', content:   `添加任务节点失败！` + res['message'] }} ).onClose.subscribe(
         name => {
          console.warn( 'name', name);
        },
      );
      }
    });
  }

}
