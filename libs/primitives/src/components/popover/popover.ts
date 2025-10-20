import { Directive } from '@angular/core';
import { Overlay } from '../../directives/overlay-v2/overlay';

/**
 * Popover directive that configures an overlay for displaying popover content.
 * Popovers differ from tooltips in that they allow multi-line content and use
 * padding-based sizing (no fixed heights) and do not expose variant classes.
 */
@Directive({
  selector: '[bPopover]',
})
export class Popover extends Overlay {}
