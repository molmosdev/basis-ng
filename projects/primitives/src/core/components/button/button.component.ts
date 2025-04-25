import { Component, ElementRef, inject, input } from '@angular/core';

@Component({
  selector: 'button[b-button]',
  template: ` <ng-content />`,
  host: {
    '[class]': 'variant() + " size-" + size()',
    '[class.active]': 'activeEnabled()',
  },
})
export class Button {
  /** The variant of the button. */
  readonly variant = input<'primary' | 'secondary' | 'ghost' | 'outlined'>(
    'primary'
  );

  /** The size of the button. */
  readonly size = input<'1' | '2' | '3'>('2');

  /**  Whether the button active animation is enabled. */
  readonly activeEnabled = input(true);

  /** The element reference of the button. */
  el = inject(ElementRef);
}
