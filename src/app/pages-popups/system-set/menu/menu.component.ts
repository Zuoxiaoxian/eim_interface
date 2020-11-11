import { Component, OnInit, ViewChild } from '@angular/core';

import { NbDialogRef } from '@nebular/theme';

import { ADD_MENU_ISMENU, SYSMENU,ANNIU_PARTENT_MULU, EDIT_MENU_ISMENU, SYSMENUEDIT, MULU, menu_button_list } from '../../../appconfig';
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

import { Observable,  of } from 'rxjs';
import { map } from 'rxjs/operators';

// 验证表单！
import { AddMenu } from '../form_verification';

declare let layui;

declare let $;

// 图标 icon 
interface ICON {
  icon: string,
  title: string
}

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  // ----icon

  @ViewChild('autoInput') input;
  // options: string[];
  options: ICON[];
  // filteredOptions$: Observable<string[]>;
  filteredOptions$: Observable<ICON[]>;

  // ----icon

  partentid_menu:Number[] = []; // parentid 相同的菜单！

  selects = [

  ]
  constructor(protected dialogRef: NbDialogRef<MenuComponent>, private userinfoservice: UserInfoService, private httpservice: HttpserviceService, 
    private publicmethod: PublicmethodService, private userinfo: UserInfoService) { }

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


  SavSuccess :any = {position: 'bottom-end', status: 'success', conent:"保存成功!"};
  SavDanger :any = {position: 'bottom-end', status: 'danger', conent:"保存失败！"}



  ngOnInit(): void {
    localStorage.setItem(EDIT_MENU_ISMENU, '0');
    // 按钮-上级目录
    this.anniuparentmenuselects = this.anniuparentmenu_treeSelect()
    console.log("-----------------按钮-上级目录", this.anniuparentmenuselects)
    this.muluselects = this.parentmenu();


    this.initicon(); // 初始化icon

    var confirm = this.confirm;
    var dialogRef = this.dialogRef;
    var  publicmethod = this.publicmethod;
    var  newrowdata = this.newrowdata;
    var  userinfoservice = this.userinfoservice;
    var  oldrowdata = this.oldrowdata;
    var  addmenu = this.addmenu;
    var  httpservice = this.httpservice;
    var  updatabutton_list = this.updatabutton_list;
    var success = this.success;
    var danger = this.danger;

    var that = this;


    // 按钮上级目录data
    var data = this.anniuparentmenuselects;

    //  加载 eleTree 模块
    layui.config({
      base: "./assets/pages/system-set/layui/module/"
      // base: "../../../../assets/pages/system-set/layui/module/"
      // base: "assets/pages/system-set/layui/module/"
    }).extend({
        eleTree: "eleTree/eleTree"
    });
 

    var anniuparentmenu_treeSelect = this.anniuparentmenu_treeSelect;
    layui.use(['layer','form', 'element', 'layedit', 'eleTree', 'jquery'], function(){
      var $ = layui.jquery;
      var layer = layui.layer;
      var form = layui.form;
      var element = layui.element;
      var eleTree = layui.eleTree



      // 按钮上级目录
      // 菜单--》上级目录--组
      var el5;
      $("[name='anniunparentname']").on("click",function (e) {
          e.stopPropagation();
          if(!el5){
              el5=eleTree.render({
                  elem: '.ele5',
                  data: data,
                  // url: "../eleTree/tree.json",
                  defaultExpandAll: false, // 是否默认展开所有节点
                  expandOnClickNode: false,
                  highlightCurrent: true, // 是否高亮当前选中节点
              });
          }
          $(".ele5").toggle();
      })
      // input被选中事件
      eleTree.on("nodeClick(data5)",function(d) {
          $("[name='anniunparentname']").val(d.data.currentData.label)
          // console.log(d.data);    // 点击节点对应的数据
          // console.log("当前选择的数据的id", d.data.currentData.id, d.data.currentData.label);    // 点击节点对应的数据
          localStorage.setItem("anniunparentname", d.data.currentData.id);
          // console.log(d.isChecked);   // input是否被选中
          // console.log(d.node);    // 点击的dom节点
          // console.log(this);      // input对应的dom
          $(".ele5").hide();
      }) 
      $(document).on("click",function() {
          $(".ele5").hide();
      })
      



      $("#mulu").prop('checked', true);
      form.render(); // //这句一定要加，占坑
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
      //监听提交
      form.on('submit(mulu)', function(data){
        // layer.alert(JSON.stringify(data.field), {
        //   title: '最终的提交信息'
        // })
        confirm(publicmethod, newrowdata,userinfoservice,oldrowdata,addmenu,httpservice,success,danger, updatabutton_list).subscribe((res)=>{
          if (res){
            dialogRef.close(true);
            that.RecordOperation(1,'新增', '菜单管理, 目录');
            return false;
          }else{
            // dialogRef.close()
            that.RecordOperation(0,'新增', '菜单管理, 目录');
            return false;
          }
        });
        
      });
      //监听提交
      form.on('submit(caidan)', function(data){
        confirm(publicmethod, newrowdata,userinfoservice,oldrowdata,addmenu,httpservice,success,danger, updatabutton_list).subscribe((res)=>{
          if (res){
            dialogRef.close(true);
            that.RecordOperation(1,'新增', '菜单管理, 菜单');
            return false;
          }else{
            // dialogRef.close()
            that.RecordOperation(0,'新增', '菜单管理, 菜单');
            return false;
          }
        });
        
      });
      //监听提交
      form.on('submit(anniu)', function(data){
        confirm(publicmethod, newrowdata,userinfoservice,oldrowdata,addmenu,httpservice,success,danger,updatabutton_list).subscribe((res)=>{
          if (res){
            dialogRef.close(true);
            that.RecordOperation(1,'新增', '菜单管理, 按钮');
            return false;
          }else{
            // dialogRef.close()
            that.RecordOperation(0,'新增', '菜单管理, 按钮');
            return false;
          }
        });
        
      });
      form.render('checkbox'); // 刷新checkbox选择框渲染
      form.render(); // 刷新select
      // form.render('select'); // 刷新select

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

  }

  ngOnDestory(){
    localStorage.removeItem(EDIT_MENU_ISMENU);
  }

  ngAfterViewInit(){
    // this.initeditform();
    // var $html = $('.cdk-global-scrollblock');
    // $html.addClass("nb-global-scrollblock");

    // 设置默认的 icon值
    var $muluicon = $("input[name='muluicon']");
    var $caidanicon = $("input[name='caidanicon']");
    $muluicon.val('globe-2-outline');
    $caidanicon.val('globe-2-outline');
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
  confirm(publicmethod, newrowdata,userinfoservice,oldrowdata,addmenu,httpservice,success,danger,updatabutton_list){
    return new Observable((observe)=>{

      // 得到formdata
      var is_mulu = Number(localStorage.getItem(EDIT_MENU_ISMENU));
      console.log("初始化编辑表单", is_mulu)
      var item = {};
      if (is_mulu === 0){// 目录 mulu_visible
        var $muluname = $("input[name='muluname']");
        var $muluname_en = $("input[name='muluname_en']");
        var $muluparentname = $("select[name='parenttitle'] option:selected");
        var $mulumenuurl = $("input[name='mulumenuurl']");
        var $muluicon = $("input[name='muluicon']");
        var $mululevel = $("input[name='mululevel']");
        var $mulupermissionValue = $("input[name='mulupermissionValue']");
        var $mulu_visible = $("input[name='mulu_visible']");
  
        item["title"] = $muluname.val();
        item["title_en"] = $muluname_en.val();
        item["type"] = 0;
        item["parentName"] = $muluparentname.val();
        item["link"] = $mulumenuurl.val();
        item["permissionValue"] = $mulupermissionValue.val();
        item["icon"] = $muluicon.val()==='null'?null:$muluicon.val();
        item["orderindex"] = $mululevel.val();
        item["visible"] = $mulu_visible.prop('checked');
        
      }else if (is_mulu === 1){// 菜单 caidanparentname
        var $caidanname = $("input[name='caidanname']");
        var $caidanname_en = $("input[name='caidanname_en']");
        var $caidanparentname = $("select[name='caidanparentname'] option:selected");
        var $caidanmenuurl = $("input[name='caidanmenuurl']");
        var $caidanicon = $("input[name='caidanicon']");
        var $caidanlevel = $("input[name='caidanlevel']");
        var $caidanpermissionValue = $("input[name='caidanpermissionValue']");
        var $caidan_visible = $("input[name='caidan_visible']");
  
        item["title"] = $caidanname.val();
        item["title_en"] = $caidanname_en.val();
        item["type"] = 1;
        item["parentName"] = $caidanparentname.val();
        item["link"] = $caidanmenuurl.val();
        item["permissionValue"] = $caidanpermissionValue.val();
        item["icon"] = $caidanicon.val()==='null'? null: $caidanicon.val();
        item["orderindex"] = $caidanlevel.val();
        item["visible"] = $caidan_visible.prop('checked');
      }else{ // 按钮 caidan_visible
        var $anniuname = $("input[name='anniuname']");
        var $anniuname_en = $("input[name='anniuname_en']");
        // var $anniupermissionValue = $("input[name='anniupermissionValue']");
        var $anniuactive = $("select[name='anniuactive'] option:selected");
        var $anniupermissionValue = $("select[name='anniupermissionValue'] option:selected");
        // var $anniunparentname = $("select[name='anniunparentname'] option:selected");
        // var $anniunparentname = $("input[name='anniunparentname']");

        var $anniu_visible = $("input[name='anniu_visible']");
        var $anniulevel = $("input[name='anniulevel']");
        item["visible"] = $anniu_visible.prop('checked');
        item["title"] = $anniuname.val();
        item["title_en"] = $anniuname_en.val();

        var method = $anniupermissionValue.val();
        switch (method) {
          case "add":
            item['icon'] = 'plus-outline';
            break;
          case "del":
            item['icon'] = 'minus-outline';
            break;
          case "edit":
            item['icon'] = 'edit-outline';
            break;
          case "query":
            item["icon"] = "search-outline"
            break;
          case "import":
            item["icon"] = "cloud-upload-outline"
            break;
          case "download":
            item["icon"] = "cloud-download-outline"
            break;
        

        }


        // 根据上级目录 定制权限！
        item["permissionValue"] = "menu:" + $anniupermissionValue.val();
        // item["visible"] =  $anniu_visible.val()==1? false: true;
        // item["visible"] =  1;
        item["parentName"] = localStorage.getItem("anniunparentname")? Number(localStorage.getItem("anniunparentname")): localStorage.getItem("anniunparentname");
        
        console.log("根据上级目录 定制权限！",item["parentName"])

        localStorage.removeItem("anniunparentname")
        item["orderindex"] = $anniulevel.val();
        item["type"] = 2;
      }
  
      // var hour_mon_sec = this.publicmethod.getcurdate()
      var hour_mon_sec = publicmethod.getcurdate();
  
      item["textid"] = hour_mon_sec[0] * 10000 + hour_mon_sec[1] * 100 + hour_mon_sec[2];
      
      console.log("confirm《《《《《《《《《《《《 ", item)
      // this.oldrowdata = this.newrowdata(item);
      // this.oldrowdata = newrowdata(item,userinfoservice);
      oldrowdata = newrowdata(item,userinfoservice);
      console.log(">>>>>>>>>>.oldrowdata: ", oldrowdata)
      // 保存数据库后-需要删除缓存菜单、树状菜单
      addmenu(oldrowdata, httpservice).subscribe((res)=>{
        console.log("更新数据到数据库", res);
        // this.dialogRef.close();
        if (res === 1 ){
          localStorage.removeItem(MULU);
          localStorage.removeItem(SYSMENU);
          // 更新button——list
          updatabutton_list(publicmethod, httpservice)
          // location.reload();
          // publicmethod.toastr(SavSuccess);
          success(publicmethod)
          // setTimeout(() => {
          //   location.reload();
          // }, 1000);
          observe.next(true)
        }else{

          // publicmethod.toastr(SavDanger);
          danger(publicmethod)
          observe.next(false)
        }
      });
    })
  }


  


  newrowdata(formdata, userinfoservice){
    var oldrowdata = {};
    console.log("oldrowdata",oldrowdata);
    console.log("formdata",formdata);
    oldrowdata["title"] = formdata["title"];
    oldrowdata["link"] = formdata["link"] === "" || formdata["link"] === undefined ? "": formdata["link"];
    oldrowdata["title_en"] = formdata["title_en"];
    oldrowdata["textid"] = formdata["textid"];
    oldrowdata["icon"] = formdata["icon"] === undefined ? "": formdata["icon"];
    oldrowdata["type"] = Number(formdata["type"]);
    oldrowdata["orderindex"] = Number(formdata["orderindex"]);
    oldrowdata["visible"] = formdata["visible"];
    oldrowdata["permissionValue"] = formdata["permissionValue"] === undefined || formdata["permissionValue"] === ""? "": formdata["permissionValue"];
    if (Number(formdata["parentName"]) === 0 && Number(formdata["type"]) === 0){
      oldrowdata["parentid"] = 0;
    }else{
      oldrowdata["parentid"] = Number(formdata["parentName"]);
    }
    // 获取用户名
    // var username = this.userinfoservice.getName();
    var username = userinfoservice.getName();
    oldrowdata["username"] = username
    return oldrowdata
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

  

  // 得到local storage 中的 sysmenu，解析得到目录，作为上级目录
  parentmenu(){
    var sysymenu = JSON.parse(localStorage.getItem(SYSMENU));
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

  // 得到local storage 中的 sysmenu，解析得到目录，作为上级目录: 这里是按钮的上级目录--selecet分组了！
  /*
    [
      {title: , value:} ,
      {opg: [{gptitle: mulutitle,pgid: muluid,gpvalue: {title: caidantitle, value: caidanid}}]}
    ]
    这个是 layui的，select group
  */
 anniuparentmenu(){
  var sysymenu = JSON.parse(localStorage.getItem(SYSMENU));
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
    console.log("******************^^^^^^^^^^^^^^^这是按钮的上级目录需要的数据^\n", anniu_gp_list);
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
    console.log("******************^^^^^^^^^^^^^^^option^\n", option);
    return option
  }
 }

  //  这是是 layui扩展treeSelect
  anniuparentmenu_treeSelect(){
      var sysymenu = JSON.parse(localStorage.getItem(SYSMENU));
      console.log("这是是 layui扩展treeSelect", sysymenu);
      var mulu_list = [];
      var caidan_list = [];
      var anniu_list = [];
      sysymenu.forEach(item => {
        if(item["type"] === 0){// 目录
          mulu_list.push(item);
        }else if(item["type"] === 1){// 菜单
          caidan_list.push(item);
        }else{
          anniu_list.push(item)
        }
      });
      console.log("=========> mulu_list",mulu_list)
      console.log("=========> caidan_list",caidan_list)
    
      if (mulu_list.length > 0){
        var mulu_lists = [];
        mulu_list.forEach((mulu)=>{
          var mulu_item = {};
          var mulu_child = [];
          caidan_list.forEach((caidan)=>{
            if (caidan["parentid"] === mulu["id"]){
              var child_item = {};
              var child_list = [];
              child_item["id"] = caidan["id"];
              child_item["label"] = caidan["title"];
              child_item["disabled"] = false; // 默认折叠
              child_item["checked"] = false;
              anniu_list.forEach((anniu)=>{
                var anniu_item = {};
                if (anniu["parentid"] === caidan["id"]){
                  anniu_item["id"] = anniu["id"];
                  anniu_item["label"] = anniu["title"];
                  anniu_item["disabled"] = false; // 默认折叠
                  anniu_item["checked"] = false;
                  child_list.push(anniu_item);
                }
              })
              child_item["children"] = child_list
              mulu_child.push(child_item)
            }
          });
          mulu_item["id"] = mulu["id"];
          mulu_item["label"] = mulu["title"];
          mulu_item["disabled"] = false;  // 默认折叠
          mulu_item["checked"] = false;
          mulu_item["children"] = mulu_child;
          mulu_lists.push(mulu_item);
        })
        // localStorage.setItem(ANNIU_PARTENT_MULU, JSON.stringify(mulu_lists));
        console.log("******************^^^^^^^^^^^^^^^这是按钮的上级目录需要的数据^\n", mulu_lists);
        return mulu_lists
        
      }
  }



  // ---icon
  // 初始化icon的
  initicon(){
    // this.options = ['Option 1', 'Option 2', 'Option 3'];
    var mulu = this.parentmenu();
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




  // 将数据存入数据库
  addmenu(formdata, httpservice){
    return new Observable((observe)=>{
      const colums = {
        name: formdata["title"],
        type: formdata["type"],
        redirecturl: formdata["link"],
        parentid: formdata["parentid"],
        orderindex: formdata["orderindex"],
        lastupdatedby: formdata["username"],
        icon: formdata["icon"] === ""? null: formdata["icon"],
        name_en: formdata["title_en"],
        textid: formdata["textid"],
        // active: formdata["visible"]? 1: 0,
        active: formdata["visible"]? 1: 0,
        permission: formdata["permissionValue"],
      };
      console.log("---colums--",colums)
      const table = "menu_item";
      const method = "insert_menu_item";


      httpservice.callRPC(table, method, colums).subscribe((result)=>{
        console.log("&&&&&&&&&&&&7将数据存入数据库",result)
        const baseData = result['result']['message'][0];
        
        observe.next(baseData)
      })
    })
  }

  // 更新button_list！
  updatabutton_list(publicmethod, httpservice){
    publicmethod.getMenu().subscribe((data)=>{
      const colums = {
        languageid: httpservice.getLanguageID(),
        roles: data
      };
      console.log("---更新button_list！--",colums)
      const table = "menu_item";
      const method = "get_menu_by_roles";
      httpservice.callRPC(table, method, colums).subscribe((result)=>{
        console.log("---更新button_list！--",result)

        const baseData = result['result']['message'][0];
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
        localStorage.setItem(menu_button_list, JSON.stringify(button_list));
      })

      


    });
    
  }


  // 展示状态
  success(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"添加成功!"});
  }
  danger(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"添加失败!"});
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
      this.publicmethod.option_record(employeeid, result, transactiontype, info, createdby);
    }

  }

}
