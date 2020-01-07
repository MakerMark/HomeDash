import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SensorsService } from '../../services/location/sensors/sensors.service';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import 'moment/locale/it';
import * as Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more.src.js";
import solidGauge from "highcharts//modules/solid-gauge.js";

HighchartsMore(Highcharts);
solidGauge(Highcharts);

@Component({
  selector: 'app-socket-widget',
  templateUrl: './socket-widget.component.html',
  styleUrls: ['./socket-widget.component.scss']
})
export class SocketWidgetComponent implements OnInit {
  @Input() socketId: string = '';
  @ViewChild('socketChart', null) chart: ElementRef;
  @ViewChild('chart', null) gauge;

  socketData: any;
  public Highcharts = Highcharts;
  currentW = 0;
  public update = false;
  public options = {
    chart: {
      type: "solidgauge"
    },

    title: {
      text: "Consumo Attuale"
    },

    pane: {
      center: ["50%", "85%"],
      size: "140%",
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: "#EEE",
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc"
      }
    },

    tooltip: {
      enabled: false
    },

    yAxis: {
      stops: [[0.1, "#55BF3B"], [0.5, "#DDDF0D"], [0.9, "#DF5353"]],
      min: 0,
      max: 100,
      lineWidth: 0,
      tickAmount: 6,
      labels: {
        y: 16
      }
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true
        }
      }
    },

    series: [
      {
        name: "Consumo Attuale",
        data: [this.currentW],
        dataLabels: {
          format:
            '<div style="text-align:center"><span style="font-size:25px;color:"black">{y}</span><br/>' +
            '<span style="font-size:12px;color:silver">W</span></div>'
        }
      }
    ]
  };

  constructor(
    private sensorService: SensorsService
  ) { }

  ngOnInit() {
    this.sensorService.getSensorsWithId(this.socketId).subscribe(
      res => {
        this.socketData = res;
        this.createChart();
      }, err => {
        console.log("Error", err);
      }
    )
  }

  createChart() {
    let chartData = [];
    let chartLabel = [];
    for (var i = 0; i < this.socketData.rilevazioni.length; i++) {
      chartData.push(this.socketData.rilevazioni[i].measuredW);
      chartLabel.push(moment(Number(this.socketData.rilevazioni[i].timestamp) * 1000).format('LTS'));
    }
    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    }
    chartLabel = chartLabel.filter(distinct);
    this.socketData.lastUpdate = moment(Number(this.socketData.lastUpdate) * 1000).format('LLLL')
    const ctx = this.chart.nativeElement.getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartLabel,
        datasets: [{
          label: 'W Misurati',
          data: chartData,
          borderWidth: 3,
          borderColor: "#FF4081",
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Consumi Rilevati'
        }
      }
    });
    this.updateGauge(this.socketData.currentW);
  }

  private updateGauge(value) {
    this.currentW = value;
    this.options.series["0"].data[0] = value;
    this.update = true;
  }

}
