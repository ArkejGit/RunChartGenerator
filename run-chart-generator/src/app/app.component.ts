import { Component } from '@angular/core';

import { GetDataService } from './services/get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private getDataService: GetDataService) { }
	
	runs = {};
	numberOfRuns = 0;

	loadRuns() {
  		this.getDataService.getRuns(this.numberOfRuns)
  			.subscribe(data => {
  				this.runs = data;
  				console.log(this.runs);
  				this.numberOfRuns = Object.keys(this.runs).length;
  			});	
	}
}
