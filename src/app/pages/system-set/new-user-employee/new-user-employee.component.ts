import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { ActionComponent } from './action/action.component'
import { AddEmployee } from '../../../pages-popups/system-set/form_verification';

declare let $;
declare let layui;
 
import * as XLSX from 'xlsx';
import { TranActiveComponent } from './tran-active/tran-active.component';
import { NbDialogService } from '@nebular/theme';
import { EditDelTooltipComponent } from '../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';
import { UserEmployeeComponent } from '../../../pages-popups/system-set/user-employee/user-employee.component';
import { Observable } from 'rxjs';
type AOA = any[][];

@Component({
  selector: 'ngx-new-user-employee',
  templateUrl: './new-user-employee.component.html',
  styleUrls: ['./new-user-employee.component.scss']
})
export class NewUserEmployeeComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  active;  // aggrid 操作
  loading = false;  // 加载
  refresh = false; // 刷新tabel
  TABLE = "employee"; // table
  METHOD = "sys_get_employee_limit" // method
  button; // 权限button

  importdata: AOA = [[1,2], [3,4]]; //导入数据

  // agGrid
  tableDatas = {
    totalPageNumbers: 0, // 总页数
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection
      { field: 'loginname', headerName: '域账号',  headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 30,resizable: true,},
      { field: 'name', headerName: '姓名', resizable: true,},
      { field: 'employeeno', headerName: '员工编号', resizable: true,},
      { field: 'role_name', headerName: '角色', resizable: true,},
      { field: 'groups_name', headerName: '科室/功能组', resizable: true,},
      { field: 'active', headerName: '是否启用', resizable: true, cellRendererFramework: TranActiveComponent,},
      { field: 'email', headerName: '邮箱', resizable: true,},
      { field: 'lastsignondate', headerName: '更新时间', resizable: true,},
    ],
    rowData: [ // data
    ]
  };
  private gridData = [];


  constructor(private http: HttpserviceService, private userinfo: UserInfoService, private publicmethod: PublicmethodService,
    private dialogService: NbDialogService) { 
      // 导入
      this.http.callRPC('', 'sys_get_all_role_and_group', {}).subscribe(result=>{
        console.log("---result-----------------------------------------------", result);
        if (result["result"]["message"][0]["code"]===1){
          var roles_group =  result["result"]["message"][0];
          localStorage.setItem("roles", JSON.stringify(roles_group["roles"]))
          localStorage.setItem("groups", JSON.stringify(roles_group["groups"]))
        }
      })
  }

  ngOnInit(): void {
    // agGrid
    var that = this;
    this.active = { field: 'action', headerName: '操作', cellRendererFramework: ActionComponent, pinned: 'right',resizable: true,flex: 1,
      cellRendererParams: {
        clicked: function(data: any) {
          if (data["active"]==='edit'){
            that.edit(data["data"]);
          }else{
            that.del(data["data"]);
          }
        }
      },
    }
    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicmethod.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    })
  }

  ngAfterViewInit(){
    // 初始化table
    this.tableDatas.columnDefs.push(
      this.active
    )
    
    this.inttable();
   
    
  }

  ngOnDestroy(){
    localStorage.removeItem("roles");
    localStorage.removeItem("groups");
  }

  buttons = {
		add:{
			active: 1,
			class: "info",
			icon: "plus-outline",
			id: 122,
			link: "undefined",
			orderindex: 0,
			parentid: 53,
			permission: "menu:add",
			title: "新增",
			type: 2
		},
		del:{
			active: 1,
			class: "danger",
			icon: "minus-outline",
			id: 122,
			link: "undefined",
			orderindex: 0,
			parentid: 53,
			permission: "menu:del",
			title: "删除",
			type: 2
		},
		edit: {
			active: 1,
			class: "warning",
			icon: "edit-outline",
			id: 122,
			link: "undefined",
			orderindex: 0,
			parentid: 53,
			permission: "menu:edit",
			title: "编辑",
			type: 2
		},
		query: {
			active: 0,
			class: "success",
			icon: "search-outline",
			id: 122,
			link: "undefined",
			orderindex: 0,
			parentid: 53,
			permission: "menu:query",
			title: "搜索",
			type: 2
		},
		import:{
			active: 1,
			class: "primary",
			icon: "cloud-upload-outline",
			id: 122,
			link: "undefined",
			orderindex: 0,
			parentid: 53,
			permission: "menu:import",
			title: "导入",
			type: 2
		},
		download:{
			active: 1,
			class: "primary",
			icon: "cloud-download-outline",
			id: 122,
			link: "undefined",
			orderindex: 0,
			parentid: 53,
			permission: "menu:download",
			title: "导出",
			type: 2
		}
  }
  
  action(actionmethod){
    console.log("++++++++++++++++++++action(actionmethod)++++++++++++++++++++++++++++", actionmethod);
    var method = actionmethod.split(":")[1];
    // ====================================================
    console.log("--------------->method", method)
    switch (method) {
      case 'add':
        this.add();
        break;
      case 'del':
        this.del();
        break;
      case 'edit':
        this.edit();
        break;
      case 'query':
        this.query();
        break;
      case 'import':
        this.import();
        break;
      case 'download':
        this.download('用户管理')
        break;
    }
  }
  add(){
    this.dialogService.open(UserEmployeeComponent,{closeOnBackdropClick: false,context: { rowdata: JSON.stringify('add'), res: JSON.stringify(''), goups: JSON.stringify('')}}).onClose.subscribe(istrue=>{
      console.error("istrue 新增",istrue)
      if(istrue){
        this.gridData = [];
        this.loading = true;
        this.update_agGrid();
        this.loading = false;
      }
    })

  }
  del(active_data?){
    var rowdata;
    if (active_data){
      rowdata = active_data;
    }else{
      rowdata = this.agGrid.getselectedrows();
    };
    if (rowdata.length === 0){
      // 提示选择行数据
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `请选择一行数据！`}} ).onClose.subscribe(
        istrue=>{
          console.log("----name-----", name);
        }
      );
    }else{
      var text = rowdata.length > 1 ? "这些": "这条";
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `确定要删除${text}数据吗？`, rowData: JSON.stringify(rowdata)} } ).onClose.subscribe(istrue=>{
        if (istrue){
          // sys_delete_employees
          try{
            // rowdata
            var data_info;
            var id_list = [];
            rowdata.forEach(item => {
              id_list.push(item["employeeid"])
            });
            var id_str = id_list.join(',');
            data_info  = '删除的用户id:' + id_str;
            console.log("要删除的数据:", rowdata)
            this.http.callRPC("employee", "sys_delete_employees",rowdata).subscribe(result=>{
              var res = result["result"]["message"][0];
              switch (res["code"]) {
                case 1:
                  this.RecordOperation("删除用户", 1, data_info);
                  this.success();
                  this.gridData = [];
                  this.loading = true;
                  this.update_agGrid();
                  this.loading = false;
                  break;
                default:
                  var err_date = res["message"]
                  this.RecordOperation("删除用户", 0, String(err_date))
                  this.danger();
                  break;
              }
            })
            throw 'error, 删除失败！'
          
          }catch(err){
          }
        }
      })

    }
  }
  edit(active_data?){
    console.log("编辑用户:",active_data);
    var rowdata;
    if(active_data){
      rowdata = active_data;
    }else{
      rowdata = this.agGrid.getselectedrows();
    }
    switch (rowdata.length) {
      case 1:
        this.dialogService.open(UserEmployeeComponent, {closeOnBackdropClick: false,context: { rowdata: JSON.stringify(rowdata[0])} }).onClose.subscribe(istrue=>{
          if(istrue){
            this.gridData = [];
            this.loading = true;
            this.update_agGrid();
            this.loading = false;
          }
        })
        break;
      default: // EditDelTooltipComponent
        this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `请选择一行数据！`}} ).onClose.subscribe(
          istrue=>{
            // console.log("----name-----", name)
          }
        );
        break;
    }


  }
  query(){
    // loginname
    var loginname = $("#employeenumber").val();
    if (loginname != ""){
      console.log("button 搜索按钮", loginname, "--");
      var columns = {
        offset: 0, 
        limit: 20,
        loginname: loginname
      }
      this.gridData = [];
      this.loading = true;
      this.http.callRPC('employee', 'sys_search_employee', columns).subscribe(result=>{
        var res = result['result']['message'][0];
        this.loading = false;
        if(res["code"]===1){
          var message = res["message"];
          this.gridData.push(...message)
          this.tableDatas.rowData = this.gridData;
          var totalpagenumbers = res['numbers']? res['numbers'][0]['numbers']: '未得到总条数';
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
          this.RecordOperation("搜索", 1, '搜索用户(域账号):' + loginname);
          if (message.length < 1){
            this.searchdanger(loginname)
          }
        }else{
          var data_info = res["message"];
          this.RecordOperation("搜索", 0, '搜索用户(域账号):' + String(data_info));
        }
      })
      
    }
  }

  import(){
    var input = document.getElementById("import");
    // js执行点击input
    input.click();
  }
  download(title){
    this.agGrid.download(title);
  }
  refresh_table(){
    $("#employeenumber").val('')
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    this.inttable();
    this.refresh = false;
  }

  
  // 初始化table
  inttable(event?, loginname?){
    var offset;
    var limit;
    console.log("event------------------------------------------------", event);
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
    }else{
      offset = 0;
      limit = 20;
    }
    // 得到员工信息！
    var columns = {
      offset: offset, 
      limit: limit,
      loginname: loginname
    }
    
    this.http.callRPC(this.TABLE, this.METHOD, columns).subscribe((result)=>{
      console.log("tabledata: ", result)
      var tabledata = result['result']['message'][0]
      console.log("tabledata", tabledata);
      this.loading = false;
      if(tabledata["code"] === 1){
        var message = tabledata["message"];
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = tabledata['numbers']? tabledata['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        this.RecordOperation('查看', 1,  "用户管理")
      }else{
        this.RecordOperation('查看', 0, "用户管理")
      }
    })


  }

  // 更新数据
  update_agGrid(event?, loginname?){
    var offset;
    var limit;
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
    }else{
      offset = 0;
      limit = 20;
    }
    var columns = {
      offset: offset, 
      limit: limit,
      loginname: loginname
    }
    this.http.callRPC(this.TABLE, this.METHOD, columns).subscribe((result)=>{
      console.log("update----------------->tabledata: ", result)
      var tabledata = result['result']['message'][0]
      console.log("tabledata", tabledata);
      if (tabledata["code"] === 1){
        console.log("update 更新成功！");
        // 发布组件，编辑用户的组件
        var message = tabledata["message"];
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = tabledata['numbers']? tabledata['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
        this.RecordOperation('更新', 1, "用户管理")
      }else{
        // 更新tabel失败！
        console.log("更新tabel失败！", tabledata);
        this.RecordOperation('更新', 0, "用户管理")
      }
    })
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event){
    console.log("页码改变的回调", event);
    this.loading = true;
    this.inttable(event);
  }

  // ----------------------------导入---------------------------
  onFileChange(evt: any){
    const target: DataTransfer = <DataTransfer>(evt.target);
    console.log("导入：---------------------------", target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.importdata = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      // console.log("importdata: ", this.importdata); // 这是读取的数据转为json

      this.analysis_sheet_to_json_to_ng2(this.importdata)
    };
    reader.readAsBinaryString(target.files[0]);

  }

  // 将sheet_json转换为smart-table 数据格式！ 
  analysis_sheet_to_json_to_ng2(importdata){
    var rowData_list = importdata.slice(1,importdata.length);
    console.log("导入-----rowData_list---->", rowData_list)
    var excel_title = importdata.slice(0,1)[0];
    console.log("rowData_list----excel 除了表头的数据>", rowData_list)
    console.log("excel_title---- excel的表头>", excel_title)
    var ag_Grid_columns = this.tableDatas.columnDefs.slice(0, excel_title.length);
    console.log("ag_Grid_columns--------->ag_Grid_columns 的表头", ag_Grid_columns, "\n")
    var agGridTitle = [];
    var noexist_title = [];
    for (let index = 0; index < ag_Grid_columns.length; index++) {
      const agitem = ag_Grid_columns[index];
      const exitem = excel_title[index];

      if (agitem.headerName === exitem){
        agGridTitle.push(agitem.field);
      }else{
        console.log("字段不一致", "agTitle != exetitle", agitem.headerName, '!=', exitem);
        noexist_title.push(agitem.headerName)
      }
    }

    console.log("agGridTitle----->", agGridTitle);
    console.log("noexist_title----->", noexist_title);

    if (noexist_title.length > 0){
      this.importdanger(noexist_title);
    }else{
      var rowData = []; // rowData 就是table需要的source
      rowData_list.forEach(element => {
        var item = {};
        if(element.length != 0){
          for (let index = 0; index < element.length; index++) {
            item[agGridTitle[index]] = element[index];
          }
          rowData.push(item);
        }
        
      });
      console.log("rowData---->", rowData);
      var verify_err = [];
      var verify_after = this.verify_rowdatas(rowData, verify_err);  // 验证后的数据 得到的是验证的 错误信息！

      console.log("----------------------------------------------------------验证后的数据 err", verify_after);
      
      if (verify_after.length > 0){
        this.verify_import(verify_after);
      }else{
        try{
          // 插入数据库之前 处理数据
          var datas = this.option_table_before(rowData)
          console.log("插入数据库之前 处理数据---->", datas);
          // 将导入的数据存入数据库
          this.dev_insert_device(datas).subscribe(result=>{
            if (result){
              // 将 rowData 显示到 agGrid中
              this.gridData = [];
              this.loading = true;
              this.update_agGrid();
              this.loading = false;
              // this.tableDatas.rowData = rowData
              // this.agGrid.update_agGrid(this.tableDatas);
            }
          });
    
    
        }catch(err){
          console.error("导入用户管理",err)
          this.RecordOperation("导入用户管理", 0, String(err))
        }
      }
    }
  }

  // 将导入的数据插入到数据库中
  dev_insert_device(datas){
    return new Observable((observale)=>{
      const table = "employee";
      const method = 'insert_employee_list';
      try {
        this.http.callRPC(table, method, datas).subscribe((result)=>{
          console.log("插入设备数据：", result)
          const status = result['result']["message"][0]['code'];
          if (status === 1){
            this.RecordOperation("导入", 1, "用户管理");
            this.importsuccess();
            observale.next(true)
          }else{
            var data_info = result['result']["message"][0]["message"];
            console.log("------------------->",data_info)
            this.RecordOperation("导入", 0, String(data_info));
            this.importSuccess(result['result']["message"][0]["message"])
            observale.next(false)
            throw `error,`+status
          }
        })
        
        
        
      }catch(err){
        console.log("err: ", err);
        this.RecordOperation("导入", 0, String(err));
        observale.next(false)
        // this.importdanger()
      }

    })

    
  }

  // 编辑修改前，处理一下选中的table数据
  option_table_before(datas){
    var after_datas_role: any[] =[];
    var active;
    datas.forEach(data => {
      var after_datas: any[] =[];
      switch (data["active"]) {
        case "是":
          active = 1;
          break;
          case "否":
            active = 0;
            break;
      };
      
      var after_data_: OptionEmployeeData = {
        active:active,
        department:data["department"],
        email:data["email"],
        employeeid:null,
        employeeno:data["employeeno"],
        lastupdatedby:data["lastupdatedby"],
        loginname:data["loginname"],
        name:data["name"],
        password:"3bf6e666ad793b1e2c69b3da472504d4", // 默认密码 
        phone:data["phoneno"],
      }
      after_datas.push(after_data_);
      var rids_list = this.handle_groups_and_roles(data, "role_name")
      var groups_list = this.handle_groups_and_roles(data, "groups_name")
      rids_list.forEach(item=>{
        after_datas.push(item);
      })
      groups_list.forEach(item=>{
        after_datas.push(item);
      })
      console.log("===============after_datas==========>",after_datas);
      after_datas_role.push(after_datas)
      console.log("===============rids_list==========>",rids_list);
    });
    return after_datas_role
  }
  // 处理 groups_name: "理化试验科"    role_name: "普通用户;执行方"
  handle_groups_and_roles(data, fild){
    // var groups_name = data["groups_name"].split(";");
      var names = [];
      if (data[fild]){
        names = data[fild].split(";");

      }
      // 得到用户组和角色
      if (fild != "groups_name"){
        var get_name = JSON.parse(localStorage.getItem("roles"));
        var key = "rids";
        var key_name = "role_name"
        var id = "rid"
      }else{
        var get_name = JSON.parse(localStorage.getItem("groups"));
        var key = "gids";
        var key_name = "groups"
        var id = "groupid"
      }
      var rids_list = [];
      var res = get_name;
      names.forEach(rn => {
        var rids = {};
        res.forEach(r => {
          if (r[key_name] === rn){
            rids[key] = r[id];
            rids_list.push(rids)
          }
        });
      });
      return rids_list
      console.log("names_____________", rids_list);
  }

  // 验证每一行数据！ 验证excel导入的数据！
  verify_rowdatas(rowDatas, verify_err){
    rowDatas.forEach(rowdata => {

      var employeeno = rowdata["employeeno"];
      var name = rowdata["name"];
      var loginname = rowdata["loginname"];
      var email = rowdata["email"];
      var role_name = rowdata["role_name"];
      var groups_name = rowdata["groups_name"];

      // 验证！ employeeno 员工编号
      var verify_employeeno = this.verify_employeeno(employeeno);
      if (verify_employeeno != 1){
        verify_err.push({err: verify_employeeno})
      }
      // 验证！ name 姓名
      var verify_name = this.verify_name(name);
      if (verify_name != 1){
        verify_err.push({err: verify_name})
      }
      // 验证！ loginname 域账号
      var verify_loginname = this.verify_loginname(loginname);
      if (verify_loginname != 1){
        verify_err.push({err: verify_loginname})
      }
      // 验证！ email 邮箱
      var verify_email = this.verify_email(email);
      if (verify_email != 1){
        verify_err.push({err: verify_email})
      }

      // 验证！ role_name 角色名称
      var verify_role_name = this.verify_role_name(role_name);
      if (verify_role_name != 1){
        verify_err.push({err: verify_role_name})
      }
      // 验证！ groups_name 用户组
      var verify_groups_name = this.verify_groups_name(groups_name);
      if (verify_groups_name != 1){
        verify_err.push({err: verify_groups_name})
      }

      
    });
    return verify_err;
  };

  // 验证 sql 注入、 特殊字符！
  verify_sql_str(data, title){
    var special_sql = AddEmployee['special_sql']["special_sql"];
    var special_str = AddEmployee['special_sql']["special_str"];
    var sql = special_sql.test(data);
    var str = special_str.test(data);
    if(sql){
      return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
    }
    if (!str){
      return title + "不能有特殊字符！"
    }
    return 1
  }

  // 验证 employeeno 员工编号
  verify_employeeno(employeeno){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(employeeno, '员工编号');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (employeeno.length > 20){
      return "员工编号最大长度不超过20！"
    }
    return 1 // 返回1，表示 通过验证！
  }
  // 验证 name 姓名
  verify_name(name){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(name, '姓名');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (name.length > 100){
      return "姓名最大长度不超过100！"
    }

    return 1 // 返回1，表示 通过验证！
  }
  // 验证 loginname 域账号
  verify_loginname(loginname){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(loginname, '域账号');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (loginname.length > 50){
      return "域账号最大长度不超过100！"
    }

    return 1 // 返回1，表示 通过验证！
  }

  // 验证 email 邮箱
  verify_email(email){
    // sql注入和特殊字符 special_str
    var rex = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/;
    if (!rex.test(email)){
      return "邮箱格式不匹配！"
    }
    if (email.length > 50){
      return "邮箱最大长度不超过100！"
    }

    return 1 // 返回1，表示 通过验证！
  }

  // 验证 role_name 角色名称
  verify_role_name(role_name){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(role_name, '角色名称');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (role_name.length > 50){
      return "角色名称最大长度不超过100！"
    }

    return 1 // 返回1，表示 通过验证！
  }

  // 验证 groups_name 用户组
  verify_groups_name(groups_name){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(groups_name, '用户组');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (groups_name){
      if (groups_name.length > 50){
        return "用户组最大长度不超过50！"
      }
    }
    return 1 // 返回1，表示 通过验证！
  }


  // 删除
  success(){
    this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"删除成功!"});
  }
  danger(){
    this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"删除失败!"});
  }
  searchdanger(data){
    this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"没要该域账号：" + data});
  }

  // 提示!
  importsuccess(){
    this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"导入成功!"});
  }
  importSuccess(data){
    this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'warning', conent:data});
  }

  importdanger(data){
    this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"缺少："+data.join(",")});
  }

  // 验证失败
  verify_import(data){
    this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"验证不通过："+JSON.stringify(data)});
  }
  // ----------------------------导入---------------------------




  // option_record
  RecordOperation(option, result,infodata){
    // option:操作类型, result:操作的结果, infodata:附加信息!
    console.warn("==============>", this.userinfo.getLoginName())
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicmethod.option_record(employeeid, result,transactiontype,info,createdby);
    }

  }

}
  // table 中每行数据类型！ 这是将table中的数据改回原始数据
  interface OptionEmployeeData {
    active:number,
    department:string,
    email:string,
    employeeid:number,
    employeeno:string,
    lastupdatedby:string,
    loginname:number,
    name:string,
    password:string,
    phone:string,
  }