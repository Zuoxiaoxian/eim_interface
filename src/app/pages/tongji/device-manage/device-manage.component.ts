import { Component, OnInit, ViewChild } from '@angular/core';

import { DEVICE_MANAGE_SETTINGS } from '../tongji_tablesettings';

import { menu_button_list, device_action } from '../../../appconfig';

import { DeviceManageComponent as Add_Edit_DeviceManageComponent } from '../../../pages-popups/tongji/device-manage/device-manage.component';
import { EditDelTooltipComponent } from '../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';


import * as XLSX from 'xlsx';
type AOA = any[][];

import {LocalDataSource} from "@mykeels/ng2-smart-table";
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { NbDialogService } from '@nebular/theme';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { Observable } from 'rxjs';


// 引入 设备管理 表单的验证
import { Device } from '../../../pages-popups/tongji/form_verification';
import { UserInfo } from 'os';
import { UserInfoService } from '../../../services/user-info/user-info.service';
@Component({
  selector: 'ngx-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.scss']
})
export class DeviceManageComponent implements OnInit {

  @ViewChild("departmentselect") departmentselect:any;
  @ViewChild("device_tpye") device_tpye:any;
  @ViewChild("asset_number") asset_number:any;
  @ViewChild("mytable") mytable:any;
  @ViewChild("ag_Grid") agGrid:any;

  constructor(private publicservice: PublicmethodService, private dialogService: NbDialogService, private http: HttpserviceService, private userinfo: UserInfoService) { 


  }


  importdata: AOA = [[1,2], [3,4]];

  // 导出文件名
  filename;

  // 下拉框---部门
  departments = {
    name: "部门信息",
    placeholder: '请选择部门',
    groups:[
      { title: '动力', datas: [{ name: '动力-1' },{ name: '动力-2' },{ name: '动力-3' },{ name: '动力-4' }] },
      { title: '资产', datas: [{ name: '资产-1' },{ name: '资产-2' },{ name: '资产-3' },{ name: '资产-4' }] },
      { title: '新能源', datas: [{ name: '新能源-1' },{ name: '新能源-2' },{ name: '新能源-3' },{ name: '新能源-4' }] },
    ]
  };

  // 下拉框---设备类型
  devicetpye = {
    placeholder: "请选择设备类型",
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

  source:LocalDataSource

  // 设备监控table数据
  device_manage_table_data = {
    settings: DEVICE_MANAGE_SETTINGS,
    source: new LocalDataSource(),
  }

  // 前端要展示的button 主要是：增、删、改
  buttons;

  // 前端要展示的buttons 主要是：搜索、导入导出
  buttons2;

  // 要删除、修改的行数据 
  rowdata = [];

  // 每一页展示多少条数据
  nzPageSize;

  // ======================agGrid
  
  isloding = false;
  // ======================agGrid
  // plv8请求
  querst(table: string, method: string, colmun: Object){
    return new Observable((observe)=>{
      this.http.callRPC(table, method, colmun).subscribe((result)=>{
        observe.next(result);
      })

    })
  }


  ngOnInit(): void {
    this.getbuttons();



    // ===============agGrid

    this.getetabledata();
    // ===============agGrid
  }

  ngAfterViewInit(){
    // document.getElementsByClassName('devicename')['0'].style.width ='10px'
    // document.getElementsByClassName('devicename')['0'].style.border ='1px red solid'
    // document.getElementsByClassName('devicename')['0'].style.overflow ='hidden'
    // var devicename = document.getElementsByClassName('devicename');
    // console.log('--devicename--', devicename)
  }

  ngOnDestroy(){
    localStorage.removeItem("device_manage_agGrid");
  }





  // 得到buttons----------------------------------------------------------
  getbuttons(){
    // 根据menu_item_role得到 该页面对应的 button！
    var button_list = localStorage.getItem(menu_button_list)? JSON.parse(localStorage.getItem(menu_button_list)): false;
    if (button_list){
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log(button_list)
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      this.publicservice.get_current_pathname().subscribe(res=>{
        console.log("get_current_pathname   ", res);
        var currentmenuid = res["id"];
        var buttons = [];
        // 分离搜索、导入、导出
        var buttons2 = [];
        
        button_list.forEach(button => {
          if (currentmenuid === button["parentid"]){
            var method = button["permission"].split(":")[1];
            if ( method === "query" || method === "import" || method === "download" ){
              buttons2.push(button)
            }else{
              buttons.push(button);
            }
          }
        });

        // 对button进行排序 根据 title(导入、导出), 或者是 permission(menu:import)
        buttons2.forEach(b=>{
          switch (b["permission"].split(":")[1]) {
            case "query":
              b["order_"] = 0;
              break;
            case "import":
              b["order_"] = 1;
              break;
            case "download":
              b["order_"] = 2;
              break;

          }
        })

        // -----排序
        buttons2.sort(function(item1, item2){
          return item1["order_"] - item2["order_"]
        });

        this.buttons = buttons;
        this.buttons2 = buttons2;

        console.log("-----------buttons2--------",buttons2);
        console.log("-----------buttons--------",buttons);
        

        // ====================================================
        var isactions = {};
        buttons.forEach(button=>{
          var mdthod = button["permission"].split(":")[1];
          switch (mdthod) {
            case "add":
              break;
            case "del":
              isactions["del"] = true
              break;
            case "edit":
              isactions["edit"] = true
              break;
            
          }
        })

        if (!isactions["edit"]){
          isactions["edit"] = false
        }
        if (!isactions["del"]){
          isactions["del"] = false
        }
        localStorage.setItem(device_action, JSON.stringify(isactions));
        console.log("_________________________________-isactions---------________________",isactions)
      })
    }
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
        this.download('设备管理')
        break;
    }

  }

