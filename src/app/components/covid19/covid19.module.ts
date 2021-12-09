import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Covid19ListComponent } from './covid19-list/covid19-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    Covid19ListComponent,
  ],
  imports: [
    CommonModule
  ],
  providers:[]
})
export class Covid19Module { }
