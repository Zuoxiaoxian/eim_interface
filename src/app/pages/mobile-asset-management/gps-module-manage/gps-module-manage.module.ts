import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpsModuleManageRoutingModule } from './gps-module-manage-routing.module';
import { GpsModuleManageComponent } from './gps-module-manage.component';
import { NbCardModule, NbMenuModule, NbSelectModule, NbButtonModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { AssetsManageComponent } from './assets-manage/assets-manage.component';
import { MySelectComponent } from './components/my-select/my-select.component';
import { FormsModule } from '@angular/forms';
import { MyTableNg2Component } from './components/my-table-ng2/my-table-ng2.component';

// import { Ng2SmartTableModule } from 'ng2-smart-table';

import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';

@NgModule({
  declarations: [GpsModuleManageComponent, AssetsManageComponent, MySelectComponent, MyTableNg2Component],
  imports: [
    CommonModule,
    GpsModuleManageRoutingModule,
    NbCardModule,
    NbMenuModule,
    NbSelectModule,
    FormsModule,
    NbButtonModule,
    NbLayoutModule,
    NbSidebarModule,

    Ng2SmartTableModule,
    
  ]
})
export class GpsModuleManageModule { }
