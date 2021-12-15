import { Component, OnDestroy, OnInit } from '@angular/core';
import { Covid19Service } from '../../services/covid19.service';
import { Observable, Subscription, zip } from 'rxjs';
import { format } from 'date-fns';
import { Covid19Filter } from 'src/app/modules/covid19/models/covid19-filter';
import { Covid19 } from 'src/app/modules/covid19/models/covid19';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { MessagesToast } from 'src/app/modules/shared/enums/messages-toast.enum'
import { UtilDateService } from 'src/app/modules/shared/services/util-dates.service';
@Component({
  selector: 'app-covid19-list',
  templateUrl: './covid19-list.component.html'
})
export class Covid19ListComponent implements OnInit, OnDestroy {
  covid19: Covid19[]
  subscription: Subscription
  filter: Covid19Filter
  private readonly COUNTRIES_SLUG: string[] = ['mexico', 'south-africa', 'brazil', 'cuba', 'egypt']

  constructor(
    private covid19Service: Covid19Service,
    private toastService: ToastService,
    private utilDateService: UtilDateService
  ) { }

  ngOnInit(): void {
    this.filter = new Covid19Filter()
  }

  validateDateSearch(): void {
    if (!this.filter.Date)
      this.filter.Date = this.utilDateService.formatCurrentDate()

    if (this.utilDateService.compareDates(this.filter.Date)) {
      this.showMessageDanger(MessagesToast.DATE_GREATER_TODAY)
      return
    }

    this.onSearch()
  }

  showMessageDanger(alertMessage: string) {
    this.toastService.show(alertMessage, { classname: 'bg-danger text-light', delay: 3000 })
  }

  onSearch(): void {
    this.subscription = this.getMultipleRequisitions().subscribe({
      next: (result: Covid19[]) => {
        if (result[0] === undefined) {
          this.showMessageDanger(MessagesToast.NOT_FOUND)
          return
        }
        this.covid19 = result
      },
      error: (e) => {
        console.error(e)
        this.showMessageDanger(MessagesToast.GENERIC_ERROR)
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

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

}
