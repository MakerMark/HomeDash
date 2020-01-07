import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SensorsService } from '../../services/location/sensors/sensors.service';
import * as moment from 'moment';
import 'moment/locale/it';
import { Chart } from 'chart.js';
import { distinct } from 'rxjs/operators';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {
  @ViewChild('tempChart', null) chart: ElementRef;
  sensorList: any;
  temperatureList: any = [];

  constructor(
    private spinner: NgxSpinnerService,
    private sensorService: SensorsService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.sensorService.getSensors().subscribe(
      res => {
        this.sensorList = res;
        for (var i = 0; i < this.sensorList.temperature.length; i++) {
          this.sensorService.getSensorsWithId(this.sensorList.temperature[i].id).subscribe(
            res => {
              this.temperatureList.push(res);
              this.createChart();
              this.spinner.hide();
            },
            err => console.log("err", err)
          )
        }
        this.spinner.hide();
      },
      err => console.log("err", err)
    )
  }

  createChart() {
    let chartData = [];
    let chartLabel = [];
    for (var i = 0; i < this.temperatureList.length; i++) {
      let dataSet = {};
      dataSet['label'] = this.temperatureList[i].descrizione;
      dataSet['borderWidth'] = 3;
      dataSet['borderColor'] = '#' + Math.floor(Math.random() * 16777215).toString(16);
      dataSet['data'] = [];
      for (var x = 0; x < this.temperatureList[i].rilevazioni.length; x++) {
        dataSet['data'].push(this.temperatureList[i].rilevazioni[x].measured);
        chartLabel.push(moment(Number(this.temperatureList[i].rilevazioni[x].timestamp) * 1000).format('LTS'));
      }
      chartData.push(dataSet);
    };
    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    }
    chartLabel = chartLabel.filter(distinct);
    const ctx = this.chart.nativeElement.getContext('2d');
    var data = {
      labels: chartLabel,
      datasets: chartData
    };
    var myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Temperature Rilevate'
        }
      }
    });
  }
}
