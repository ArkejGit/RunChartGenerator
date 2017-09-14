    import { Injectable } from '@angular/core';
    import { Http, Response } from '@angular/http';
    import { Observable } from 'rxjs/Rx';
     
    import 'rxjs/add/operator/map';
     
    @Injectable()
    export class GetDataService {
     
      constructor(private http: Http) {}

        getRuns(): Observable<any> {
          return this.http.get('/runs')
                     .map(response => response.json())
        }
    }