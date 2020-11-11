import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EmqClientService} from "../../../services/emq-client/emq-client.service";
import {HttpserviceService} from "../../../services/http/httpservice.service";
import {UserInfoService} from "../../../services/user-info/user-info.service";
declare let layui;
declare let $;
//解决dialog标签兼容性
declare let dialogPolyfill;

@Component({
  selector: 'ngx-preinstall-dialog',
  templateUrl: './preinstall-dialog.component.html',
  styleUrls: ['./preinstall-dialog.component.scss']
})
export class PreinstallDialogComponent implements OnInit {
  _dialogData:any ={};
  @Input() set dialogData(data){
    if(data) {
      this._dialogData = data;
    }
  };
  @Input()aline
  @Output()dialogClose = new EventEmitter<any>();
  constructor(private mqserivce:EmqClientService,private http:HttpserviceService,
              private userInfo:UserInfoService) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.layuiInit();
  }

  layuiInit(){
    let isthis = this;
    layui.use(['form','colorpicker'], function(){
      var form = layui.form;
      var colorpicker = layui.colorpicker;
      var data = {};
      isthis._dialogData.preinstall.forEach((f:any,i:number)=>{
        for( var key in f ){
          data[`${key}_${i}`] = f[key];
        }
        let div = $(`#div_color_${i}`)
        div.css({'color':f.color});
        div.text("");
        div.append(`<span>${f.color}</span>`);
        //颜色选择器
        colorpicker.render({
          aline:isthis.aline,
          elem: `#select_${i}`,  //绑定元素
          color: f.color,
          position:'fixed',
          predefine: true,
          // colors: ['#ff8c00','#00ced1','#9d8a0e'],
          // alpha: true,
          // format: 'rgb',
          size: 'lg', //大号下拉框
          done: function(color){
            isthis.color_change(i, color);
          }
        });
      })

      form.val('preinstall', data);
      //将颜色选择器按钮变大
      $('.layui-colorpicker-lg').css({"width":"39px","height":"39px"});
      console.log(data)
      form.on('submit(preinstall_submit)', function(f){
        var data = f.field;
        let _dialogData = JSON.parse(JSON.stringify(isthis._dialogData));
        var colums:any = {};
        _dialogData.preinstall =  isthis.json_to_array(data);
        if(isthis.formVerify(_dialogData.preinstall))return;
        // isthis.mqserivce.sendMqttMessaege('text/preinsta',JSON.stringify(_dialogData.preinstall));
        //
        colums = {
          "deviceid":isthis._dialogData.deviceid,//设备id
          "color_min":data['color_0'],"color_max":data['color_1'],
          "value_min":data['value_0'],"value_max":data['value_1']
          ,"createdby":isthis.userInfo.getName() || 'admin',
          'channelen':isthis._dialogData.titleEn,
        };
        // colums.deviceid = isthis._dialogData.preinstall.find(f=> !f.value && !f.color)?1:0;
        isthis.http.callRPC('panel_config','dev_insert_panel_config',colums
          ).subscribe((f:any) =>{
            console.log(f);
            if(f.result.message[0] == 1){
              isthis.dialogClose.emit({sumbit:true,data:_dialogData});
            }else{
              isthis.showtip(['保存失败！'])
            }
        },error => console.log(error));
      });
    });
  }

  /**
   * json ={value_0:1,color_0:1,value_1:1,color_1:1,}
   * 转换为 [{value:1,color:1},{value:1,color:1}]
   * @param data
   */
  json_to_array(json_data){
    let json = {};
    let value:any = '';
    let arr = [];
    let _key = [];
    let data:any = JSON.parse(JSON.stringify(json_data));
    for(let key in data){
      _key = key.split('_');
      value = data[key];
      if(!json[_key[_key.length -1]]) json[_key[_key.length -1]]= {};
      json[parseInt(_key[_key.length -1])][_key[0]] = value;
    }
    for(let key in json){
      arr.push(json[key])
    }
    // arr.
    return arr;
  }


  input_change_color(e,i){
    let isthis = this;
    var colorpicker = layui.colorpicker;
    colorpicker.render({
      elem: `#select_${i}`,  //绑定元素
      aline: '#rtmv2',
      position: 'fixed',
      color: e.target.value,
      size: 'lg', //大号下拉框
      done: function(color){
        isthis.color_change(i, color);
      },
    });
    $('.layui-colorpicker-lg').css({"width":"39px","height":"39px"});
    let div = $(`#div_color_${i}`)
    div.css({'color':e.target.value});
    div.text("");
    div.append(`<span>${e.target.value}</span>`);
  }

  color_change(i,color){
    console.log(color)
    //绑定到颜色选择器显示名字和对应的颜色
    let div = $(`#div_color_${i}`);
    div.css({'color':color});
    div.text("");
    div.append(`<span>${color}</span>`);
    $(`#color_${i}`).val(color);//吧选择的颜色绑定到对应的输入框
  }

  showtip(messageArray:any[]){
    var dialog = document.getElementsByTagName("dialog")[0];
    dialogPolyfill.registerDialog(dialog);
    var dialog_message = messageArray.join('<br>');
    $("#dialog_message").text("");//清空提示框的内容
    $("#dialog_message").append(dialog_message);
    dialog.show();
    setTimeout(f =>{
      dialog.close();
    },2000);
  }

  formVerify(data){
    var dialog;
    var dialog_message = "";
    dialog = document.getElementsByTagName("dialog")[0];
    dialogPolyfill.registerDialog(dialog);
    if (data.find(f => !new RegExp("^(#[0-9a-f]{6})|(#[0-9a-f]{3})$").test(f.color)))
      dialog_message += "颜色格式为#后跟三位或六位0-9a-f组成";
    if (data.find(f => ["",undefined,null].includes(f.value)))
      dialog_message += `${dialog_message?"<br>":""}预设值不可为空!`;
    if (data.find((f:any,i:any) => i != data.length -1 && parseFloat(f.value) > parseFloat(data[i+1].value) ))
      dialog_message += `${dialog_message?"<br>":""}第一个预设值不可大于第二个!`;
    if (dialog_message){
      $("#dialog_message").text("");//清空提示框的内容
      $("#dialog_message").append(dialog_message);
      dialog.show();
      setTimeout(f =>{
        dialog.close();
      },2000);
      return true;
    }
    return false;
  }

  //监听预设值input
  input_change_preinst(e,i){
    setTimeout(f =>{
      this.preinst_value($(`#value_${i}`), i);
    },100)
  }

  preinst_value(el,i){
    let preinstallArr = this._dialogData.preinstall;
    let val = parseFloat(el.val());
    if(i == 0){
      val > preinstallArr[i+1].value?el.val(preinstallArr[i].value):preinstallArr[i].value = val;
    }else if(i == this._dialogData.preinstall.length-1){
      val < preinstallArr[i-1].value?el.val(preinstallArr[i].value):preinstallArr[i].value = val;
    }else{
      val < preinstallArr[i+1].value && val > preinstallArr[i-1].value?el.val(preinstallArr[i].value):preinstallArr[i].value=val;
    }
  }

  close(){
    var dialog = document.getElementsByTagName("dialog")[0];
    dialog.close();
  }

  closedialog(){
    this.dialogClose.emit({sumbit:false,data:[]});
  }
}
