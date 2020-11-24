import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { copyFileSync } from 'fs';
import { from } from 'rxjs';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';

// 验证表单
import { Device } from '../form_verification';


declare let layui;

declare let $;

@Component({
  selector: 'ngx-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.scss']
})
export class DeviceManageComponent implements OnInit {

  @Input() title: string;
  @Input() content: string; // 'true': 表示edit 'false':表示add
  @Input() rowData: string;
  // 加载
  loading;
  constructor(private dialogRef: NbDialogRef<DeviceManageComponent>, private http: HttpserviceService, private publicservice: PublicmethodService,
    private userinfo: UserInfoService) {
      // 得到科室 sys_get_groups_limit
      var columns = {
        limit: 20,
        offset: 0
      }
      this.http.callRPC('device',"sys_get_groups_limit", columns).subscribe(result=>{
        var res = result["result"]["message"][0];
        console.log("sys_get_groups_limit------------------------>>>", res);
        if (res["code"] === 1){
          this.groups = res["message"]
          console.log("--*-*-*-*-*", res, "this.groups", this.groups)
        }
      })
     }
  ngOnInit(): void {
  }

  // 科室/用户组
  groups = [
    // { id: 1, group: "环境试验室11", groupid: 1},
    // { id: 2, group: "结构试验室2", groupid: 2},
    // { id: 3, group: "能源试验室1", groupid: 3},
    // { id: 4, group: "测试用户组", groupid: 5},
  ]
  
  ngAfterViewInit(){
    console.log("编辑----添加",this.rowData)
    console.log("编辑----添加  content---",this.content)
    // form 表单
    this.layuiform();
  }

  // form表单
  layuiform(){
    var content = JSON.parse(this.content); // 'true': 表示edit 'false':表示add
    var rowData = this.rowData;
    var http = this.http;
    var dialogRef = this.dialogRef;
    var publicservice = this.publicservice;
    var editsuccess = this.editsuccess;
    var editdanger = this.editdanger;
    var addsuccess = this.addsuccess;
    var adddanger = this.adddanger;

    var that = this;
    layui.use(['layer','form','layedit', 'laydate'], function(){
      var layer = layui.layer;
      var form = layui.form;
      var laydate = layui.laydate; // 时间日期
      form.render(); // 刷新all
      form.render('select'); // 刷新select
      form.render("checkbox"); // 刷新checkbox
      form.render();
      //自定义验证规则
      // 验证 表单
      form.verify({
        // 设备名称 验证：devicename character(20)
        devicename: function(value, item){
          console.log("验证、表单: devicename",Device["devicename"]);
          console.log("验证、表单: value",value);
          // sql注入和特殊字符 special_str
          var special_sql = Device['special_sql']["special_sql"];
          var special_str = Device['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
         
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "设备名称不能有特殊字符！"
          }
          if (value.length > 20){
            return "设备名称最大长度不超过20！"
          }

          // if (! new RegExp(Device["devicename"]).test(value)){
          //   if (value.length > 20){
          //     return "设备名称最大长度不超过20！"
          //   }
          //   return "设备名称不能有特殊字符"
          // }
         

        },
        // 设备编号 验证：deviceno character(100)
        deviceno: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = Device['special_sql']["special_sql"];
          var special_str = Device['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "设备编号不能有特殊字符！"
          }
          if (new RegExp(Device["deviceno"]).test(value)){
            if (value.length > 100){
              return "设备编号最大长度不超过100！"
            }
            return "设备编号不能有中文！"
          }
          
        },
        // 资产编号 验证：assetno character(50)
        assetno: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = Device['special_sql']["special_sql"];
          var special_str = Device['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "资产编号不能有特殊字符！"
          }

          if (new RegExp(Device["assetno"]).test(value)){
            if (value.length > 50){
              return "资产编号最大长度不超过100！"
            }
            return "资产编号不能有中文！"
          }
          
        },
        // 出厂编号 验证：factoryno character(50)
        factoryno: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = Device['special_sql']["special_sql"];
          var special_str = Device['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "出厂编号不能有特殊字符！"
          }

          if (new RegExp(Device["factoryno"]).test(value)){
            if (value.length > 50){
              return "出厂编号最大长度不超过100！"
            }
            return "出厂编号不能有中文！"
          }
          
        },
        
        // 购置日期 验证：purchaseon character(50)
        purchaseon: function(value, item){
          console.log("验证、表单: devicename",value);
          // if (! new RegExp(Device["factoryno"]).test(value)){
          //   if (value.length > 50){
          //     return "出场编号最大长度不超过100！"
          //   }
          //   return "出场编号必须是数字、字母，且不能有特殊字符"
          // }
        },

        // 供应商 验证：supplier character(50)
        supplier: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = Device['special_sql']["special_sql"];
          var special_str = Device['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "供应商不能有特殊字符！"
          }
          if (value.length > 50){
            return "供应商最大长度不超过50！"
          }

          // if (! new RegExp(Device["supplier"]).test(value)){
          //   if (value.length > 50){
          //     return "供应商最大长度不超过50！"
          //   }
          //   return "供应商必须是中文、字母，且不能有特殊字符"
          // }
          
        },
        // 存放地点 验证：location character(50)
        location: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = Device['special_sql']["special_sql"];
          var special_str = Device['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "存放地点不能有特殊字符！"
          }
          if (value.length > 50){
            return "存放地点最大长度不超过50！"
          }
          // if (! new RegExp(Device["location"]).test(value)){
          //   if (value.length > 50){
          //     return "存放地点最大长度不超过50！"
          //   }
          //   return "存放地点必须是数字、字母，且不能有特殊字符"
          // }
          

        },
        // 使用部门 验证：department character(50)--修改为 deviceid eim设备编号
        deviceid: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = Device['special_sql']["special_sql"];
          var special_str = Device['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "eim设备编号不能有特殊字符！"
          }
          if (value.length > 50){
            return "eim设备编号最大长度不超过50！"
          }
          // 不为中文！
          if (new RegExp(Device["deviceid"]).test(value)){
            return "eim设备编号不能为中文"
          }

