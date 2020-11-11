import { Injectable } from '@angular/core';

import { NbToastrService } from '@nebular/theme';
import { Data } from '../../appconfig';

import { PlatformLocation } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../http/httpservice.service';
import { HttpHeaders } from '@angular/common/http';
import { loginurl,INFO_API,SYSMENU, adminlocalstorage,ssotoken, menu_button_list} from '../../appconfig';
import {DatePipe} from '@angular/common';  

import { map } from 'rxjs/operators';

// ngx-toastr
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


// 订阅
import { BehaviorSubject } from 'rxjs' 


@Injectable({
  providedIn: 'root'
})
export class PublicmethodService {

  constructor(private toatrservice: NbToastrService, private location: PlatformLocation, private httpservice: HttpserviceService,
    private ngxtoastrservice: ToastrService, private datepipe: DatePipe, private router: Router) { }

  /**
   * 弹出提示
   */
  public toastr(data: Data) {
    var position = data.position;
    var status = data.status;
    var conent = data.conent;
    this.toatrservice.show(
      status,
      conent,
      { position, status}
    )
  };

  public showngxtoastr(data) {
    var position = data.position;
    var status = data.status;
    var conent = data.conent;
    console.log("展示状态", data, position, status,conent)
    switch (status) {
      case "info":
        this.ngxtoastrservice.info(status, conent, {positionClass: position, onActivateTick:true})
        break;
      case "success":
        this.ngxtoastrservice.success(status, conent, {positionClass: position, onActivateTick:true})
        break;
      case "warning":
        this.ngxtoastrservice.warning(status, conent, {positionClass: position, onActivateTick:true})
        break;
      case "danger":
        this.ngxtoastrservice.warning(status, conent, {positionClass: position, onActivateTick:true})
        break;
      case "error":
        this.ngxtoastrservice.error(status, conent, {positionClass: position, onActivateTick:true})
        break;
    }
  };



  // 得到当前的url
  public get_current_url(){
    for (const i in this.location){
      
      if (i === 'location'){
        return new Observable((observe)=>{
          observe.next(this.location[i].href)
        })
      }
    }
  }
  // 得到当前的url 文件路径
  public get_current_pathname(){
    return new Observable((observe)=>{
      var sysmenu = localStorage.getItem(SYSMENU) == null ? [] : JSON.parse(localStorage.getItem(SYSMENU));
      if (sysmenu.length == 0){
        this.getMenu().subscribe((data)=>{
          const colums = {
            languageid: this.httpservice.getLanguageID(),
            roles: data
          };
          console.log("---colums--",colums)
          const table = "menu_item";
          const method = "get_systemset_menu_all";
          console.log("***********************************8-sysmenu",sysmenu, sysmenu.length)
          this.httpservice.callRPC(table, method, colums).subscribe((result)=>{
            const baseData = result['result']['message'][0];
            if (baseData != "T"){
              var menu = this.dataTranslation(baseData);
              localStorage.setItem(SYSMENU, JSON.stringify(menu));
              for (const i in this.location){
                if (i === 'location'){
                  menu.forEach(element => {
                    
                    if (element["link"] === this.location[i].pathname){
                      observe.next(element)
                    }
                  })
                
                }
              }
            }
          })
        });
      }else{
        
        for (const i in this.location){
          if (i === 'location'){
            sysmenu.forEach(element => {
              
              if (element["link"] === this.location[i].pathname){
                observe.next(element)
              }
            })
            
          }
        }
      }


    });
  }


  dataTranslation(baseMenu) {
    // 生成父子数据结构
    console.log("-=-=-=-=-=public-=baseMenu-=-=-=-=",baseMenu)
    let nodeData = [];
    baseMenu.forEach(item => {
      let map = {};
      map["id"] = item.id;
      map["link"] = item.link;
      map["active"] = item.active;
      map["orderindex"]=item.orderindex;
      map["title"] = item.title;
      map["icon"] = item.icon;
      map["type"] = item.type;
      map["textid"] = item.textid;
      map["permission"] = item.permission === null ? null: item.permission;
      
      if (item.parentid === null){
        map["parentid"] = 0;
      }else{
        map["parentid"] = item.parentid;
      }
      nodeData.push(map)
    });
    
    
    
    return nodeData;
  }


