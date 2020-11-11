import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// gps 模块管理
import { GpsModuleManageComponent } from './gps-module-manage.component';
import { AssetsManageComponent } from './assets-manage/assets-manage.component';

const routes: Routes = [
  {
    path:'',
    component: GpsModuleManageComponent,
    children:[
      {
        path:'assets',
        component: AssetsManageComponent
      },
      {
        path:'',
        redirectTo: 'assets',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GpsModuleManageRoutingModule { }
