import { Component, OnInit, ViewChild } from '@angular/core';



import { DeviceManageComponent as Add_Edit_DeviceManageComponent } from '../../../pages-popups/tongji/device-manage/device-manage.component';
import { EditDelTooltipComponent } from '../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';

declare let $;

import * as XLSX from 'xlsx';
type AOA = any[][];

import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { NbDialogService } from '@nebular/theme';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { Observable } from 'rxjs';


// 引入 eim台账 表单的验证
import { Device } from '../../../pages-popups/tongji/form_verification';
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { ActionComponent } from './action/action.component';
import { TranActiveComponent } from './tran-active/tran-active.component';
@Component({
  selector: 'ngx-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.scss']
})
export class DeviceManageComponent implements OnInit {

  @ViewChild("groups") groups_func:any;
  @ViewChild("eimdevicetpye") eimdevicetpye:any;
  @ViewChild("ag_Grid") agGrid:any;

  constructor(private publicservice: PublicmethodService, private dialogService: NbDialogService, private http: HttpserviceService, private userinfo: UserInfoService) { 
    // 初始化 科室/功能组(groups)，eim设备类型(eimdevicetpyedata)  dev_get_device_groups
    
    this.get_tree_selecetdata();

  }


  importdata: AOA = [[1,2], [3,4]];

  // 导出文件名
  filename;

  // 下拉框---科室/功能组
  departments = {
    name: "部门信息",
    placeholder: '科室/功能组',
    groups:[
      { title: '动力', datas: [{ name: '动力-1' },{ name: '动力-2' },{ name: '动力-3' },{ name: '动力-4' }] },
      { title: '资产', datas: [{ name: '资产-1' },{ name: '资产-2' },{ name: '资产-3' },{ name: '资产-4' }] },
      { title: '新能源', datas: [{ name: '新能源-1' },{ name: '新能源-2' },{ name: '新能源-3' },{ name: '新能源-4' }] },
    ]
  };
  // 科室/功能组 groups
  groups = {
    placeholder: "请选择科室/功能组",
    datas: [
      {
        id: 1,
        label: "动力总成技术中心"
      },
      {
        id: 2,
        label: "新能源"
      },
      {
        id: 3,
        label: "nvh"
      }
    ]
  }

  // groups_placeholder eimdevicetpye_placeholder
  groups_placeholder = "请选择科室/功能组";
  eimdevicetpye_placeholder = "请选择eim设备类别"


  // 下拉框---设备类型 eimdevicetpye
  eimdevicetpyedata = {
    placeholder: "请选择eim设备类别",
    name: '设备类型',
    datas: [
      { name: 'GT-2030-123' },
      { name: 'GT-2030-149' },
      { name: 'GT-2030-230' },
      { name: 'GT-2030-359' },
      { name: 'GT-2030-666' },
    ]
  }

  // 下拉框---资产编号
  assets = {
    placeholder: "请选择资产编号",
    name: '资产编号',
    datas: [
      { name: 'GT1918-1720TM' },
      { name: 'GT1917-1819TM' },
      { name: 'GT1916-1919TM' },
      { name: 'GT1915-2018TM' },
      { name: 'GT1914-2117TM' },
      { name: 'GT1913-2216TM' },
    ]
  }

  loading = false;  // 加载
  refresh = false; // 刷新tabel

  // 每一页展示多少条数据
  nzPageSize;

  // plv8请求
  querst(table: string, method: string, colmun: Object){
    return new Observable((observe)=>{
      this.http.callRPC(table, method, colmun).subscribe((result)=>{
        observe.next(result);
      })

    })
  }

  button; // 权限button
  active;  // aggrid 操作