          // if (! new RegExp(Device["department"]).test(value)){
          //   if (value.length > 50){
          //     return "使用部门最大长度不超过50！"
          //   }
          //   return "使用部门必须是中文、字母，且不能有特殊字符"
          // }
          
        },
        // 科室 验证：groups character(50)
        groups: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = Device['special_sql']["special_sql"];
          var special_str = Device['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "科室不能有特殊字符！"
          }
          if (value.length > 50){
            return "科室最大长度不超过50！"
          }
          // if (! new RegExp(Device["groups"]).test(value)){
          //   if (value.length > 50){
          //     return "科室最大长度不超过50！"
          //   }
          //   return "科室必须是中文、字母，且不能有特殊字符"
          // }
          
        },
        // 归属人 验证：belonged character(50)
        belonged: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = Device['special_sql']["special_sql"];
          var special_str = Device['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "归属人不能有特殊字符！"
          }
          if (value.length > 50){
            return "归属人最大长度不超过50！"
          }
          // if (! new RegExp(Device["belonged"]).test(value)){
          //   if (value.length > 50){
          //     return "归属人最大长度不超过50！"
          //   }
          //   return "归属人必须是中文、字母，且不能有特殊字符"
          // }
          
        },
        // 设备状态 验证：devicestatus character(50)
        devicestatus: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = Device['special_sql']["special_sql"];
          var special_str = Device['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "设备状态不能有特殊字符！"
          }
          if (value.length > 4){
            return "设备状态最大长度不超过4！"
          }
          // if (! new RegExp(Device["devicestatus"]).test(value)){
          //   if (value.length > 4){
          //     return "设备状态最大长度不超过4！"
          //   }
          //   return "设备状态必须是数字，且不能有特殊字符"
          // }
          
        },
        // 创建人 验证：createdby character(50)
        createdby: function(value, item){
          // sql注入和特殊字符 special_str
          var special_sql = Device['special_sql']["special_sql"];
          var special_str = Device['special_sql']["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (! str){
            return "创建人不能有特殊字符！"
          }
          if (value.length > 50){
            return "创建人最大长度不超过50！"
          }
          // if (! new RegExp(Device["createdby"]).test(value)){
          //   if (value.length > 50){
          //     return "创建人最大长度不超过50！"
          //   }
          //   return "创建人必须是字母、中文，且不能有特殊字符"
          // }
          
        },

      })


      

      // form.render("checkbox"); // 刷新checkbox

      // 是编辑还是新增
      var success;
      var danger;
      var method;
      if (content){ // true: 表示edit
        console.log("---------------------------------表示edit---------------------------------------------")
        success = editsuccess;
        danger = editdanger;
        
        // 注意这里有2个，1[{}],2{}
        // var formdatar = JSON.parse(rowData).length != 1? JSON.parse(rowData): JSON.parse(rowData)[0];
        var formdatar = JSON.parse(rowData)[0];
        switch (formdatar["devicestatus"]) {
          case 1:
            formdatar["devicestatus"] = "在用";
            break;
            case 2:
              formdatar["devicestatus"] = "封存";
              break;
            case 3:
              formdatar["devicestatus"] = "停用";
            break;
            case 4:
              formdatar["devicestatus"] = "闲置";
            break;
            case 402:
              formdatar["devicestatus"] = "其它";
            break;
        }
        // 初始化表单
        form.val("device", formdatar); 
        // 初始化createdon（创建时间）、purchaseon (购置日期)
        console.log('----------------------编辑---------------', formdatar);

        var createdon = formdatar["createdon"];
        var purchaseon = formdatar["purchaseon"];
        method = "dev_update_device";
      }else{ // false: 表示add
        method = "dev_insert_device";
        success = addsuccess;
        danger = adddanger;
      }

      //日期时间选择器
      laydate.render({
        elem: '#createdon'
        ,type: 'datetime'
        // 初始化
        ,value: createdon
        ,isInitValue: true
      });
      laydate.render({
        elem: '#purchaseon'
        ,type: 'datetime'
        // 初始化
        ,value: purchaseon
        ,isInitValue: true
      });

      //监听提交
      form.on('submit(device)', function(data){
        if (content){ // 表示编辑
          data.field.id = JSON.parse(rowData)[0].id;
          data.field.deviceid = JSON.parse(rowData)[0].deviceid;
        }else{// 表示添加
          // 添加 设备，需要 添加字段，group：科室/功能组， groupid： 科室/功能组 id
          var group = "";
          var groupid = 0;
          that.groups.forEach(item =>{
            if (Number(data.field["groups"])===item["groupid"]){
              groupid = item["groupid"];
              group = item["group"];
            }
          })
          data.field["group"] = group;
          data.field["groupid"] = groupid;

        }
        // layer.alert(JSON.stringify(data.field), {
        //   title: '得到的编辑表单的数据'
        // })
        console.log('data.field["active"]', data.field["active"])
        if (data.field["active"] != undefined){
          data.field["active"] = 1;
        }else{
          data.field["active"] = 0;
        }
        if (data.field["type"] != undefined){
          data.field["type"] = Number(data.field["type"]);
        }
        
        
        var colums = data.field;
        switch (colums["devicestatus"]) {
          case "在用":
            colums["devicestatus"] = 1;
            break;
            case "封存":
              colums["devicestatus"] = 2;
              break;
            case "停用":
              colums["devicestatus"] = 3;
            break;
            case "闲置":
              colums["devicestatus"] = 4;
            break;
            case "其它":
              colums["devicestatus"] = 402;
            break;
        }
        

        console.log("---data.field--",data.field)
        
        console.log("---colums--",colums, method);
        

        const table = "device";
        http.callRPC(table, method, colums).subscribe((result)=>{
          console.log("更新设备数据：", result)
          const status = result['result']['message'][0];
          if (status === 1){
            success(publicservice)
            if(content){
              that.RecordOperation('编辑eim台账', 1,"deviceno:"+colums["deviceno"] + ','+ "assetno:" + colums["assetno"]);
            }else{
              that.RecordOperation('新增eim台账', 1,"deviceno:"+colums["deviceno"] + ','+ "assetno:" + colums["assetno"]);
            }
            dialogRef.close(colums);
          }else{
            if(content){
              that.RecordOperation('编辑eim台账', 0,"deviceno:"+colums["deviceno"] + ','+ "assetno:" + colums["assetno"]);
            }else{
              that.RecordOperation('新增eim台账', 0,"deviceno:"+colums["deviceno"] + ','+ "assetno:" + colums["assetno"]);
            }
            danger(publicservice);
          }
        })
        return false;
      });

      

      // // 监听 switch开关！
      // form.on('switch(filter)', function(data){
      //   // console.log("开关是否开启，true或者false", data.elem.checked); //开关是否开启，true或者false
      // });
     
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

  // 展示状态
  editsuccess(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"编辑成功!"});
  }
  editdanger(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"编辑失败!"});
  }

  addsuccess(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"添加成功!"});
  }
  adddanger(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"添加失败!"});
  }

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
