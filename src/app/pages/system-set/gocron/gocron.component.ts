import { Component, OnInit } from '@angular/core';
import {HttpserviceService} from '../../../services/http/httpservice.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'ngx-gocron',
  templateUrl: './gocron.component.html',
  styleUrls: ['./gocron.component.scss'],
})
export class GocronComponent implements OnInit {

  constructor( private httpservice: HttpserviceService, private http: HttpClient) { }
  nzTabPosition = 'task'; // 默认进入任务定时
  listTaskData = [] ;
  listTaskNodeData = [] ;
  is_show_form = false;  // 控制是否显示form 表单
  formstatus = true;
  ngOnInit(): void {
    console.warn('初始化');
    this.get_cron_token();

  }
    buttonName = '';
    rowData: any;    // 原始数据
    attributeRow = {};
    formToggletask() {
    // 控制form表单是否显示
    this.is_show_form = !this.is_show_form;
    // 返回的时候刷新数据
    // this.is_show_form ? null :  this.get_data();
      this.buttonName = 'add';
      this.formstatus = !this.formstatus;
      this.datatask();
      this.datatasknode();

  }
      formToggletasknode() {
    // 控制form表单是否显示
    this.is_show_form = !this.is_show_form;
    // 返回的时候刷新数据
    // this.is_show_form ? null :  this.get_data();
      this.buttonName = 'tasknode';
      this.formstatus = !this.formstatus;
      this.datatask();
      this.datatasknode();

  }
  dialogisVisible = false;
  taskdata = [];
  dialogCancel(): void {
    this.dialogisVisible = false;
  }
    // 换页操作
   currentPageDataChange($event): void {
    // this.listOfDisplayData = $event;
    // this.refreshStatus();
  }

  disable(id): void {
    const url = `/api/task/disable/${id}`;
    const go_cron_token = localStorage.getItem('gocron_token');
    const hearder = {
      headers: new HttpHeaders({
        'Auth-Token': go_cron_token,
      }),
    };
      this.http.post(url, null, hearder).subscribe(res => {
        console.warn('res', res);
        this.datatask();
        this.datatasknode();
    });
  }

    enable(id): void {
    const url = `/api/task/enable/${id}`;
    const go_cron_token = localStorage.getItem('gocron_token');
    const hearder = {
      headers: new HttpHeaders({
        'Auth-Token': go_cron_token,
      }),
    };
      this.http.post(url, null, hearder).subscribe(res => {
        console.warn('res', res);
        this.datatask();
        this.datatasknode();
    });
  }

  deletetask(id): void {

    const url = `/api/task/remove/${id}`;
    const go_cron_token = localStorage.getItem('gocron_token');
    const hearder = {
      headers: new HttpHeaders({
        'Auth-Token': go_cron_token,
      }),
    };
      this.http.post(url, null, hearder).subscribe(res => {
        console.warn('res', res);
        this.datatask();
        this.datatasknode();
    });
  }
   deletetasknode(id): void {
    console.warn('删除任务节点', id);
    const url = `/api/host/remove/${id}`;
    const go_cron_token = localStorage.getItem('gocron_token');
    const hearder = {
      headers: new HttpHeaders({
        'Auth-Token': go_cron_token,
      }),
    };
    this.http.post(url, null, hearder).subscribe(res => {
        console.warn('res', res);
        this.datatask();
        this.datatasknode();
    });
  }

  get_cron_token() {
      this.httpservice.get_gocron_token().subscribe(token_res => {
      const go_cron_token = token_res['data']['token'];
      console.warn('go_cron_token', go_cron_token);
      localStorage.setItem('gocron_token', go_cron_token);
    });
    this.datatask();
    this.datatasknode();
  }
  results = [];
  datatask(): void {
    const url = `/api/task?page_size=20&page=1&id=&protocol=&name=&tag=&host_id=&status=`;
    const go_cron_token = localStorage.getItem('gocron_token');
    const hearder = {
      headers: new HttpHeaders({
        'Auth-Token': go_cron_token,
      }),
    };
    this.http.get(url, hearder).subscribe(res => {
        console.warn('res', res);
        this.listTaskData = res['data']['data'];
    });
}

  datatasknode(): void {
    const url = `/api/host?page_size=20&page=1&id=&name=&alias=`;
    const go_cron_token = localStorage.getItem('gocron_token');
    const hearder = {
      headers: new HttpHeaders({
        'Auth-Token': go_cron_token,
      }),
    };
    this.http.get(url, hearder).subscribe(res => {
        console.warn('res', res);
        this.listTaskNodeData = res['data']['data'];
    });
}
}
