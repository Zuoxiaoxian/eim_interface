import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {NbMenuItem} from "@nebular/theme";
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { PublicmethodService } from '../services/publicmethod/publicmethod.service';
import { HttpserviceService } from '../services/http/httpservice.service';

import { NbMenuService } from '@nebular/theme';


import { UserInfoService } from '../services/user-info/user-info.service';

import { SYSMENU, menu_button_list, loginurl } from '../appconfig';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu" tag="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  // menu = MENU_ITEMS;
  menu: NbMenuItem[] = [];

  constructor(private localStorageService: LocalStorageService,
    private publicservice: PublicmethodService, 
    private httpservice: HttpserviceService,
    private menuservice: NbMenuService,
    private userInfoService:UserInfoService,
    private router: Router){
    // 先注释了
    // this.RecordLogin();
  }
    
  ngOnInit() {
    this.loadMenu();
  }

  ngOnDestory(){
    this.menuservice.addItems([], 'menu');
  }

  loadMenu(){
    var mulu = localStorage.getItem('mulu') == null ? [] : JSON.parse(localStorage.getItem('mulu'));
    var mulu_language = localStorage.getItem('mulu_language') == null ? 'zh_CN' : localStorage.getItem('mulu_language');
    if(mulu.length == 0 || mulu_language != localStorage.getItem('currentLanguage')){
      this.publicservice.getMenu().subscribe((data)=>{
        console.log("-----------------data", data)
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
            // 得到具有的按钮列表 ------------------------------
  
  
  
            if (baseData === "T"){
              console.log("?????????????????", baseData)
            }else{
              console.log("------菜单--目录：", baseData)
              // 过滤 link、icon 同时 为 null的，及不是菜单的
              baseData.forEach((element, index) => {
                if (element["icon"] === null && element["link"] === null){
                  baseData.splice(index, 1);
                }
              });
              console.log("------菜单--目录2222222222：", baseData)
  
    
              var menu = this.dataTranslation(baseData);
              localStorage.setItem("mulu", JSON.stringify(menu));
              localStorage.setItem("mulu_language", localStorage.getItem('currentLanguage'));
    
              this.menu = menu
  
             
  
            }
          })
  
          // get_systemset_menu_all  得到系统设置所有要的菜单！
          this.httpservice.callRPC("menu_item", "get_systemset_menu_all", colums).subscribe((result)=>{
            const baseData = result['result']['message'][0];
            if (baseData != "T"){
              // 得到sysmenu ----------------------------------
              var sysmenu = this.menuTranslation(baseData);
              localStorage.setItem(SYSMENU, JSON.stringify(sysmenu));
  
              // 得到sysmenu ----------------------------------
            }
          });

        }else{
          this.router.navigate([loginurl]);
        }
  
      });
    }else{
      this.menuservice.addItems(mulu, 'menu');
    }
  }

  dataTranslation(baseMenu) {
    // 生成父子数据结构
    let map = {};
    baseMenu.forEach(item => {
      map[item.id] = item;
    });
    let nodeData = [];
    baseMenu.forEach(item => {
      let parent = map[item.parentid];
      if (parent) {
        if (item.type != 2){ // type = 2表明是button而不是
          (parent.children || (parent.children = [])).push(item);
        }else{
          // 得到登录角色对用的按钮
        }
      } else {
        nodeData.push(item);
      }
    });
    return nodeData;
  }

  // 得到sysmenu 
  menuTranslation(baseMenu) {
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


  // 记录登录
  RecordLogin(){

    if(this.userInfoService.getLoginName()){
      const source = this.userInfoService.getSourceid();        // 本机IP地址
      const employeeid = this.userInfoService.getEmployeeID();  // employeeid
      // result 1
      // info 登录
      const createdby = this.userInfoService.getLoginName();     // 登录名
      this.publicservice.record(source, employeeid, 1, '登录', createdby);
      // this.publicservice.record('local', source, employeeid, 1, '登录成功！', createdby);
      console.log("============= 存入登录日志并得到菜单",source);
    }

  }

  

}
