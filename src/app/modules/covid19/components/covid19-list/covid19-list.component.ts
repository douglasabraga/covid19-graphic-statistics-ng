import { Component, OnDestroy, OnInit } from '@angular/core';
import { Covid19Service } from '../../services/covid19.service';
import { Observable, Subscription, zip } from 'rxjs';
import { format } from 'date-fns';
import { Covid19Filter } from 'src/app/modules/covid19/models/covid19-filter';
import { Covid19 } from 'src/app/modules/covid19/models/covid19';
import { ToastService } from 'src/app/modules/shared/toast/toast.service';
import { MessagesToast } from 'src/app/modules/shared/enums/messages-toast.enum'
@Component({
  selector: 'app-covid19-list',
  templateUrl: './covid19-list.component.html',
  styleUrls: ['./covid19-list.component.scss']
})
export class Covid19ListComponent implements OnInit, OnDestroy {
  covid19: Covid19[]
  subscription: Subscription
  filter: Covid19Filter
  private readonly COUNTRIES_SLUG: string[] = ['mexico', 'south-africa', 'brazil', 'cuba', 'egypt']

  constructor(
    private covid19Service: Covid19Service,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.filter = new Covid19Filter()
  }

  validateDateSearch(): void {
    this.checkDateFilled()
    if (this.compareDates(this.filter.Date)) {
      this.showMessageDanger(MessagesToast.dateGreaterToday)
      return
    }
    this.onSearch()
  }

  showMessageDanger(alertMessage: string) {
    this.toastService.show(alertMessage, { classname: 'bg-danger text-light', delay: 3000 });
  }

  onSearch(): void {
    this.subscription = this.getMultipleRequisitions().subscribe({
      next: (result: Covid19[]) => {
        if (result[0] === undefined) {
          this.showMessageDanger(MessagesToast.undefined)
          return
        }
        console.log(result)
        this.covid19 = result;
      },
      error: (e) => {
        console.error(e)
        this.showMessageDanger(MessagesToast.genericError)
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

  compareDates(date: string) {
    const parts = date.split('-').map(item => Number(item))
    const today = new Date()
    const dateCovert = new Date(parts[0], parts[1] - 1, parts[2])
    return dateCovert > today
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

}
