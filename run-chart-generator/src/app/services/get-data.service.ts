    import { Injectable } from '@angular/core';
    import { Http, Response } from '@angular/http';
    import { Observable } from 'rxjs/Rx';
     
    import 'rxjs/add/operator/map';
     
    @Injectable()
    export class GetDataService {
     
      constructor(private http: Http) {}

        getTest(): Observable<any> {
          return this.http.get('/scrape')
                     .map(response => response.json())
        }
    }