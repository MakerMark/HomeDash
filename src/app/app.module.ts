import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './core/components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './shared/nav/nav.component';
import { SensorsComponent } from './core/components/sensors/sensors.component';
import { WeatherComponent } from './core/components/weather/weather.component';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptors';
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";

registerLocaleData(localeIt, 'it');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    SensorsComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
