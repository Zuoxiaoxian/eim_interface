import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

import { AuthGuard } from './setup/auth/auth.guard';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'popus',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./pages-popups/pages-popups.module')
      .then(m => m.PagesPopupsModule),
  },
  {
    path: 'setup',
    loadChildren: () => import('./setup/setup.module')
      .then(m => m.SetupModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'setup', pathMatch: 'full' },
  // { path: '**', redirectTo: 'pages' },
  // 404 界面
  {
    path: 'miscellaneous',
    loadChildren: () => import('./miscellaneous/miscellaneous.module')
      .then(m => m.MiscellaneousModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  
  {
    path: '**',
    redirectTo: 'miscellaneous',
    pathMatch: 'full'
  },
 

  
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  // imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
