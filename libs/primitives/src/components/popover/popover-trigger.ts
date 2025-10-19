import { Directive } from '@angular/core';
import { OverlayTrigger } from '../../directives/overlay-v2/overlay-trigger';

/**
 * Trigger directive that emits activation events for popovers.
 * Exposes the same `trigger` and `el` properties expected by `ConnectedOverlay`.
 */
@Directive({
  selector: '[bPopoverTrigger]',
  host: {
    '(click)': 'active.set(!active())',
  },
  exportAs: 'bPopoverTrigger',
})
export class PopoverTrigger extends OverlayTrigger {}
