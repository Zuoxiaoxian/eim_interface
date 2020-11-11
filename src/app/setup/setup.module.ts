import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { SetupComponent } from './setup.component';
import { NbLayoutModule, NbCardModule, NbTabsetModule, NbCheckboxModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';


@NgModule({
  declarations: [SetupComponent, UserLoginComponent, AdminLoginComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    NbLayoutModule,
    NbCardModule,
    NbTabsetModule,
    NbCheckboxModule,
    NbFormFieldModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSpinnerModule,
  ]
})
export class SetupModule { }
