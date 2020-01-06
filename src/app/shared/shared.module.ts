import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material.module';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [ ],
  exports: [
      AngularMaterialModule,
      NgxSpinnerModule
    ]
})
export class SharedModule { }