import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Covid19Service } from '../../services/covid19.service';
import { Country } from '../../models/country';
import { Observable, Subscription } from 'rxjs';
import { format, addDays } from 'date-fns';
import Chart from 'chart.js/auto';
import { Covid19Filter } from 'src/app/modules/covid19/models/covid19-filter';
import { Covid19 } from 'src/app/modules/covid19/models/covid19';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { MessagesToast } from 'src/app/modules/shared/enums/messages-toast.enum';
import { UtilDateService } from 'src/app/modules/shared/services/util-dates.service';

@Component({
  selector: 'app-covid19-graphic',
  templateUrl: './covid19-graphic.component.html'
})
export class Covid19GraphicComponent implements OnInit, OnDestroy {
  @ViewChild('canvasGraph', { static: true }) canvasGraph: ElementRef

  filter: Covid19Filter
  covid19: Covid19
  subscription: Subscription
  myChart: Chart
  countries$: Observable<Country[]>

  constructor(
    private covid19Service: Covid19Service,
    private toastService: ToastService,
    private utilDateService: UtilDateService
  ) { }

  ngOnInit(): void {
    this.filter = new Covid19Filter()
    this.countries$ = this.covid19Service.getCountries()
    this.filter.CountrySlug = 'brazil'
  }

  validateDateSearch(): void {
    if(!this.filter.Date)
      this.filter.Date = this.utilDateService.formatCurrentDate()

    if (this.utilDateService.compareDates(this.filter.Date)) {
      this.showMessageDanger(MessagesToast.DATE_GREATER_TODAY)
      return
    }

    this.onSearch()
  }

  onSearch(): void {
    this.subscription = this.covid19Service.getStatisticsCovid19ByCountryByDate(
      this.filter.CountrySlug, this.filter.Date
    ).subscribe({
      next: (result: Covid19) => {
        if (result) {
          this.covid19 = result
          this.assembleChart()
          return
        }
        this.showMessageDanger(MessagesToast.NOT_FOUND)
      },
      error: (e) => {
        console.error(e)
        this.showMessageDanger(MessagesToast.GENERIC_ERROR)
      },
    })
  }

  assembleChart(): void {
    this.chartDestroy()
    this.myChart = new Chart(this.canvasGraph.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: [
          format(addDays(new Date(this.filter.Date), 1), 'dd/MM/yyyy')
        ],
        datasets: [{
          label: 'Infectados',
          data: [this.covid19.Active],
          backgroundColor: [
            this.getColorChart('active')
          ]
        },
        {
          label: 'Curados',
          data: [this.covid19.Recovered],
          backgroundColor: [
            this.getColorChart('recovered')
          ]
        },
        {
          label: '??bitos',
          data: [this.covid19.Deaths],
          backgroundColor: [
            this.getColorChart('deaths')
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
    })
  }

  getColorChart(colorChart: string) {
    let color = {
      'active': 'rgb(255, 205, 86)',
      'recovered': 'rgb(54, 162, 235)',
      'deaths': 'rgb(255, 99, 132)'
    }
    return color[colorChart]
  }

  showMessageDanger(alertMessage: string) {
    this.toastService.show(alertMessage, { classname: 'bg-danger text-light', delay: 3000 })
  }

  chartDestroy(): void {
    if (this.myChart) this.myChart.destroy()
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

}
