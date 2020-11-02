import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DykPage } from './dyk.page';

const routes: Routes = [
  {
    path: '',
    component: DykPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DykPageRoutingModule {}
