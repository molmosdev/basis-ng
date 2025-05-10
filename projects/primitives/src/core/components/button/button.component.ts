import { Component, ElementRef, inject, input } from '@angular/core';

/**
 * Button component that provides various styles and configurations.
 */
@Component({
  selector: 'button[b-button]',
  template: ` <ng-content />`,
  host: {
    '[class]': 'variant() + " size-" + size()',
    '[class.active]': 'activeEnabled()',
    '[class.squared]': 'squared()',
  },
})
export class ButtonComponent {
  /**
   * Defines the visual style of the button.
   *
   * @defaultValue 'primary'
   */
  readonly variant = input<'primary' | 'secondary' | 'ghost' | 'outlined'>(
    'primary'
  );

  /**
   * Specifies the size of the button.
   *
   * @defaultValue '2'
   */
  readonly size = input<'1' | '2' | '3'>('2');

  /**
   * Determines whether the button has an active state enabled.
   *
   * @defaultValue true
   */
  readonly activeEnabled = input(true);

  /**
   * Indicates whether the button should have squared corners.
   *
   * @defaultValue false
   */
  readonly squared = input(false);

  /**
   * Reference to the host DOM element.
   */
  el = inject(ElementRef);
}
