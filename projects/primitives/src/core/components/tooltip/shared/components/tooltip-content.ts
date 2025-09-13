import { Component, computed, effect, inject } from '@angular/core';
import { OverlayDirective } from '@basis-ng/primitives';

@Component({
  selector: 'b-tooltip-content',
  imports: [],
  template: `<ng-content />`,
  host: {
    '[animate.enter]': '"b-tooltip-content-entering-" + this.direction()',
    '[animate.leave]': '"b-tooltip-content-leaving-" + this.direction()',
  },
})
export class TooltipContent {
  /**
   * Reference to the OverlayDirective to determine the direction of the overlay.
   */
  overlay = inject(OverlayDirective);

  /**
   * Computed signal representing the direction of the overlay.
   */
  readonly direction = computed(() => this.overlay.direction());

  constructor() {
    effect(() => console.log(this.direction()));
  }
}
