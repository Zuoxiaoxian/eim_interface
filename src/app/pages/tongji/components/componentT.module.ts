import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MySelectComponent } from '../components/my-select/my-select.component';
import { MySelectGroupComponent } from '../components/my-select-group/my-select-group.component';
import { FormsModule } from '@angular/forms';
import { NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';


import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';
import { AgTableComponent } from './ag-table/ag-table.component';
import { AgGridActionComponent } from './ag-table/ag-grid-action/ag-grid-action.component';

import { AgGridModule } from 'ag-grid-angular';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { MySelectTreeComponent } from './my-select-tree/my-select-tree.component';
import { MySelectTreeTypeComponent } from './my-select-tree-type/my-select-tree-type.component';
import { MySelectTreeTypeComponent as MySelectTreeTypeComponentType} from './my-select-tree-type/my-select-tree-type.component';
@NgModule({
  declarations: [
    MySelectComponent, MySelectGroupComponent, AgTableComponent, AgGridActionComponent, MySelectTreeComponent, MySelectTreeTypeComponent,
    MySelectTreeTypeComponentType,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbSelectModule,
    NbInputModule,
    NbIconModule,
    Ng2SmartTableModule,
    AgGridModule,
    NzPaginationModule,
  ],
  exports: [
    MySelectComponent, MySelectGroupComponent, AgTableComponent,MySelectTreeComponent,MySelectTreeTypeComponentType
  ]
})
export class ComponentTModule { }
