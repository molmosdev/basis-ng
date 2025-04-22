import { Component, ElementRef, inject, input } from '@angular/core';
import { Spinner } from '../spinner/spinner.component';

@Component({
  selector: 'button[b-button]',
  imports: [Spinner],
  templateUrl: './button.component.html',
  host: {
    '[class]': 'variant() + " size-" + size()',
    '[class.equal-padding]': 'equalPadding()',
    '[class.loading]': 'loading()',
    '[class.toggled]': 'isToggled()',
    '[class.active]': 'activeEnabled()',
  },
})
export class Button {
  /** The variant of the button. */
  readonly variant = input<'primary' | 'secondary' | 'ghost' | 'outlined'>(
    'primary'
  );

  /** The size of the button. */
  readonly size = input<'small' | 'default'>('default');

  /** Whether is loading. */
  readonly loading = input(false);

  /** Whether the padding should be equal vertically and horizontally. */
  readonly equalPadding = input(false);

  /** Whether the button is toggleable. */
  readonly toggle = input(false);

  /** The value of the button when it is toggled. */
  readonly isToggled = input(false);

  /**  Whether the button active animation is enabled. */
  readonly activeEnabled = input(true);

  /** The element reference of the button. */
  el = inject(ElementRef);
}
