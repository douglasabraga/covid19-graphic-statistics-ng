import { Component, OnDestroy, OnInit } from '@angular/core';
import { Covid19Service } from '../services/covid19.service';
import { Covid19 } from '../covid19'
import { Observable, Subscription, zip } from 'rxjs';
import { Covid19Filter } from '../covid19-filter';
import { format } from 'date-fns';
@Component({
  selector: 'app-covid19-list',
  templateUrl: './covid19-list.component.html',
  styleUrls: ['./covid19-list.component.scss']
})
export class Covid19ListComponent implements OnInit, OnDestroy {
  covid19: Covid19[];
  subscription: Subscription;
  filter: Covid19Filter = new Covid19Filter();
  COUNTRIES_SLUG: string[] = ['mexico', 'south-africa', 'brazil', 'cuba', 'egypt', 'peru', 'canada']
  alertMessage: string = ''

  constructor(private covid19Service: Covid19Service) { }

  ngOnInit(): void { }

  onSearch(): void {
    this.checkDateFilled()
    this.subscription = this.getMultipleRequisitions().subscribe({
      next: (result: Covid19[]) => {
        console.log(result)
        if (typeof result[0] === 'undefined') {
          this.resetAlert('Nothing was found!')
        } else {
          this.covid19 = result;
          this.closeAlert()
        }
      },
      error: (e) => {
        console.error(e)
        this.resetAlert('Internal server error!')
      },
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
      this.covid19Service.getStatisticsCovid19ByCountryByDate(this.COUNTRIES_SLUG[6], this.filter.Date)
    )
  }

  checkDateFilled() {
    if (!this.filter.Date) this.filter.Date = this.formatCurrentDate()
  }

  formatCurrentDate(): string {
    return format(new Date, 'yyyy-MM-dd')
  }

  closeAlert() {
    this.alertMessage = ''
  }

  resetAlert(message: string) {
    this.alertMessage = message
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

}
