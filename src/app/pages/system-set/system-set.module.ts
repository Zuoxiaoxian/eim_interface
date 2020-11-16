import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemSetRoutingModule } from './system-set-routing.module';
import { SystemSetComponent } from './system-set.component';
import { RoleComponent } from './role/role.component';
import { NbButtonModule, NbCardModule, NbTreeGridModule, NbIconModule, NbDialogModule, NbPopoverModule, NbInputModule, NbSpinnerModule, NbSelectModule   } from '@nebular/theme';
import { MenuComponent } from './menu/menu.component';

// import { Ng2SmartTableModule } from 'ng2-smart-table';

import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';
import { EmployeeComponent } from './employee/employee.component';
import { MyTableNg2Component } from './components/my-table-ng2/my-table-ng2.component';
import { SecurityLogComponent } from './security-log/security-log.component';
import { UserEmployeeComponent } from './user-employee/user-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEmployeeGroupComponent } from './user-employee-group/user-employee-group.component';


import { NgZorroAntdModule, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule } from 'ng-zorro-antd';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { LayuiTableComponent } from './components/layui-table/layui-table.component';
import { AgTableComponent } from './components/ag-table/ag-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridActionComponent } from './components/ag-table/ag-grid-action/ag-grid-action.component';
import { OperationLogComponent } from './operation-log/operation-log.component';
import { GocronComponent } from './gocron/gocron.component';
import { GocronFormComponent } from './gocron/gocron-form/gocron-form.component';
import { GocronFormNodeComponent } from './gocron/gocron-form-node/gocron-form-node.component';
import { ActionComponent } from './user-employee/action/action.component';
@NgModule({
  declarations: [SystemSetComponent, RoleComponent, MenuComponent, EmployeeComponent, MyTableNg2Component, SecurityLogComponent, UserEmployeeComponent, 
    UserEmployeeGroupComponent, LayuiTableComponent, AgTableComponent, AgGridActionComponent, OperationLogComponent, GocronComponent, GocronFormComponent, GocronFormNodeComponent, ActionComponent, ],
  imports: [
    CommonModule,
    SystemSetRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbDialogModule,
    NbPopoverModule,
    NbInputModule,
    NbSpinnerModule,
    FormsModule,
    NbSelectModule,

    Ng2SmartTableModule,
    NzPaginationModule,

    AgGridModule.withComponents([]),
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NgZorroAntdModule,


    AgGridModule.withComponents([]),
  ]
})
export class SystemSetModule { }
