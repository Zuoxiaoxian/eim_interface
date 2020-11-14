import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SYSMENU } from '../../../appconfig'; 

import { Observable,  of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

declare let layui;

declare let $;

// 图标 icon 
interface ICON {
  icon: string,
  title: string
}

// 编辑\新增 数据格式
interface EditAddColums {
  active: number,
  icon: string,
  id?: number,
  lastupdatedby: string,
  name: string,
  name_en: string,
  orderindex: number,
  parentid: number,
  permission: string,
  redirecturl?: string,
  textid: number,
  type: number,

}

@Component({
  selector: 'ngx-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.scss']
})
export class NewMenuComponent implements OnInit {
  @Input("rowdata") rowdata:any;
  @Input("title") title:string;
  // 刷新动画
  loading = false;

  // 目录、菜单 上级目录
  muluselects = [
  ];

  // anniu tab 上级目录
  anniuparentmenuselects;

  

  // ----icon

  @ViewChild('autoInput') input;
  // options: string[];
  options: ICON[];
  // filteredOptions$: Observable<string[]>;
  filteredOptions$: Observable<ICON[]>;

  // ----icon

  constructor(protected dialogRef: NbDialogRef<NewMenuComponent>,private userinfoservice: UserInfoService, private httpservice: HttpserviceService,
    private publicmethod: PublicmethodService) { }

