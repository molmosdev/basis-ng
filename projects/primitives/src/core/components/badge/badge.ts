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
    '[class.b-badge-variant-primary]': 'variant() === "primary"',
    '[class.b-badge-variant-secondary]': 'variant() === "secondary"',
    '[class.b-badge-variant-ghost]': 'variant() === "ghost"',
    '[class.b-badge-variant-outlined]': 'variant() === "outlined"',
    '[class.b-badge-variant-destructive]': 'variant() === "destructive"',
    '[class.b-badge-size-sm]': 'size() === "sm"',
    '[class.b-badge-size-md]': 'size() === "md"',
    '[class.b-badge-size-lg]': 'size() === "lg"',
  },
})
export class Badge {
  /** The variant of the badge. */
  readonly variant = input<BadgeVariant>('primary');

  /** The size of the badge. */
  readonly size = input<BadgeSize>('md');
}
