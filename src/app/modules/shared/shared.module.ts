import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './toast/toasts-container.component';

@NgModule({
  declarations: [
    ToastsContainer,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
  ],
  providers: [ ],
  exports:[
    ToastsContainer
  ]
})
export class SharedModule { }
