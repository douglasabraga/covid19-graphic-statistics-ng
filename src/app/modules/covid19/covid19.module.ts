import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Covid19ListComponent } from './components/covid19-list/covid19-list.component';
import { FormsModule } from '@angular/forms';
import { Covid19GraphicComponent } from './components/covid19-graphic/covid19-graphic.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    Covid19ListComponent,
    Covid19GraphicComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule
  ],
  providers:[]
})
export class Covid19Module { }