  ngOnInit(): void {
    this.initicon(); // 初始化icon

    // 加载上级目录要的数据
    this.muluselects = this.parentmenu();

    // 按钮上级目录data
    this.anniuparentmenuselects = this.anniuparentmenu_treeSelect();
    var data = this.anniuparentmenuselects;
    // 获取用户名
    var username = this.userinfoservice.getName();
    var isnot_edit = JSON.parse(this.rowdata);
    var hour_mon_sec = this.publicmethod.getcurdate();
    var textid;

    var that = this;
    layui.use(['layer','form', 'element', 'eleTree', 'jquery'], function(){
      var $ = layui.jquery;
      var layer = layui.layer;
      var form = layui.form;
      var element = layui.element;
      var eleTree = layui.eleTree

      var parentid; //  按钮上级目录id
      // ----------按钮 上级目录 
      var el5;
      $(".anniu_tab [name='parentid']").on("click",function (e) {
        // console.log("--------data",data)
          e.stopPropagation();
          if(!el5){
              el5=eleTree.render({
                  elem: '.ele5',
                  data: data,
                  defaultExpandAll: false, // 是否默认展开所有节点
                  expandOnClickNode: false,
                  highlightCurrent: true, // 是否高亮当前选中节点
              });
          }
          $(".ele5").toggle();
      })
      // input被选中事件
      eleTree.on("nodeClick(data5)",function(d) {
          $(".anniu_tab [name='parentid']").val(d.data.currentData.label)
          // console.log(d.data);    // 点击节点对应的数据
          // console.log("当前选择的数据的id", d.data.currentData.id, d.data.currentData.label);    // 点击节点对应的数据
          // localStorage.setItem("anniunparentname", d.data.currentData.id);
          parentid =  d.data.currentData.id
          // console.log(d.isChecked);   // input是否被选中
          // console.log(d.node);    // 点击的dom节点
          // console.log(this);      // input对应的dom
          $(".ele5").hide();
      }) 
      $(document).on("click",function() {
          $(".ele5").hide();
      })
      // ----------按钮 上级目录

      // 判断是否是编辑-----------------------------------
      if (isnot_edit != 'add'){
        // 编辑
        console.log("编辑-----------------------------------", isnot_edit);
        // 切换tab
        if (isnot_edit["type"] === 0){
          // 目录
          $(".mululi").attr("class", "layui-this mululi");
          $(".caidanli").attr("class", "caidanli");
          $(".anniuli").attr("class", "anniuli");
          
    
          $(".mulu_tab").attr("class", "layui-tab-item layui-show mulu_tab");
          $(".caidan_tab").attr("class", "layui-tab-item caidan_tab");
          $(".anniu_tab").attr("class", "layui-tab-item anniu_tab");
    
        }else if(isnot_edit["type"] === 1){
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

        // 初始化表单
        // 表单赋值--目录
        that.getmenuname_with_menitemid(isnot_edit).subscribe((res)=>{
          textid = res["textid"];
          form.val("editmulu", { 
            "title": isnot_edit["title"] // 目录名称
            ,"title_en": res["en"] // 是目录名称en
            ,"link": isnot_edit["link"] // 路由
            ,"visible": isnot_edit["active"]===1? true: false // 是否启用
            ,"orderindex": isnot_edit["orderindex"] // 排序号
            ,"icon":isnot_edit["icon"] === null? '暂无' : isnot_edit["icon"]
            ,"parenttitle": isnot_edit["parentid"], // 上级目录
          }); 
          // 表单赋值--菜单
          form.val("editcaidan", { 
            "title": isnot_edit["title"] // 菜单名称
            ,"title_en": res["en"] // 菜单名称en
            ,"link": isnot_edit["link"] // 路由
            ,"visible": isnot_edit["active"]===1? true: false // 是否启用
            ,"icon":isnot_edit["icon"] === null? '暂无' : isnot_edit["icon"]
            ,"permission": isnot_edit["permission"] === null? null : isnot_edit["permission"] // 权限标识
            ,"orderindex": isnot_edit["orderindex"] // 排序
            ,"parenttitle": isnot_edit["parentid"], // 上级目录
          }); 
          if (isnot_edit["type"] === 2){
            // 表单赋值--按钮
            $(".anniu_tab [name='parentid']").val(isnot_edit["_parent"]["title"]) // 上级目录
          }

          form.val("editanniu", { 
            "title": isnot_edit["title"] // 按钮名称
            ,"title_en": res["en"] // 按钮名称en
            ,"link": isnot_edit["link"] // 路由
            ,"visible": isnot_edit["active"]===1? true: false // 是否启用
            ,"permission": isnot_edit["permission"] === null? "null" : isnot_edit["permission"].split(":")[1] // 权限标识.replace(/\s/g, "")
            ,"orderindex": isnot_edit["orderindex"] // 排序
            // ,"parentid": isnot_edit["parentid"], // 上级目录
          }); 
        })
      }
      // 判断是否是编辑-----------------------------------

      // =============================监听 输入button 确定
      
      //监听提交 --- 目录
      form.on('submit(mulu)', function(data){
        // layer.alert(JSON.stringify(data.field), {
        //   title: '目录'
        // });
        data.field["type"] = 0;
        data.field["visible"] = data.field["visible"]==="on"? 1:0;
        if (isnot_edit != 'add'){
          const colums: EditAddColums = {
            id:  isnot_edit["id"],  // 相对于add 多的
            lastupdatedby: username,
            redirecturl: data.field["link"],
            name: data.field["title"],
            name_en: data.field["title_en"],
            permission: data.field["permission"],
            parentid: isnot_edit["parentid"]?Number(isnot_edit["parentid"]):null,
            orderindex: Number(data.field["orderindex"]),
            type: data.field["type"],
            icon: data.field["icon"],
            textid: textid,
            active: data.field["visible"],
          };
           
          that.httpservice.callRPC("text_translation", "update_menu_with_textid", colums).subscribe(result=>{
            // console.log("编辑菜单----new-menu", result, data.field, "colums",colums);
            var res = result["result"]["message"][0];
            if (res["code"] === 1){
              that.dialogRef.close(true);
              that.RecordOperation(1,'编辑', '菜单管理, 按钮');
            }else{
              that.dialogRef.close(false);
              that.RecordOperation(0,'编辑', '菜单管理, 按钮');
            }
            return false;
          })
        }else{
          
          data.field["textid"] = hour_mon_sec[0] * 10000 + hour_mon_sec[1] * 100 + hour_mon_sec[2];
          const colums: EditAddColums = {
            name: data.field["title"],
            type: data.field["type"],
            redirecturl: data.field["link"],
            parentid: Number(data.field["parenttitle"]),
            orderindex: Number(data.field["orderindex"]),
            lastupdatedby: data.field["username"],
            icon: data.field["icon"] === ""? null: data.field["icon"],
            name_en: data.field["title_en"],
            textid: data.field["textid"],
            active: data.field["visible"]? 1: 0,
            permission: data.field["permissionValue"]
          };

          that.httpservice.callRPC("menu_item", "insert_menu_item",colums).subscribe(result=>{
            // console.log("新增菜单----colums", colums)
            // console.log("新增菜单----new-menu", result)
            var res = result["result"]["message"][0];
            if (res === 1){
              that.dialogRef.close(true);
              that.RecordOperation(1,'新增', '菜单管理, 目录');
            }else{
              that.dialogRef.close(false);
              that.RecordOperation(0,'新增', '菜单管理, 目录');
            }
            return false;
          })
        }
        // console.log("得到表单数据：", data.field)
        
        return false;
      });
      //监听提交--菜单
      form.on('submit(caidan)', function(data){
        // layer.alert(JSON.stringify(data.field), {
        //   title: '菜单'
        // })
        data.field["type"] = 1;
        // data.field["textid"] = textid;
        data.field["username"] = username;
        data.field["visible"] = data.field["visible"]==="on"? 1:0;
        if (isnot_edit != 'add'){
          const colums: EditAddColums = {
            id:  isnot_edit["id"],  // 相对于add 多的
            lastupdatedby: username,
            redirecturl: data.field["link"],
            name: data.field["title"],
            name_en: data.field["title_en"],
            permission: data.field["permission"],
            parentid: isnot_edit["parentid"]?Number(isnot_edit["parentid"]):null,
            orderindex: Number(data.field["orderindex"]),
            type: data.field["type"],
            icon: data.field["icon"],
            textid: textid,
            active: data.field["visible"],
          };
           
          that.httpservice.callRPC("text_translation", "update_menu_with_textid", colums).subscribe(result=>{
            // console.log("编辑菜单----new-menu", result, data.field, "colums",colums);
            var res = result["result"]["message"][0];
            if (res["code"] === 1){
              that.dialogRef.close(true);
              that.RecordOperation(1,'编辑', '菜单管理, 按钮');
            }else{
              that.dialogRef.close(false);
              that.RecordOperation(0,'编辑', '菜单管理, 按钮');
            }
            return false;
          })
        }else{
          data.field["textid"] = hour_mon_sec[0] * 10000 + hour_mon_sec[1] * 100 + hour_mon_sec[2];
          const colums: EditAddColums = {
            name: data.field["title"],
            type: data.field["type"],
            redirecturl: data.field["link"],
            parentid: Number(data.field["parenttitle"]),
            orderindex: Number(data.field["orderindex"]),
            lastupdatedby: data.field["username"],
            icon: data.field["icon"] === ""? null: data.field["icon"],
            name_en: data.field["title_en"],
            textid: data.field["textid"],
            active: data.field["visible"]? 1: 0,
            permission: data.field["permissionValue"]
          };
          that.httpservice.callRPC("menu_item", "insert_menu_item", colums).subscribe(result=>{
            // console.log("新增菜单----new-menu", result)
            var res = result["result"]["message"][0];
            if (res === 1){
              that.dialogRef.close(true);
              that.RecordOperation(1,'新增', '菜单管理, 菜单');
            }else{
              that.dialogRef.close(false);
              that.RecordOperation(0,'新增', '菜单管理, 菜单');
            }
            return false;
          })
        }
        // console.log("得到表单数据：", data.field)
        
        return false;
      });
      //监听提交---按钮
      form.on('submit(anniu)', function(data){
        // layer.alert(JSON.stringify(data.field), {
        //   title: '按钮'
        // })
        data.field["type"] = 2;
        data.field["username"] = username;
        data.field["icon"] = isnot_edit["icon"];
        // data.field["textid"] = textid;
        
        data.field["permission"] = "menu:" + data.field["permission"]
        // data.field["visible"] = data.field["visible"] == 1? 'on': 'off';
        data.field["visible"] = data.field["visible"]==="on"? 1:0;
        if (isnot_edit != 'add'){
          const colums: EditAddColums = {
            id:  isnot_edit["id"],  // 相对于add 多的
            lastupdatedby: username,
            redirecturl: "",
            name: data.field["title"],
            name_en: data.field["title_en"],
            permission: data.field["permission"],
            parentid: isnot_edit["parentid"]?Number(isnot_edit["parentid"]):null,
            // parentid: isnot_edit["_parent"]["id"],
            orderindex: Number(data.field["orderindex"]),
            type: data.field["type"],
            icon: data.field["icon"],
            textid: textid,
            active: data.field["visible"],
          };
           
          that.httpservice.callRPC("text_translation", "update_menu_with_textid", colums).subscribe(result=>{
            // console.log("编辑菜单----new-menu", result, data.field, "colums",colums);
            var res = result["result"]["message"][0];
            if (res["code"] === 1){
              that.dialogRef.close(true);
              that.RecordOperation(1,'编辑', '菜单管理, 按钮');
            }else{
              that.dialogRef.close(false);
              that.RecordOperation(0,'编辑', '菜单管理, 按钮');
            }
            return false;
          })
        }else{
          data.field["textid"] = hour_mon_sec[0] * 10000 + hour_mon_sec[1] * 100 + hour_mon_sec[2];
          var icon;
          var method = data.field["permission"].split(":")[1];
          switch (method) {
            case "add":
              icon = 'plus-outline';
              break;
            case "del":
              icon = 'minus-outline';
              break;
            case "edit":
              icon = 'edit-outline';
              break;
            case "query":
              icon = "search-outline"
              break;
            case "import":
              icon = "cloud-upload-outline"
              break;
            case "download":
              icon = "cloud-download-outline"
              break;
  
          }
          const colums: EditAddColums = {
            name: data.field["title"],
            type: data.field["type"],
            redirecturl: data.field["link"],
            parentid: Number(parentid),
            orderindex: Number(data.field["orderindex"]),
            lastupdatedby: data.field["username"],
            icon: icon,
            name_en: data.field["title_en"],
            textid: data.field["textid"],
            active: data.field["visible"]? 1: 0,
            permission: data.field["permission"] // permission
          };
          that.httpservice.callRPC("menu_item", "insert_menu_item", colums).subscribe(result=>{
            // console.log("新增按钮----new-menu", result)
            // console.log("新增按钮----colums", colums)
            var res = result["result"]["message"][0];
            if (res === 1){
              that.dialogRef.close(true);
              that.RecordOperation(1,'新增', '菜单管理, 按钮');
            }else{
              that.dialogRef.close(false);
              that.RecordOperation(0,'新增', '菜单管理, 按钮');
            }
            return false;
          })
        }

        // console.log("得到表单数据：", data.field)
        
        return false;
      });
      form.render('checkbox'); // 刷新checkbox选择框渲染
      form.render('select'); // 刷新select    
      form.render();
      // 表单赋值--目录
      
      // =============================监听 输入button 确定

      // tab toggle
      element.on('tab(docDemoTabBrief)', function(data){
        // localStorage.setItem(EDIT_MENU_ISMENU, String(data.index))
        if(data.index == 0){ // 目录
          // console.log("目录")
        }
        if(data.index == 1){ // 菜单
          // console.log("菜单")
        }else{
          // anniuli
        }
      });

    })
  }

  // × 关闭diallog   及关闭弹框
  closedialog(){
    this.dialogRef.close(false);
  }

  // 取消
  cancel(){
    this.dialogRef.close(false);
    

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

  // ---icon========================================================
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
    // console.log("this.input.nativeElement.value  ",this.input.nativeElement.value)
    // this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    var $html = $('.cdk-global-scrollblock');
    $html.addClass("nb-global-scrollblock");
    // console.log("*************************",$event,html, $html.attr("class", "cdk-global-scrollblock nb-global-scrollblock"));
    console.log("*************************")
    // this.filteredOptions$ = this.getFilteredOptions($event);
    
  }
  
  // ---icon========================================================


  // =================上级目录数据
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
    // console.log("=========> mulu_list",mulu_list)
    // console.log("=========> caidan_list",caidan_list)
  
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
      // console.log("******************^^^^^^^^^^^^^^^这是按钮的上级目录需要的数据^\n", mulu_lists);
      return mulu_lists
      
    }
  }

  // 根据menuitemid得到中、英文name
  getmenuname_with_menitemid(isnot_edit){
    return new Observable((observe)=>{
      const colums = {
        menuitemid: isnot_edit["id"]
      };
      // console.log("---colums--",colums)
      const table = "text_translation";
      const method = "get_menuname_with_menitemid";
      this.httpservice.callRPC(table, method, colums).subscribe((result)=>{
        const baseData = result['result']['message'][0];
        
        observe.next(baseData)
      })
    })
  }



  // =================上级目录数据

  // option_record  
  RecordOperation(result,transactiontype, infodata){
    console.warn("==============>", this.userinfoservice.getLoginName())
    console.warn("infodata==============>", infodata)
    console.warn("==============>")
    if(this.userinfoservice.getLoginName()){
      var employeeid = this.userinfoservice.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = transactiontype; // '新增用户';
      var info = infodata;
      var createdby = this.userinfoservice.getLoginName();
      this.publicmethod.option_record(employeeid, result, transactiontype, info, createdby);
    }

  }
}
