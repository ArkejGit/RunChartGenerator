    import { Injectable } from '@angular/core';
    import { Http, Response } from '@angular/http';
    import { Observable } from 'rxjs/Rx';
     
    import 'rxjs/add/operator/map';
     
    @Injectable()
    export class GetDataService {
     
      constructor(private http: Http) {}

        getRuns(number): Observable<Response> {
          return this.http.get(`/runs?number=${number}`)
                     .map(response => response.json())
        }
    }