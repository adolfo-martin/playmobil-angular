import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-boxes',
  templateUrl: './page-boxes.component.html',
  styleUrls: ['./page-boxes.component.css']
})
export class PageBoxesComponent {
  serieUuid: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.serieUuid = this.route.snapshot.paramMap.get('serieUuid');
  }
}
