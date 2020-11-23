import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { MiscellaneousComponent } from './miscellaneous.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NbButtonModule, NbCardModule, NbLayoutModule } from '@nebular/theme';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [MiscellaneousComponent, NotFoundComponent, ErrorPageComponent],
  imports: [
    CommonModule,
    MiscellaneousRoutingModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
  ]
})
export class MiscellaneousModule { }
