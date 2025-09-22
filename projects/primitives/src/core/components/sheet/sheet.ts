import {
  Component,
  input,
  output,
  computed,
  model,
  inject,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * A sliding sheet component that can be positioned on either side of the screen.
 * The sheet slides in from the left or right edge and includes an overlay backdrop.
 *
 * @selector b-sheet
 */
@Component({
  selector: 'b-sheet',
  standalone: true,
  imports: [CommonModule],
  template: `<button class="close-button" (click)="isOpen.set(false)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="0.094rem"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-x">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
    <ng-content /> `,
  host: {
    '[class.left]': 'side() === "left"',
    '[class.right]': 'side() === "right"',
    '[class.open]': 'isOpen()',
  },
})
export class Sheet {
  /**
   * Indicates whether the sheet is open.
   */
  readonly isOpen = model(false);

  /**
   * Specifies the side of the screen where the sheet is positioned.
   * Can be either 'left' or 'right'.
   */
  readonly side = input<'left' | 'right'>('right');

  /**
   * Computes whether the sheet is positioned on the right side.
   */
  readonly isRight = computed(() => this.side() === 'right');

  /**
   * Event emitted when the sheet is closed.
   */
  closeSheet = output<void>();

  /**
   * Reference to the host element of the sheet.
   */
  private readonly el = inject(ElementRef);

  /**
   * Closes the sheet when clicking outside of it.
   *
   * @param event - The click event.
   */
  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event) {
    if (this.isOpen() && !this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
