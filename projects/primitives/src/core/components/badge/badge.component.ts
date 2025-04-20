import { Component, input } from '@angular/core';

@Component({
  selector: 'span[b-badge]',
  template: `<ng-content />`,
  host: {
    '[class]': 'variant() + " size-" + size()',
  },
})
export class Badge {
  /** The variant of the badge. */
  readonly variant = input<'primary' | 'secondary' | 'ghost' | 'outlined'>(
    'primary'
  );

  /** The size of the badge. */
  readonly size = input<'small' | 'default'>('default');
}
