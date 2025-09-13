/**
 * Spinner component for loading indicators.
 *
 * Displays an animated spinner SVG. The size can be adjusted for use in buttons or standalone.
 */
import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLoader, lucideLoaderCircle } from '@ng-icons/lucide';

@Component({
  selector: 'b-spinner',
  imports: [NgIcon],
  providers: [provideIcons({ lucideLoader, lucideLoaderCircle })],
  template: `
    <ng-icon
      [name]="type() === 'bars' ? 'lucideLoader' : 'lucideLoaderCircle'"
      color="currentColor"
      [size]="sizeInPx() + 'px'" />
  `,
  styles: [
    `
      :host {
        animation: b-spinner-rotate 1s linear infinite;
      }

      @keyframes b-spinner-rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class Spinner {
  /**
   * Size of the spinner.
   *
   * - 'sm': Small (for compact UI, e.g. inside buttons)
   * - 'md': Medium (default)
   * - 'lg': Large (for standalone loading indicators)
   *
   * @default 'md'
   */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /**
   * Computed size in pixels based on the size input.
   * - 'sm': 16px
   * - 'md': 20px
   * - 'lg': 28px
   */
  readonly sizeInPx = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 16;
      case 'md':
        return 20;
      case 'lg':
        return 28;
      default:
        return 20;
    }
  });

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
