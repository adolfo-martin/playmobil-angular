import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-figures',
  template: `
    <style>
      :host {
        width: 100%;
        height: 300px;
        min-height: max(100%, 300px);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 100px;
        transition: 2000ms;
      }
    </style>

    <ng-container class="zone-table">
      <table-figures *ngIf="boxUuid; else emptyBox" box="{{boxUuid}}"></table-figures>

      <ng-template #emptyBox>
          <table-figures (figureSelected)="showTabFigure($event)"></table-figures>
      </ng-template>
    </ng-container>

    <ng-container class="zone-tab" *ngIf="figureUuid">
      <tab-figure></tab-figure>
    </ng-container>
  `,
})
export class PageFiguresComponent {
  boxUuid: string | null;
  figureUuid: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.boxUuid = this.route.snapshot.paramMap.get('boxUuid');
  }

  protected showTabFigure(figureUuid: string) : void {
    console.log('showTabFigure--------------');
    this.figureUuid = figureUuid;
  }
}
