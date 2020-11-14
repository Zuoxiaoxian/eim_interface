


import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {  salt, ssotoken, afterloginurl, LOGIN_API, INFO_API, LOGIN_INFO,SSOUSERINFO } from '../../appconfig';
import { HttpserviceService } from '../../services/http/httpservice.service';
import { HttpHeaders,HttpClient,  } from '@angular/common/http';

// 验证器函数
import { Validators } from '@angular/forms';
// 使用 FormBuilder 来生成表单控件
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

// Md5 加密
import { Md5 } from 'ts-md5';
import { PublicmethodService } from '../../services/publicmethod/publicmethod.service';
import {  map  } from 'rxjs/operators';
import { UserInfoService } from '../../services/user-info/user-info.service';

@Component({
  selector: 'ngx-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  // 来生成表单控件响应式表单组
  profileForm:FormGroup;
  checked:boolean;
  // 加载
  loading = false;

  username :String;
  passwordmd5_salt:String | Int32Array;

  DataSuccess :any = {position: 'top-right', status: 'success', conent:"登录成功！"};
  DataDanger :any = {position: 'top-right', status: 'danger', conent:"登录失败！"}



  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private httpserviceService: HttpserviceService,
    private http: HttpClient,
    private publicmethodService: PublicmethodService,
    private userInfoService: UserInfoService,
  ) { }

  ngOnInit(): void {
    // 初始化界面时，检查是否记住密码？
    this.initLogin();
  }

  // 登录按钮！ 
  onSubmit(){
    this.username = this.profileForm.value.username;
    if (this.profileForm.value.password.toString().length === 32){
      this.passwordmd5_salt = this.profileForm.value.password.toString()
    }else{
      this.passwordmd5_salt = Md5.hashStr(this.profileForm.value.password.toString()  + salt );
    }

    console.log("username: ", this.username);
    console.log("passwordmd5_salt: ", this.passwordmd5_salt);
    console.log("checked: ", this.checked);
    if (this.checked){
      // 表示记住密码
      var login_info = {
        username: this.username,
        password: this.passwordmd5_salt,
        checked: true
      }
      localStorage.setItem(LOGIN_INFO, JSON.stringify(login_info))
    }

    // 请求判断是否正确并得到token
    this.httpserviceService.post(LOGIN_API, {"username": this.username, "password": this.passwordmd5_salt}).subscribe((res)=>{
      console.log("用户登录",res);
      if (res["accessToken"]) {
        this.localStorageService.set(
          ssotoken,
          {
            username: this.profileForm.value.username,
            password: this.passwordmd5_salt,
            remberme: this.checked,
            name: this.profileForm.value.username,
            token: res["accessToken"],
            // picture: "assets/images/eva.png"
            picture: "assets/images/man3.png"
          }
        )
        
        this.loading = true;
        // this.router.navigate([afterloginurl]);

        // ============= 存入登录日志并得到菜单
        const opts = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(ssotoken))['token'] // tslint:disable-line:object-literal-key-quotes
          })
        };
        // console.log("同步， userInfo", userInfo)
        this.http.get(INFO_API, opts).pipe(map(userInfo=>{
          console.log("============= 存入登录日志并得到菜单", userInfo)
          if (userInfo['userInfo']['roles']) {
            const userinfo = JSON.stringify(userInfo['userInfo']);
            localStorage.removeItem(SSOUSERINFO);
            localStorage.setItem(SSOUSERINFO, userInfo ? this.publicmethodService.compileStr(userinfo) : null);
            this.RecordLogin();
          } else {
            this.publicmethodService.toastr({position: 'top-right', status: 'danger', conent:"当前用户菜单权限不足，请联系管理员添加权限！"});
          }
        })).subscribe(()=>{
          this.loading = false;
          this.publicmethodService.toastr(this.DataSuccess);
          setTimeout(() => {
            this.router.navigate([afterloginurl]);
          }, 1000);
        });
      }else{
        console.log("err>>>> ",res)
        this.publicmethodService.toastr(this.DataDanger)
      }
    })

  }

  // 初始化界面时，检查是否记住密码？
  initLogin(){
    var get_admin_app_token = this.localStorageService.get(LOGIN_INFO);
    // var get_admin_app_token = this.localStorageService.get(ssotoken);
    if (get_admin_app_token == null){
      this.username = "";
        
      this.passwordmd5_salt = "";
      this.checked  = true;
    }else{
      this.username = get_admin_app_token.username;
      this.passwordmd5_salt = get_admin_app_token.password;
      this.checked  = get_admin_app_token.checked;
    }
    this.profileForm = this.fb.group({
      username: [this.username, Validators.required],
      password: [this.passwordmd5_salt, Validators.required],
    });
  }



  // 记住密码被点击，执行
  checkboxchange(checked: boolean){
    this.checked = checked;
    console.log("记住密码被点击，执行", this.checked)
  }

  RecordLogin(){

    if(this.userInfoService.getLoginName()){
      const source = this.userInfoService.getSourceid();        // 本机IP地址
      const employeeid = this.userInfoService.getEmployeeID();  // employeeid
      // result 1
      // info 登录
      const createdby = this.userInfoService.getLoginName();     // 登录名
      this.publicmethodService.record(source, employeeid, 1, '登录', createdby);
      // this.publicservice.record('local', source, employeeid, 1, '登录成功！', createdby);
      console.log("============= 存入登录日志并得到菜单",source);
    }

  }


}
