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
 * @selector b-side-sheet
 */
@Component({
  selector: 'b-side-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-sheet.component.html',
  host: {
    '[class.left]': 'isLeft()',
    '[class.right]': '!isLeft()',
    '[class.open]': 'isOpen()',
    '[style.width]': 'width()',
  },
})
export class SideSheet {
  /**
   * Indicates whether the side sheet is open.
   */
  readonly isOpen = model(false);

  /**
   * Specifies the side of the screen where the sheet is positioned.
   * Can be either 'left' or 'right'.
   */
  readonly side = input<'left' | 'right'>('right');

  /**
   * Specifies the width of the side sheet.
   */
  readonly width = input('300px');

  /**
   * Computes whether the side sheet is positioned on the left side.
   */
  readonly isLeft = computed(() => this.side() === 'left');

  /**
   * Computes whether the side sheet is positioned on the right side.
   */
  readonly isRight = computed(() => this.side() === 'right');

  /**
   * Event emitted when the side sheet is closed.
   */
  closeSheet = output<void>();

  /**
   * Reference to the host element of the side sheet.
   */
  private readonly el = inject(ElementRef);

  /**
   * Closes the side sheet when clicking outside of it.
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
