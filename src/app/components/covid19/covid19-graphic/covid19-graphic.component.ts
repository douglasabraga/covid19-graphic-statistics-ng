import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Covid19Service } from '../services/covid19.service';
import { Covid19Filter } from '../covid19-filter';
import { Covid19 } from '../covid19.model'
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

  public filter: Covid19Filter = new Covid19Filter();
  public covid19: Covid19;
  private subscription: Subscription;
  private myChart: Chart;

  constructor(private covid19Service: Covid19Service) { }

  ngOnInit(): void {
    this.filter.Date = this.formatCurrentDate()
  }

  onSearch(): void {

    this.covid19 = null;
    this.filter.Country = 'brazil'

    this.subscription = this.covid19Service
      .getStatisticsCovid19ByCountryByDate(
        this.filter.Country, this.filter.Date
      ).subscribe({
        next: (result) => {
          if (result[0]) {
            this.covid19 = result[0]
            this.montarGrafico()
          }
        },
        error: (e) => console.error(e),
      })
  }

  montarGrafico(): void {
    if (this.myChart) this.myChart.destroy();
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

  formatCurrentDate(): string {
    return format(new Date, 'yyyy-MM-dd')
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }

}
