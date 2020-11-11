import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacilityHealthDataCenterComponent } from './facility-health-data-center.component';

const routes: Routes = [
  {
    path: '',
    component: FacilityHealthDataCenterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilityHealthDataCenterRoutingModule { }
