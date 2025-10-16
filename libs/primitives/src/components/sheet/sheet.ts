import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  output,
} from '@angular/core';

/**
 * Slide-in sheet panel used for side or bottom panels with optional backdrop.
 */
@Component({
  selector: 'b-sheet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="close-button" (click)="isOpen.set(false)">
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
        class="lucide lucide-x"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
    <ng-content />
  `,
  host: {
    '[class.left]': 'side() === "left"',
    '[class.right]': 'side() === "right"',
    '[class.open]': 'isOpen()',
  },
})
export class Sheet {
  /**
   * Whether the sheet is open. Can be two-way bound.
   */
  readonly isOpen = model(false);

  /**
   * Side of the sheet panel.
   */
  readonly side = input<'left' | 'right'>('right');

  /**
   * Whether the sheet is positioned on the right side.
   */
  readonly isRight = computed(() => this.side() === 'right');

  /**
   * Emitted when the sheet is closed.
   */
  closeSheet = output<void>();

  /**
   * Reference to the host element.
   */
  private readonly el = inject(ElementRef);

  /**
   * Closes the sheet when clicking outside of it.
   */
  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event): void {
    if (this.isOpen() && !this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
