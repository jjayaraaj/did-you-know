import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TitlePageRoutingModule } from './title-routing.module';

import { TitlePage } from './title.page';
import { ComponentModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    TitlePageRoutingModule
  ],
  declarations: [TitlePage]
})
export class TitlePageModule {}
