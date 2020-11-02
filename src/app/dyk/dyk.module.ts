import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DykPageRoutingModule } from './dyk-routing.module';

import { DykPage } from './dyk.page';
import { ComponentModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DykPageRoutingModule,
    ComponentModule
  ],
  declarations: [DykPage]
})
export class DykPageModule {}
