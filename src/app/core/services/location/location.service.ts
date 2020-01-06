import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getLocation(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ longitude: resp.coords.longitude, latitude: resp.coords.latitude });
      },
        err => {
          reject({ longitude: null, latitude: null });
        });
    });
  }
}
