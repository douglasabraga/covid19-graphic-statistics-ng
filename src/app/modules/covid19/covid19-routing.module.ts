import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Covid19GraphicComponent } from './components/covid19-graphic/covid19-graphic.component';
import { Covid19ListComponent } from './components/covid19-list/covid19-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: Covid19ListComponent },
  { path: 'graphic', component: Covid19GraphicComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Covid19RoutingModule { }
