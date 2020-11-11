import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AndonComponent } from './andon-manage/andon/andon.component';

import { PagesPopupsComponent } from './pages-popups.component'
import { MenuComponent } from './system-set//menu/menu.component';
import { EditMenuComponent } from './system-set/edit-menu/edit-menu.component';
import { EditRoleComponent } from './system-set/edit-role/edit-role.component';

const routes: Routes = [
  {
    path: '',
    component: PagesPopupsComponent,
    children:[
      {
        path:'menu/add',
        component: MenuComponent,
      },
      {
        path:'menu/edit',
        component: EditMenuComponent,
      },
      {
        path:'role/edit',
        component: EditRoleComponent,
      },
      {
        path:'andon',
        component: AndonComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesPopupsRoutingModule { }
