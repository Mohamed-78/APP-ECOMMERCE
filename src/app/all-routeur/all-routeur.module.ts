import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllRouteurPageRoutingModule } from './all-routeur-routing.module';

import { AllRouteurPage } from './all-routeur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllRouteurPageRoutingModule
  ],
  declarations: [AllRouteurPage]
})
export class AllRouteurPageModule {}
