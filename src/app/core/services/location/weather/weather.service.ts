import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Weather, weatherData } from 'src/app/core/models/weather.model';
import * as moment from 'moment';
import 'moment/locale/it';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getWeather(location) {
        if (location.cityN) {
            return this.httpClient.get<Weather>('http://localhost:8186/api/v1/weather/city/' + location.cityN)
                .pipe(
                    map(response => {
                        for(let i = 0; i < response.data.length; i++){
                            let temp = response.data[i].datetime.split("-");
                            response.data[i].datetime = temp[2] + "-" + temp[1] + "-" + temp[0];
                            response.data[i].sunrise_ts = moment(Number(response.data[i].sunrise_ts) * 1000).format('LTS');
                            response.data[i].sunset_ts = moment(Number(response.data[i].sunset_ts) * 1000).format('LTS');
                            response.data[i].moonrise_ts = moment(Number(response.data[i].moonrise_ts) * 1000).format('LTS');
                        }
                        return response;
                    }),
                    catchError((err: HttpErrorResponse) => {
                        console.log("ERROR city", err);
                        return Observable.throw(err);
                    })
                )
        } else if (location.latitude && location.longitude) {
            return this.httpClient.get<Weather>('http://localhost:8186/api/v1/weather/coord?lat=' + location.latitude + '&lon=' + location.longitude)
                .pipe(
                    map(response => {
                        for(let i = 0; i < response.data.length; i++){
                            let temp = response.data[i].datetime.split("-");
                            response.data[i].datetime = temp[2] + "-" + temp[1] + "-" + temp[0];
                            response.data[i].sunrise_ts = moment(Number(response.data[i].sunrise_ts) * 1000).format('LTS');
                            response.data[i].sunset_ts = moment(Number(response.data[i].sunset_ts) * 1000).format('LTS');
                            response.data[i].moonrise_ts = moment(Number(response.data[i].moonrise_ts) * 1000).format('LTS');
                        }
                        return response;
                    }),
                    catchError((err: HttpErrorResponse) => {
                        console.log("ERROR lat lon", err);
                        return Observable.throw(err);
                    })
                )
        }
    }
}