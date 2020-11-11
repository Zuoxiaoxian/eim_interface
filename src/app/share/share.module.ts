import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartCurveComponent } from './chart/chart-curve/chart-curve.component';
import { NbIconModule } from '@nebular/theme';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { ChartCurveV3Component } from './chart/chart-curve-v3/chart-curve-v3.component';
import { NzDropDownModule, NzSelectModule } from 'ng-zorro-antd';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';



@NgModule({
  declarations: [ChartCurveComponent, ChartCurveV3Component],
  imports: [
    CommonModule,NbIconModule,NzCheckboxModule,FormsModule,NzDropDownModule,NzSelectModule,TranslateModule
  ],
  exports:[ChartCurveComponent,ChartCurveV3Component],
  providers:[
    TranslatePipe
  ]
})
export class ShareModule { }
