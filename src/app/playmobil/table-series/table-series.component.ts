import { Component } from '@angular/core';
import { PlaymobilService } from '../playmobil.service';

@Component({
  selector: 'table-series',
  templateUrl: './table-series.component.html',
  styleUrls: ['./table-series.component.css']
})
export class TableSeriesComponent {
  series$ = this.playmobilService.retrieveSeries$();

  constructor(private playmobilService: PlaymobilService) {}
}
