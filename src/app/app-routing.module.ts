import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Covid19GraphicComponent } from './modules/covid19/components/covid19-graphic/covid19-graphic.component';
import { Covid19ListComponent } from './modules/covid19/components/covid19-list/covid19-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Covid19ListComponent },
  { path: 'graphic', component: Covid19GraphicComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
