import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLoader, lucideLoaderCircle } from '@ng-icons/lucide';

/**
 * A spinner component to indicate loading states.
 */
@Component({
  selector: 'b-spinner',
  imports: [NgIcon],
  providers: [provideIcons({ lucideLoader, lucideLoaderCircle })],
  template: `
    <ng-icon
      [name]="type() === 'bars' ? 'lucideLoader' : 'lucideLoaderCircle'"
      color="currentColor"
      [size]="sizeInPx() + 'px'"
    />
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
   * Size variant of the spinner.
   */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /**
   * Computed pixel size for the icon.
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
  readonly type = input<'bars' | 'circle'>('bars');
}
