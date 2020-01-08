import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { SpeechRecognitionService } from '@kamiazya/ngx-speech-recognition';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    SpeechRecognitionService,
  ],
})
export class HomeComponent implements OnInit {
  gifImg: string = "";
  message: string = "";
  newsList = [];
  listenStarted = false;
  private httpClient: HttpClient;
  constructor(
    handler: HttpBackend,
    public micService: SpeechRecognitionService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.httpClient = new HttpClient(handler);
    this.micService.onstart = (e) => {
      console.log('onstart');
    };
    this.micService.onresult = (e) => {
      this.message = e.results[0].item(0).transcript;
      console.log('MainComponent:onresult', this.message, e);
      if (this.message.toLowerCase().includes("meteo")) {
        this.router.navigate(["/weather"]);
      } else if (this.message.toLowerCase().includes("sensori") || this.message.toLowerCase().includes("sensore")) {
        this.router.navigate(["/sensors"]);
      }
    }
  }

  ngOnInit() {
    this.spinner.show();
    this.httpClient.get("https://api.giphy.com/v1/gifs/random?api_key=ESRXmG4X6jN4WK5nOgtScaQNdvBFoBO4").subscribe(
      (res: any) => {
        this.gifImg = res.data.image_original_url
      },
      err => console.log(err)
    )
    this.httpClient.get("https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=pelANSXABvbWDRCGEWmbXn2psf10w18T").subscribe(
      (res: any) => {
        for (let i = 0; i < res.results.length; i++) {
          if (res.results[i].multimedia) {
            res.results[i]['imageToDisplay'] = res.results[i].multimedia[res.results[i].multimedia.length - 1].url
          } else {
            res.results[i]['imageToDisplay'] = './../../../../assets/img/ny.png';
          }
        }
        this.newsList = res.results;
        this.spinner.hide();
      },
      err => {
        console.log(err);
        this.spinner.hide();
      },
    )
  }

  listen() {
    this.micService.start();
    this.listenStarted = true;
    this.spinner.show();
    setTimeout(() => {
      this.stopListen();
    }, 10000);
  }

  stopListen(){
    this.micService.stop();
    this.spinner.hide();
    this.listenStarted = false;    
  }

}
