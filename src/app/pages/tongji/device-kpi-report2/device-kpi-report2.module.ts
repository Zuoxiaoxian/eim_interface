import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceKpiReport2RoutingModule } from './device-kpi-report2-routing.module';
import { DeviceKpiReport2Component } from './device-kpi-report2.component';
import { KpiTableComponent } from './kpi-table/kpi-table.component';
import { KpiDetailComponent } from './kpi-detail/kpi-detail.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule,NbSpinnerModule } from '@nebular/theme';

import { ComponentTModule} from '../components/componentT.module'

import { FormsModule } from '@angular/forms';
import { TableDetailComponent } from './kpi-table/table-detail/table-detail.component';


@NgModule({
  declarations: [DeviceKpiReport2Component, KpiTableComponent, KpiDetailComponent, TableDetailComponent,
  ],
  imports: [
    CommonModule,
    DeviceKpiReport2RoutingModule,
    NbCardModule,
    NbButtonModule,
    FormsModule,
    NbSelectModule,
    NbIconModule,
    NbSpinnerModule,
    NbInputModule,

    ComponentTModule

    
    
    
    
    
  ]
})
export class DeviceKpiReport2Module { }
