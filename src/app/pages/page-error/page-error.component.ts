import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.css']
})
export class PageErrorComponent implements OnInit {

  errorMessage: string = '';

  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {
    // @ts-ignore
    this.errorMessage = this.route.snapshot.paramMap.get('message');
  }
}