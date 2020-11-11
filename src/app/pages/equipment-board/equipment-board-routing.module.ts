import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentAvlComponent } from './equipment-avl/equipment-avl.component';
import { EquipmentBoardComponent } from './equipment-board.component';
import { EquipmentCouplingPathComponent } from './equipment-coupling-path/equipment-coupling-path.component';
import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';
import { EquipmentFourRoadComponent } from './equipment-four-road/equipment-four-road.component';
import { EquipmentHydraulicPressureComponent } from './equipment-hydraulic-pressure/equipment-hydraulic-pressure.component';
import { EquipmentMastV2Component } from './equipment-mast-v2/equipment-mast-v2.component';
import { EquipmentMastComponent } from './equipment-mast/equipment-mast.component';
import { EquipmentMotorSystemComponent } from './equipment-motor-system/equipment-motor-system.component';
import { EquipmentShockComponent } from './equipment-shock/equipment-shock.component';


//路由
const ROUTERS: Routes = [{
    path: '',
    component: EquipmentBoardComponent,
    children: [
      {
        //四立柱道路模拟试验台-320.5
        path:'road/:title',
        component:EquipmentFourRoadComponent,
      },
      {
        //液压伺服系统扩展系统-Testline
        path:'hydraulic/:title',
        component:EquipmentHydraulicPressureComponent,        
      },
      {
        //六自由度振动台-353.2
        path:'shock/:title',
        component:EquipmentShockComponent,
      },
      {
        //整车多轴轴耦合道路模拟试验台-329
        path:'coupling/:title',
        component:EquipmentCouplingPathComponent
      },
      {
        //电机系统测试台架
        path:'motor/:title',
        component:EquipmentMotorSystemComponent
      },
      {
        //AVL转毂+久鼎环境舱+排放分析
        path:'avl/:title',
        component:EquipmentAvlComponent
      },
      {
        //上汽
        path:'mast/:title',
        component:EquipmentMastComponent
      },
      {
        path:'mast-v2/:title',
        component:EquipmentMastV2Component
      },
      {
        path:'detailsDemo/:title',
        component:EquipmentDetailsComponent
      }
    ]
}];
@NgModule({
    imports: [RouterModule.forChild(ROUTERS)],
    exports: [RouterModule]
  })
  export class EimboardEimboardRoutingModule { }