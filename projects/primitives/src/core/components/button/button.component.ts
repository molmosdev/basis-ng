import { Component, ElementRef, inject, input } from '@angular/core';

/**
 * Button component that provides various styles and configurations.
 */
@Component({
  selector: 'button[b-button]',
  template: ` <ng-content />`,
  host: {
    '[class.b-variant-primary]': 'variant() === "primary"',
    '[class.b-variant-secondary]': 'variant() === "secondary"',
    '[class.b-variant-ghost]': 'variant() === "ghost"',
    '[class.b-variant-outlined]': 'variant() === "outlined"',
    '[class.b-variant-destructive]': 'variant() === "destructive"',
    '[class.b-size-1]': 'size() === "1"',
    '[class.b-size-2]': 'size() === "2"',
    '[class.b-size-3]': 'size() === "3"',
    '[class.b-active]': 'active()',
    '[class.b-squared]': 'squared()',
  },
})
export class ButtonComponent {
  /**
   * Defines the visual style of the button.
   *
   * @defaultValue 'primary'
   */
  readonly variant = input<
    'primary' | 'secondary' | 'ghost' | 'outlined' | 'destructive'
  >('primary');

  /**
   * Specifies the size of the button.
   *
   * @defaultValue '2'
   */
  readonly size = input<'1' | '2' | '3'>('2');

  /**
   * Determines whether the button has an active state enabled.
   *
   * @defaultValue false
   */
  readonly active = input(false);

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
