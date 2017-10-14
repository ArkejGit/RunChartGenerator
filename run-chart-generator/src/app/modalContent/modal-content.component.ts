import { Component, Input, Injectable, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetDataService } from '../services/get-data.service';

@Injectable()
@Component({
  selector: 'modal-content',
  templateUrl: './modal-comtent.component.html'
})
export class ModalContent implements OnInit {
  @Input() link;

  constructor(private getDataService: GetDataService, public activeModal: NgbActiveModal) {}

  results:any;
  loadAnimationFlag:boolean;

  ngOnInit() { 
	this.loadResults();
  }

  loadResults() {
  this.loadAnimationFlag = true;
	this.getDataService.getResults(this.link)
			.subscribe(data => {
				this.results = 'done';
        this.loadAnimationFlag = false;
        console.log(data);  				
			});	
  }
}