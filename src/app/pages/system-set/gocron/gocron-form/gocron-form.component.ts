import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {NbDialogService} from '@nebular/theme';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import {EditUserEmployeeGroupComponent} from '../../../../pages-popups/system-set/edit-user-employee-group/edit-user-employee-group.component';
import {EditDelTooltipComponent} from "../../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";


@Component({
  selector: 'ngx-gocron-form',
  templateUrl: './gocron-form.component.html',
  styleUrls: ['./gocron-form.component.scss'],
})
export class GocronFormComponent implements OnInit {
  @Input() task_item;
  @Input() task_list;
  @Input() type;
  @Output() isback = new EventEmitter<boolean>();
  @Output() formstatus = new EventEmitter<boolean>();
  validateForm!: FormGroup;
  hosts = []; // 所有可选的hosts
  multis = [{'label': '单例', 'value': 1}, {'label': '非单例', 'value': 2}];

  constructor(private fb: FormBuilder,
              private RPCService: HttpserviceService,
              private dialogService: NbDialogService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.initForm();
  }

  back() {
    this.isback.emit(true);
    this.formstatus.emit(false);
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      switch (this.type) {
        case 'add':
          this.store_task();
          break;
        case 'attribute':
          this.update_task();
          break;

      }
    }
  }

  initForm() {
    const url = '/api/host/all';
    const go_cron_token = localStorage.getItem('gocron_token');
    const hearder = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Auth-Token': go_cron_token,
      }),
    };
    this.http.get(url, hearder).subscribe(res => {
      console.warn('res', res);
      this.hosts = res['data'];
    });
    if (this.task_item && this.type === 'attribute') {
      this.validateForm = this.fb.group({
        name: [this.task_item.name, [Validators.required]],
        host_id: [this.task_item.hosts[0]['host_id'], [Validators.required]],
        spec: [this.task_item.spec],
        command: [this.task_item.command, [Validators.required]],
        timeout: [this.task_item.timeout, [Validators.required]],
        multi: [this.task_item.multi, [Validators.required]],
        retry_times: [this.task_item.retry_times, [Validators.required]],
        retry_interval: [this.task_item.retry_interval, [Validators.required]],
      });
    } else {
      this.validateForm = this.fb.group({
        name: ['', [Validators.required]],
        host_id: ['', [Validators.required]],
        spec: ['', Validators.required],
        command: ['', [Validators.required]],
        timeout: [0, [Validators.required]],
        multi: [1, [Validators.required]],
        retry_times: [0, [Validators.required]],
        retry_interval: [0, [Validators.required]],
      });
    }
  }

  resetForm(e: MouseEvent) {
    e.preventDefault();
    this.validateForm.reset();
    this.initForm();
  }

  store_task() {
    const form_value = this.validateForm.value;
    const params = {
      id: this.type === 'add' ? '' : this.task_item.id,
      level: 1,
      dependency_status: 1,
      dependency_task_id: '',
      protocol: 2,
      http_method: 1,
      notify_status: 1,
      notify_type: 2,
      notify_receiver_id: '',
      notify_keyword: '',
      remark: '',
      status: 1,
      ...form_value,
    };
    const body = new URLSearchParams();
    for (let key in params) {
      body.set(key, params[key]);
    }
    console.warn('body.toString()', body.toString());
    const url = '/api/task/store';
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
              console.warn('添加成功', res);
       this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false, context: { title: '提示', content:   `添加成功！`}} ).onClose.subscribe(
         name => {
              console.warn( 'name', name);
        },
      );
      this.back();
    } else {
             console.warn('添加失败', res);
 this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false, context: { title: '提示', content:   `添加失败！` + res['message'] }} ).onClose.subscribe(
         name => {
          console.warn( 'name', name);
        },
      );
      }
    },
       );
  }

  update_task() {
      const table = 'jobs_task';
      const method = 'update_jobs_task';
      const params = this.validateForm.value;
      params['taskid'] = this.task_item.id;
      console.warn(JSON.stringify(params));
      this.RPCService.callRPC(table, method, params).subscribe(
          result => {
           if (result['result']['message'][0]['code'] === 1) {
              console.warn('更新成功', result);
        this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false, context: { title: '提示', content:   `更新成功！`}} ).onClose.subscribe(
         name => {
              console.warn( 'name', name);
        },
      );
              this.back();
          } else {
             console.warn('更新失败', result);
 this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false, context: { title: '提示', content:   `更新失败！`}} ).onClose.subscribe(
         name => {
          console.warn( 'name', name);
        },
      );
           }
          },
        );
  }
}
