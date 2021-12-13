import { Component, OnDestroy, OnInit } from '@angular/core';
import { Covid19Service } from '../../services/covid19.service';
import { Observable, Subscription, zip } from 'rxjs';
import { format } from 'date-fns';
import { Covid19Filter } from 'src/app/modules/covid19/models/covid19-filter';
import { Covid19 } from 'src/app/modules/covid19/models/covid19';
@Component({
  selector: 'app-covid19-list',
  templateUrl: './covid19-list.component.html',
  styleUrls: ['./covid19-list.component.scss']
})
export class Covid19ListComponent implements OnInit, OnDestroy {
  covid19: Covid19[]
  subscription: Subscription
  filter: Covid19Filter = new Covid19Filter()
  private readonly COUNTRIES_SLUG: string[] = ['mexico', 'south-africa', 'brazil', 'cuba', 'egypt']
  alertMessage: string = ''

  constructor(private covid19Service: Covid19Service) { }

  ngOnInit(): void { }

  validateDateSearch(): void {
    this.checkDateFilled()
    if (this.filter.Date > this.formatCurrentDate()) {
      this.resetAlert('A Data deverá ser menor ou igual a Data atual!')
      return
    }
    this.onSearch()
  }

  onSearch(): void {
    this.subscription = this.getMultipleRequisitions().subscribe({
      next: (result: Covid19[]) => {
        if (result[0] === undefined) {
          this.resetAlert('Nenhum dado foi encontrado!')
          return
        }
        console.log(result)
        this.covid19 = result;
        this.closeAlert()
      },
      error: (e) => {
        console.error(e)
        this.resetAlert('Houve algum erro inesperado no servidor!')
      }
    })
  }

  getMultipleRequisitions(): Observable<Covid19[]> {
    return zip(
      this.covid19Service.getStatisticsCovid19ByCountryByDate(this.COUNTRIES_SLUG[0], this.filter.Date),
      this.covid19Service.getStatisticsCovid19ByCountryByDate(this.COUNTRIES_SLUG[1], this.filter.Date),
      this.covid19Service.getStatisticsCovid19ByCountryByDate(this.COUNTRIES_SLUG[2], this.filter.Date),
      this.covid19Service.getStatisticsCovid19ByCountryByDate(this.COUNTRIES_SLUG[3], this.filter.Date),
      this.covid19Service.getStatisticsCovid19ByCountryByDate(this.COUNTRIES_SLUG[4], this.filter.Date),
    )
  }

  checkDateFilled() {
    if (!this.filter.Date) this.filter.Date = this.formatCurrentDate()
  }

  formatCurrentDate(): string {
    return format(new Date(), 'yyyy-MM-dd')
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
