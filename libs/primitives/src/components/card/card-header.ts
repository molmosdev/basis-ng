import { Component } from '@angular/core';

/**
 * Header section for a card, usually contains the title or leading content.
 */
@Component({
  selector: 'b-card-header',
  template: ` <ng-content /> `,
})
export class CardHeader {}
