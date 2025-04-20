import { Component, input } from '@angular/core';

@Component({
  selector: 'b-input-group',
  template: `<ng-content />`,
  host: {
    '[class.bordered]': 'bordered()',
    '[style.max-width]': 'maxWidth()',
  },
})
export class InputGroup {
  /**
   * Whether the input group elements are separated by a border.
   */
  readonly bordered = input<boolean>(true);

  /**
   * The maximum width of the input.
   */
  readonly maxWidth = input<string>('');
}
