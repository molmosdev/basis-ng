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
  readonly isOpen = model(false);
  readonly side = input<'left' | 'right'>('right');
  readonly isRight = computed(() => this.side() === 'right');
  closeSheet = output<void>();
  private readonly el = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event) {
    if (this.isOpen() && !this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
