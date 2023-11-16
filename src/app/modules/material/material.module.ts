import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog'

const materialComponents = [
  MatDialogModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialComponents

  ],
  exports:materialComponents
})
export class MaterialModule { }