  // 得到当前的url ？参数
  public get_current_search(){
    for (const i in this.location){
      if (i === 'location'){
        return this.location[i].search
      }
    }
  }

  // 加密解密 userInfo
  // 加密
  public compileStr(code) {
    let c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (let i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
  }

  // 解密
  public uncompileStr(code) {
      code = unescape(code);
      let c = String.fromCharCode(code.charCodeAt(0) - code.length);
      for ( let i = 1; i < code.length; i++) {
          c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
      }
      return c;
  };

  // 写入系统日志
  public record(source: string, employeeid: number, result: number , info: string, createdby: string) {
    /*
     */
    const table = 'sys_security_log';
    const method = 'insert_sys_login_log';
    const operationmessage = {
      "source": source,                    // IP
      "employeeid": employeeid,            // 登录ID
      "result": result,                    // 结果 0 失败 1 成功
      "info": info,                        // 描述 登录、登出
      "createdby": createdby ,             // 登录人
    };
    this.httpservice.callRPC(table, method, operationmessage).subscribe(
     res => {
       console.warn('SecurityLogService>>', res);
      }
    );
  };

  // 写入操作日志
  public option_record(employeeid: number, result: number , transactiontype:string, info: string, createdby: string) {
    /*
     */
    const table = 'sys_transaction_log';
    const method = 'insert_sys_transaction_log';
    const operationmessage = {
      employeeid: employeeid,            // 登录ID
      result: result,                    // 结果 0 失败 1 成功
      transactiontype: transactiontype, // 类型：新增、删除、修改、查看、导入导出等！
      info: info,                        // 具体操作！
      createdby: createdby ,             // 登录人
    };
    this.httpservice.callRPC(table, method, operationmessage).subscribe(
     res => {
       console.warn('option_record>>', res);
      }
    );
  };





  // 得到用户菜单
  getMenu(){
    // ============= 存入登录日志并得到菜单
    /*
    * 这个是管理员的路的，应该是根据用户名对应的roleid
    */
   var admintoken = JSON.parse(localStorage.getItem(adminlocalstorage))? JSON.parse(localStorage.getItem(adminlocalstorage)): false;
   var token = JSON.parse(localStorage.getItem(ssotoken))? JSON.parse(localStorage.getItem(ssotoken)): false;
   if (admintoken){
     const opts = {
       headers: new HttpHeaders({
         // 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(localstorage))['token'] // tslint:disable-line:object-literal-key-quotes
         'Authorization': 'Bearer ' + admintoken.token  // tslint:disable-line:object-literal-key-quotes
       })
     };
     console.log("damin  ", admintoken)
     console.log("damin Token ", admintoken.token)
     return new Observable((observe)=>{
       this.httpservice.get(INFO_API, opts)
       .subscribe(
         userInfo=>{
         var roles_list = [];
         console.log("userInfo  =======================", userInfo)
         if (userInfo["status"] === 401){
           this.toastr({position: 'top-right', status: 'warning', conent:"token 过期了！需要重新登录"});
           this.router.navigate([loginurl])
           observe.next(roles_list);
         }
         else if (userInfo['userInfo']['roles']) {
           const roles = userInfo['userInfo']["roles"];
           roles.forEach(role => {
             roles_list.push(role["roleid"]);
           });
           observe.next(roles_list)
         } else {
           this.toastr({position: 'top-right', status: 'danger', conent:"当前用户菜单权限不足，请联系管理员添加权限！"});
           observe.next(roles_list)
         }
         
       },error=>{
         alert("err")
        console.warn("userInfo 》》》》》》error",error)
       }
       )
 
     })
   }else if (token){
    console.log("public 得到getmenu-  返回的是用户角色！", token);

    const opts = {
      headers: new HttpHeaders({
        // 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(localstorage))['token'] // tslint:disable-line:object-literal-key-quotes
        'Authorization': 'Bearer ' + token.token  // tslint:disable-line:object-literal-key-quotes
      })
    };
    console.log("token  ", token)
    console.log("token Token ", token.token)
    return new Observable((observe)=>{
      this.httpservice.get(INFO_API, opts)
      .subscribe(
        userInfo=>{
        var roles_list = [];
        console.log("userInfo  =======================", userInfo)
        if (userInfo["status"] === 401){
          this.toastr({position: 'top-right', status: 'warning', conent:"token 过期了！需要重新登录"});
          // 这里将token过期了，就跳转到登录界面
          this.router.navigate([loginurl])
          observe.next(roles_list);
        }
        else if (userInfo['userInfo']['roles']) {
          const roles = userInfo['userInfo']["roles"];
          roles.forEach(role => {
            roles_list.push(role["roleid"]);
          });
          observe.next(roles_list)
        } else {
          this.toastr({position: 'top-right', status: 'danger', conent:"当前用户菜单权限不足，请联系管理员添加权限！"});
          observe.next(roles_list)
        }
        
      },error=>{
        alert("err")
       console.warn("userInfo 》》》》》》error",error)
      }
      )

    })

   }else{
     return new Observable((observe)=>{
       observe.next(false)
     })
   }
  }


  // 得到当前日期和时间
  getcurdate(){
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();

    
    return [hour, minute, second]

  }

  // 得到时间范围，默认 昨天---今天

  public selectedMoments = [
    // new Date(new Date().getTime() - 86400000), // 昨天  getTime() 毫秒数 
    // new Date() // 今天
    this.formatdata(new Date(new Date().getTime() - 86400000), 'yyyy-MM-dd'),
    this.formatdata(new Date(), 'yyyy-MM-dd'),

  ];

  // 将日期格式化
  formatdata(data,format){
    return this.datepipe.transform(data,format)
    // return this.datepipe.transform(data,'yyyy-MM-dd HH:mm:ss')
  }



  // lauyi需要得到 header，
  getheader(){
    var admintoken = JSON.parse(localStorage.getItem(adminlocalstorage))? JSON.parse(localStorage.getItem(adminlocalstorage)): false;
    var token = JSON.parse(localStorage.getItem(ssotoken))? JSON.parse(localStorage.getItem(ssotoken)): false;
    if (admintoken){
      const opts = {
        headers: 'Authorization' + ':' + 'Bearer ' + admintoken.token  
      }
      return opts
    }
    const opts = {
      headers: 'Authorization' + ':' +  'Bearer ' + token.token  // tslint:disable-line:object-literal-key-quotes
    }
    return opts
  }


  // ==========================================
    // 非父子组件见的传值
    // 订阅的属性：用来给订阅方存储数据
    public currentcomponent = new BehaviorSubject<any>(null);
  
    // 订阅的方法：用来接受数据
    getcomponent(component: any): void{
      this.currentcomponent.next(component);
    }

    // 订阅的属性：用来给订阅方存储数据
    public currentmethod = new BehaviorSubject<string>(null);

    // 订阅的方法：用来接受数据
    getmethod(method: string): void{
      this.currentmethod.next(method);
    }
  
  // ==========================================


  // -----------------------------------------页面得到 权限buttons

  get_buttons(){
    return new Observable((observale)=>{
      this.getMenu().subscribe((data)=>{
        if (data){
          const colums = {
            languageid: this.httpservice.getLanguageID(),
            roles: data
          };
          console.log("---colums--",colums)
          const table = "menu_item";
          const method = "get_menu_by_roles";
          this.httpservice.callRPC(table, method, colums).subscribe((result)=>{
            const baseData = result['result']['message'][0];
            // 得到具有的按钮列表 ------------------------------
            var button_list = [];
            baseData.forEach(element => {
              if (element["type"] === 2 ){
                var method = element["permission"].split(":")[1];
                // info success warning danger  primary
                switch (method) {
                  case 'add':
                    element['class']="info"
                  break;
                  case 'del':
                    element['class']="danger"
                    break;
                  case 'edit':
                    element['class']="warning"
                    break;
                  case 'query':
                    element['class']="success"
                    break;
                  case 'import':
                    element['class']="primary"
                    break;
                  case 'download':
                    element['class']="primary"
                    break;
                }
                button_list.push(element);
              }
            });
            console.log("按钮=====================", button_list)
            localStorage.setItem(menu_button_list, JSON.stringify(button_list));
            observale.next(button_list);
          })
        }
      });

    })
  }

   
  // -----------------------------------------页面得到 权限buttons

}
