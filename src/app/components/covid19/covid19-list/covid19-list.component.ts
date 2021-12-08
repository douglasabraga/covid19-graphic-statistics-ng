import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../services/covid19.service';
import { Covid19 } from '../covid19.model'
import { zip } from 'rxjs';

@Component({
  selector: 'app-covid19-list',
  templateUrl: './covid19-list.component.html',
  styleUrls: ['./covid19-list.component.scss']
})
export class Covid19ListComponent implements OnInit {

  public covid19: Covid19[]

  constructor(private covid19Service: Covid19Service) {
    this.covid19 = []
  }

  ngOnInit(): void {
    const multipleRequisition = zip(
      this.covid19Service.getStatisticsCovid19ByCountry('mexico'),
      this.covid19Service.getStatisticsCovid19ByCountry('south-africa'),
      this.covid19Service.getStatisticsCovid19ByCountry('france'),
      this.covid19Service.getStatisticsCovid19ByCountry('cuba'),
      this.covid19Service.getStatisticsCovid19ByCountry('egypt'),
      this.covid19Service.getStatisticsCovid19ByCountry('peru'),
      this.covid19Service.getStatisticsCovid19ByCountry('canada'))

    multipleRequisition.subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

}
