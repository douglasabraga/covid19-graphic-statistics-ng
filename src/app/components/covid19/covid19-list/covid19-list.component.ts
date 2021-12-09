import { Component, OnDestroy, OnInit } from '@angular/core';
import { Covid19Service } from '../services/covid19.service';
import { Covid19 } from '../covid19.model'
import { Subscription, zip } from 'rxjs';

@Component({
  selector: 'app-covid19-list',
  templateUrl: './covid19-list.component.html',
  styleUrls: ['./covid19-list.component.scss']
})
export class Covid19ListComponent implements OnInit, OnDestroy {

  public covid19: Covid19[] = []
  private subscription: Subscription;

  constructor(private covid19Service: Covid19Service) { }

  ngOnInit(): void { }

  onSearch() {
    const multipleRequisition = zip(
      this.covid19Service.getStatisticsCovid19ByCountry('mexico'),
      this.covid19Service.getStatisticsCovid19ByCountry('south-africa'),
      this.covid19Service.getStatisticsCovid19ByCountry('mozambique'),
      this.covid19Service.getStatisticsCovid19ByCountry('cuba'),
      this.covid19Service.getStatisticsCovid19ByCountry('egypt'),
      this.covid19Service.getStatisticsCovid19ByCountry('peru'),
      this.covid19Service.getStatisticsCovid19ByCountry('canada'))

    this.subscription = multipleRequisition.subscribe({
      next: (v) => {
        console.log(v)
        this.covid19.push(...v.map(item => item[0]))
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
