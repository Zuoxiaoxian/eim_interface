import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperationManagementComponent } from './operation-management.component';
// 边缘网关
import { BorderGatewayComponent } from './border-gateway/border-gateway.component';
// 视频集成
import { VideoIntegrationComponent } from './video-integration/video-integration.component';

const routes: Routes = [
  {
    path: '',
    component: OperationManagementComponent,
    children: [
      {
        path: 'border-gateway',
        component: BorderGatewayComponent,
      },
      {
        path: 'video-interation',
        component: VideoIntegrationComponent,
      },
      {
        path: '',
        redirectTo: 'border-gateway',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationManagementRoutingModule { }
