import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Covid19ListComponent } from './covid19-list/covid19-list.component';
import { Covid19Service } from './services/covid19.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    Covid19ListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    Covid19Service
  ]
})
export class Covid19Module { }
