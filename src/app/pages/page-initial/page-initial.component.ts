import { Component } from '@angular/core';

@Component({
  selector: 'page-initial',
  template: `
    <style>
      :host {
          display: grid;
          place-content: center;
          min-height: 100%;
      }
    </style>

    <img src="http://localhost:8082/assets/roman-centurion.jpg">
  `,
})
export class PageInitialComponent {

}
