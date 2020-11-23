import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AndonComponent } from './andon-manage/andon/andon.component';

import { PagesPopupsComponent } from './pages-popups.component'

const routes: Routes = [
  {
    path: '',
    component: PagesPopupsComponent,
    children:[
      // {
      //   path:'menu/add',
      //   component: MenuComponent,
      // },
      
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
