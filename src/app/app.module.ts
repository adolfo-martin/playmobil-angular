import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormLoginComponent } from './login/form-login/form-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { SpinnerWaitingComponent } from './spinner-waiting/spinner-waiting.component';
import { MenubarMainComponent } from './menu/menubar-main/menubar-main.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { TableSeriesComponent } from './playmobil/table-series/table-series.component';
import { PageSeriesComponent } from './pages/page-series/page-series.component';
import { JwtInterceptor } from './jwt.interceptor';
import { PageErrorComponent } from './pages/page-error/page-error.component';
import { PageInitialComponent } from './pages/page-initial/page-initial.component';
import { PageBoxesComponent } from './pages/page-boxes/page-boxes.component';
import { TableBoxesComponent } from './playmobil/table-boxes/table-boxes.component';
import { PageFiguresComponent } from './pages/page-figures/page-figures.component';
import { TableFiguresComponent } from './playmobil/table-figures/table-figures.component';
import { TabFigureComponent } from './playmobil/tab-figure/tab-figure.component';

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    SpinnerWaitingComponent,
    MenubarMainComponent,
    PageLoginComponent,
    TableSeriesComponent,
    PageSeriesComponent,
    PageErrorComponent,
    PageInitialComponent,
    PageBoxesComponent,
    TableBoxesComponent,
    PageFiguresComponent,
    TableFiguresComponent,
    TabFigureComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
