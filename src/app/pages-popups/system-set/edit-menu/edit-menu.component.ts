import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { SYSMENUEDIT, MULU,SYSMENU, EDIT_MENU_ISMENU, ANNIU_PARTENT_MULU, UpSuccess, UpDanger } from "../../../appconfig";

import { NbDialogRef } from '@nebular/theme';

import { UserInfoService } from '../../../services/user-info/user-info.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


// 验证表单！
import { AddMenu } from '../form_verification';
import { UserInfo } from 'os';

declare let layui;

declare let $;

// 图标 icon 
interface ICON {
  icon: string,
  title: string
}

@Component({
  selector: 'ngx-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss']
})
export class EditMenuComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<EditMenuComponent>, private userinfoservice: UserInfoService,
    private publicservice: PublicmethodService, private httpservice: HttpserviceService,private userinfo: UserInfoService
    ) { 
  }
  // ----icon

  @ViewChild('autoInput') input;
  @ViewChild('device_tpye') device_tpye;
  @ViewChild('caidan_parent') caidan_parent;

  @Input("rowdata") rowdata: any;
  // options: string[];
  options: ICON[];
  // filteredOptions$: Observable<string[]>;
  filteredOptions$: Observable<ICON[]>;

  // ----icon

  type = {
    0: '目录',
    1: "菜单",
    2: "按钮"
  }

  type_dict = {
    '目录': 0,
    "菜单": 1,
    "按钮": 2
  };

  muluselects = [
    // {title: '北京', id: '010'},
  ]

  anniuparentmenuselects;


  // 最终的数据
  oldrowdata;

  loading = false; // 加载，当点击保存

  textid:Number;

  selectdata; // 选择的上级菜单

  // 下拉框---设备类型
  parentselect;



  ngOnInit(): void {

    



    this.initicon(); // 初始化icon

    // this.initeditform();
    this.formselect();

    var confirm2 = this.confirm2;

    // 获取用户名
    var username = this.userinfoservice.getName();
    // 更新到数据库
    var upmenu = this.upmenu;
    var httpservice = this.httpservice;
    var dialogRef = this.dialogRef;
    var publicservice = this.publicservice;
    var UpSuccess = UpSuccess;
    var UpDanger = UpDanger;
    var show = this.show;
    
    var systemsetting = JSON.parse(localStorage.getItem(SYSMENUEDIT));
    // var permission = systemsetting["permission"].split(":")[1].replace(/\s/g, "");
    // 根据systemsetting中的id(menuitemid) 得到该id的title（目录名称、翻译）
    this.getmenuname_with_menitemid(systemsetting).subscribe((res)=>{
      console.log("------菜单--目录：", res,systemsetting);
      this.textid = res["textid"];
      var textid = res["textid"];
      var that = this;
      layui.use(['layer','form', 'element', 'layedit'], function(){
        var layer = layui.layer;
        var form = layui.form;
        var element = layui.element;
        $("#mulu").prop('checked', true);
        // form.render('select'); // 刷新下拉框
  
        // 这是得到的点击行数据！
        // var systemsetting = JSON.parse(localStorage.getItem(SYSMENUEDIT));
  
        //自定义验证规则
        // 验证 表单
        form.verify({
          muluname: function(value, item){
            console.log("验证、表单: AddEmployee",AddMenu);
            console.log("验证、表单: employeeno",AddMenu["muluname"]);
            console.log("验证、表单: value",value);
            console.log("验证、表单: item",item);
            // sql注入和特殊字符 special_str
            var special_sql = AddMenu['special_sql']["special_sql"];
            var special_str = AddMenu['special_sql']["special_str"];

            var sql = special_sql.test(value);
            var str = special_str.test(value);
            if(sql){
              return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
            }
            if (! str){
              return "目录名称不能有特殊字符！"
            }

            if (value.length > 20){
              return "目录名称最大长度不超过20！"
            }
            // if (! new RegExp(AddMenu["muluname"]).test(value)){
            //   return "目录名称不能有特殊字符！"
            // }
          },
          muluname_en: function(value, item){
            // sql注入和特殊字符 special_str
            var special_sql = AddMenu['special_sql']["special_sql"];
            var special_str = AddMenu['special_sql']["special_str"];

            var sql = special_sql.test(value);
            var str = special_str.test(value);
            if(sql){
              return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
            }
            if (! str){
              return "目录名称不能有特殊字符！"
            }
            if (value.length > 100){
              return "目录名称最大长度不超过100！"
            }
            // if (! new RegExp(AddMenu["muluname_en"]).test(value)){
            //   return "目录名称不能有特殊字符，且必须是字母、数字"
            // }
          },
          caidanname: function(value, item){
            // sql注入和特殊字符 special_str
            var special_sql = AddMenu['special_sql']["special_sql"];
            var special_str = AddMenu['special_sql']["special_str"];

            var sql = special_sql.test(value);
            var str = special_str.test(value);
            if(sql){
              return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
            }
            if (! str){
              return "菜单名称不能有特殊字符！"
            }
            if (value.length > 20){
              return "菜单名称最大长度不超过20！"
            }
            // if (! new RegExp(AddMenu["caidanname"]).test(value)){
            //   return "菜单名称不能有特殊字符"
            // }
          },
          caidanname_en: function(value, item){
            // sql注入和特殊字符 special_str
            var special_sql = AddMenu['special_sql']["special_sql"];
            var special_str = AddMenu['special_sql']["special_str"];

            var sql = special_sql.test(value);
            var str = special_str.test(value);
            if(sql){
              return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
            }
            if (! str){
              return "菜单名称不能有特殊字符！"
            }
            if (value.length > 100){
              return "菜单名称最大长度不超过100！"
            }
            // if (! new RegExp(AddMenu["caidanname_en"]).test(value)){
            //   return "菜单名称不能有特殊字符，且必须是字母、数字"
            // }
          },
          anniuname: function(value, item){
            // sql注入和特殊字符 special_str
            var special_sql = AddMenu['special_sql']["special_sql"];
            var special_str = AddMenu['special_sql']["special_str"];

            var sql = special_sql.test(value);
            var str = special_str.test(value);
            if(sql){
              return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
            }
            if (! str){
              return "按钮名称不能有特殊字符！"
            }
            if (value.length > 50){
              return "按钮名称最大长度不超过50！"
            }
            // if (! new RegExp(AddMenu["anniuname"]).test(value)){
            //   return "按钮名称不能有特殊字符"
            // }
          },
          anniuname_en: function(value, item){
              if (! new RegExp(AddMenu["anniuname_en"]).test(value)){
                // sql注入和特殊字符 special_str
              var special_sql = AddMenu['special_sql']["special_sql"];
              var special_str = AddMenu['special_sql']["special_str"];

              var sql = special_sql.test(value);
              var str = special_str.test(value);
              if(sql){
                return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
              }
              if (! str){
                return "按钮名称不能有特殊字符！"
              }
              if (value.length > 100){
                return "按钮名称最大长度不超过50！"
              }
              return "按钮名称不能有特殊字符，且必须是字母、数字"
            }
          },
        })


        //监听提交 --- 目录
        form.on('submit(mulu)', function(data){
          // layer.alert(JSON.stringify(data.field), {
          //   title: '目录'
          // });
          data.field["type"] = 0;
          data.field["id"] = systemsetting["id"];
          data.field["username"] = username;
          data.field["textid"] = textid;
          confirm2(data.field, upmenu, dialogRef,publicservice, UpSuccess, UpDanger, httpservice, show).subscribe(res=>{
            if (res){
              that.RecordOperation(1,'编辑', '菜单管理, 目录');
            }else{
              that.RecordOperation(0,'编辑', '菜单管理, 目录');
            }
          });
          return false;
        });
        //监听提交--菜单
        form.on('submit(caidan)', function(data){
          // layer.alert(JSON.stringify(data.field), {
          //   title: '菜单'
          // })
          data.field["type"] = 1;
          data.field["id"] = systemsetting["id"];
          data.field["username"] = username;
          data.field["textid"] = textid;
          confirm2(data.field, upmenu, dialogRef,publicservice, UpSuccess, UpDanger, httpservice,show).subscribe(res=>{
            if (res){
              that.RecordOperation(1,'编辑', '菜单管理, 菜单');
            }else{
              that.RecordOperation(0,'编辑', '菜单管理, 菜单');
            }
          });
          return false;
        });
        //监听提交---按钮
        form.on('submit(anniu)', function(data){
          // layer.alert(JSON.stringify(data.field), {
          //   title: '按钮'
          // })
          data.field["type"] = 2;
          data.field["id"] = systemsetting["id"];
          data.field["icon"] = systemsetting["icon"];
          data.field["username"] = username;
          data.field["textid"] = textid;
          data.field["permission"] = "menu:" + data.field["permission"]
          // data.field["visible"] = data.field["visible"] == 1? 'on': 'off';
          confirm2(data.field, upmenu, dialogRef,publicservice, UpSuccess, UpDanger,httpservice, show).subscribe(res=>{
            if (res){
              that.RecordOperation(1,'编辑', '菜单管理, 按钮');
            }else{
              that.RecordOperation(0,'编辑', '菜单管理, 按钮');
            }
          });
          return false;
        });
        form.render('checkbox'); // 刷新checkbox选择框渲染
        form.render('select'); // 刷新select    
        form.render();

        // 表单赋值--目录
        form.val("editmulu", { 
          "title": systemsetting["title"] // 目录名称
          ,"title_en": res["en"] // 是目录名称en
          ,"link": systemsetting["link"] // 路由
          ,"visible": systemsetting["active"]===1? true: false // 是否启用
          ,"orderindex": systemsetting["orderindex"] // 排序号
          ,"icon":systemsetting["icon"] === null? '暂无' : systemsetting["icon"]
        }); 
        // 表单赋值--菜单
        form.val("editcaidan", { 
          "title": systemsetting["title"] // 菜单名称
          ,"title_en": res["en"] // 菜单名称en
          ,"link": systemsetting["link"] // 路由
          ,"visible": systemsetting["active"]===1? true: false // 是否启用
          ,"icon":systemsetting["icon"] === null? '暂无' : systemsetting["icon"]
          ,"permission": systemsetting["permission"] === null? null : systemsetting["permission"] // 权限标识
          ,"orderindex": systemsetting["orderindex"] // 排序
        }); 
        // 表单赋值--按钮
        form.val("editanniu", { 
          "title": systemsetting["title"] // 按钮名称
          ,"title_en": res["en"] // 按钮名称en
          ,"link": systemsetting["link"] // 路由
          ,"parentid": systemsetting["parentid"]
          // ,"visible": systemsetting["active"] // 是否可见
          ,"visible": systemsetting["active"]===1? true: false // 是否启用
          ,"permission": systemsetting["permission"] === null? "null" : systemsetting["permission"].split(":")[1].replace(/\s/g, "") // 权限标识
          ,"orderindex": systemsetting["orderindex"] // 排序
        }); 
  
        // 监听 switch开关！
        form.on('switch(filter)', function(data){
          // console.log("开关是否开启，true或者false", data.elem.checked); //开关是否开启，true或者false
        });
  
        element.on('tab(docDemoTabBrief)', function(data){
          localStorage.setItem(EDIT_MENU_ISMENU, String(data.index))
          if(data.index == 0){ // 目录
            console.log("目录")
  
          }
          if(data.index == 1){ // 菜单
            console.log("菜单")
          }else{
            // anniuli
          }
  
          
        });
  
        
  
       
      })
    })


    // this.initeditform();
  }

  ngOnDestory(){
    localStorage.removeItem(EDIT_MENU_ISMENU);
  }

  ngAfterViewInit(){
    // this.initeditform();
    // 选测icon图标时，防止html样式改变
    var $html = $('.cdk-global-scrollblock');
    $html.addClass("nb-global-scrollblock");
    
    var systemsetting = JSON.parse(localStorage.getItem(SYSMENUEDIT));
    console.log("得到 编辑的row数据", systemsetting,"this.muluselects",this.muluselects);
    var optionId = systemsetting["parentid"];


    // 初始化目录tab 中的上级菜单！
    var mulu = "#parenttitle option:eq("+ optionId +")";
    $(mulu).attr("selected", "selected");
    // this.selectdata = systemsetting["title"]

    // 初始化菜单tab 中的上级菜单！
    var caidan = "#caidanparentname option:eq("+ optionId +")";
    $(caidan).attr("selected", "selected");

    // 初始化按钮tab 中的上级目录！
    // $("select[name='anniunparentname'] option[value=37]").attr("selected", "selected");

    // var anniu = "select[name='anniunparentname'] option[value="+ optionId +"]";
    // var anniu = "select[name='parentid'] option[value="+ optionId +"]";
    // $(anniu).attr("selected", "selected");
    

    

  }


  // 表单中的上级目录下拉框
  formselect(){
    // this.muluselects = this.parentmenu();
    var parentmenu = this.parentmenu();
    
    var systemsetting = JSON.parse(localStorage.getItem(SYSMENUEDIT));
    console.log("得到 编辑的row数据", systemsetting,"this.muluselects",this.muluselects);
    this.anniuparentmenuselects = this.anniuparentmenu();

    // 赋值目录中的上级菜单  .parentmulu
    var $parentmulu = $(".parentmulu");
    console.log("赋值目录中的上级菜单>>>>>>>>>>>", parentmenu)
    for (let r of parentmenu){
      var r_str
      if (r["id"] === systemsetting["parentid"]){
        r_str = `<option  value="${r["id"]}" selected>${r["title"]}</option>`;
      }else{
        r_str = `<option  value="${r["id"]}" >${r["title"]}</option>`;
      }
      $parentmulu.append(r_str);
    }
    var parentmenu_select;
    if(systemsetting["parentid"] === 0){
      parentmenu_select = 0
    }else{
      parentmenu_select = systemsetting['parentid']
    }
    console.log("parentmenu_select<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",parentmenu_select)


    if (systemsetting["type"] === 0){
      // 目录
      $(".mululi").attr("class", "layui-this mululi");
      $(".caidanli").attr("class", "caidanli");
      $(".anniuli").attr("class", "anniuli");
      

      $(".mulu_tab").attr("class", "layui-tab-item layui-show mulu_tab");
      $(".caidan_tab").attr("class", "layui-tab-item caidan_tab");
      $(".anniu_tab").attr("class", "layui-tab-item anniu_tab");

    }else if(systemsetting["type"] === 1){
      // 菜单 
      $(".mululi").attr("class", "mululi");
      $(".caidanli").attr("class", "layui-this caidanli");
      $(".anniuli").attr("class", "anniuli");
      
      $(".mulu_tab").attr("class", "layui-tab-item  mulu_tab");
      $(".caidan_tab").attr("class", "layui-tab-item layui-show caidan_tab");
      $(".anniu_tab").attr("class", "layui-tab-item anniu_tab");
    }else{
      $(".mululi").attr("class", "mululi");
      $(".caidanli").attr("class", "caidanli");
      $(".anniuli").attr("class", "layui-this anniuli");

      $(".mulu_tab").attr("class", "layui-tab-item  mulu_tab");
      $(".caidan_tab").attr("class", "layui-tab-item caidan_tab");
      $(".anniu_tab").attr("class", "layui-tab-item layui-show anniu_tab");
    }

  }



  // × 关闭diallog   及关闭弹框
  closedialog(){
    this.dialogRef.close(false);
  }

  // 取消
  cancel(){
    this.dialogRef.close(false);
  }

  // 保存--确定
  confirm2(formdata, upmenu, dialogRef, publicservice, UpSuccess, UpDanger, httpservice,show){
    return new Observable((observa)=>{
      // 得到formdata
      var item = {};
      item["id"] = formdata["id"];
      item["lastupdatedby"] = formdata["username"];
      item["redirecturl"] = formdata["link"];
      item["name"] = formdata["title"];
      item["name_en"] = formdata["title_en"];
      item["permission"] = formdata["permission"];
      // item["permission"] = "menu:" + formdata["permission"];
      item["parentid"] = formdata["parentid"]?Number(formdata["parentid"]):null;
      item["orderindex"] = formdata["orderindex"];
      item["type"] = formdata["type"];
      item["icon"] = formdata["icon"] === "暂无" || formdata["icon"] ==='null'?null :formdata["icon"];
      item["textid"] = formdata["textid"];
      item["active"] = formdata["visible"] === "on"? 1: 0;
      // item["active"] = formdata["visible"] === "on"? 0: 1;
      // 编辑前的数据--》formdata----》编辑后的数据
      console.log("编辑菜单得到form表单", formdata)
      console.log("===item===", item)
  
      // 保存数据，success 1
      // 保存数据库后-需要删除缓存菜单、树状菜单
      localStorage.removeItem(MULU);
      // localStorage.removeItem(SYSMENU);
      // this.dialogRef.close();
  
      // 更新token SYSMENU
      var sysmenu = JSON.parse(localStorage.getItem(SYSMENU));
      sysmenu.forEach(m => {
        if (m["id"] ===  item["id"]){
          m["active"] = item["active"];
          m["id"] = item["id"];
          m["link"] = item["link"];
          m["parentid"] = item["parentid"];
          m["permission"] = item["permission"];
          m["textid"] = item["textid"];
          m["title"] = item["name"];
          m["title_en"] = item["name_en"];
          m["type"] = item["type"];
          m["icon"] = item["icon"];
          
        }
      });
      console.log("-----sysmenu----", sysmenu, item);
     
      localStorage.setItem(SYSMENU, JSON.stringify(sysmenu));
  
  
  
      upmenu(item, httpservice).subscribe((res)=>{
        console.log("更新数据到数据库", res);
        // {en: 1, menu: 1, zh: 1}
        if (res["en"] === 1 && res["menu"] === 1 && res["zh"] === 1){
          // 关闭弹窗
          
          // 删除 
          localStorage.removeItem(SYSMENUEDIT);
          localStorage.removeItem(SYSMENU);
          dialogRef.close(true);
          // 提示
          show(publicservice,UpSuccess)
          observa.next(true)
          // 刷新界面
          // setTimeout(() => {
          //   location.reload();
          // }, 2000);
        }else{
          show(publicservice,UpDanger);
          observa.next(false)
        }
      });

    })


  }





  // 根据menuitemid得到中、英文name
  getmenuname_with_menitemid(systemsetting){
    return new Observable((observe)=>{
      const colums = {
        menuitemid: systemsetting["id"]
      };
      console.log("---colums--",colums)
      const table = "text_translation";
      const method = "get_menuname_with_menitemid";
      this.httpservice.callRPC(table, method, colums).subscribe((result)=>{
        const baseData = result['result']['message'][0];
        
        observe.next(baseData)
      })
    })
  }


  // 更新数据
  upmenu(updata, httpservice){

    console.log("--保存编辑的数据到数据库--",updata)
    const table = "text_translation";
    const method = "update_menu_with_textid";
    return new Observable((observe)=>{
      httpservice.callRPC(table, method, updata).subscribe((result)=>{
        const baseData = result['result']['message'][0];
        
        observe.next(baseData)
      })

    })
  }


  // 得到local storage 中的 sysmenu，解析得到目录，作为上级目录
  parentmenu(){
      console.log("这是 系统设置的菜单界面！")
      var sysymenu = localStorage.getItem(SYSMENU) == null ? [] : JSON.parse(localStorage.getItem(SYSMENU));
      if(sysymenu.length == 0){
        this.publicservice.getMenu().subscribe((data)=>{
          const colums = {
            languageid: this.httpservice.getLanguageID(),
            roles: data
          };
          console.log("---colums--",colums)
          const table = "menu_item";
          const method = "get_systemset_menu_all";
          this.httpservice.callRPC(table, method, colums).subscribe((result)=>{
            console.log("---------------->>>>",result)
            const baseData = result['result']['message'][0];
            var sysymenu = this.dataTranslation(baseData);
            localStorage.setItem(SYSMENU, JSON.stringify(sysymenu));
            var onymulu = [
              { title: 'null', id: 0 }
            ];
            sysymenu.forEach(mulu => {
              if(mulu["type"] === 0){
                onymulu.push(mulu)
              }
            });
            return onymulu
  
          })
        });
      }else{
        var onymulu = [
          { title: 'null', id: 0 }
        ];
        sysymenu.forEach(mulu => {
          if(mulu["type"] === 0){
            onymulu.push(mulu)
          }
        });
        return onymulu
      }
  }

  dataTranslation(baseMenu) {
    // 生成父子数据结构
    console.log("-=-=-=-=-=-=baseMenu-=-=-=-=",baseMenu)
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
      map["permission"] = item.permission === null ? null: item.permission ;
      if (item.parentid === null){
        map["parentid"] = 0;
      }else{
        map["parentid"] = item.parentid;
      }
      nodeData.push(map)
    });
    return nodeData;
  }

  // 得到local storage 中的 sysmenu，解析得到目录，作为上级目录: 这里是按钮的上级目录--selecet分组了！
  /*
    [
      {title: , value:} ,
      {opg: [{gptitle: mulutitle,pgid: muluid,gpvalue: {title: caidantitle, value: caidanid}}]}
    ]
  
  */
 anniuparentmenu(){
  var sysymenu = localStorage.getItem(SYSMENU) == null ? [] : JSON.parse(localStorage.getItem(SYSMENU));
  var mulu_list = [];
  var caidan_list = [];
  sysymenu.forEach(mulu => {
    if(mulu["type"] === 0){// 目录
      mulu_list.push(mulu);
    }else if(mulu["type"] === 1){// 菜单
      caidan_list.push(mulu);
    }
  });

  if (mulu_list.length > 0){
    var anniu_gp_list = [];
    mulu_list.forEach((mulu)=>{
      var option_group = {};
      var gpvalue_list = [];
      caidan_list.forEach((caidan)=>{
        option_group["gptitle"] = mulu["title"];
        option_group["gpid"] = mulu["id"];
        if (caidan["parentid"] === mulu["id"]){
          var gpvalue = {};
          gpvalue["title"] = caidan["title"];
          gpvalue["value"] = caidan["id"];
          gpvalue["orderindex"] = caidan["orderindex"];
          gpvalue_list.push(gpvalue)
        }
      });
      option_group["gpvalue"] = gpvalue_list;
      anniu_gp_list.push(option_group);
    })
    localStorage.setItem(ANNIU_PARTENT_MULU, JSON.stringify(anniu_gp_list));
    // console.log("******************^^^^^^^^^^^^^^^这是按钮的上级目录需要的数据^\n", anniu_gp_list);
    var option = {}
    var options = [];
    var gpgroup = [];
    anniu_gp_list.forEach((anniu)=>{
      if (anniu["gpvalue"].length === 0){
        options.push(anniu);
      }else{
        gpgroup.push(anniu);
      }
    })
    option["options"] = options;
    option["gpgroup"] = gpgroup;
    // console.log("******************^^^^^^^^^^^^^^^option^\n", option);
    return option
  }
 }




  // ---icon
  // 初始化icon的
  initicon(){
    // this.options = ['Option 1', 'Option 2', 'Option 3'];
    var mulu = this.parentmenu();
    console.log("初始化icon的>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",mulu)
    var mulu_ = mulu.slice(1, mulu.length);
    var item_lis: ICON[] = [];
    // 可以为空，及没有icon
    item_lis.push({ icon: "null", title: 'null'});
    mulu_.forEach((m)=>{
      var item: ICON = { icon: "", title: ""};
      item["icon"] = m["icon"];
      item["title"] = m["title"];
      item_lis.push(item)
    });
    this.options = item_lis;
    // this.options = [
    //   {
    //     icon: "star", 
    //     title: "star"
    //   }, 
    //   {
    //     icon: "star", 
    //     title: "star"
    //   }, 
    //   {
    //     icon: "star", 
    //     title: "star"
    //   }, 
    // ];
    this.filteredOptions$ = of(this.options);
  }
  private filter(value: ICON): ICON[] {
    const filterValue = value.title.toLowerCase();

    return this.options.filter(optionValue => optionValue.title.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: ICON): Observable<ICON[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    console.log("this.input.nativeElement.value  ",this.input.nativeElement.value)
    // this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    var $html = $('.cdk-global-scrollblock');
    $html.addClass("nb-global-scrollblock");
    // console.log("*************************",$event,html, $html.attr("class", "cdk-global-scrollblock nb-global-scrollblock"));
    console.log("*************************")
    // this.filteredOptions$ = this.getFilteredOptions($event);
    
  }
  
  // ---icon

  // 展示状态
  show(publicservice,data){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"修改成功!"});
  }

   // option_record  
   RecordOperation(result,transactiontype, infodata){
    console.warn("==============>", this.userinfo.getLoginName())
    console.warn("infodata==============>", infodata)
    console.warn("==============>")
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = transactiontype; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(employeeid, result, transactiontype, info, createdby);
    }

  }

}

