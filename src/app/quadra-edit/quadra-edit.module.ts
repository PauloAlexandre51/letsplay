import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuadraEditPageRoutingModule } from './quadra-edit-routing.module';

import { QuadraEditPage } from './quadra-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuadraEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [QuadraEditPage]
})
export class QuadraEditPageModule { }
