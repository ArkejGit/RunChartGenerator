import { Component } from '@angular/core';

import { GetDataService } from './services/get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private getDataService: GetDataService) { }
	
	title = 'Run Chart Generator';
	data;

	getTestTwo() {
  		this.getDataService.getTest()
  			.subscribe(data => {
  				this.data = data;
  				console.log(this.data)
  			});
	}
}
