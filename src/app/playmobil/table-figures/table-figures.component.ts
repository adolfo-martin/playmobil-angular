import { Component, Input } from '@angular/core';
import { PlaymobilService } from '../playmobil.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'table-figures',
  templateUrl: './table-figures.component.html',
  styleUrls: ['./table-figures.component.css']
})
export class TableFiguresComponent {
  @Input('box') boxUuid: string = '';

  // @ts-ignore
  figures$: Observable<[TFigure]> = undefined;


  constructor(
    private playmobilService: PlaymobilService
  ) { }
  
  
  ngOnInit(): void {
    if (this.boxUuid) {
      this.figures$ = this.playmobilService.retrieveFiguresByBoxId$(this.boxUuid);
    } else {
      this.figures$ = this.playmobilService.retrieveFigures$();
    }
  }
}
