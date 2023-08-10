import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';


const modules = [
  ReactiveFormsModule

]
const customDeclarations = [
  LoadingComponent,
]


@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ...modules,
  ],
  exports: [...modules, ...customDeclarations]
})
export class SharedModule { }
