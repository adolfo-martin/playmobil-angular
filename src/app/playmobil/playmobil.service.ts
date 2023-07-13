import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap, zip } from 'rxjs';


type TSeries = [{
  uuid: string,
  denomination: string
}];


type TBoxes = {
  ok: boolean,
  boxes: [string]
}


type TBox = {
  uuid: string,
  denomination: string,
  description: string,
  price: number
}


type TFigure = {
  uuid: string,
  denomination: string,
  barcode: string,
  image: string
}


@Injectable({
  providedIn: 'root'
})
export class PlaymobilService {

  static baseUrl = 'http://127.0.0.1:8082/api';

  constructor(private http: HttpClient) { }

  public retrieveSeries$(): Observable<TSeries> {
    const url = `${PlaymobilService.baseUrl}/series`;
    
    return this.http.get<{series: TSeries}>(url).pipe(
      map<{series: TSeries}, TSeries>(data => data.series)
    );
  }


  public retrieveBoxByBoxId$(boxId: string): Observable<TBox> {
    const url = `${PlaymobilService.baseUrl}/box/${boxId}`;
    
    return this.http.get<{box: TBox}>(url).pipe(
      map<{box: TBox}, TBox>(data => data.box)
    );
  }


  public retrieveBoxes$(): Observable<[TBox]> {
    const url = `${PlaymobilService.baseUrl}/boxes`;
    
    // @ts-ignore
    return this.http.get<{boxes: [{uuid: string}]}>(url).pipe(
        // @ts-ignore
      map<{boxes: [{uuid: string}]}, [{uuid: string}]>(data => data.boxes),
        // @ts-ignore
      map<[{uuid: string}], [string]>(boxes => boxes.map(box => box.uuid)),
      map<[string], Observable<TBox>[]>(boxes => boxes.map( boxId => this.retrieveBoxByBoxId$(boxId))),
      switchMap(boxes =>
        // @ts-ignore
        zip<Observable<TBox>[], [TBox]>(...boxes)
      )
    );
  }

  
  public retrieveBoxesBySerieId$(serieId: string): Observable<[TBox]> {
    const url = `${PlaymobilService.baseUrl}/serie/${serieId}/boxes`;
    
    // @ts-ignore
    return this.http.get<{boxes: [string]}>(url).pipe(
      map<{boxes: [string]}, [string]>(data => data.boxes),
      map<[string], Observable<TBox>[]>(boxes => boxes.map( boxId => this.retrieveBoxByBoxId$(boxId))),
      switchMap(boxes =>
        // @ts-ignore
        zip<Observable<TBox>[], [TBox]>(...boxes)
      )
    );
  }


  public retrieveFigureByFigureId$(figureId: string): Observable<TFigure> {
    const url = `${PlaymobilService.baseUrl}/figure/${figureId}`;
    
    return this.http.get<{figure: TFigure}>(url).pipe(
      map<{figure: TFigure}, TFigure>(data => data.figure)
    );
  }


  public retrieveFigures$(): Observable<[TFigure]> {
    const url = `${PlaymobilService.baseUrl}/figures`;
    
    // @ts-ignore
    return this.http.get<{figures: [{uuid: string}]}>(url).pipe(
        // @ts-ignore
      map<{figures: [{uuid: string}]}, [{uuid: string}]>(data => data.figures),
        // @ts-ignore
      map<[{uuid: string}], [string]>(figures => figures.map(figure => figure.uuid)),
      map<[string], Observable<TFigure>[]>(figures => figures.map( figureId => this.retrieveFigureByFigureId$(figureId))),
      switchMap(figures =>
        // @ts-ignore
        zip<Observable<TFigure>[], [TFigure]>(...figures)
      )
    );
  }


  public retrieveFiguresByBoxId$(boxId: string): Observable<[TFigure]> {
    const url = `${PlaymobilService.baseUrl}/box/${boxId}/figures`;
    
    type TFigureOfBox = { figure: string, quantity: number };
    type TFigureOfBox2 = { 
      uuid: string,
      denomination: string,
      barcode: string,
      image: string, 
      quantity: number 
    };

    // @ts-ignore
    return this.http.get<{figures: [TFigureOfBox]}>(url).pipe(
      map<{figures: [TFigureOfBox]}, [TFigureOfBox]>(data => data.figures),
      map<[TFigureOfBox], Observable<{quantity: number, figure: Observable<TFigure>}>[]>(
    // @ts-ignore
        figures => figures.map( ({quantity, figure: figureId}) => zip(of(quantity), this.retrieveFigureByFigureId$(figureId)))
      ),
      switchMap(figures =>
        // @ts-ignore
        zip<Observable<{quantity: number, figure: Observable<TFigure>}>[], [TFigureOfBox2]>(...figures)
      ),
        // @ts-ignore
      map(figuresAsArray => figuresAsArray.map(([quantity, figure]) => ({quantity, ...figure}))),
      tap(console.log)
    );
  }

}