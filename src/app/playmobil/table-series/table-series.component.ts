import { Component } from '@angular/core';
import { PlaymobilService } from '../playmobil.service';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';


type TSeries = [{
  uuid: string,
  denomination: string
}];


@Component({
  selector: 'table-series',
  templateUrl: './table-series.component.html',
  styleUrls: ['./table-series.component.css']
})
export class TableSeriesComponent {
  series$: Observable<TSeries>;
  
  
  constructor(
    private playmobilService: PlaymobilService,
    private router: Router,
    ) {
    // @ts-ignore
    this.series$ = this.playmobilService.retrieveSeries$().pipe(
      catchError(error => this.router.navigate(['/error/', error.statusText]))
    );
  }
}
