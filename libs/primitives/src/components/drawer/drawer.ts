import {
  booleanAttribute,
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
import { Direction } from '../../types/direction.type';

/**
 * A draggable floating drawer that can slide from any side.
 */
@Component({
  selector: 'b-drawer',
  standalone: true,
  imports: [],
  template: `
    @if (draggable()) {
      <div class="drag-section" (pointerdown)="startDrag($event)">
        <div class="drag-indicator"></div>
      </div>
    }

    <div class="drawer-content" (click)="$event.stopPropagation()">
      <ng-content />
    </div>
  `,
  host: {
    '[class.bottom]': 'side() === "bottom"',
    '[class.dragging]': 'isDragging()',
    '[class.left]': 'side() === "left"',
    '[class.open]': 'isOpen()',
    '[class.right]': 'side() === "right"',
    '[class.top]': 'side() === "top"',
    '[style.transform]': 'transform()',
  },
})
export class Drawer {
  /**
   * Model indicating whether the drawer is open.
   */
  readonly isOpen = model(false);

  /**
   * Side of the viewport the drawer appears from.
   */
  readonly side = input<Direction>('bottom');

  /**
   * Whether the drawer can be dragged closed.
   */
  readonly draggable = input(true, { transform: booleanAttribute });

  /**
   * Emitted when the sheet is closed.
   */
  closeSheet = output<void>();

  /**
   * Signal used to animate or flag dragging state.
   */
  readonly isDragging = signal(false);

  /**
   * Starting pointer coordinate for the active drag axis.
   */
  readonly startOffset = signal(0);

  /**
   * Current close progress of the drawer, from 0 (open) to 100 (closed).
   */
  private readonly dragProgress = signal(100);

  /**
   * Drag threshold (percentage) to trigger close on release.
   */
  readonly closeThreshold = input(30);

  /**
   * Computed CSS transform for the drawer based on drag/open state.
   */
  readonly transform = computed(() => this.getTransform(this.currentProgress()));

  /**
   * Current progress to use for the rendered transform.
   */
  readonly currentProgress = computed(() =>
    this.isDragging() ? this.dragProgress() : this.isOpen() ? 0 : 100,
  );

  /**
   * Element reference to the host component.
   */
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  /**
   * Close the drawer when clicking outside of it.
   * The stopPropagation in the drawer-content prevents clicks inside from closing it.
   * @param event - Click event.
   */
  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event) {
    if (!this.isOpen()) return;

    const target = event.target as HTMLElement;

    if (this.el.nativeElement.contains(target)) {
      return;
    }

    if (target.closest('.cdk-overlay-container')) {
      return;
    }

    this.requestClose();
  }

  /**
   * Begin tracking pointer movement for drag-to-dismiss.
   * @param event - Pointer down event.
   */
  startDrag(event: PointerEvent): void {
    if (!this.draggable()) {
      return;
    }

    event.preventDefault();

    this.isDragging.set(true);
    this.startOffset.set(this.getPointerOffset(event));
    this.dragProgress.set(this.isOpen() ? 0 : 100);
    document.body.style.userSelect = 'none';

    const move = (e: PointerEvent) => {
      e.preventDefault();
      this.updateDrag(e);
    };

    const end = () => {
      this.isDragging.set(false);
      this.snapToOpenOrClose();
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
    };

    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', end);
  }

  /**
   * Update drawer position during drag.
   * @param event - Current pointer event.
   */
  updateDrag(event: PointerEvent): void {
    const host = this.el.nativeElement;
    const pointerOffset = this.getPointerOffset(event);
    const deltaPx = (pointerOffset - this.startOffset()) * this.getCloseDirection();
    const size = this.isHorizontal() ? host.offsetWidth : host.offsetHeight;

    if (!size) {
      return;
    }

    const deltaPercent = (deltaPx / size) * 100;
    const nextProgress = Math.min(100, Math.max(0, deltaPercent));
    this.dragProgress.set(nextProgress);
  }

  /**
   * Snap the drawer to open or closed based on threshold.
   */
  snapToOpenOrClose(): void {
    if (this.dragProgress() > this.closeThreshold()) {
      this.requestClose();
    } else {
      this.isOpen.set(true);
    }
  }

  /**
   * Closes the drawer and emits the close event.
   */
  requestClose(): void {
    this.isOpen.set(false);
    this.closeSheet.emit();
  }

  /**
   * Maps the current side to the transform axis and sign.
   */
  private getTransform(progress: number): string {
    switch (this.side()) {
      case 'top':
        return `translateY(-${progress}%)`;
      case 'left':
        return `translateX(-${progress}%)`;
      case 'right':
        return `translateX(${progress}%)`;
      case 'bottom':
      default:
        return `translateY(${progress}%)`;
    }
  }

  /**
   * Returns the pointer coordinate relevant to the active drag axis.
   */
  private getPointerOffset(event: PointerEvent): number {
    return this.isHorizontal() ? event.clientX : event.clientY;
  }

  /**
   * Indicates whether the drawer moves horizontally.
   */
  private isHorizontal(): boolean {
    return this.side() === 'left' || this.side() === 'right';
  }

  /**
   * Returns the positive pointer direction that closes the drawer.
   */
  private getCloseDirection(): number {
    return this.side() === 'top' || this.side() === 'left' ? -1 : 1;
  }
}
