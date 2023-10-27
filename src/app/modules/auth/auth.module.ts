import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { PasswordMatchDirective } from 'src/app/directives/password-match.directive';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    PasswordMatchDirective,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
