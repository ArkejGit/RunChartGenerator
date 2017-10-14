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
				this.lineChartData[0].data = data;
        this.loadAnimationFlag = false;
        console.log(data);	
			});	
  }


}