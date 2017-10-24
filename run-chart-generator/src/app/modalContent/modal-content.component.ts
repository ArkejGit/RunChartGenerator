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
  loadAnimationFlag:boolean;
  lineChartData:Array<any> = [
    {data: []}
  ];
  lineChartLabels:Array<any> = [1,2,3,4,5,6,7,8,9,10];
  lineChartOptions:any = {
    responsive: true
  };
  lineChartType:string = 'line';

  ngOnInit() { 
	this.loadResults();
  }

  loadResults() {
  this.loadAnimationFlag = true;
	this.getDataService.getResults(this.link)
			.subscribe(data => {
        let distribution = this.distribution(data);
        this.lineChartData[0].data = distribution;
        this.loadAnimationFlag = false;
        console.log(data, distribution);	
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
    return distribution;
  }


}