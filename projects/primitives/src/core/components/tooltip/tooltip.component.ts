import { Component, input } from '@angular/core';
import { AttachedBox } from '../attached-box/attached-box.component';
import { Position } from '../../../shared/types/position.type';

/**
 * TooltipComponent is a reusable UI component that displays a tooltip
 * with customizable position, gap, variant, and size.
 */
@Component({
  selector: 'b-tooltip',
  template: `
    <b-attached-box [type]="'hover'" [position]="position()" [gap]="gap()">
      <ng-content b-attached-box-trigger />
      <div
        b-attached-box-content
        class="b-tooltip-content"
        [class]="variant() + ' size-' + size()">
        <ng-content select="[b-tooltip-content]" />
      </div>
    </b-attached-box>
  `,
  standalone: true,
  imports: [AttachedBox],
})
export class TooltipComponent {
  /**
   * The position of the tooltip relative to its trigger element.
   * Defaults to 'top-center'.
   */
  readonly position = input<Position>('top-center');

  /**
   * The gap (in pixels) between the tooltip and its trigger element.
   * Defaults to 8.
   */
  readonly gap = input(8);

  /**
   * The visual variant of the tooltip. Options include:
   * - 'primary'
   * - 'secondary'
   * - 'ghost'
   * - 'outlined'
   * Defaults to 'primary'.
   */
  readonly variant = input<'primary' | 'secondary' | 'ghost' | 'outlined'>(
    'primary'
  );

  /**
   * The size of the tooltip. Options include:
   * - 'small'
   * - 'default'
   * Defaults to 'default'.
   */
  readonly size = input<'small' | 'default'>('default');
}
