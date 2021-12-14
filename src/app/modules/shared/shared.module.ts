import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './toast/toasts-container.component';
import { ToastService } from './toast/toast.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  declarations: [
    ToastsContainer
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
  ],
  providers: [
    ToastService
  ],
  exports:[
    ToastsContainer
  ]
})
export class SharedModule { }
