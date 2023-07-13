import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageSeriesComponent } from './pages/page-series/page-series.component';
import { PageErrorComponent } from './pages/page-error/page-error.component';
import { PageInitialComponent } from './pages/page-initial/page-initial.component';
import { PageBoxesComponent } from './pages/page-boxes/page-boxes.component';
import { PageFiguresComponent } from './pages/page-figures/page-figures.component';

const routes: Routes = [
  { path: '', redirectTo: '/initial', pathMatch: 'full'},
  { path: 'initial', component: PageInitialComponent },
  { path: 'login', component: PageLoginComponent },
  { path: 'series', component: PageSeriesComponent },
  { path: 'boxes/serie/:serieUuid', component: PageBoxesComponent },
  { path: 'boxes', component: PageBoxesComponent },
  { path: 'figures/box/:boxUuid', component: PageFiguresComponent },
  { path: 'figures', component: PageFiguresComponent },
  { path: 'error/:message', component: PageErrorComponent },
  { path: '**', component: PageErrorComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
