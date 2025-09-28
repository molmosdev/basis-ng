import { Component, ElementRef, inject, input } from '@angular/core';

/**
 * Defines the available visual variants for the button component.
 * @public
 */
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outlined'
  | 'destructive';

/**
 * Defines the available sizes for the button component.
 * @public
 */
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button component for displaying a clickable button element with configurable variant, size, and shape.
 *
 * @public
 */
@Component({
  selector: 'button[b-button]',
  template: ` <ng-content /> `,
  host: {
    '[class.b-button-variant-primary]': 'variant() === "primary"',
    '[class.b-button-variant-secondary]': 'variant() === "secondary"',
    '[class.b-button-variant-ghost]': 'variant() === "ghost"',
    '[class.b-button-variant-outlined]': 'variant() === "outlined"',
    '[class.b-button-variant-destructive]': 'variant() === "destructive"',
    '[class.b-button-size-sm]': 'size() === "sm"',
    '[class.b-button-size-md]': 'size() === "md"',
    '[class.b-button-size-lg]': 'size() === "lg"',
    '[class.b-button-squared]': 'squared()',
  },
})
export class Button {
  /**
   * The visual variant of the button.
   *
   * @defaultValue 'primary'
   */
  readonly variant = input<ButtonVariant>('primary');

  /**
   * The size of the button.
   *
   * @defaultValue 'md'
   */
  readonly size = input<ButtonSize>('md');

  /**
   * If true, the button will have squared edges.
   *
   * @defaultValue false
   */
  readonly squared = input<boolean>(false);

  /**
   * Reference to the underlying DOM element.
   */
  el = inject(ElementRef);
}
