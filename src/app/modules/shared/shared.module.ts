import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { AutofocusDirective } from 'src/app/directives/autofocus.directive';
import { ValidationComponent } from './components/validation/validation.component';
const modules = [
  ReactiveFormsModule,
]
const customDeclarations = [
  LoadingComponent,
  AutofocusDirective,
  ValidationComponent,

]


@NgModule({
  declarations: customDeclarations,
  imports: [
    CommonModule,
    ...modules,
  ],
  exports: [...modules, ...customDeclarations]
})
export class SharedModule { }