  ngOnInit(): void {
    // agGrid
    var that = this;
    this.active = { field: 'action', headerName: '操作', cellRendererFramework: ActionComponent, pinned: 'right',resizable: true,flex: 1,
      cellRendererParams: {
        clicked: function(data: any) {
          if (data["active"]==='edit'){
            console.log("********************\n", data["data"])
            that.edit([data["data"]]);
          }else{
            that.del([data["data"]]);
          }
        }
      },
    }

    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    })




    // ===============agGrid

    this.inttable();
    // ===============agGrid
  }

  ngAfterViewInit(){
    this.tableDatas.columnDefs.push(
      this.active
    );
    

  }

  ngOnDestroy(){
    localStorage.removeItem("device_manage_agGrid");
  }


  // button按钮
  action(actionmethod){
    console.log("++++++++++++++++++++action(actionmethod)++++++++++++++++++++++++++++", actionmethod);
    var method = actionmethod.split(":")[1];
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
        this.importfile();
        break;
      case 'download':
        this.download('eim台账')
        break;
    }

  }

  // button add
  add(){
    console.log("button----add");
    this.dialogService.open(Add_Edit_DeviceManageComponent, { closeOnBackdropClick: false,context: { title: '添加设备', content:  'false'}} ).onClose.subscribe(name=>{
      if (name){
        this.gridData = [];
        this.loading = true;
        this.update_agGrid();
        this.loading = false;
      }
    })
  }

  // button del  -- dev_delete_device
  del(active_data?){
    // var rowdata = this.agGrid.getselectedrows();
    
    
    var rowdata;
    if (active_data){
      rowdata = active_data;
    }else{
      rowdata = this.agGrid.getselectedrows();
    };
    console.log("删除-eim台账  rowdata", rowdata);
    var rowdata_ = this.option_table_before(rowdata);
    console.log("删除-eim台账  rowdata_", rowdata_);

    if (rowdata_.length === 0){
      // 未选中
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false, context: { title: '删除设备提示', content:   `请选择要需要删除的的行数！`}} ).onClose.subscribe(
        name=>{
          console.log("----name-----", name);
        }
      );

    }else{
      // 选中多条 dev_delete_device_list
      var rowData = rowdata_;
      var text = rowdata_.length > 1 ? "这些": "这条";
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `确定要删除${text}数据吗？`, rowData: JSON.stringify(rowdata)} } ).onClose.subscribe(istrue=>{
        if (istrue){
          try {
            var data_info;
            var id_list = [];
            rowData.forEach(item => {
              id_list.push(item["devicename"])
            });
            var id_str = id_list.join(',');
            data_info  = '删除(eim台账):' + id_str;
            console.log("要删除的数据:", rowdata)

            var table = 'device';
            var method = 'dev_delete_device_list';
            this.http.callRPC(table, method, rowData).subscribe((result)=>{
              const status = result['result']['message'][0];
              switch (status["code"]) {
                case 1:
                  this.RecordOperation("删除(eim台账)", 1, data_info);
                  this.delsuccess();
                  this.gridData = [];
                  this.loading = true;
                  this.update_agGrid();
                  this.loading = false;
                  break;
              
                default:
                  var err_date = status["message"]
                  this.RecordOperation("删除(eim台账)", 0, String(err_date))
                  this.danger();
                  break;
              }
              throw 'error, 删除失败！'
            })
          }catch(err){
            this.deldanger()
          }
        }else{}
      })

      

    }
  }
  
  
  // button deit
  edit(active_data?){
    // var rowdata = this.agGrid.getselectedrows();
    
    var rowdata;
    if (active_data){
      rowdata = active_data;
    }else{
      rowdata = this.agGrid.getselectedrows();
    };
    var rowdata_ = this.option_table_before(rowdata)
    console.log("编辑-eim台账----agGrid-----rowdata",rowdata);
    if (rowdata.length === 0){
      // 未选中
      this.dialogService.open(EditDelTooltipComponent, { context: { title: '编辑设备提示', content:   `请选择要需要编辑的的行数！`}} ).onClose.subscribe(
        name=>{
          console.log("----name-----", name);
        }
        );
        
      }else if (rowdata.length === 1){
        // 选中一条
        console.log("选中一条", rowdata);
        console.log("编辑-eim台账----agGrid-----rowdata----处理后的",rowdata_);
      this.dialogService.open(Add_Edit_DeviceManageComponent, { closeOnBackdropClick: false, context: { title: '编辑设备提示', content:   `true`, rowData: JSON.stringify(rowdata_)}} ).onClose.subscribe(
        name=>{
          console.log("----name-----", name);
          if (name){
            this.gridData = [];
            this.loading = true;
            this.update_agGrid();
            this.loading = false;
          }
        }
      );
    }else{
      // 选中多条
      this.dialogService.open(EditDelTooltipComponent, { context: { title: '编辑设备提示', content:   `请选择要一条需要编辑的的行数！`}} ).onClose.subscribe(
        name=>{
          console.log("----name-----", name);
        }
      );
    }
  }

  refresh_table(){
    $("#employeenumber").val('')
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    this.inttable();
    this.refresh = false;
  }

  // 得到下拉框的数据
  get_tree_selecetdata(){
    var columns = {
      employeeid:this.userinfo.getEmployeeID(),
    }
    this.http.callRPC("deveice","dev_get_device_groups",columns).subscribe(result=>{
      var res = result["result"]["message"][0]
      console.log("得到下拉框的数据---------------->", res)
      if (res["code"] === 1){
        var groups = res["message"][0]["groups"];
       
        this.groups_func.init_select_tree(groups);
        // var eimdevicetpyedata = res["message"][0]["type"];
        // this.eimdevicetpye.init_select_tree(eimdevicetpyedata);
      }
    })
  }


  // 导入文件
  importfile(){
    var input = document.getElementById("import");
    // js执行点击input
    input.click();
  }

  // 搜索按钮
  query(){
    var devicename = $("#employeenumber").val();// 设备名称
    var groups = this.groups_func.getselect();// 科室/功能组
    var eimdevicetpye = this.eimdevicetpye.getselect(); // eim设备类型
    console.log("<------------搜索----------->", devicename, groups, eimdevicetpye)
    this.RecordOperation("搜索(eim台账)", 1, '');
  }

  // 导出文件
  download(title){
    this.agGrid.download(title);
  };

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
    console.log("这是导入的Excel的原始数据！", importdata, "\n")
    var rowData_list = importdata.slice(1,importdata.length);
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

    if (noexist_title.length >0 ){
      this.importdanger(noexist_title);
    }else{
      var rowData = []; // rowData 就是table需要的source
      rowData_list.forEach(element => {  // rowData_list excel 除了第一列字段，其它的数据！
        var item = {};
        if(element.length != 0){
          for (let index = 0; index < element.length; index++) {
            item[agGridTitle[index]] = element[index];  
          }
          rowData.push(item);
        }
      });
  
      console.log("rowData---->", rowData); // 对rowData数据 进行验证！
      var verify_err = [];
      var verify_after = this.verify_rowdatas(rowData, verify_err);  // 验证后的数据 得到的是验证的 错误信息！
      console.log("----------------------------------------------------------验证后的数据 err", verify_after);
      if (verify_after.length > 0){
        this.verify_import(verify_after);
        this.RecordOperation("导入(eim台账)", 0,'导入excel表');

      }else{
        // 插入数据库之前 处理数据
        var datas = this.option_table_before(rowData)
        console.log("插入数据库之前 处理数据---->", datas);
        // 将导入的数据存入数据库
        // this.loading = true
        this.dev_insert_device(datas).subscribe(result=>{
          if (result){
            // 将导入的数据展示在table中
            // var after_datas = this.show_table_before(rowData)
            this.gridData = [];
            this.loading = true;
            this.update_agGrid();// 告诉组件刷新！
            this.loading = false;
            this.RecordOperation("导入(eim台账)", 1,'导入excel表');
          }
        });
    

      }
    }



  }

 
  // ----------------------------导入---------------------------



  // 将导入的数据插入到数据库中
  dev_insert_device(datas){
    return new Observable((observale)=>{
      const table = "device";
      const method = 'dev_insert_device_list';
      try {
        this.http.callRPC(table, method, datas).subscribe((result)=>{
          console.log("插入设备数据：", result)
          const status = result['result']['message'][0]["code"];
          if (status === 1){
            this.RecordOperation("导入", 1, "eim台账");
            this.success()
            observale.next(true)
          }else{
              var data_info = result['result']["message"][0]["message"];
              console.log("------------------->",data_info)
              this.RecordOperation("导入", 0, String(data_info));
              this.importSuccess(result['result']["message"][0]["message"])
              observale.next(false)
            throw 'error, 删除失败！'
          }
        })
        
        this.loading = false
        
      }catch(err){
        this.RecordOperation("导入", 0, String(err));
        observale.next(false)
        this.danger()
      }
    })
  }

  // 在展示表格前，处理一下数据
  show_table_before(datas){
    if (datas.length >0){
      console.log("datas---->", datas)
      console.log("datas[0]---->", datas[0].devicename)
      var after_datas: DeviceData[] =[];
      var type;
      var devicestatus;
      datas.forEach(data => {
        switch (data["type"]) {
          case 1:
            type = "台架设备";
            break;
            case 2:
              type = "移动资产";
              break;
            case 3:
              type = "举升机";
            break;
            case 402:
              type = "其它设备";
            break;
        };
        switch (data["devicestatus"]) {
          case 1:
            devicestatus = "在用";
            break;
            case 2:
              devicestatus = "封存";
              break;
            case 3:
              devicestatus = "停用";
            break;
            case 4:
              devicestatus = "闲置";
            break;
            case 402:
              devicestatus = "其它";
            break;
        }
        var after_data: DeviceData = {
          id: data.id,
          devicename:data.devicename,
          deviceno:data.deviceno,
          type:type,
          active:data.active,
          assetno:data.assetno,
          factoryno:data.factoryno,
          deviceid:data.deviceid,
          purchaseon:data.purchaseon,
          supplier:data.supplier,
          location:data.location,
          department:data.department,
          groups:data.groups,
          belonged:data.belonged,
          devicestatus:devicestatus,
          createdby:data.createdby,
          createdon:data.createdon
        }
        after_datas.push(after_data)
      });
      return after_datas

    }
    
    
    return datas
  };

  // 编辑修改前，处理一下选中的table数据
  option_table_before(datas){
    var after_datas: OptionDeviceData[] =[];
    var type;
    var devicestatus;
    datas.forEach(data => {
      switch (data["type"]) {
        case "台架设备":
          type = 1;
          break;
          case "移动资产":
            type = 2;
            break;
          case "举升机":
            type = 3;
          break;
          default:
            type = 402;
          break;
      };
      switch (data["devicestatus"]) {
        case "在用":
          devicestatus = 1;
          break;
          case "封存":
            devicestatus = 2;
            break;
          case "停用":
            devicestatus = 3;
          break;
          case "闲置":
            devicestatus = 4;
            break;
          default:
            devicestatus = 402;
          break;
      }

      var after_data: OptionDeviceData = {
        id: data.id,
        devicename:data.devicename,
        deviceno:data.deviceno,
        type:type,
        active:data.active === '是'? 1: 0,
        assetno:data.assetno,
        factoryno:data.factoryno,
        deviceid:data.deviceid,
        purchaseon:data.purchaseon,
        supplier:data.supplier,
        location:data.location,
        department:data.department,
        groups:data.groups,
        belonged:data.belonged,
        devicestatus:devicestatus,
        createdby:data.createdby,
        createdon:data.createdon
      }
      after_datas.push(after_data)
    });
    return after_datas
  }

  // 验证每一行数据！ 验证excel导入的数据！
  verify_rowdatas(rowDatas, verify_err){
    rowDatas.forEach(rowdata => {

      var active = rowdata["active"];
      var assetno = rowdata["assetno"];
      var belonged = rowdata["belonged"];
      var createdby = rowdata["createdby"];

      // var createdon = rowdata["createdon"];

      var department = rowdata["department"];
      var deviceid = rowdata["deviceid"];
      var devicename = rowdata["devicename"];
      var deviceno = rowdata["deviceno"];
      var devicestatus = rowdata["devicestatus"];
      var factoryno = rowdata["factoryno"];
      var groups = rowdata["groups"];
      var location = rowdata["location"];

      // var purchaseon = rowdata["purchaseon"];

      var supplier = rowdata["supplier"];
      var type = rowdata["type"];

      // 验证！ devicename
      var verify_devicename = this.verify_devicename(devicename);
      if (verify_devicename != 1){
        verify_err.push({err: verify_devicename})
      }
      // 验证！ deviceno
      var verify_deviceno = this.verify_deviceno(deviceno);
      if (verify_deviceno != 1){
        verify_err.push({err: verify_deviceno})
      }
      // 验证！ assetno
      var verify_assetno = this.verify_assetno(assetno);
      if (verify_assetno != 1){
        verify_err.push({err: verify_assetno})
      }
      // 验证！ factoryno
      var verify_factoryno = this.verify_factoryno(factoryno);
      if (verify_factoryno != 1){
        verify_err.push({err: verify_factoryno})
      }
      // 验证！ supplier
      var verify_supplier = this.verify_supplier(supplier);
      if (verify_supplier != 1){
        verify_err.push({err: verify_supplier})
      }
      // 验证！ location
      var verify_location = this.verify_location(location);
      if (verify_location != 1){
        verify_err.push({err: verify_location})
      }
      // 验证！ department
      var verify_department = this.verify_department(department);
      if (verify_department != 1){
        verify_err.push({err: verify_department})
      }
      // 验证！ groups
      var verify_groups = this.verify_groups(groups);
      if (verify_groups != 1){
        verify_err.push({err: verify_groups})
      }
      // 验证！ belonged
      var verify_belonged= this.verify_belonged(belonged);
      if (verify_belonged != 1){
        verify_err.push({err: verify_belonged})
      }
      // 验证！ createdby
      var verify_createdby= this.verify_createdby(createdby);
      if (verify_createdby != 1){
        verify_err.push({err: verify_createdby})
      }
    });
    return verify_err;
  };

  // 验证 sql 注入、 特殊字符！
  verify_sql_str(data, title){
    var special_sql = Device['special_sql']["special_sql"];
    var special_str = Device['special_sql']["special_str"];
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

  // 验证 devicename 设备名称
  verify_devicename(devicename){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(devicename, '设备名称');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (devicename.length > 20){
      return "设备名称最大长度不超过20！"
    }
    return 1 // 返回1，表示 通过验证！
  }
  // 验证 deviceno 设备编号 
  verify_deviceno(deviceno){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(deviceno, '设备编号');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (new RegExp(Device["deviceno"]).test(deviceno)){
      if (deviceno.length > 100){
        return "设备编号最大长度不超过100！"
      }
      return "设备编号不能有中文！"
    }
    return 1 // 返回1，表示 通过验证！
  }
  // 验证 assetno 资产编号
  verify_assetno(assetno){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(assetno, '资产编号');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (new RegExp(Device["assetno"]).test(assetno)){
      if (assetno.length > 50){
        return "资产编号最大长度不超过100！"
      }
      return "资产编号不能有中文！"
    }
    return 1 // 返回1，表示 通过验证！
  }
  // 验证 factoryno 出厂编号
  verify_factoryno(factoryno){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(factoryno, '出厂编号');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (new RegExp(Device["factoryno"]).test(factoryno)){
      if (factoryno.length > 50){
        return "出厂编号最大长度不超过100！"
      }
      return "出厂编号不能有中文！"
    }
    return 1 // 返回1，表示 通过验证！
  }
  // 验证 supplier 供应商
  verify_supplier(supplier){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(supplier, '供应商');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (supplier.length > 50){
      return "供应商最大长度不超过50！"
    }
    return 1 // 返回1，表示 通过验证！
  }
  // 验证 location 存放地点
  verify_location(location){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(location, '存放地点');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (location.length > 50){
      return "存放地点最大长度不超过50！"
    }
    return 1 // 返回1，表示 通过验证！
  }
  // 验证 department 使用部门
  verify_department(department){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(department, '使用部门');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (department.length > 50){
      return "使用部门最大长度不超过50！"
    }
    return 1 // 返回1，表示 通过验证！
  }
  // 验证 groups 科室
  verify_groups(groups){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(groups, '科室');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (groups.length > 50){
      return "科室最大长度不超过50！"
    }
    return 1 // 返回1，表示 通过验证！
  }
  // 验证 belonged 归属人
  verify_belonged(belonged){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(belonged, '归属人');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (belonged.length > 50){
      return "归属人最大长度不超过50！"
    }
    return 1 // 返回1，表示 通过验证！ 
  }
  // 验证 createdby 创建人
  verify_createdby(createdby){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(createdby, '创建人');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (createdby.length > 50){
      return "创建人最大长度不超过50！"
    }
    return 1 // 返回1，表示 通过验证！
  }




  // 展示状态
  success(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"导入成功!"});
  }
  danger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"导入失败!"});
  }
  importdanger(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"缺少："+data.join(",")});
  }
  verify_import(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"验证不通过："+JSON.stringify(data)});
  }
  delsuccess(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"删除成功!"});
  }
  deldanger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"删除失败!"});
  }

  importSuccess(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'warning', conent:data});
  }



  // =================================================agGrid

  tableDatas = {
    totalPageNumbers: 0, // 总页数
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度
      { field: 'devicename', headerName: '设备名称', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true, pinned: 'left'},
      { field: 'deviceno', headerName: 'EIM设备编号',  resizable: true, minWidth: 10},
      { field: 'type', headerName: '设备类型', resizable: true},
      { field: 'deviceid', headerName: '设备编号', resizable: true, minWidth: 10}, // 自定义设备编号！
      { field: 'department', headerName: '使用部门', resizable: true, minWidth: 10},
      { field: 'groups', headerName: '科室', resizable: true, minWidth: 10},
      { field: 'belonged', headerName: '归属人', resizable: true, minWidth: 10},
      { field: 'active', headerName: '是否启用', resizable: true, cellRendererFramework: TranActiveComponent,},
      { field: 'assetno', headerName: '资产编号', resizable: true, minWidth: 10},
      { field: 'devicestatus', headerName: '资产状态', resizable: true,minWidth: 50,pinned: 'left',
        cellStyle: function(params){
          var value = params.value;
          switch (value) {
            case '停用':
              return {
                border: 'rgb(238, 240, 238) 1px solid',
                background: 'rgb(199, 199, 199)',
              }
              break;
            case '闲置':
              return {
                border: 'rgb(216, 236, 162) 1px solid',
                background: 'rgb(171, 250, 92)',
              }
            
              break;
            case '封存':
              return {
                border: 'rgb(228, 144, 129) 1px solid',
                background: 'rgb(247, 115, 39)',
              }
              break;
            case '在用':
              return {
                border: 'green 1px solid',
                background: 'rgb(48, 248, 48)'
              }
              break;
            default:
              return {
                border: 'rgb(203, 238, 164) 1px solid',
                background: 'rgb(203, 238, 164)',
              }
              break;
          }
        }
      
      },
      { field: 'factoryno', headerName: '出厂编号', resizable: true, minWidth: 10},
      { field: 'purchaseon', headerName: '购置日期', resizable: true, minWidth: 10},
      { field: 'supplier', headerName: '供应商', resizable: true, flex: 1},
      { field: 'location', headerName: '存放地点', resizable: true, minWidth: 10},
      // =================
      { field: 'createdby', headerName: '创建人', resizable: true},
      { field: 'createdon', headerName: '创建时间', resizable: true},
    ],
    rowData: [ // data
    ]
  };

  private gridData = [];
  
  inttable(event?){
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
    var columns = {
      offset: offset, 
      limit: limit,
      employeeid: this.userinfo.getEmployeeID(),
      eimdevicetype: [], // 设备类型，可选
      grops: []          // 科室/功能组，可选
    }
    this.http.callRPC('device', 'dev_get_device_limit', columns).subscribe((result)=>{
      var tabledata = result['result']['message'][0]
      console.log("dev_get_device---------------------------->>>", tabledata);
      this.loading = false;
      if (tabledata["code"]===1){
        var message = result["result"]["message"][0]["message"];
        
        var after_datas = this.show_table_before(message);
        this.gridData.push(...after_datas)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = tabledata['numbers']? tabledata['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        this.RecordOperation('查看', 1,  "eim台账")
      }else{this.RecordOperation('查看', 0,  "eim台账")}
    })
  }

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
    var columns = {
      offset: offset, 
      limit: limit,
    }
    this.http.callRPC('device', 'dev_get_device_limit', columns).subscribe((result)=>{
      var tabledata = result['result']['message'][0]
      console.log("device---", tabledata);
      this.loading = false;
      if (tabledata["code"] === 1){
        var message = result["result"]["message"][0]["message"];
        var after_datas = this.show_table_before(message);
        this.gridData.push(...after_datas)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = tabledata['numbers']? tabledata['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
        this.RecordOperation('更新', 1, "eim台账");
      }else{this.RecordOperation('更新', 0, "eim台账");}

    })
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event){
    console.log("页码改变的回调", event);
    this.loading = true;
    this.inttable(event);
  }


  // =================================================agGrid


  // option_record
  RecordOperation(option, result,infodata){
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(employeeid, result,transactiontype,info,createdby);
    }

  }

}



// table 中每行数据类型！这是展示table需要的数据
interface DeviceData {
  id: number,
  devicename:string,
  deviceno:string,
  type:string,
  active:string,
  assetno:string,
  factoryno:string,
  deviceid:number,
  purchaseon:string,
  supplier:string,
  location:string,
  department:string,
  groups:string,
  belonged:string,
  devicestatus:string,
  createdby:string,
  createdon:string
}

// table 中每行数据类型！ 这是将table中的数据改回原始数据
interface OptionDeviceData {
  id: number,
  devicename:string,
  deviceno:string,
  type:number,
  active:number,
  assetno:string,
  factoryno:string,
  deviceid:number,
  purchaseon:string,
  supplier:string,
  location:string,
  department:string,
  groups:string,
  belonged:string,
  devicestatus:number,
  createdby:string,
  createdon:string
}
