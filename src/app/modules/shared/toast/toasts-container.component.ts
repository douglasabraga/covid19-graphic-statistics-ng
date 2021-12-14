import { Component, TemplateRef } from '@angular/core';
import { ToastService } from './toast.service';


@Component({
    selector: 'app-toasts',
    templateUrl: './toasts-container.component.html',
    host: { '[class.ngb-toasts]': 'true' }
})
export class ToastsContainer {
    constructor(public toastService: ToastService) { }

    isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef }
}