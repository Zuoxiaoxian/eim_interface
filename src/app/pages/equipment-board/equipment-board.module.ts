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
import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { EquipmentStatusComponent } from './temp/equipment-status/equipment-status.component';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { LaboratoryBoardComponent } from './laboratory-board/laboratory-board.component';
import { LogWarmComponent } from './temp/log-warm/log-warm.component';
import { TestInformationComponent } from './temp/test-information/test-information.component';
import { ExperimentParamsComponent } from './temp/experiment-params/experiment-params.component';
import { TestInformationV2Component } from './temp/test-information-v2/test-information-v2.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { EquipIntroduceComponent } from './temp/equip-introduce/equip-introduce.component';


// 组件
const COMPONENT = [
  EquipmentBoardComponent,EquipmentFourRoadComponent,
  EquipmentHydraulicPressureComponent,EquipmentShockComponent,
  EquipmentCouplingPathComponent,EquipmentMotorSystemComponent,
  EquipmentAvlComponent,EquipIntroduceComponent,
  EquipmentDetailsComponent,
  EquipmentStatusComponent,LaboratoryBoardComponent,LogWarmComponent,
  TestInformationComponent,
  ExperimentParamsComponent,TestInformationV2Component
]
//设备看板模块
@NgModule({
  declarations: COMPONENT,
  imports: [
    CommonModule,ShareModule,EimboardEimboardRoutingModule,NzProgressModule,TranslateModule,
    NbIconModule,NbCardModule,NzCarouselModule
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
