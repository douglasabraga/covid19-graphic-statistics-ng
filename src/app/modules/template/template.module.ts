import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    declarations: [
        MenuComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgbCollapseModule
    ],
    exports:[
        MenuComponent,
        FooterComponent
    ]
})
export class TemplateModule { }