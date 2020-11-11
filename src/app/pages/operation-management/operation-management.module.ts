import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationManagementRoutingModule } from './operation-management-routing.module';
import { OperationManagementComponent } from './operation-management.component';
import { BorderGatewayComponent } from './border-gateway/border-gateway.component';
import { MySelectComponent } from './components/my-select/my-select.component';
import { MySelectGroupComponent } from './components/my-select-group/my-select-group.component';
import { NbSelectModule, NbButtonModule, NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';
import { MyTableNg2Component } from './components/my-table-ng2/my-table-ng2.component';
import { VideoIntegrationComponent } from './video-integration/video-integration.component';
import { StatusForTableComponent } from './video-integration/status-for-table/status-for-table.component';

@NgModule({
  declarations: [OperationManagementComponent, BorderGatewayComponent, MySelectComponent, MySelectGroupComponent, MyTableNg2Component, VideoIntegrationComponent, StatusForTableComponent],
  imports: [
    CommonModule,
    OperationManagementRoutingModule,
    NbSelectModule,
    NbButtonModule,
    FormsModule,
    NbCardModule,
    NbSpinnerModule,

    Ng2SmartTableModule,

  ]
})
export class OperationManagementModule { }
