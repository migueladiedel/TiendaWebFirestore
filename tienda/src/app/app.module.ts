import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AdminModule } from './admin/admin.module';
import { ShopModule } from './shop/shop.module';
import { NavigationComponent } from './common/navigation/navigation.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    AdminModule,
    ShopModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
