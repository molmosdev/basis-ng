import { Component } from '@angular/core';

/**
 * Container for the main content of a card.
 */
@Component({
  selector: 'b-card-content',
  template: ` <ng-content /> `,
})
export class CardContent {}
