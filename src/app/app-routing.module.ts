import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { SensorsComponent } from './core/components/sensors/sensors.component';
import { WeatherComponent } from './core/components/weather/weather.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'sensors', component: SensorsComponent },
  { path: '', redirectTo: '/weather', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
