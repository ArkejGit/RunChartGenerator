import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GetDataService } from './services/get-data.service';
import { ModalContent } from './modalContent/modal-content.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private getDataService: GetDataService, private modalService: NgbModal) { }
	
	runs = {};
	numberOfRuns:number = 0;
	searchValue:string;
	loadAnimationFlag:boolean;

	loadRuns() {
		this.loadAnimationFlag = true;
  		this.getDataService.getRuns(this.numberOfRuns)
  			.subscribe(data => {
  				this.runs = data;
  				this.numberOfRuns = Object.keys(this.runs).length;
  				this.loadAnimationFlag = false;
  			});	
	}

	getRunName(link) {
		return link.match(/[^/]*$/)[0].slice(0, -4);
	}

	clearInput() {
		this.searchValue = '';
	}

	open(link) {
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.link = link;
  }
}
