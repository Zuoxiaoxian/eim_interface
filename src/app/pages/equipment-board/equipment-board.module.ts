import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentBoardComponent } from './equipment-board.component';
import { EimboardEimboardRoutingModule } from './equipment-board-routing.module';
import { ShareModule } from '../../share/share.module';
import { EquipmentFourRoadComponent } from './equipment-four-road/equipment-four-road.component';
import { NzProgressModule } from 'ng-zorro-antd';
import { EquipmentHydraulicPressureComponent } from './equipment-hydraulic-pressure/equipment-hydraulic-pressure.component';
import { EquipmentShockComponent } from './equipment-shock/equipment-shock.component';
import { EquipmentCouplingPathComponent } from './equipment-coupling-path/equipment-coupling-path.component';
import { EquipmentMotorSystemComponent } from './equipment-motor-system/equipment-motor-system.component';
import { EquipmentAvlComponent } from './equipment-avl/equipment-avl.component';
import { EquipmentMastComponent } from './equipment-mast/equipment-mast.component';
import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';
import { EquipmentMastV2Component } from './equipment-mast-v2/equipment-mast-v2.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { EquipmentStatusComponent } from './temp/equipment-status/equipment-status.component';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { LaboratoryBoardComponent } from './laboratory-board/laboratory-board.component';
import { EquipmentMastV3Component } from './equipment-mast-v3/equipment-mast-v3.component';
import { LogWarmComponent } from './temp/log-warm/log-warm.component';
import { TestInformationComponent } from './temp/test-information/test-information.component';
import { EquipmentMastTwoLevelComponent } from './equipment-mast-two-level/equipment-mast-two-level.component';


// 组件
const COMPONENT = [
  EquipmentBoardComponent,EquipmentFourRoadComponent,
  EquipmentHydraulicPressureComponent,EquipmentShockComponent,
  EquipmentCouplingPathComponent,EquipmentMotorSystemComponent,
  EquipmentAvlComponent,EquipmentMastComponent,
  EquipmentDetailsComponent,EquipmentMastV2Component,
  EquipmentStatusComponent,LaboratoryBoardComponent,
  EquipmentMastV3Component,LogWarmComponent,
  TestInformationComponent,EquipmentMastTwoLevelComponent
]
//设备看板模块
@NgModule({
  declarations: COMPONENT,
  imports: [
    CommonModule,ShareModule,EimboardEimboardRoutingModule,NzProgressModule,TranslateModule,
    NbIconModule,NbCardModule
  ],
  providers:[
    TranslatePipe
  ]

})
export class EquipmentBoardModule { 
  constructor(){
    console.log('设备看板模块实例化')
  }
}
