import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SensorsService } from '../../services/location/sensors/sensors.service';
import * as moment from 'moment';
import 'moment/locale/it';
import { Chart } from 'chart.js';

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
        for(var i = 0; i < this.sensorList.temperature.length; i++){
          this.sensorService.getSensorsWithId(this.sensorList.temperature[i].id).subscribe(
            res => {
              this.temperatureList.push(res);
              this.createChart();
              this.spinner.hide();
            },
            err => console.log("err",err)
          )
        }
        this.spinner.hide();
      },
      err => console.log("err",err)
    )
  }

  createChart() {
    let chartData = [];
    let chartLabel = [];
    let dataSet = {};
    for (var i = 0; i < 1; i++) {
      dataSet['label'] = this.temperatureList[i].descrizione;
      dataSet['borderWidth'] = 3;
      dataSet['borderColor'] = "#FF4081";
      dataSet['data'] = [];
      for(var x = 0; x < this.temperatureList[i].rilevazioni.length; x++){
        dataSet['data'].push(this.temperatureList[i].rilevazioni[x].measured);
        chartLabel.push(moment(Number(this.temperatureList[i].rilevazioni[x].timestamp) * 1000).format('LTS'));
      }
      chartData.push(dataSet);
    }
    console.log(chartData, chartLabel);
    const ctx = this.chart.nativeElement.getContext('2d');
    var data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
          label: "Stock A",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(225,0,0,0.4)",
          borderColor: "red", // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "black",
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "yellow",
          pointHoverBorderColor: "brown",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          // notice the gap in the data and the spanGaps: true
          data: [65, 59, 80, 81, 56, 55, 40, ,60,55,30,78],
          spanGaps: true,
        },{
          label: "Stock B",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(225,200,0,0.4)",
          borderColor: "green", // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "black",
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "yellow",
          pointHoverBorderColor: "brown",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          // notice the gap in the data and the spanGaps: true
          data: [55, 40, ,60,55,30,78],
          spanGaps: true,
        }
      ]
    };
    
    // Notice the scaleLabel at the same level as Ticks
    var options = {
      scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                         display: true,
                         labelString: 'Moola',
                         fontSize: 20 
                      }
                }]            
            }  
    };
    
    // Chart declaration:
    var myBarChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });
    /*let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartLabel,
        datasets: chartData
      },
      options: {
        responsive: false,
        display: true
      }
    });*/
  }
}
