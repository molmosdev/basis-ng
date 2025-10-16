import { Component, ElementRef, inject, input, output } from '@angular/core';

export type PopoverPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right';

/**
 * Positioned popover content with close behavior.
 */
@Component({
  selector: 'b-popover-content',
  imports: [],
  template: ` <ng-content /> `,
  styles: [
    `
      :host {
        position: absolute;
        position-anchor: var(--anchor-name);
        position-try-fallbacks: flip-block, flip-inline;
      }
    `,
  ],
  host: {
    '[style.position-area]': 'position()',
    '[animate.enter]': "'b-popover-entering'",
    '[animate.leave]': "'b-popover-leaving'",
    tabindex: '-1',
    '(keydown.escape)': 'closeOnEscape() && closePopover.emit()',
  },
})
export class PopoverContent {
  /**
   * Position of the popover relative to the anchor.
   */
  readonly position = input.required<PopoverPosition>();

  /**
   * Whether the popover closes on Escape key.
   */
  readonly closeOnEscape = input(true);

  /**
   * Emitted when the popover should close.
   */
  readonly closePopover = output<void>();

  /**
   * Host element reference.
   */
  el = inject(ElementRef);
}
