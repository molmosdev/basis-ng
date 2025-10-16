import { Component, computed, inject } from '@angular/core';
import { ConnectedOverlay } from '../../directives/connected-overlay';

/**
 * Tooltip content that is displayed within a connected overlay.
 */
@Component({
  selector: 'b-tooltip-content',
  imports: [],
  template: ` <ng-content /> `,
  host: {
    '[animate.enter]': '"b-tooltip-content-entering-" + this.direction()',
    '[animate.leave]': '"b-tooltip-content-leaving-" + this.direction()',
  },
})
export class TooltipContent {
  /**
   * Reference to the connected overlay directive for positioning.
   */
  overlay = inject(ConnectedOverlay);

  /**
   * Computed overlay direction for animation classes.
   */
  readonly direction = computed(() => this.overlay.direction());
}
