import { Component } from '@angular/core';

/**
 * Tooltip content that is displayed within a connected overlay.
 */
@Component({
  selector: 'b-tooltip-content',
  template: ` <ng-content /> `,
})
export class TooltipContent {}
