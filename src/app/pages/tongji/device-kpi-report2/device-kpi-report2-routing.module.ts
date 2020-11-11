import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { DeviceKpiReport2Component } from './device-kpi-report2.component'
// deviceKpiReport

import { KpiTableComponent } from './kpi-table/kpi-table.component';
import { KpiDetailComponent } from './kpi-detail/kpi-detail.component';

const routes: Routes = [
  { 
    path: '', 
    component: DeviceKpiReport2Component,
    children:[
      { path: 'kpitable', component: KpiTableComponent },
      { path: 'kpidetail', component: KpiDetailComponent },
   
      { path: '', redirectTo: 'kpitable', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceKpiReport2RoutingModule { }
