import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilityHealthDataCenterRoutingModule } from './facility-health-data-center-routing.module';
import { FacilityHealthDataCenterComponent } from './facility-health-data-center.component';
import { MySelectComponent } from './components/my-select/my-select.component';
import { MySelectGroupComponent } from './components/my-select-group/my-select-group.component';
import { DateRangeComponent } from './components/date-range/date-range.component';


// import { Ng2SmartTableModule } from 'ng2-smart-table';
import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';

// datetime
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE,OwlDateTimeIntl } from 'ng-pick-datetime';
import { NbCardModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { AlertGradeForTableComponent } from './alert-grade-for-table/alert-grade-for-table.component';
import { OperationForTableComponent } from './operation-for-table/operation-for-table.component';

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

@NgModule({
  declarations: [FacilityHealthDataCenterComponent, MySelectComponent, MySelectGroupComponent, DateRangeComponent, AlertGradeForTableComponent, OperationForTableComponent],
  imports: [
    CommonModule,
    FacilityHealthDataCenterRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    FormsModule,

    // 日期-时间
    OwlDateTimeModule,
    OwlNativeDateTimeModule,


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
export class FacilityHealthDataCenterModule { }
