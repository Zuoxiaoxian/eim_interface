import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

import { HomeComponent } from './home/home.component';

// 404 
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    // 首界面
    {
      path: 'home',
      component: HomeComponent,
    },
    // 大屏看板
    {
      path: 'board',
      loadChildren:() => import('./eimboard/eimboard.module')
      .then(m => m.EimboardModule)
    },
    // 设备看板
    {
      path: 'equipment',
      loadChildren:() => import('./equipment-board/equipment-board.module')
      .then(m => m.EquipmentBoardModule)
    },
    // 设备在线
    {
      path: 'deviceinline',
      loadChildren: () => import('./device-inline/device-inline-routing.module')
        .then(m => m.DeviceInlineRoutingModule),
    },
    // 统计分析
    {
      path: 'tongji',
      loadChildren: () => import('./tongji/tongji.module')
        .then(m => m.TongjiModule),
    },
    // 设备健康数据中心
    {
      path: 'datacenter',
      loadChildren: () => import('./facility-health-data-center/facility-health-data-center.module')
        .then(m => m.FacilityHealthDataCenterModule),
    },
    // 运维管理
    {
      path: 'operation',
      loadChildren: () => import('./operation-management/operation-management.module')
        .then(m => m.OperationManagementModule),
    },
    // 移动资产管理
    {
      path: 'mobile-gps',
      loadChildren: () => import('./mobile-asset-management/mobile-asset-management.module')
        .then(m => m.MobileAssetManagementModule),
    },
    // 举升机
    {
      path:'lift-machine',
      loadChildren: () => import('./lift-machine/lift-machine.module')
      .then(m => m.LiftMachineModule),
    },
    // 系统设置
    {
      path:'system-set',
      loadChildren: () => import('./system-set/system-set.module')
      .then(m => m.SystemSetModule),
    },
    
    // 404 界面
    // {
    //   path: 'miscellaneous',
    //   loadChildren: () => import('./miscellaneous/miscellaneous.module')
    //     .then(m => m.MiscellaneousModule),
    // },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    // {
    //   path: '**',
    //   component: NotFoundComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
