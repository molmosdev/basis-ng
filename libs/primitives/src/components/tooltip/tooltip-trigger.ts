import { Directive } from '@angular/core';
import { OverlayTrigger } from '../../directives/overlay-v2/overlay-trigger';

/**
 * Trigger directive that emits activation events for tooltips.
 *
 * This directive now extends `OverlayOrigin` so it exposes the same
 * `trigger` and `el` properties expected by `ConnectedOverlay`.
 */
@Directive({
  selector: '[bTooltipTrigger]',
  host: {
    '(mouseover)': 'active.set(true)',
    '(focus)': 'active.set(true)',
    '(mouseout)': 'active.set(false)',
    '(blur)': 'active.set(false)',
  },
  exportAs: 'bTooltipTrigger',
})
export class TooltipTrigger extends OverlayTrigger {}
