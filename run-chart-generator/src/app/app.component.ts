import { Component } from '@angular/core';

import { GetDataService } from './services/get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private getDataService: GetDataService) { }
	
	runs:object;

	getTestTwo() {
  		this.getDataService.getTest()
  			.subscribe(data => {
  				this.runs = data;
  				console.log(this.runs);
  			});	
	}
}