  // button add
  add(){
    console.log("button----add");
    this.dialogService.open(Add_Edit_DeviceManageComponent, { closeOnBackdropClick: false,context: { title: '添加设备', content:  'false'}} ).onClose.subscribe(name=>{
      if (name){
        this.isloding = true;
        this.updatetabledata();
        this.RecordOperation("添加(设备管理)", 1,'');
      }
    })
  }

  // button del  -- dev_delete_device
  del(){
    console.log("删除-设备管理", this.rowdata);
    var rowdata = this.agGrid.getselectedrows();
    var rowdata_ = this.option_table_before(rowdata)

    if (rowdata_.length === 0){
      // 未选中
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false, context: { title: '删除设备提示', content:   `请选择要需要删除的的行数！`}} ).onClose.subscribe(
        name=>{
          console.log("----name-----", name);
        }
      );

    }else if (rowdata_.length === 1){
      // 选中一条
      var table = 'device';
      var method = 'dev_delete_device';
      var colums = rowdata_[0];
      this.http.callRPC(table, method, colums).subscribe((result)=>{
        
        const status = result['result']['message'][0];
        if (status === 1){
          this.delsuccess()
          this.isloding = true;
          this.updatetabledata();
          this.RecordOperation("删除(设备管理)", 1,"deviceno:"+colums["deviceno"] + ','+ "assetno:" + colums["assetno"]);
        }else{
          this.deldanger()
          this.RecordOperation("删除(设备管理)", 0,"deviceno:"+colums["deviceno"] + ','+ "assetno:" + colums["assetno"]);
        }
      })
    }else{
      // 选中多条
      var rowData = rowdata_;
      try {
        rowData.forEach(colums => {
          var table = 'device';
          var method = 'dev_delete_device';
          this.http.callRPC(table, method, colums).subscribe((result)=>{
            const status = result['result']['message'][0];
            if (status === 1){
              this.RecordOperation("删除(设备管理)", 1,"deviceno:"+colums["deviceno"] + ','+ "assetno:" + colums["assetno"]);
            }else{
              this.RecordOperation("删除(设备管理)", 0,"deviceno:"+colums["deviceno"] + ','+ "assetno:" + colums["assetno"]);
              throw 'error, 删除失败！'
            }
          })
        });
        // location.reload();
        this.isloding = true;
        this.updatetabledata();
        this.delsuccess()
      }catch(err){
        this.deldanger()
      }

      

    }
  }
  
  
  // button deit
  edit(){
    console.log("编辑-设备管理", this.rowdata);
    var rowdata = this.agGrid.getselectedrows();
    var rowdata_ = this.option_table_before(rowdata)
    console.log("编辑-设备管理----agGrid-----rowdata",rowdata);
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
        console.log("编辑-设备管理----agGrid-----rowdata----处理后的",rowdata_);
      this.dialogService.open(Add_Edit_DeviceManageComponent, { closeOnBackdropClick: false, context: { title: '编辑设备提示', content:   `true`, rowData: JSON.stringify(rowdata_)}} ).onClose.subscribe(
        name=>{
          console.log("----name-----", name);
          if (name){
            this.isloding = true;
            this.updatetabledata();
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

  // 点击行，选中行
  runParent(rowdata){
    this.rowdata = this.option_table_before(rowdata["selected"]);
    
    console.log("---子组件传值---", this.rowdata);
  }


  // 导入文件
  importfile(){
    var input = document.getElementById("import");
    // js执行点击input
    input.click();
  }

  // 搜索按钮
  query(){
    var departmentselect_data = this.departmentselect.getselect();
    var device_tpye_data = this.device_tpye.getselect();
    var asset_number_data = this.asset_number.getselect();
    console.log("<------------搜索----------->", departmentselect_data, device_tpye_data,asset_number_data)
    this.RecordOperation("搜索(设备管理)", 1, '');
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
        this.RecordOperation("导入(设备管理)", 0,'导入excel表');

      }else{
        // 插入数据库之前 处理数据
        var datas = this.option_table_before(rowData)
        console.log("插入数据库之前 处理数据---->", datas);
        // 将导入的数据存入数据库
        // this.isloding = true
        // this.dev_insert_device(datas);
    
        // 将导入的数据展示在table中
        var after_datas = this.show_table_before(rowData)
        this.gridData = [];
        this.gridData.push(...after_datas)
        this.tableDatas.rowData = this.gridData;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！

        this.RecordOperation("导入(设备管理)", 1,'导入excel表');

      }
    }



  }

 
  // ----------------------------导入---------------------------



  // 将导入的数据插入到数据库中
  dev_insert_device(datas){
    const table = "device";
    const method = 'dev_insert_device';
    try {
      datas.forEach(rd => {
        this.http.callRPC(table, method, rd).subscribe((result)=>{
          console.log("插入设备数据：", result)
          const status = result['result']['message'][0];
          if (status === 1){
          }else{
            throw 'error, 删除失败！'
          }
        })
      });
      // setTimeout(() => {
      //   location.reload();
      // }, 1000);
      this.isloding = false
      this.success()
    }catch(err){
      console.log("err: ", err)
      this.danger()
    }

    
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
        active:data.active === "是"? 1: 0,
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
  // 分页
  nzpageindexchange(event){
    console.log("用户--分页：", event);
    var offset = (event.current - 1) * event.nzPageSize; 
    console.log("offset: limit", offset, event.nzPageSize)
    // this.getsecurity('employee', 'get_employee_limit', {offset:offset,limit:event.nzPageSize});
  
    // this.querst(table, methond, colmun).subscribe(res=>{
    //   console.log("-----------------res", res)
    //   const rowData = res['result']['message'][0];
    //   if (rowData.length > 0){
    //     var after_datas = this.show_table_before(rowData);
    //     // 根据id排序
    //     after_datas.sort(function(data1,data2){return data1.id - data2.id});
    //     this.device_manage_table_data.source.load(after_datas);
    //   }
    // })
    // this.getsecurity('employee', 'get_employee_limit', {offset:0,limit:this.nzPageSize,numbers:0});
  }



  // =================================================agGrid

  tableDatas = {
    action: true,
    totalPageNumbers: 0, // 总页数
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度
      { field: 'devicename', headerName: '设备名称', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true, pinned: 'left'},
      { field: 'deviceno', headerName: 'EIM设备编号',  resizable: true, minWidth: 10},
      { field: 'type', headerName: '设备类型', resizable: true},
      { field: 'active', headerName: '是否启用', resizable: true},
      { field: 'assetno', headerName: '资产编号', resizable: true, minWidth: 10},
      
      { field: 'factoryno', headerName: '出厂编号', resizable: true, minWidth: 10},
      { field: 'deviceid', headerName: '设备编号', resizable: true, minWidth: 10}, // 自定义设备编号！
      { field: 'purchaseon', headerName: '购置日期', resizable: true, minWidth: 10},
      { field: 'supplier', headerName: '供应商', resizable: true, flex: 1},
      { field: 'location', headerName: '存放地点', resizable: true, minWidth: 10},
      { field: 'department', headerName: '使用部门', resizable: true, minWidth: 10},
      { field: 'groups', headerName: '科室', resizable: true, minWidth: 10},
      { field: 'belonged', headerName: '归属人', resizable: true, minWidth: 10},

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
      // =================

      { field: 'createdby', headerName: '创建人', resizable: true},
      { field: 'createdon', headerName: '创建时间', resizable: true},

      // { field: 'options', headerName: '操作', resizable: true, flex: 1},
    ],
    rowData: [ // data
      { name: 'Toyota', loginname: 'Celica', role_name: 35000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,department: "ZJX", lastsignondate:"2020"},
      // { name: 'Ford', loginname: 'Mondeo', role_name: 32000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,department: "ZJX", lastsignondate:"2020" },
      // { name: 'Porsche', loginname: 'Boxter', role_name: 72000, groups_name: 'add', active: 1, employeeno: "123", email:"123@qq.com", phoneno: "17344996821",pictureurl: null,department: "ZJX", lastsignondate:"2020" }
    ]
  };

  private gridData = [];
  
  getetabledata(event?){
    var offset;
    var limit;
    console.log("event------------------------------------------------", event);
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
    }else{
      offset = 0;
      limit = 50;
    }
    // this.getsecurity('sys_security_log', 'get_security_log_limit', {offset:event.offset,limit:10});
    // 得到员工信息！
    this.http.callRPC('device', 'dev_get_device_limit', {offset: offset, limit: limit}).subscribe((res)=>{
      // console.log("get_menu_role", result)
      var get_employee_limit = res['result']['message'][0]
      console.log("dev_get_device---------------------------->>>", get_employee_limit);

      this.isloding = false;
      // 发布组件，编辑用户的组件
      this.publicservice.getcomponent(Add_Edit_DeviceManageComponent);
      this.publicservice.getmethod("dev_delete_device");


      var message = res["result"]["message"][0]["message"];
      if (message.length>0){
        message.forEach(r => {
          r["active"] = r["active"] === 1 ? '是': '否';
        });
        console.log("初始化用户组表！", message)
      }
      var after_datas = this.show_table_before(message);
      this.gridData = [];
      this.gridData.push(...after_datas)
      this.tableDatas.rowData = this.gridData;
      var totalpagenumbers = get_employee_limit['numbers']? get_employee_limit['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
      this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
    })
  }

  pageabledata(event?){
    var offset;
    var limit;
    console.log("event------------------------------------------------", event);
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
    }else{
      offset = 0;
      limit = 50;
    }
    // this.getsecurity('sys_security_log', 'get_security_log_limit', {offset:event.offset,limit:10});
    // 得到员工信息！
    this.http.callRPC('device', 'dev_get_device_limit', {offset: offset, limit: limit}).subscribe((res)=>{
      // console.log("get_menu_role", result)
      var get_employee_limit = res['result']['message'][0]
      console.log("device---", get_employee_limit);

      this.isloding = false;
      // 发布组件，编辑用户的组件
      this.publicservice.getcomponent(Add_Edit_DeviceManageComponent);
      this.publicservice.getmethod("dev_delete_device");


      var message = res["result"]["message"][0]["message"];
      if (message.length>0){
        message.forEach(r => {
          r["active"] = r["active"] === 1 ? '是': '否';
        });
        console.log("初始化用户组表！", message)
      }
      var after_datas = this.show_table_before(message);
      this.gridData.push(...after_datas)
      this.tableDatas.rowData = this.gridData;
      var totalpagenumbers = get_employee_limit['numbers']? get_employee_limit['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
      this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
    })
  }

  updatetabledata(event?){
    var offset;
    var limit;
    console.log("event------------------------------------------------", event, this.agGrid);
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
    }else{
      offset = 0;
      limit = 50;
    }
    // this.getsecurity('sys_security_log', 'get_security_log_limit', {offset:event.offset,limit:10});
    // 得到员工信息！
    this.http.callRPC('deveice', 'dev_get_device_limit', {offset: offset, limit: limit}).subscribe((res)=>{
      console.log("updatetabledata\n\n", res)
      var get_employee_limit = res['result']['message'][0]
      console.log("deveice", get_employee_limit, "this.agGrid",this.agGrid);

      this.isloding = false;
      // 发布组件，编辑用户的组件
      this.publicservice.getcomponent(Add_Edit_DeviceManageComponent);
      this.publicservice.getmethod("dev_delete_device");


      var message = res["result"]["message"][0]["message"];
      if (message.length>0){
        message.forEach(r => {
          r["active"] = r["active"] === 1 ? '是': '否';
        });
        console.log("初始化用户组表！", message)
      }
      this.gridData = [];
      var after_datas = this.show_table_before(message);
      this.gridData.push(...after_datas)
      this.tableDatas.rowData = this.gridData;
      var totalpagenumbers = get_employee_limit['numbers']? get_employee_limit['numbers'][0]['numbers']: '未得到总条数';
      this.tableDatas.totalPageNumbers = totalpagenumbers;
      this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
    })

  }
      

  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event){
    console.log("页码改变的回调", event);
    this.pageabledata(event);
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
