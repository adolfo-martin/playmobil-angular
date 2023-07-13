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
        display: grid;
        place-items: center;
      }
    </style>
    <table-figures *ngIf="boxUuid; else emptySerie" box="{{boxUuid}}"></table-figures>

    <ng-template #emptySerie>
        <table-figures></table-figures>
    </ng-template>
  `,
})
export class PageFiguresComponent {
  boxUuid: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.boxUuid = this.route.snapshot.paramMap.get('boxUuid');
  }
}
