import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Covid19ListComponent } from './covid19-list/covid19-list.component';
import { FormsModule } from '@angular/forms';
import { Covid19GraphicComponent } from './covid19-graphic/covid19-graphic.component';

@NgModule({
  declarations: [
    Covid19ListComponent,
    Covid19GraphicComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[]
})
export class Covid19Module { }
