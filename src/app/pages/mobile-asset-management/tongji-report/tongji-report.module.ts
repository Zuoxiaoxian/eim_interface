import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TongjiReportRoutingModule } from './tongji-report-routing.module';
import { TongjiReportComponent } from './tongji-report.component';
import { NbCardModule, NbMenuModule, NbSelectModule, NbButtonModule } from '@nebular/theme';
import { DriveReportComponent } from './drive-report/drive-report.component';
import { AlertReportComponent } from './alert-report/alert-report.component';
import { MySelectComponent } from './components/my-select/my-select.component';
import { FormsModule } from '@angular/forms';
import { DateRangeComponent } from './components/date-range/date-range.component';

// datetime
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE,OwlDateTimeIntl } from 'ng-pick-datetime';
import { MyTableNg2Component } from './components/my-table-ng2/my-table-ng2.component';

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


// import { Ng2SmartTableModule } from 'ng2-smart-table';
import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';

@NgModule({
  declarations: [TongjiReportComponent, DriveReportComponent, AlertReportComponent, MySelectComponent, DateRangeComponent, MyTableNg2Component],
  imports: [
    CommonModule,
    TongjiReportRoutingModule,
    NbCardModule,
    NbMenuModule,
    NbSelectModule,
    FormsModule,
    NbButtonModule,

    // 日期-时间
    OwlDateTimeModule,
    OwlNativeDateTimeModule,


    Ng2SmartTableModule,

  ],

  providers:[
    {
      provide: OWL_DATE_TIME_LOCALE, useValue: 'zh-cn'
      // provide: OWL_DATE_TIME_LOCALE, useValue: MY_CUSTOM_FORMATS
    },
    {
      provide: OwlDateTimeIntl, useClass: DefaultIntl
    }

  ]

})
export class TongjiReportModule { }
