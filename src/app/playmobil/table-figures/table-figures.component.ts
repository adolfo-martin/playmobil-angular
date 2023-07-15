import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlaymobilService } from '../playmobil.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'table-figures',
  templateUrl: './table-figures.component.html',
  styleUrls: ['./table-figures.component.css']
})
export class TableFiguresComponent {
  @Input('box') boxUuid: string = '';
  @Output('figureSelected') private figureSelectedEmitter = new EventEmitter<string>();

  // @ts-ignore
  figures$: Observable<[TFigure]> = undefined;

  constructor(
    private playmobilService: PlaymobilService
  ) { }
  
  
  ngOnInit(): void {
    if (this.boxUuid) {
      this.figures$ = this.playmobilService.retrieveFiguresByBoxId$(this.boxUuid);
    } else {
      this.figures$ = this.playmobilService.retrieveFigures$().pipe(tap(console.log));
    }
  }

  protected emitFigureSelected(figureUuid: string) {
    this.figureSelectedEmitter.emit(figureUuid);
  }
}
