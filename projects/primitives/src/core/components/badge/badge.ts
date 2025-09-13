import { Component, input } from '@angular/core';

/**
 * Defines the available visual variants for the badge component.
 * @public
 */
type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outlined'
  | 'destructive';

/**
 * Defines the available sizes for the badge component.
 * @public
 */
type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'span[b-badge]',
  template: `<ng-content />`,
  host: {
    '[class.b-variant-primary]': 'variant() === "primary"',
    '[class.b-variant-secondary]': 'variant() === "secondary"',
    '[class.b-variant-ghost]': 'variant() === "ghost"',
    '[class.b-variant-outlined]': 'variant() === "outlined"',
    '[class.b-variant-destructive]': 'variant() === "destructive"',
    '[class.b-size-sm]': 'size() === "sm"',
    '[class.b-size-md]': 'size() === "md"',
    '[class.b-size-lg]': 'size() === "lg"',
  },
})
export class Badge {
  /** The variant of the badge. */
  readonly variant = input<BadgeVariant>('primary');

  /** The size of the badge. */
  readonly size = input<BadgeSize>('md');
}
