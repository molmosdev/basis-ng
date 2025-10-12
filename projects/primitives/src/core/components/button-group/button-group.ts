import { Component, input } from '@angular/core';

@Component({
  selector: 'b-button-group',
  template: `
    <ng-content />
  `,
  host: {
    class: 'button-group',
    '[class.spaced]': 'spaced()',
  },
})
export class ButtonGroup {
  readonly spaced = input<boolean>(false);
}
