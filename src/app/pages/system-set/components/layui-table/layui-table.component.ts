import { Component, OnInit } from '@angular/core';
import { PLV8_URL } from '../../../../appconfig';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';

declare let layui;

declare let $;


@Component({
  selector: 'ngx-layui-table',
  templateUrl: './layui-table.component.html',
  styleUrls: ['./layui-table.component.scss']
})
export class LayuiTableComponent implements OnInit {

  constructor( private publicserve: PublicmethodService) { }

  ngOnInit(): void {
    this.inittable();
  }

  // 初始化table
  inittable(){
    // header
    var header = this.publicserve.getheader();
    console.log("初始化table---得到header：", header);

    var data = {
      "id": "1",
      "jsonrpc": "2.0",
      "method": "callrpc",
      "params": {
        "columns": {"offset": 0, "limit": 10},
          "context": {"sessionid": "123", "user": "mt", "languageid": 2052},
          "method": "get_employee_limit",
          "pkey": "identifier",
        "table": "emeployee"
      }
    };

    layui.use(['table','layer'], function(){
      var table = layui.table;
      var layer = layui.layer;
      //第一个实例
      table.render({
        elem: '#demo'
        ,height: 312
        //,width: '100%'
        ,url: PLV8_URL //数据接口
        ,method: 'post' // post jsonp 请求
        ,contentType: "application/json" // 发送编码类型
        ,headers: {Authorization: header.headers.split(":")[1]} // 这个很重要,涉及到token
        // ,limit: page
        ,skin: '#000' //自定义选中色值
        ,done:function(res,curr,count){
          layer.msg(JSON.stringify({res: res, curr: curr, count: count}));
          console.log(res);
    
          //得到当前页码
          console.log("得到当前页码",curr); 
          
          //得到数据总量
          console.log("得到数据总量", count);
        } 

        ,request:{
          pageName: "offset" //页码的参数名称，默认：page
          ,limitName: "limit" //每页数据量的参数名，默认：limit
        }

        ,where: data
        // 接口参数
        ,parseData: function(res){ // res 即为返回的原始数据
          console.log("^^^^^^返回的原始数据^^^^^", res, this.limit);
          console.log("^^^^^^this^^^^^",  this);
          var message = res["result"]["message"][0];
          if( message.code === 0){
            // 表示token过期了，跳转到 / 
          }
          var code = message.code === 1? 0: 1; // table这里的 0 表示success，原始数据的 code 1 表示success！
          var msg = "用户管理表";
          var count = message.message.length
          // 处理data
          var result_data = message.message.reverse();
          if (result_data[0] && result_data[0][0]["numbers"]){
            var other_result_data = result_data.splice(1, result_data.length);
          }else{
            var other_result_data = result_data;
          }
          var other_result_data_after = [];
          other_result_data.forEach(result => {
            other_result_data_after = other_result_data_after.concat(result);
          });
          console.log("-------other_result_data_after-----------",other_result_data_after);
          // -----------------------
          var result = other_result_data_after;
          var employee_list = [];
          for (let item of result){
            var rids = [];
            var items_dict = {};
            var role_name_lists = []; 
            var groups_name_lists = []; 
            for (let element of result){
              var rid_name = {}
              if (item["employeeid"] === element["employeeid"]){
                // items_dict["active"] = element["active"] == 1?'是': "否";
                items_dict["active"] = element["active"] == 1?'是': "否";
                items_dict["company"] = element["company"];
                items_dict["department"] = element["department"];
                items_dict["email"] = element["email"];
                items_dict["employeeid"] = element["employeeid"];
                items_dict["employeeno"] = element["employeeno"];
                items_dict["facility"] = element["facility"];
                items_dict["loginname"] = element["loginname"];
                items_dict["name"] = element["name"];
                items_dict["phoneno"] = element["phoneno"];
                items_dict["pictureurl"] = element["pictureurl"];
                items_dict["rid"] = element["rid"];
                items_dict["groupid"] = element["groupid"];
                
                items_dict["role"] = element["role"];
                items_dict["lastsignondate"] = element["lastsignondate"];
                
                items_dict["role_name"] = element["role_name"];

                rid_name["role"] = element["role"];
                rid_name["rid"] = element["rid"];
                var role_name_str: string | null = element["role_name"] ? element["role_name"]: null;
                var groups_name_str: string | null = element["groups"] ? element["groups"]: null;
                // rid_name["role_name"] =  role_name_str.replace(/\s/g, "");
                role_name_lists.push(role_name_str)
                groups_name_lists.push(groups_name_str)
                rids.push(rid_name)
                items_dict["rids"] = rids;
                items_dict["role_name"] = role_name_lists;
                items_dict["groups_name"] = groups_name_lists;
                continue
              }else{
                
              }
            }
            // 处理 role_names，将以第一， 去掉！
            employee_list.push(items_dict)
          }

          // 列表去重！
          var unique_result = unique(employee_list, "employeeid")

          unique_group_role(unique_result, "groups_name");
          unique_group_role(unique_result, "role_name");
          function unique(arr, field) { // 根据employeeid去重
            const map = {};
            const res = [];
            for (let i = 0; i < arr.length; i++) {
              if (!map[arr[i][field]]) {
                map[arr[i][field]] = 1;
                res.push(arr[i]);
              }
            }
            return res;
          };

          // groups_name、role_name去重
          function unique_group_role(arr, fild){
            arr.forEach(element => {
              var arr_list = [];
              var groups_name_list = element[fild];
              groups_name_list.forEach(groups => {
                if(arr_list.indexOf(groups) === -1){
                  arr_list.push(groups)
                }
              });
              // arr_list [] 改为 str
              element[fild] = arr_list.join(";")
            });
          }

          // -----------------------
          return {
            "code": code, //解析接口状态
            "msg": msg, //解析提示文本
            "count": count, //解析数据长度
            "data": unique_result //解析数据列表
          }
          

        }
        ,page: true //开启分页
        ,cols: [[ //表头
          {field: 'name', title: '姓名', width:80, sort: true, fixed: 'left'}
          ,{field: 'loginname', title: '域账号', width:80}
          ,{field: 'role_name', title: '角色名称', width:80, sort: true}
          ,{field: 'groups_name', title: '用户组', width:80} 
          ,{field: 'active', title: '是否启用', width: 177}
          ,{field: 'employeeno', title: '编号', width: 80, sort: true}
          ,{field: 'email', title: '邮箱', width: 80, sort: true}
          ,{field: 'phoneno', title: '手机号', width: 80}
          ,{field: 'pictureurl', title: '头像地址', width: 135, sort: true}

          ,{field: 'department', title: '部门', width: 135, sort: true}
          ,{field: 'lastsignondate', title: '最后登录时间', width: 135, sort: true}
          
        ]]
      });
      
    });
  }

}
