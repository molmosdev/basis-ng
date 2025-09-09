/**
 * Spinner component for loading indicators.
 *
 * Displays an animated spinner SVG. The size can be adjusted for use in buttons or standalone.
 */
import { Component, input } from '@angular/core';

@Component({
  selector: 'b-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  /**
   * Size of the spinner.
   *
   * - '1': Small (for compact UI, e.g. inside buttons)
   * - '2': Medium (default)
   * - '3': Large (for standalone loading indicators)
   *
   * @default '2'
   */
  readonly size = input<'1' | '2' | '3'>('2');

  /**
   * Type of spinner: 'bars' (default) or 'circle'.
   *
   * - 'bars': classic spinner with bars
   * - 'circle': circular spinner
   *
   * @default 'bars'
   */
  readonly type = input<'bars' | 'circle'>('bars');
}
