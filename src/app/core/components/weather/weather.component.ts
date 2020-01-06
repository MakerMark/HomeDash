import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location/location.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Weather, weatherData } from '../../models/weather.model';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WeatherService } from '../../services/location/weather/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  noLocation: boolean;
  weatherData: Weather;
  currentWeather: weatherData;
  constructor(
    private locationService: LocationService,
    private spinner: NgxSpinnerService,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.noLocation = false;
    this.spinner.show();
    this.locationService.getLocation().then(async pos => {
      if (pos.latitude && pos.longitude) {
        this.getWeatherData(pos);
      } else {
        let loc = await this.getLocationFromUser();
        this.getWeatherData(loc);
      }
    }, async error => {
      let loc = await this.getLocationFromUser();
      this.getWeatherData(loc);
    });
  }

  async getLocationFromUser() {
    const { value: cityName } = await Swal.fire({
      title: 'Inserisci la città',
      input: 'text',
      inputValue: '',
      inputValidator: (value) => {
        if (!value) {
          return 'Devi scrivere qualcosa!'
        }
      }
    })

    if (cityName) {
      return { cityN: cityName };
    }
  }

  getWeatherData(location) {
    console.log("GET WE DATA", location);
    if (!location) {
      this.noLocation = true;
      this.spinner.hide();
      return;
    } else {
      this.weatherService.getWeather(location).subscribe(
        res => {
          this.currentWeather = res.data.shift();
          this.weatherData = res;
          this.spinner.hide();
          console.log("RES ON COMP", res);
        },
        err => {
          Swal.fire({
            title: 'Errore generico Server',
          });
          this.spinner.hide();
          console.log("Error on get weather", err);
        }
      )
    }
  }
}
