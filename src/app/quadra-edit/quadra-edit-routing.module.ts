import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuadraEditPage } from './quadra-edit.page';

const routes: Routes = [
  {
    path: '',
    component: QuadraEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule],
  exports: [RouterModule],
})
export class QuadraEditPageRoutingModule { }
