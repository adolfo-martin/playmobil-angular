import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../login/authentication.service';
import { PlaymobilService } from '../playmobil.service';
import { Observable } from 'rxjs';


type TBox = {
  uuid: string,
  denomination: string,
  description: string,
  price: number
}


@Component({
  selector: 'table-boxes',
  templateUrl: './table-boxes.component.html',
  styleUrls: ['./table-boxes.component.css']
})
export class TableBoxesComponent implements OnInit {
  @Input('serie') serieUuid: string = '';

  // @ts-ignore
  boxes$: Observable<[TBox]> = undefined;


  constructor(
    private authService: AuthenticationService, 
    private playmobilService: PlaymobilService
  ) { }
  
  
  ngOnInit(): void {
    if (this.serieUuid) {
      this.boxes$ = this.playmobilService.retrieveBoxesBySerieId$(this.serieUuid);
    } else {
      this.boxes$ = this.playmobilService.retrieveBoxes$();
    }
  }
}
