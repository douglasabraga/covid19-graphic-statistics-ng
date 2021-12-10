import { Component, OnDestroy, OnInit } from '@angular/core';
import { Covid19Service } from '../services/covid19.service';
import { Covid19 } from '../covid19.model'
import { map, Observable, Subscription, zip } from 'rxjs';
import { Covid19Filter } from '../covid19-filter';
import { format } from 'date-fns';

@Component({
  selector: 'app-covid19-list',
  templateUrl: './covid19-list.component.html',
  styleUrls: ['./covid19-list.component.scss']
})
export class Covid19ListComponent implements OnInit, OnDestroy {

  public covid19: Covid19[];
  private subscription: Subscription;
  public filter: Covid19Filter = new Covid19Filter();
  COUNTRIES_SLUG: string[] = ['mexico', 'south-africa', 'brazil', 'cuba', 'egypt', 'peru', 'canada']

  constructor(private covid19Service: Covid19Service) { }

  ngOnInit(): void {
    this.filter.Date = this.formatCurrentDate()
    console.log(this.filter.Date)
  }

  onSearch(): void {
    this.covid19 = [];
    this.subscription = this.getMultipleRequisitions().subscribe({
      next: (result: Covid19[]) => {
        console.log(result)
        if (result)
          this.covid19 = result.filter(item => typeof item != 'undefined')
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  getMultipleRequisitions(): Observable<Covid19[]> {
    return zip(
      this.covid19Service.getStatisticsCovid19ByCountryByDate(this.COUNTRIES_SLUG[0], this.filter.Date),
      this.covid19Service.getStatisticsCovid19ByCountryByDate(this.COUNTRIES_SLUG[1], this.filter.Date),
      this.covid19Service.getStatisticsCovid19ByCountryByDate(this.COUNTRIES_SLUG[2], this.filter.Date),
      this.covid19Service.getStatisticsCovid19ByCountryByDate(this.COUNTRIES_SLUG[3], this.filter.Date),
      this.covid19Service.getStatisticsCovid19ByCountryByDate(this.COUNTRIES_SLUG[4], this.filter.Date),
      this.covid19Service.getStatisticsCovid19ByCountryByDate(this.COUNTRIES_SLUG[5], this.filter.Date),
      this.covid19Service.getStatisticsCovid19ByCountryByDate(this.COUNTRIES_SLUG[6], this.filter.Date))
      .pipe(
        map(arrayCovid19 => arrayCovid19.map(item => item[0]))
      )
  }

  formatCurrentDate(): string {
    return format(new Date, 'yyyy-MM-dd')
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

}
