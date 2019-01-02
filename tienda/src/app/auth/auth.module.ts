import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import {AngularFireAuthModule} from "angularfire2/auth";
import {SharedModule} from "../shared/shared.module";
import { FormComponent } from './form/form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CustomerGuard } from './customer.guard';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularFireAuthModule,
    SharedModule
  ],
  declarations: [FormComponent, RegisterComponent, LoginComponent],
  providers: [AuthService, AuthGuard, CustomerGuard]
})
export class AuthModule { }
