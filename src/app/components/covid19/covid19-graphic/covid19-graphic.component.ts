import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Covid19Service } from '../services/covid19.service';
import { Covid19Filter } from '../covid19-filter';
import { Covid19 } from '../covid19'
import { Country } from '../country';
import { Subscription } from 'rxjs';
import { format } from 'date-fns';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-covid19-graphic',
  templateUrl: './covid19-graphic.component.html',
  styleUrls: ['./covid19-graphic.component.scss']
})
export class Covid19GraphicComponent implements OnInit, OnDestroy {
  @ViewChild('canvasGraph', { static: true }) canvasGraph: ElementRef;

  filter: Covid19Filter = new Covid19Filter();
  covid19: Covid19;
  subscription: Subscription;
  myChart: Chart;
  countries: Country[];
  alertMessage: string = ''

  constructor(private covid19Service: Covid19Service) { }

  ngOnInit(): void {
    this.covid19Service.getCountries().subscribe({
      next: result => {
        console.log(result)
        this.countries = [];
        this.countries = result
      }
    })
  }

  onSearch(): void {
    this.checkDateFilled()
    this.subscription = this.covid19Service.getStatisticsCovid19ByCountryByDate(
      'brazil', this.filter.Date
    ).subscribe({
      next: (result) => {
        console.log(result)
        if (result) {
          this.covid19 = result
          this.assembleChart()
          this.closeAlert()
        } else {
          this.resetAlert('Nothing was found!')
        }
      },
      error: (e) => {
        console.error(e)
      },
    })
  }

  assembleChart(): void {
    this.chartDestroy();
    this.myChart = new Chart(this.canvasGraph.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: [
          `${this.filter.Country} - ${format(new Date(this.filter.Date), 'dd/MM/yyyy')}`
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

  chartDestroy(): void {
    if (this.myChart) this.myChart.destroy();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

}
