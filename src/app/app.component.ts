import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private matIconRegistry:MatIconRegistry,
    private domSanitizer: DomSanitizer
    ){
      this.matIconRegistry.addSvgIcon('sunrise', this.domSanitizer.bypassSecurityTrustResourceUrl('./../assets/img/detail-weather/sunrise.svg'));
      this.matIconRegistry.addSvgIcon('sunset', this.domSanitizer.bypassSecurityTrustResourceUrl('./../assets/img/detail-weather/sunset.svg'));
      this.matIconRegistry.addSvgIcon('moonrise', this.domSanitizer.bypassSecurityTrustResourceUrl('./../assets/img/detail-weather/moonrise.svg'));
      this.matIconRegistry.addSvgIcon('moonset', this.domSanitizer.bypassSecurityTrustResourceUrl('./../assets/img/detail-weather/moonset.svg'));
      this.matIconRegistry.addSvgIcon('thermometer', this.domSanitizer.bypassSecurityTrustResourceUrl('./../assets/img/detail-weather/thermometer.svg'));
      this.matIconRegistry.addSvgIcon('mintemp', this.domSanitizer.bypassSecurityTrustResourceUrl('./../assets/img/detail-weather/mintemp.svg'));
      this.matIconRegistry.addSvgIcon('maxtemp', this.domSanitizer.bypassSecurityTrustResourceUrl('./../assets/img/detail-weather/maxtemp.svg'));
    }
  title = 'homeDash';
}
