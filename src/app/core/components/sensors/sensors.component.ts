import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    //this.spinner.show();
  }

}
