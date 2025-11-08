import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';

/**
 * A draggable bottom sheet drawer with open/close and drag-to-dismiss behavior.
 */
@Component({
  selector: 'b-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen()) {
      <div class="backdrop" (click)="closeDrawer()"></div>
    }
    <div class="drawer-content" #drawerContent [style.transform]="transform()">
      <div class="drag-section" (pointerdown)="startDrag($event)">
        <div class="drag-indicator"></div>
      </div>
      <ng-content />
    </div>
  `,
  host: {
    '[class.dragging]': 'isDragging()',
    '[class.open]': 'isOpen()',
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
   * Reference to the drawer content element.
   */
  readonly drawerContent = viewChild<ElementRef>('drawerContent');

  /**
   * Close the drawer.
   */
  closeDrawer(): void {
    this.isOpen.set(false);
    this.closeSheet.emit();
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
    const drawerElement = this.drawerContent()?.nativeElement;
    if (!drawerElement) return;

    const sheetHeight = drawerElement.offsetHeight;
    // Convert the pixel delta to a percentage relative to the sheet height
    const deltaPercent = (deltaPx / sheetHeight) * 100;
    // If open, the initial position is 0%; if closed, it is 100%
    const newPos = Math.min(
      100,
      Math.max(0, this.isOpen() ? 0 + deltaPercent : 100 + deltaPercent),
    );
    this.translateY.set(newPos);
  }

  /**
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
