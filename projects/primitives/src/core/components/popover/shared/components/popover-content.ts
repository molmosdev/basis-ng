import { Component, ElementRef, inject, input, output } from '@angular/core';

/**
 * Union of allowed positional strings that define where the popover appears relative to its anchor.
 */
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
 * Renders the projected popover content and positions it relative to an anchor using CSS anchor positioning.
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
   * Requested anchor-relative position of the popover.
   */
  readonly position = input.required<PopoverPosition>();

  /**
   * Whether pressing Escape should close the popover.
   *
   * @defaultValue true
   */
  readonly closeOnEscape = input(true);

  /**
   * Emits when the popover should be closed (e.g., on Escape key).
   */
  readonly closePopover = output<void>();

  /**
   * Reference to the host DOM element for direct native access when needed.
   */
  el = inject(ElementRef);
}
