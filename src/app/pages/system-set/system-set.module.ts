import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemSetRoutingModule } from './system-set-routing.module';
import { SystemSetComponent } from './system-set.component';
import { RoleComponent } from './role/role.component';
import { NbButtonModule, NbCardModule, NbTreeGridModule, NbIconModule, NbDialogModule, NbPopoverModule, NbInputModule, NbSpinnerModule, NbSelectModule, NbActionsModule   } from '@nebular/theme';
import { MenuComponent } from './menu/menu.component';

// import { Ng2SmartTableModule } from 'ng2-smart-table';

import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';
import { EmployeeComponent } from './employee/employee.component';
import { SecurityLogComponent } from './security-log/security-log.component';
import { UserEmployeeComponent } from './user-employee/user-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEmployeeGroupComponent } from './user-employee-group/user-employee-group.component';


import { NgZorroAntdModule, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule } from 'ng-zorro-antd';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { LayuiTableComponent } from './components/layui-table/layui-table.component';
import { AgTableComponent } from './components/ag-table/ag-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { OperationLogComponent } from './operation-log/operation-log.component';
import { GocronComponent } from './gocron/gocron.component';
import { GocronFormComponent } from './gocron/gocron-form/gocron-form.component';
import { GocronFormNodeComponent } from './gocron/gocron-form-node/gocron-form-node.component';
import { ActionComponent } from './user-employee/action/action.component';
import { NewUserEmployeeComponent } from './new-user-employee/new-user-employee.component';
import { ActionComponent as NewActionComponent } from './new-user-employee/action/action.component';
import { TranActiveComponent } from './new-user-employee/tran-active/tran-active.component';
@NgModule({
  declarations: [SystemSetComponent, RoleComponent, MenuComponent, EmployeeComponent,  SecurityLogComponent, UserEmployeeComponent, 
    UserEmployeeGroupComponent, LayuiTableComponent, AgTableComponent,  OperationLogComponent, GocronComponent, GocronFormComponent, GocronFormNodeComponent, ActionComponent, NewUserEmployeeComponent, NewActionComponent, TranActiveComponent, ],
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
