import { AfterContentInit, Component, contentChild } from '@angular/core';
import { ConnectedOverlay } from '../../directives/connected-overlay';
import { TooltipContent } from './tooltip-content';
import { TooltipTrigger } from './tooltip-trigger';

/**
 * Lightweight tooltip that connects a trigger to overlay content.
 */
@Component({
  selector: 'b-tooltip',
  template: ` <ng-content /> `,
})
export class Tooltip implements AfterContentInit {
  /**
   * Connected overlay instance used to open/close the tooltip.
   */
  readonly overlay = contentChild(ConnectedOverlay);

  /**
   * ContentChild that emits activation events.
   */
  readonly tooltipTrigger = contentChild(TooltipTrigger);

  /**
   * Tooltip content element.
   */
  readonly tooltipContent = contentChild(TooltipContent);

  ngAfterContentInit(): void {
    this.handleTooltipEvents();
  }

  /**
   * Handles tooltip activation events.
   */
  private handleTooltipEvents(): void {
    this.tooltipTrigger()?.activeEmitter.subscribe(() => {
      this.overlay()?.openOverlay();
    });

    this.tooltipTrigger()?.inactiveEmitter.subscribe(() => {
      this.overlay()?.closeOverlay();
    });
  }
}
