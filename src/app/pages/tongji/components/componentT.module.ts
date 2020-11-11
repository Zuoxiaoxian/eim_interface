import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MySelectComponent } from '../components/my-select/my-select.component';
import { MySelectGroupComponent } from '../components/my-select-group/my-select-group.component';
import { MyTableNg2Component } from '../components/my-table-ng2/my-table-ng2.component';
import { FormsModule } from '@angular/forms';
import { NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';


import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';
import { AgTableComponent } from './ag-table/ag-table.component';
import { AgGridActionComponent } from './ag-table/ag-grid-action/ag-grid-action.component';

import { AgGridModule } from 'ag-grid-angular';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@NgModule({
  declarations: [
    MySelectComponent, MySelectGroupComponent,MyTableNg2Component, AgTableComponent, AgGridActionComponent,
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
    MySelectComponent, MySelectGroupComponent,MyTableNg2Component, AgTableComponent,
  ]
})
export class ComponentTModule { }
