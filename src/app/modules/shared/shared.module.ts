import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { AutofocusDirective } from 'src/app/directives/autofocus.directive';


const modules = [
  ReactiveFormsModule

]
const customDeclarations = [
  LoadingComponent,
  AutofocusDirective

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
