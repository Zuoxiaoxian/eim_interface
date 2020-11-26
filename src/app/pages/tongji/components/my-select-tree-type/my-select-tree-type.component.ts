import { Component, OnInit, Input } from '@angular/core';
declare let $;
declare let layui;
@Component({
  selector: 'ngx-my-select-tree-type',
  templateUrl: './my-select-tree-type.component.html',
  styleUrls: ['./my-select-tree-type.component.scss']
})
export class MySelectTreeTypeComponent implements OnInit {
  @Input("placeholder")placeholder:any;

  // 下拉 icon
  xialaicon = "arrow-ios-downward-outline"
  constructor() { }

  placeholder_title_type;
  select_type = [];

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.placeholder_title_type = this.placeholder;
    console.log("****this.placeholder_title_type************>>>>>",this.placeholder_title_type);
    $("[name='title_type']").attr("placeholder", this.placeholder_title_type);
  }
  
  // 下拉树示例
  init_select_trees(data){
    console.log("====data=========",data);
    var that = this;
    var el5;
    layui.use(['eleTree',],function(){
      var eleTree = layui.eleTree;
      $("[name='title_type']").on("click",function (e) {

        if (that.xialaicon === "arrow-ios-upward-outline"){
          that.xialaicon = "arrow-ios-downward-outline"
        }else{
          that.xialaicon = "arrow-ios-upward-outline";
        }

        e.stopPropagation();
        if(!el5){
          el5=eleTree.render({
            elem: '.eletype',
            data: data,
            defaultExpandAll: false,
            showCheckbox: true,
            expandOnClickNode: false,
            highlightCurrent: true
          });
        }
        $(".eletype").toggle();
      })
      // 节点被点击
      // eleTree.on("nodeClick(data5)",function(d) {
      //     $("[name='title_type']").val(d.data.currentData.label)
      //     $(".eletype").hide();
      // });
      // 节点被选择
      var select_data = []; //[{id: 3, label: "nvh"},]
      var select_label_list = [];
      eleTree.on("nodeChecked(datatype)",function(d) {
        console.log(d.data);    // 点击节点对应的数据 
        console.log(d.isChecked);   // input是否被选中
        // -----------------多选，科室功能组
        if (d.isChecked){
          select_data.push(d.data.currentData);// {id: 3, label: "nvh"}
          select_label_list.push(d.data.currentData.label);
          that.select_type.push(d.data.currentData.id)
        }else{
          var index = select_label_list.indexOf(d.data.currentData.label);
          if( index != -1){
            select_label_list.splice(index, 1); // 删除取消的
            that.select_type.splice(index, 1);
          };
          // that.select_type
        }
        $("[name='title_type']").val(select_label_list.join(';'));

        console.log(d.node);    // 点击的dom节点
        console.log(this);      // input对应的dom
    })
      $(document).on("click",function() {
          $(".eletype").hide();
          that.xialaicon = "arrow-ios-downward-outline";
      })
    })
  }

  getselect(){
    return this.select_type;
    // return $("[name='title_type']").val();
    
  }

  // 删除选择的
  delselect(){
    $("[name='title_type']").val("");
    this.select_type = [];
  }

}
