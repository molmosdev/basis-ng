import { Component, input } from '@angular/core';

@Component({
  selector: 'b-input-group',
  template: `<ng-content />`,
  host: {
    '[style.max-width]': 'maxWidth()',
  },
})
export class InputGroupComponent {
  /**
   * Sets the maximum width of the input group (e.g. 300px, 100%).
   */
  readonly maxWidth = input('100%');
}
