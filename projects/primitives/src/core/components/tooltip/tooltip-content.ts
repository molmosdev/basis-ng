import { Component, computed, inject } from '@angular/core';
import { ConnectedOverlay } from '../../directives/connected-overlay';

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
  overlay = inject(ConnectedOverlay);
  readonly direction = computed(() => this.overlay.direction());
}
