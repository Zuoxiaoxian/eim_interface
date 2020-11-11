import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManHourKpiReport2RoutingModule } from './man-hour-kpi-report2-routing.module';
import { ManHourKpiReport2Component } from './man-hour-kpi-report2.component';
import { ManKpiTableComponent } from './man-kpi-table/man-kpi-table.component';
import { ManKpiDetailComponent } from './man-kpi-detail/man-kpi-detail.component';


import { ComponentTModule} from '../components/componentT.module'
import { NbButtonModule, NbCardModule, NbIconModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';

@NgModule({
  declarations: [ManHourKpiReport2Component, ManKpiTableComponent, ManKpiDetailComponent],
  imports: [
    CommonModule,
    ManHourKpiReport2RoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    NbSpinnerModule,


    ComponentTModule,

  ]
})
export class ManHourKpiReport2Module { }
