import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';


const modules = [
  ReactiveFormsModule

]


@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [...modules]
})
export class SharedModule { }
