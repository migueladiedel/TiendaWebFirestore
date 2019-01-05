import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireAuthModule } from "angularfire2/auth";

import { AuthRoutingModule } from '@auth/auth-routing.module';
import { AuthService } from '@auth/auth.service';
import { SharedModule } from "@shared/shared.module";
import { FormComponent } from '@auth/form/form.component';
import { RegisterComponent } from '@auth/register/register.component';
import { LoginComponent } from '@auth/login/login.component';
import { AuthGuard } from '@auth/auth.guard';
import { CustomerGuard } from '@auth/customer.guard';

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
