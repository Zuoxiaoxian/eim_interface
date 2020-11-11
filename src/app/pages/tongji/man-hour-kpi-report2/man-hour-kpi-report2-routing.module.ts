import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManHourKpiReport2Component } from './man-hour-kpi-report2.component';

import { ManKpiTableComponent } from './man-kpi-table/man-kpi-table.component';
import { ManKpiDetailComponent } from './man-kpi-detail/man-kpi-detail.component';

const routes: Routes = [
  { 
    path: '', 
    component: ManHourKpiReport2Component,
    children:[
      { path: 'kpitable', component: ManKpiTableComponent },
      { path: 'kpidetail', component: ManKpiDetailComponent },
   
      { path: '', redirectTo: 'kpitable', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManHourKpiReport2RoutingModule { }
