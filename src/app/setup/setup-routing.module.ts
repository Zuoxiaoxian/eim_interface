import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupComponent } from './setup.component';

// admin login
import { AdminLoginComponent } from './admin-login/admin-login.component';

// user login
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  {
    path: '',
    component: SetupComponent,
    children:[
      // { path: 'adminlogin', component: AdminLoginComponent },
      { path: 'eobkxrldmtzypncsifvqwjhaug', component: AdminLoginComponent },
      { path: "login", component: UserLoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full '}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
