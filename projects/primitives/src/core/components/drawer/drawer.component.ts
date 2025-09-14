import {
  Component,
  input,
  output,
  model,
  signal,
  computed,
  inject,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'b-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  host: {
    '[class.dragging]': 'isDragging()',
    '[style.transform]': 'transform()',
    '[class.open]': 'isOpen()',
  },
})
export class Drawer {
  /**
   * Indicates whether the drawer is open.
   */
  readonly isOpen = model(false);

  /**
   * Event emitted when the drawer is closed.
   */
  closeSheet = output<void>();

  /**
   * Indicates whether a drag event is in progress.
   */
  private readonly isDragging = signal(false);

  /**
   * The starting Y position of the drag event.
   */
  readonly startY = signal(0);

  /**
   * The current Y translation of the drawer in percentage.
   */
  private readonly translateY = signal(100);

  /**
   * The threshold for closing the drawer, in percentage.
   */
  readonly closeThreshold = input(30);

  /**
   * The computed transform property for the drawer.
   */
  readonly transform = computed(() =>
    this.isDragging()
      ? `translateY(${this.translateY()}%)`
      : this.isOpen()
        ? 'translateY(0%)'
        : 'translateY(100%)'
  );

  /**
   * The reference to the drawer DOM element.
   */
  private readonly el = inject(ElementRef);

  /**
   * Closes the drawer when clicking outside of it.
   * @param event The click event.
   */
  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event) {
    if (this.isOpen() && !this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
      this.closeSheet.emit();
    }
  }

  /**
   * Starts the drag event for the drawer.
   * @param event The pointer event that starts the drag.
   */
  startDrag(event: PointerEvent) {
    this.isDragging.set(true);
    this.startY.set(event.clientY);
    // Initialize translateY based on the current state:
    this.translateY.set(this.isOpen() ? 0 : 100);
    // Disable text selection for better UX
    document.body.style.userSelect = 'none';

    const move = (e: PointerEvent) => this.updateDrag(e.clientY);
    const end = () => {
      this.isDragging.set(false);
      this.snapToOpenOrClose();

      // Restore text selection
      document.body.style.userSelect = '';

      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
    };

    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', end);
  }

  /**
   * Updates the drag position of the drawer.
   * @param clientY The current Y position of the pointer.
   */
  updateDrag(clientY: number) {
    const deltaPx = clientY - this.startY();
    const sheetHeight = this.el.nativeElement.offsetHeight;
    // Convert the pixel delta to a percentage relative to the sheet height
    const deltaPercent = (deltaPx / sheetHeight) * 100;
    // If open, the initial position is 0%; if closed, it is 100%
    const newPos = Math.min(
      100,
      Math.max(0, this.isOpen() ? 0 + deltaPercent : 100 + deltaPercent)
    );
    this.translateY.set(newPos);
  }

  /**
   * Snaps the drawer to either open or closed state based on the drag position.
   */
  snapToOpenOrClose() {
    if (this.translateY() > this.closeThreshold()) {
      this.isOpen.set(false);
    } else {
      this.isOpen.set(true);
    }
  }
}
