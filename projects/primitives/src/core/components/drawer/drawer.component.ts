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
  template: `
    <div class="drag-section" (pointerdown)="startDrag($event)">
      <div class="drag-indicator"></div>
    </div>
    <ng-content />
  `,
  host: {
    '[class.dragging]': 'isDragging()',
    '[style.transform]': 'transform()',
    '[class.open]': 'isOpen()',
  },
})
export class Drawer {
  readonly isOpen = model(false);
  closeSheet = output<void>();
  private readonly isDragging = signal(false);
  readonly startY = signal(0);
  private readonly translateY = signal(100);
  readonly closeThreshold = input(30);
  readonly transform = computed(() =>
    this.isDragging()
      ? `translateY(${this.translateY()}%)`
      : this.isOpen()
        ? 'translateY(0%)'
        : 'translateY(100%)'
  );
  private readonly el = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event) {
    if (this.isOpen() && !this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
      this.closeSheet.emit();
    }
  }

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

  snapToOpenOrClose() {
    if (this.translateY() > this.closeThreshold()) {
      this.isOpen.set(false);
    } else {
      this.isOpen.set(true);
    }
  }
}
