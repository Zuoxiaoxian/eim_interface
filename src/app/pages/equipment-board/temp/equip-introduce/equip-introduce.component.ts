import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-equip-introduce',
  templateUrl: './equip-introduce.component.html',
  styleUrls: ['./equip-introduce.component.scss']
})
export class EquipIntroduceComponent implements OnInit {

   //设备介绍
  @Input() equipIntroduceList = [];
  //当前的页数
  @Input()  eqIntShow = 0;

  timer_1:any;
  constructor() { }

  ngOnInit(): void {
    this.timer_1 = setInterval(f =>{
      this.eqIntShow = this.eqIntShow >=this.equipIntroduceList.length-1 ?0:this.eqIntShow+1;
    },3000)
  }

  //组件销毁
  ngOnDestroy(){
    clearInterval(this.timer_1)
  }

}
