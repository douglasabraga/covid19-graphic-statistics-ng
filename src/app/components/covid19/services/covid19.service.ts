import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Covid19 } from '../covid19.model';

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {
  
  private readonly API = environment.API

  constructor(private http: HttpClient) { }

    getStatisticsCovid19ByCountry(country: string) : Observable<Covid19[]> {
        return this.http
        .get<Covid19[]>(this.API + `/country/${country}?from=2020-06-28T00:00:00Z&to=2020-06-28T00:00:01Z`)
    }
}
