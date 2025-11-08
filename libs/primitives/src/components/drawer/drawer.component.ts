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
  signal,
} from '@angular/core';

/**
 * A draggable bottom sheet drawer with open/close and drag-to-dismiss behavior.
 */
@Component({
  selector: 'b-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="drag-section" (pointerdown)="startDrag($event)">
      <div class="drag-indicator"></div>
    </div>
    <div class="drawer-content" (click)="$event.stopPropagation()">
      <ng-content />
    </div>
  `,
  host: {
    '[class.dragging]': 'isDragging()',
    '[class.open]': 'isOpen()',
    '[style.transform]': 'transform()',
  },
})
export class Drawer {
  /**
   * Model indicating whether the drawer is open.
   */
  readonly isOpen = model(false);

  /**
   * Emitted when the sheet is closed.
   */
  closeSheet = output<void>();

  /**
   * Signal used to animate or flag dragging state.
   */
  readonly isDragging = signal(false);

  /**
   * Starting Y position of the pointer when drag begins.
   */
  readonly startY = signal(0);

  /**
   * Current vertical translation of the drawer.
   */
  private readonly translateY = signal(100);

  /**
   * Vertical drag threshold (percentage) to trigger close on release.
   */
  readonly closeThreshold = input(30);

  /**
   * Computed CSS transform for the drawer based on drag/open state.
   */
  readonly transform = computed(() =>
    this.isDragging()
      ? `translateY(${this.translateY()}%)`
      : this.isOpen()
        ? 'translateY(0%)'
        : 'translateY(100%)',
  );

  /**
   * Element reference to the host component.
   */
  private readonly el = inject(ElementRef);

  /**
   * Close the drawer when clicking outside of it.
   * The stopPropagation in the drawer-content prevents clicks inside from closing it.
   * @param event - Click event.
   */
  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event) {
    if (this.isOpen() && !this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
      this.closeSheet.emit();
    }
  }

  /**
   * Begin tracking pointer movement for drag-to-dismiss.
   * @param event - Pointer down event.
   */
  startDrag(event: PointerEvent): void {
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
   * Update drawer position during drag.
   * @param clientY - Current pointer Y position.
   */
  updateDrag(clientY: number): void {
    const deltaPx = clientY - this.startY();
    const sheetHeight = this.el.nativeElement.offsetHeight;
    // Convert the pixel delta to a percentage relative to the sheet height
    const deltaPercent = (deltaPx / sheetHeight) * 100;
    // If open, the initial position is 0%; if closed, it is 100%
    const newPos = Math.min(
      100,
      Math.max(0, this.isOpen() ? 0 + deltaPercent : 100 + deltaPercent),
    );
    this.translateY.set(newPos);
  } /**
   * Snap the drawer to open or closed based on threshold.
   */
  snapToOpenOrClose(): void {
    if (this.translateY() > this.closeThreshold()) {
      this.isOpen.set(false);
    } else {
      this.isOpen.set(true);
    }
  }
}
