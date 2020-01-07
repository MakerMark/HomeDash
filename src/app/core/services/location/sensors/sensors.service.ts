import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';
import 'moment/locale/it';

@Injectable({
    providedIn: 'root'
})
export class SensorsService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getSensors() {
        return this.httpClient.get('http://localhost:8186/api/v1/sensors/all')
            .pipe(
                map(response => {return response}),
                catchError((err: HttpErrorResponse) => {
                    console.log("ERROR sensor list", err);
                    return Observable.throw(err);
                })
            )
    }

    getSensorsWithId(id) {
        return this.httpClient.get('http://localhost:8186/api/v1/sensors/' + id)
            .pipe(
                map(response => {return response;}),
                catchError((err: HttpErrorResponse) => {
                    console.log("ERROR sensor ID", err);
                    return Observable.throw(err);
                })
            )
    }
}