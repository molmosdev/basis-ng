import { Component } from '@angular/core';

/**
 * A simple card container for grouping related content.
 */
@Component({
  selector: 'b-card',
  template: ` <ng-content /> `,
})
export class Card {}
