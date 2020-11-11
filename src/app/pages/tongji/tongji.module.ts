import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TongjiRoutingModule } from './tongji-routing.module';
import { TongjiComponent } from './tongji.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';
import { NbSelectModule, NbCardModule, NbButtonModule, NbInputModule, NbProgressBarModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';

// import { MySelectComponent } from './components/my-select/my-select.component';
// import { MySelectGroupComponent } from './components/my-select-group/my-select-group.component';
// import { MyTableNg2Component } from './components/my-table-ng2/my-table-ng2.component';
// import { DateRangeComponent } from './components/date-range/date-range.component';

import { FormsModule } from '@angular/forms';

// import { Ng2SmartTableModule } from 'ng2-smart-table';
import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';

import { TestTaskManageComponent } from './test-task-manage/test-task-manage.component';




// datetime
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE,OwlDateTimeIntl } from 'ng-pick-datetime';
import { TaskProgressForTableComponent } from './test-task-manage/task-progress-for-table/task-progress-for-table.component';
import { DeviceKpiReportComponent } from './device-kpi-report/device-kpi-report.component';
import { KpireportLinkFortableComponent } from './device-kpi-report/kpireport-link-fortable/kpireport-link-fortable.component';
import { ManHourKpiReportComponent } from './man-hour-kpi-report/man-hour-kpi-report.component';
import { ManhourReportLinkFortableComponent } from './man-hour-kpi-report/manhour-report-link-fortable/manhour-report-link-fortable.component';
import { KpiDetailComponent } from './kpi-detail/kpi-detail.component';
import { StatusForTableComponent } from './device-manage/status-for-table/status-for-table.component';
// datetime 本地化标签 
export class DefaultIntl extends OwlDateTimeIntl {
  /** A label for the cancel button */
  cancelBtnLabel= '取消'

  /** A label for the set button */
  setBtnLabel= '确定'

  /** A label for the range 'from' in picker info */
  rangeFromLabel= '开始时间'

  /** A label for the range 'to' in picker info */
  rangeToLabel= '结束时间'

}

export const MY_CUSTOM_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};


import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import  { ComponentTModule } from './components/componentT.module'
import { AgGridModule } from 'ag-grid-angular';
import { TaskProgressForAggridComponent } from './test-task-manage/task-progress-for-aggrid/task-progress-for-aggrid.component';
@NgModule({
  declarations: [TongjiComponent, DeviceManageComponent, 
    // MySelectComponent, MySelectGroupComponent, MyTableNg2Component, DateRangeComponent,
    TestTaskManageComponent,  TaskProgressForTableComponent, 
    DeviceKpiReportComponent, KpireportLinkFortableComponent, ManHourKpiReportComponent,
     ManhourReportLinkFortableComponent, KpiDetailComponent, StatusForTableComponent, TaskProgressForAggridComponent,],
  imports: [
    CommonModule,
    TongjiRoutingModule,
    NbSelectModule,
    NbCardModule,
    FormsModule,
    NbButtonModule,
    NbInputModule,
    NbProgressBarModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbSpinnerModule,

    // 日期-时间
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    
    // 分页
    NzPaginationModule,
    AgGridModule,

    ComponentTModule,

  ],
  providers:[
    {
      provide: OWL_DATE_TIME_LOCALE, useValue: 'zh-cn'
      // provide: OWL_DATE_TIME_LOCALE, useValue: MY_CUSTOM_FORMATS
    },
    {
      provide: OwlDateTimeIntl, useClass: DefaultIntl
    }

  ],
  // exports: [ MySelectComponent, MySelectGroupComponent, MyTableNg2Component, DateRangeComponent]
})
export class TongjiModule { }
