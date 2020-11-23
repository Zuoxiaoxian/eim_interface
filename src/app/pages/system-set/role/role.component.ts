import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';


import { DatePipe } from '@angular/common';

import { SYSROLEMENU,  SYSROLE, menu_button_list, role_action, MULU,loginurl } from '../../../appconfig';

declare let layui;

declare let $;

var store = require('store');

import { HttpserviceService } from '../../../services/http/httpservice.service';


import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { NbDialogService } from '@nebular/theme';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';


import { RoleComponent as AddRoleComponent} from '../../../pages-popups/system-set/role/role.component';
import { Observable } from 'rxjs';

import { UserInfoService } from '../../../services/user-info/user-info.service';

import { EditDelTooltipComponent } from '../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';
import { Router } from '@angular/router';
import { ActionComponent } from './action/action.component';
import { TranActiveComponent } from '../new-user-employee/tran-active/tran-active.component';


@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @ViewChild('dialog') dialog: TemplateRef<any>;
  @ViewChild("agGrid") agGrid: any;
  refresh = false; // 刷新tabel
  loading = false;  // 加载
  button; // 权限button
  // 要删除、修改的行数据 
  rowdata;
  // 得到日志的plv8函数名
  GetRole = "get_role_limit";
  // 展示状态
  success(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"保存成功!"});
  }
  danger(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"保存失败!"});
  }

  // 展示状态
  delsuccess(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"删除成功!"});
  }
  deldanger(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"删除失败!"});
  }

  // 展示状态
  editsuccess(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"修改成功!"});
  }
  editdanger(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"修改失败!"});
  }
  // 展示状态
  addsuccess(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"添加成功!"});
  }
  adddanger(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"添加失败!"});
  }

  searchdanger(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"没有角色名称(role_name):" + data});
  }

  active; // 操作！
  constructor(private http: HttpserviceService, private localstorageservice: LocalStorageService,
    private dialogService: NbDialogService, private datapipe: DatePipe, private publicservice: PublicmethodService, private userinfo: UserInfoService,
    private router: Router) { 
  }
  
  ngOnInit(): void {
    // 加载树状menu  初始化
    this.loadMenu().subscribe((treedata)=>{
      // this.showTreedata(treedata)
      console.log("加载树状menu  初始化>>>>>>>>>>>", treedata)
      this.showTreedata_v2(treedata);
    });

    // 得到该页面下的button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    })
    

    // ====================================agGrid
      var that = this;
      this.active = { field: 'action', headerName: '操作', cellRendererFramework: ActionComponent, pinned: 'right',
        cellRendererParams: {
          clicked: function(data: any) {
            if (data["active"]==='edit'){
              that.editrole([data["data"]]);
            }else{
              that.remove([data["data"]]);
            }
          }
        },
      }
      
  }
  
  ngAfterViewInit(){
    // 初始化table
    this.tableDatas.columnDefs.push(
      this.active
    )
    this.inttable()

  }

  ngOnDestory(){
  }


  getsecurity_edit2(table: string, method: string, colums: object, http){
    return new Observable((res)=>{
      http.callRPC(table, method, colums).subscribe((result)=>{
        res.next(result)
      })
    })
  }

  action(actionmethod){
    console.log("++++++++++++++++++++action(actionmethod)++++++++++++++++++++++++++++", actionmethod);
    var method = actionmethod.split(":")[1];
    console.log("--------------->method", method)
    switch (method) {
      case 'add':
        this.addrole();
        break;
      case 'del':
        this.remove();
        break;
      case 'edit':
        this.editrole();
        break;
      case 'query':
        this.query();
        break;
      // case 'import':
      //   this.import();
      //   break;
      case 'download':
        this.download('角色管理')
        break;
    }

  }


  // 添加role button 弹出框形式
  addrole(){
    this.dialogService.open(AddRoleComponent, {closeOnBackdropClick: false,context: { rowdata: JSON.stringify('add')}}).onClose.subscribe(name=>{
      if (name){
        this.gridData = [];
        this.loading = true;
        this.update_agGrid();
        this.loading = false;
      }
    })
    
  }

  // 修改role button 
  editrole(active_data?){
    console.log("-------------------------->>>>>>>>>>>>>>>", active_data)
    var rowdata;
    if (active_data){
      rowdata = active_data;
    }else{
      rowdata = this.agGrid.getselectedrows();
    }
    // 得到选中的aggrid rowdatas
    console.log("修改role button ", rowdata);
    switch (rowdata.length) {
      case 1:
        var rowData = rowdata[0]
        this.dialogService.open(AddRoleComponent, {closeOnBackdropClick: false,context: { rowdata: JSON.stringify(rowData)} }).onClose.subscribe(
          name=>{
            console.log("修改角色----name-----", name);
            console.log("修改角色----this.agGrid-----", this.agGrid);
            if (name){
              this.gridData = [];
              this.loading = true;
              this.update_agGrid();
              this.loading = false;
              localStorage.removeItem(SYSROLE);

            }else{
            }
          }
        );
        break;
      default:
        this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `请选择一行数据！`}} ).onClose.subscribe(
          name=>{console.log("----name-----", name)}
        );
        break;
    }
  }

  // 删除role button
  remove(active_data?){
    var rowdata;
    if (active_data){
      rowdata = active_data;
    }else{
      rowdata = this.agGrid.getselectedrows();
    }
    // 得到选中的aggrid rowdatas
    var http = this.http;
    var getsecurity_edit2 = this.getsecurity_edit2;
    var publicservice = this.publicservice;
    var DelSuccess = this.delsuccess;
    var DelDanger = this.deldanger;
    if (rowdata.length === 0){
          console.log("没有选中行数据", rowdata);
          // 提示选择行数据
          this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `请选择一行数据！`}} ).onClose.subscribe(
            name=>{console.log("----name-----", name)}
          );
    }else{
      var rowData = rowdata;
      var text = rowData.length > 1 ? "这些": "这条";
      console.log("-------------------->>>>>>>>>>>>",rowData);   
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `确定要删除${text}数据吗？`,rowData: JSON.stringify(rowData)}} ).onClose.subscribe(
        name=>{
          console.log("----name-----", name);
          if (name){
            try {
              var data_info;
              var id_list = [];
              rowData.forEach(item => {
                id_list.push(item["role_name"])
              });
              var id_str = id_list.join(',');
              data_info  = '角色名称:' + id_str;
              getsecurity_edit2('role', 'sys_delete_role', rowData, http).subscribe((result)=>{
                var res = result["result"]["message"][0];
                if (res["code"] === 1){
                  this.RecordOperation( "删除角色",  1, data_info);
                  this.gridData = [];
                  this.loading = true;
                  this.update_agGrid();
                  this.loading = false;
                  DelSuccess(publicservice)
                }else{
                  this.RecordOperation( "删除角色", 0, data_info);
                  DelDanger(publicservice)
                }
              });
            }catch(err){
              throw 'error, 删除失败！'
            }
           
          }
        }
      );

     

      
    }

    

    
  }


  //  button导出未excel
  download(title){
    this.agGrid.download(title);
    this.RecordOperation("导出"+title, 1, "导出excel表格");
  }

  // button 搜索按钮
  query(){
    var role_name = $("#employeenumber").val();
    if (role_name != ""){
      console.log("button 搜索按钮", role_name, "--");
      var columns = {
        offset: 0, 
        limit: 20,
        role_name: role_name
      }
      this.gridData = [];
      this.loading = true;
      this.http.callRPC('role', 'sys_search_role', columns).subscribe(result=>{
        var res = result['result']['message'][0];
        this.loading = false;
        if(res["code"]===1){
          var message = res["message"];
          this.gridData.push(...message)
          this.tableDatas.rowData = this.gridData;
          var totalpagenumbers = res['numbers']? res['numbers'][0]['numbers']: '未得到总条数';
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
          this.RecordOperation("搜索", 1, '角色名称(role_name):' + role_name);
          if (message.length < 1){
            this.searchdanger(role_name);
          }
        }else{
          var data_info = res["message"];
          this.RecordOperation("搜索", 0, '角色名称(role_name):' + String(data_info));
        }
      })
      this.RecordOperation("搜索", 1, '搜索角色:' + role_name);
    }
  }

  // 刷新
  refresh_table(){
    $("#employeenumber").val('')
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    this.inttable();
    this.loading = false;
    this.refresh = false;
    // 加载树状menu  初始化
    this.loadMenu().subscribe((treedata)=>{
      this.showTreedata_v2(treedata);
    });
    // disabled  禁止保存按钮
    var $save = $("#save");
    $save.attr("class", "layui-btn layui-btn-disabled");
  }

  // agGrid 点击行时，update 树状菜单！
  clickrow(rowdata){
    console.log("agGrid---子组件传值---agGrid", rowdata);
    var rowData = rowdata["data"]
    console.log("agGrid---rowData====================", rowData);
    var roleid = rowData["roleid"];
    // var method = "get_systemset_menu";
    var method = "get_menu_role";
    this.loadMenu2(roleid, method).subscribe((treedata)=>{
      this.showTreedata_v2(treedata)
    });

    // disabled  激活保存按钮
    var $save = $("#save");
    $save.attr("class", "layui-btn layui-btn-normal");

  } 

  
  // 菜单分配树状图
  showTreedata(treedata){
    // console.log("treedata----",treedata)
    layui.use(['layer', 'form', 'tree', 'util'], function(){
      var layer = layui.layer
      ,tree = layui.tree
      ,form = layui.form
      ,util = layui.util
      // 渲染
      tree.render({
        elem: '#menuFengPei', // 绑定元素
        showCheckbox: true,  //是否显示复选框
        data: treedata,
        id: 'treeid'
      })
      

    });
  }


  ngOnDestroy(){
    localStorage.removeItem(SYSROLEMENU); // 销毁菜单分配
  }




  // 需要传入参数 1、得到所有的菜单 2、根据当前用户的id得到对应的菜单
  loadMenu(roles?, methods?){
    console.log("这是 系统设置的  角色  界面！" )
    return new Observable((observe)=>{
      this.publicservice.getMenu().subscribe((data)=>{
        var roles_ = roles === undefined ? data: roles;
        var method_ = methods === undefined ? 'get_systemset_menu_all': methods;
        console.log("这是 系统设置的  角色  界面！", roles_, method_)
        console.log("这是 系统设置的  角色  界面！=================data", data, )

        const colums = {
          languageid: this.http.getLanguageID(),
          roles: data
        };
        console.log("---colums--",colums)
        const table = "menu_item";
        const method = "get_systemset_menu_all";
        this.http.callRPC(table, method, colums).subscribe((result)=>{
          
          const baseData = result['result']['message'][0];
          console.log("sys_role_menu", baseData)
          localStorage.setItem(SYSROLEMENU, JSON.stringify(baseData));
          // 得到特定的树状结构数据
          this.sysrolemenu_to_tree_v2(baseData).subscribe((treedata)=>{
            observe.next(treedata)
          });
        })
      });
    })
  }

  // 当点击角色是请求菜单
  loadMenu2(roles, methods){
    console.log("点击角色执行", roles, methods);
    localStorage.setItem("click_col_roles", roles);
    return new Observable((observe)=>{
      const colums = {
        languageid: this.http.getLanguageID(),
        roleid: roles
      };
      console.log("---colums--",colums)
      const table = "menu_item";
      const method = methods;
      this.http.callRPC(table, method, colums).subscribe((result)=>{
        console.log("get_menu_role", result);
        // 得到button列表！
        var button_list = [];
        result['result']['message'][0]["allmenu"].forEach(element => {
          if (element["type"] === 2){
            button_list.push(element)
          }
        });
        const result_allmenu = result['result']['message'][0]["allmenu"];
        const allmenu = JSON.parse(localStorage.getItem(SYSROLEMENU));
        const selectmenu = result['result']['message'][0]["selectmenu"];
        console.log("------------------------result_allmenu",result_allmenu)
        this.sysrolemenu_to_tree_v2(allmenu, selectmenu).subscribe((res)=>{
          observe.next(res)
        });
      })
    })
    
    // this.RanderTable(data);
  }


  // 菜单分配树状图
  showTreedata_v2(res, is_reload?){

    var http = this.http;
    var publicservice = this.publicservice;
    var success = this.success;
    var danger = this.danger;

    // var updatabutton_list = this.updatabutton_list;

    var that = this

    //  加载formSelect模块
    layui.config({
      base: "./assets/pages/system-set/layui/module/"
    }).extend({
    });

    var that = this;
    var treedata= res["treedata"]
    var selectmenu = res["selectmenu"]
    console.log("treedata------>",treedata)
    console.log("selectmenu------>",selectmenu);
    var selectment_lsit = []; 
    if (selectmenu != []){
      selectmenu.forEach(element => {
        selectment_lsit.push(element["menuitemid"])
      });
    }
    console.log("selectment_lsit------>",selectment_lsit);
    var checkData;
    layui.use(['layer', 'form', 'eleTree'], function(){
      var layer = layui.layer
      ,form = layui.form
      // 渲染
      var eleTree = layui.eleTree;
      console.log("selectment_lsit------>",selectment_lsit);
      var el2=eleTree.render({
        elem: '#menuFengPei',
        data: treedata, 
        showCheckbox: true,
        defaultExpandAll: false, // 是否默认展开所有节点
        defaultCheckedKeys: selectment_lsit,  // 默认勾选的节点的 key 的数组
        // defaultExpandedKeys: selectment_lsit,    // 默认展开的节点的 key 的数组
        checkStrictly: true, //在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false


      });
      console.log("-=-=-=-=-=-=-=-=-el2-=-=-=-=-=",el2)
      // 节点点击事件
      var select_id = selectment_lsit;
      eleTree.on("nodeChecked(treedata)",function(d) {
        console.log(d.data);    // 点击节点对于的数据
        console.log(d.isChecked);   // input是否被选中
        // var select_id = [];
        if (d.isChecked){
          // 表示该节点被选中！判断是否是父节点
          console.log(d.data["currentData"]);
          // select_id.push(d.data["currentData"]["id"]);
          uniq(select_id, d.data["currentData"]["id"])
          if (d.data["currentData"] != undefined && d.data["currentData"]["children"] != null){
            // 展开所有
            el2.expandNode(d.data["currentData"]["id"])
            var children = d.data["currentData"]["children"]
            children.forEach(element => {
              if (element["children"] != undefined){
                // 展开所有
                el2.expandNode(element["id"])
                // select_id.push(element["id"]);
                uniq(select_id, element["id"])
                var e_children = element["children"];
                e_children.forEach(e_element => {
                  // 按钮
                  // select_id.push(e_element["id"]);
                  uniq(select_id, e_element["id"])
                });
              }else{
                // 菜单
                uniq(select_id, element["id"])
              }
            });
            console.log("该节点为父节点！字节点", children);
            console.log("该节点为父节点！当前节点", d.data["currentData"]);
            // 需要
            // el2.setChecked(select_id,true);
          }
          console.log("点击父节点，默认子节点也选中", select_id)
          
        }else{
          // 取消 el2.unCheckArrNodes(22,24);
          if (d.data["currentData"] != undefined && d.data["currentData"]["children"] != null){
            var children = d.data["currentData"]["children"]
            el2.unExpandNode(d.data["currentData"]["id"]);
            console.log("-----------currentData----------", d.data["currentData"])
            console.log("-----------children----------", children)
            del_unselect(select_id, d.data["currentData"]["id"]);
            children.forEach(element => {
              if (element["children"] != undefined){
                el2.unExpandNode(element["id"]);
                var e_children = element["children"];
                del_unselect(select_id, element["id"])
                e_children.forEach(e_element => {
                  // 按钮
                  del_unselect(select_id, e_element["id"])
                });
              }else{
                // 菜单
                del_unselect(select_id, element["id"])
              }
            });
          }else{
            del_unselect(select_id, d.data["currentData"]["id"])
          }
          console.log("取消的节点", select_id)
        }
        
        el2.setChecked(select_id,true);
        
        // console.log(d.node);    // 点击的dom节点
        // console.log(this);      // input对于的dom
      })


      function uniq(select_id, id) {
        var index = select_id.indexOf(id);
        if (index === -1){
          select_id.push(id)
        }
        
      }

      // 勾选的列表去除，取消勾选的
      function del_unselect(select_id, unselect_id) {
        console.log("select_id, unselect_id", select_id, unselect_id);
        // select_id:勾选的列表， unselect：取消勾选的
        var index = select_id.indexOf(unselect_id);
        if (index != -1){
          select_id.splice(index, 1);
        }
        console.log("勾选的列表去除，取消勾选的 select_id", select_id)
      }
      // el2.setChecked(selectment_lsit)




      // console.log(el2.getChecked(false,true))
      // 获取选中的节点，接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false

      // 2. 是否包含半选节点，默认值为 false

      // 保存按钮---保存更改后的角色对应的菜单
      form.on('submit(save)', function(data){
        
        // console.log(el2.getChecked(true,false));
        checkData = el2.getChecked(false,true);
        var roles = localStorage.getItem("click_col_roles");
        console.log("得到的选中的数据>>>>>>>>>>>>>>>>>>", checkData,roles);
        var selects = [];
        if (checkData.length>0){
          checkData.forEach(element => {
            var selects_dict = {};
            selects_dict["menuitemid"] = element["id"]
            selects.push(selects_dict)
          });
          selects[0]["roleid"] = roles;
        }else{
          // checkData 为空
          var item = {};
          item["menuitemid"] = null;
          item["roleid"] = roles;
          selects.push(item);
        }
        // 更新菜单
        const colums = selects;
        console.log("---colums--",colums)
        const table = "menu_item";
        const method = "update_menu_role";
        http.callRPC(table, method, colums).subscribe((result)=>{
          const baseData = result['result']['message'][0];
          if (baseData === 1){
            // publicservice.toastr(SavSuccess);
            success(publicservice);
            // 成功后更新 menu_button_list
            // updatabutton_list(publicservice,http);
            localStorage.removeItem(MULU); // 这个是更新左侧目录栏

            that.RecordOperation('保存菜单分配', 1,"角色id:"+colums["roleid"] + ',' + "菜单id:"+colums["menuitemid"]);
            // 加载树状menu  初始化
            that.loadMenu().subscribe((treedata)=>{
              console.log("加载树状menu  初始化>>>>>>>>>>>", treedata)
              that.showTreedata_v2(treedata, true);
              
            });



            

          }else{
            // publicservice.toastr(SavDanger);
            var data = String(result['result']['message'][0]["message"])
            that.RecordOperation('保存菜单分配', 0, "保存失败");
            console.log("保存失败的原因：", result, result['result']['message'][0]);
            danger(publicservice);
          }
          
        })
        return false;
      })

      console.log("为什么点击无法保存")

    })

    if (is_reload){
      // 提示刷新界面
      if(confirm("请刷新界面，已更新目录")){
        location.reload();
      }else{

      }
    }
    
  }

  // 更新button_list！
  updatabutton_list(publicservice, http){
    publicservice.getMenu().subscribe((data)=>{
      const colums = {
        languageid: http.getLanguageID(),
        roles: data
      };
      console.log("---更新button_list！--",colums)
      const table = "menu_item";
      const method = "get_menu_by_roles";
      http.callRPC(table, method, colums).subscribe((result)=>{
        console.log("---更新button_list！--",result)

        const baseData = result['result']['message'][0];
        var button_list = [];
        baseData.forEach(element => {
          if (element["type"] === 2 ){
            button_list.push(element);
          }
        });
        localStorage.setItem(menu_button_list, JSON.stringify(button_list));
      })



    });
    
  }


  // 根据得到的 sysrolemenu 角色界面的菜单数据得到适用于特定树状结构的数据
  sysrolemenu_to_tree_v2(sysrolemenu, selectmenu?){
    console.log("<<<<<<<<<<<<<<<<sysrolemenu_to_tree_v2>>>>>>>>>>>>>", sysrolemenu, selectmenu)
    /*
    * 需要的特定数据格式： 
      [
        {
          id: ,    // 节点唯一索引，对应数据库中id
          label: , // 节点标题
          checked: , // 是否勾选
          disabled: , // 节点是否为禁止状态，默认为false
          children: , // 子节点，支持设定项同父节点
        }
      ] 
    */
   return new Observable((observe)=>{
     var mulu_list = [];
     var caidan_list = [];
     var aniu_list = [];
     var selectmenu_ = selectmenu === undefined? []: selectmenu;
    //  console.log(">>>>>>>>>>>>>>>>>.,selectmenu_",selectmenu_)


     sysrolemenu.forEach(item => {
       if (item["type"] === 0){
         var mulu = this.get_mulu_list_v2(item);
         if(selectmenu_ != []){
           selectmenu_.forEach(select => {
             if (select["menuitemid"] === mulu["id"]){
              // mulu["checked"] = true;
            }
          });
        }
        mulu_list.push(mulu);
      }else if (item["type"] === 1){
        var caidan = this.get_mulu_list_v2(item);
        if(selectmenu_ != []){
          selectmenu_.forEach(select => {
            if (select["menuitemid"] === caidan["id"]){
              // caidan["checked"] = true
            }
          });
        }
        caidan_list.push(caidan)
      }else{
        var aniu = this.get_mulu_list_v2(item);
        if(selectmenu_ != []){
          selectmenu_.forEach(select => {
            if (select["menuitemid"] === aniu["id"]){
              // aniu["checked"] = true
            }
          });
        }
        aniu_list.push(aniu)
      }
     });


    //  mulu_list 目录列表 caidan_list 菜单列表 aniu_list 按钮列表！
    var res_caidan_list = this.unique(caidan_list, 'id');
    var res_aniu_list = this.unique(aniu_list, 'id');
    
    // console.log("+++++++++++++++++++\n")
    // console.log("目录列表 ", mulu_list);
    // console.log("菜单列表: ", res_caidan_list);
    // console.log("按钮列表: ", res_aniu_list);
    // console.log("+++++++++++++++++++\n");
    
    var caidanList = this.integration_list_v2(res_caidan_list, res_aniu_list);
    //  console.log("caidanList 这是整合了菜单列表、按钮列表\n：", caidanList);
    var muluList = this.integration_list_v2(mulu_list, caidanList);
    //  console.log("muluList 这是整合了,目录列表、 菜单列表\n：", muluList);
    
    //  需要将 muluList去重根据id
    var res_muluList = this.unique(muluList, 'id');
    // console.log("目录列表  muluList去重根据id: ", res_muluList);

    var res_muluList_copy = this.handle_mulu_list(res_muluList);

    //  console.log("res_muluList 最终的 treedata ", res_muluList);



     // 数据展示到树状结构中 
    //  this.showTreedata_v2(muluList, selectmenu_)
    
    observe.next({treedata:res_muluList_copy, selectmenu: selectmenu_});
    // observe.next({treedata:muluList, selectmenu: selectmenu_});

    // observe.next({treedata:muluList, selectmenu: selectmenu_2});

   })
   
  }

  // 重新处理目录 mulu_list
  handle_mulu_list(res_muluList){
    console.log("最终的目录列表 res_muluList:    start", res_muluList,);
    var parentid_exist = [];
    res_muluList.forEach(mulu => {
      if ( mulu["parentid"] !=0 && mulu["parentid"] != null ){
        parentid_exist.push(mulu);
      }
    });
    console.log("---------------parentid_exist-------------", parentid_exist)
    res_muluList.forEach(mulu => {
      parentid_exist.forEach(item=>{
        if (mulu['id'] === item["parentid"]){
          mulu["children"].push(item)
        }
      })
    });
    
    var res_muluList_copy = [];
    res_muluList.forEach(res_mulu  => {
      if (res_mulu["type"] === 0){
        var children = res_mulu["children"];
        if (children.length === 0){
          if (res_muluList_copy.indexOf(res_mulu) === -1){
            res_muluList_copy.push(res_mulu)
          }
        }else{
          children.forEach(c_item => {
            res_muluList.forEach(item=>{
              if(c_item["id"] === item["id"] ){
                if (res_muluList_copy.indexOf(res_mulu) === -1){
                  res_muluList_copy.push(res_mulu)
                }
              }else{
                // 子id 不在，但是父id在如统计分析！
                if (res_mulu["id"] != item["parentid"] && item["id"] === c_item["parentid"]){
                  if (res_muluList_copy.indexOf(item) === -1 && item["parentid"]>0){}else{
                    // console.log("子id 不在，但是父id在如统计分析！", item)
                    res_muluList_copy.push(item)

                  }
                }
              }
  
            })
          });
        }
      }else{
        if (res_muluList_copy.indexOf(res_mulu) === -1){
          res_muluList_copy.push(res_mulu)
        }
      }

    });
    res_muluList_copy = this.unique(res_muluList_copy, 'id')

    // 删除 res_muluList 的  parentid 不为 0 和 null的


    // console.log("最终的目录列表 res_muluList:   end", res_muluList);
    console.log("最终的目录列表 res_muluList_copy:   res_muluList_copy", res_muluList_copy);
    return res_muluList_copy

    
  }


  // 根据mulu  id 去重
  unique(arr, field) {
    const map = {};
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      if (!map[arr[i][field]]) {
        map[arr[i][field]] = 1;
        res.push(arr[i]);
      }
    }
    
    return res;
  }

  // 列表整合！
  integration_list_v2(parentList, childList){
    parentList.forEach(parent => {
      var child_list = [];
      childList.forEach(child => {
        if (child["parentid"] === parent["id"]){
          child_list.push(child)
        }else if(child["parentid"] === 0 ){
          // 属于菜单，但没有上级目录
          parentList.push(child); // 在目录列表中，将 该菜单 添加进入！
        }
        parent["children"] = child_list
      });
    });
    return parentList
  }

  // 得到目录列表、菜单列表、按钮列表
  get_mulu_list_v2(item){
    var mulu: TREEV2 = {
      type: item["type"],
      id:item["id"],
      parentid:item["parentid"],
      label: item["title"],
      checked: false,
      disabled: false,
      children: [],
    }
    return mulu
  }


  // =================================================agGrid

  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection
      { field: 'role_name', headerName: '角色名称', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true,},
      { field: 'role', headerName: '角色名称(en)', resizable: true,},
      // { field: 'active', headerName: '是否启用',resizable: true,},
      { field: 'active', headerName: '是否启用',resizable: true,cellRendererFramework: TranActiveComponent,},
      { field: 'createdby', headerName: '创建人', resizable: true,},
      { field: 'createdon', headerName: '创建时间', resizable: true,},
      { field: 'lastupdatedby', headerName: '更新人', resizable: true,},
      { field: 'lastupdateon', headerName: '更新时间', resizable: true,},
      
    ],
    rowData: [ // data
    ]
  };

  private gridData = [];
  
  inttable(event?){
    var offset;
    var limit;
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
    }else{
      offset = 0;
      limit = 20;
    }

    const table = "role";
    const method = this.GetRole;
    const colums = {offset: offset, limit: limit}
    this.http.callRPC(table, method, colums).subscribe((result)=>{
      console.log("sys_role--------------------------", result)
      const baseData = result['result']['message'][0];
      if (baseData["code"] === 1){
        // localStorage.setItem(SYSROLE, JSON.stringify(baseData));
        
        this.gridData.push(...baseData["message"]);
        this.tableDatas.rowData = this.gridData
        var totalpagenumbers = baseData['numbers']? baseData['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
      }else{
        this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"得到角色失败" + baseData["message"]});
      }
    })
    
  }
  // 更新table update_agGrid
  update_agGrid(event?){
    var offset;
    var limit;
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
    }else{
      offset = 0;
      limit = 20;
    }
    const table = "role";
    const method = this.GetRole;
    const colums = {offset: offset, limit: limit}
    this.http.callRPC(table, method, colums).subscribe((result)=>{
      console.log("sys_role--------------------------", result)
      const baseData = result['result']['message'][0];
      if (baseData["code"] === 1){
        this.gridData.push(...baseData["message"]);
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = baseData['numbers']? baseData['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        // this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！

      }else{
        this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"得到角色失败" + baseData["message"]});
      }
    })
    
  }

  // 更新table  update_agGrid
  updategetemployee(event?){
    // 更新table
    this.update_agGrid();
    // 加载树状menu  初始化
    this.loadMenu().subscribe((treedata)=>{
      // this.showTreedata(treedata)
      this.showTreedata_v2(treedata);
    });
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event){
    console.log("页码改变的回调", event);
    this.inttable(event);
  }


  // =================================================agGrid
  // option_record
  RecordOperation(option, result,infodata){
    console.warn("==============>", this.userinfo.getLoginName())
    console.warn("infodata==============>", infodata)
    console.warn("==============>")
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(employeeid, result,transactiontype,info,createdby);
    }

  }


  // children_call_for_updata_roleTree 子组件调用，刷新tree
  children_call_for_updata_roleTree(){
      // console.log("children_call_for_updata_roleTree 子组件调用，刷新tree")
    // aggrid-action ----》aggrid ---》调用的次数太多！！！！！！！！！！
    // this.loadMenu().subscribe((treedata)=>{
    //   // this.showTreedata(treedata);
    //   console.log("children_call_for_updata_roleTree 子组件调用，刷新tree")
    //   this.showTreedata_v2(treedata);
    // });
  }

}


interface TREEV2 {
  type: number, // 自定义判断是否是目录
  id: number,    // 节点唯一索引，对应数据库中id
  parentid: number,    // 父节点id
  label: string, // 节点标题
  checked: boolean,// 节点是否初始为选中状态， 默认false
  disabled: boolean, // 节点是否为禁止状态，默认为false
  children: TREEV2[] | [], // 子节点，支持设定项同父节点
}
