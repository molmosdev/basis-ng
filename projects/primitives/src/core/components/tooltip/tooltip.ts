import { AfterContentInit, Component, contentChild } from '@angular/core';
import { ConnectedOverlay } from '../../directives/connected-overlay';
import { TooltipTrigger } from './tooltip-trigger';
import { TooltipContent } from './tooltip-content';

@Component({
  selector: 'b-tooltip',
  template: `
    <ng-content />
  `,
})
export class Tooltip implements AfterContentInit {
  readonly overlay = contentChild(ConnectedOverlay);
  readonly tooltipTrigger = contentChild(TooltipTrigger);
  readonly tooltipContent = contentChild(TooltipContent);

  ngAfterContentInit(): void {
    this.handleTooltipEvents();
  }

  private handleTooltipEvents(): void {
    this.tooltipTrigger()?.activeEmitter.subscribe(() => {
      this.overlay()?.openOverlay();
    });

    this.tooltipTrigger()?.inactiveEmitter.subscribe(() => {
      this.overlay()?.closeOverlay();
    });
  }
}
