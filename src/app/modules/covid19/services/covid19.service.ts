import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';
import { Covid19 } from '../models/covid19';

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  private readonly API = environment.API

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.API}/countries`)
  }

  getStatisticsCovid19ByCountryByDate(country: string, date: string): Observable<Covid19> {
    return this.http
      .get<Covid19>(`${this.API}/country/${country}?from=${date}T00:00:00Z&to=${date}T00:00:01Z`)
      .pipe(
        map((item: Covid19) => item[0])
      )
  }
}