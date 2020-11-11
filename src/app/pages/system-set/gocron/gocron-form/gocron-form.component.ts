import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {NbDialogService} from '@nebular/theme';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { HttpserviceService } from '../../../../services/http/httpservice.service';


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
              private http: HttpClient ) { }

  ngOnInit() {
    this.initForm();
  }

  back() {
     this.isback.emit(true);
     this.formstatus.emit(false);
  }
  submitForm(): void {
    if (this.validateForm.valid) {
          console.warn('表格提交', this.validateForm.valid);
          this.store_task();
      }
  }

  initForm() {
     this.validateForm = this.fb.group({

          name: ['', [Validators.required] ],
          host_id: [1, [Validators.required]],
          spec: ['', Validators.required],
          command: ['', [Validators.required]],
          timeout: [0, [Validators.required]],
          multi: [1, [Validators.required]],
          retry_times: [0, [Validators.required]],
          retry_interval: [0, [Validators.required]],
  });
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
      this.back();
    });
  }

}
