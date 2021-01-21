import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllRouteurPage } from './all-routeur.page';

const routes: Routes = [
  {
    path: '',
    component: AllRouteurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllRouteurPageRoutingModule {}
