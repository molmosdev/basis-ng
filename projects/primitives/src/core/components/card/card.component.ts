import { Component, input } from '@angular/core';

@Component({
  selector: 'b-card',
  template: ` <ng-content /> `,
  host: {
    '[style.maxWidth]': 'maxWidth()',
  },
})
export class CardComponent {
  /**
   * The width of the card.
   * @default '80vw'
   */
  readonly maxWidth = input('80vw');
}
