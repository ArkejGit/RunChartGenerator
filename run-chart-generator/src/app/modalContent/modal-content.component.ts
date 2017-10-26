import { Component, Input, Injectable, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetDataService } from '../services/get-data.service';
//import { ChartsModule } from 'ng2-charts/ng2-charts';

@Injectable()
@Component({
  selector: 'modal-content',
  templateUrl: './modal-comtent.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContent implements OnInit {
  @Input() link;

  constructor(private getDataService: GetDataService, public activeModal: NgbActiveModal) {}

  results;
  loadAnimationFlag:boolean = false;
  chartFlag:boolean = false;

  lineChartData:Array<any> = [
    {data: []}
  ];
  lineChartLabels:Array<any> = [];
  lineChartOptions:any = {
    responsive: true
  };
  lineChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(0,123,255,0.2)',
      borderColor: 'rgba(0,123,255,0.8)',
      pointBackgroundColor: 'rgba(0,123,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,193,7,0.8)'
    }
  ];
  lineChartLegend:boolean = false;
  lineChartType:string = 'line';

  ngOnInit() { 
	this.loadResults();
  }

  loadResults() {
  this.loadAnimationFlag = true;
	this.getDataService.getResults(this.link)
			.subscribe(data => {
        this.results = data;

        //not display chart when there are not enough results
        if (this.results.length < 30) {
          this.loadAnimationFlag = false;
          return;
        }

        let distribution = this.distribution(data);
        this.lineChartData[0].data = distribution.distribution;
        this.lineChartLabels = distribution.intervalsFormatted;
        this.loadAnimationFlag = false;
        this.chartFlag = true;
			});	
  }

  distribution(data) {
    let interval = (data[data.length-1] - data[0]) / 10;
    let intervals = [];
    for (let i=1; i<=10; i++) {
      intervals.push(data[0] + interval * i);
    }
    let distribution = new Array(10).fill(0);

    data.forEach(result => {
      intervals.every((interval, i) => {
        if (result <= interval) {
          distribution[i]++;
          return false;
        }
        else return true;
      })
    });

    let intervalsFormatted = intervals.map(interval => {
      let intervalRounded = Math.round(interval);
      let h = Math.floor(intervalRounded / 3600);
      let m = Math.floor((intervalRounded % 3600) / 60);
      let s = intervalRounded % 60;
      return `${h}:${m<10 ? '0'+m : m}:${s<10 ? '0'+s : s}`;
    })

    return {
      distribution: distribution,
      intervals: intervals,
      intervalsFormatted: intervalsFormatted
    }
  }


}