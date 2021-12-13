import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Covid19Service } from '../../services/covid19.service';
import { Country } from '../../models/country';
import { Observable, Subscription } from 'rxjs';
import { format } from 'date-fns';
import Chart from 'chart.js/auto';
import { Covid19Filter } from 'src/app/modules/covid19/models/covid19-filter';
import { Covid19 } from 'src/app/modules/covid19/models/covid19';

@Component({
  selector: 'app-covid19-graphic',
  templateUrl: './covid19-graphic.component.html',
  styleUrls: ['./covid19-graphic.component.scss']
})
export class Covid19GraphicComponent implements OnInit, OnDestroy {
  @ViewChild('canvasGraph', { static: true }) canvasGraph: ElementRef

  filter: Covid19Filter
  covid19: Covid19
  subscription: Subscription
  myChart: Chart
  countries: Country[]
  alertMessage: string = ''
  countries$: Observable<Country[]>

  constructor(private covid19Service: Covid19Service) { }

  ngOnInit(): void {
    this.filter = new Covid19Filter()
    this.countries$ = this.covid19Service.getCountries()
  }

  validateDateSearch(): void {
    this.checkDateFilled()

    if (this.filter.Date > this.formatCurrentDate()) {
      this.resetAlert('A Data deverá ser menor ou igual a Data atual!')
      return
    }

    if (!this.filter.CountrySlug) {
      this.resetAlert('O país deverá ser informado!')
      return
    }

    this.onSearch()
  }

  onSearch(): void {
    console.log(this.filter.CountrySlug)
    this.subscription = this.covid19Service.getStatisticsCovid19ByCountryByDate(
      this.filter.CountrySlug, this.filter.Date
    ).subscribe({
      next: (result: Covid19) => {
        console.log(result)
        if (result) {
          this.covid19 = result
          this.assembleChart()
          this.closeAlert()
          return
        }
        this.resetAlert('Nenhum dado foi encontrado')
      },
      error: (e) => {
        console.error(e)
        this.resetAlert('Houve algum erro inesperado no servidor!')
      },
    })
  }

  assembleChart(): void {
    this.chartDestroy();
    this.myChart = new Chart(this.canvasGraph.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: [
          `${format(new Date(this.filter.Date), 'dd/MM/yyyy')}`
        ],
        datasets: [{
          label: 'Confirmed',
          data: [this.covid19.Confirmed],
          backgroundColor: [
            'rgb(255, 99, 132)',
          ]
        },
        {
          label: 'Deaths',
          data: [this.covid19.Deaths],
          backgroundColor: [
            'rgb(54, 162, 235)',
          ]
        },
        {
          label: 'Recovered',
          data: [this.covid19.Recovered],
          backgroundColor: [
            'rgb(255, 205, 86)'
          ]
        }]

      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  checkDateFilled(): void {
    if (!this.filter.Date) this.filter.Date = this.formatCurrentDate()
  }

  formatCurrentDate(): string {
    return format(new Date(), 'yyyy-MM-dd')
  }

  closeAlert(): void {
    this.alertMessage = ''
  }

  resetAlert(message: string): void {
    this.alertMessage = message
  }

  chartDestroy(): void {
    if (this.myChart) this.myChart.destroy();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

}
