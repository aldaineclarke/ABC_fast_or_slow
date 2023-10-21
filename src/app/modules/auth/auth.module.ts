import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { PasswordMatchDirective } from 'src/app/directives/password-match.directive';


@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    PasswordMatchDirective
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
