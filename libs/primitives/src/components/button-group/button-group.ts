import { Component, input } from '@angular/core';

/**
 * Groups buttons and optionally adds spacing between them.
 */
@Component({
  selector: 'b-button-group',
  template: ` <ng-content /> `,
  host: {
    class: 'button-group',
    '[class.spaced]': 'spaced()',
  },
})
export class ButtonGroup {
  /**
   * Whether to add spacing between grouped buttons.
   */
  readonly spaced = input<boolean>(false);
}
