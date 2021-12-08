import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Covid19 } from '../covid19.model';

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  constructor(private http: HttpClient) { }

  protected UrlServiceV1: string = "https://api.covid19api.com";

    getStatisticsCovid19ByCountry(country: string) : Observable<Covid19[]> {
        return this.http
        .get<Covid19[]>(this.UrlServiceV1 + `/country/${country}?from=2020-06-28T00:00:00Z&to=2020-06-28T00:00:01Z`);
    }
}
