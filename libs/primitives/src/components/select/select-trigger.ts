import { Component, ElementRef, inject, output, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAArrowDown, lucideAArrowUp } from '@ng-icons/lucide';

/**
 * A button that acts as the trigger for a select dropdown.
 */
@Component({
  selector: 'button[b-select-trigger]',
  imports: [NgIcon],
  template: `
    <ng-content />
    <ng-icon [name]="triggered() ? 'lucide-a-arrow-up' : 'lucide-a-arrow-down'" />
  `,
  host: {
    '(keydown)': 'handleKeydown($event)',
    '(click)': 'handleClick()',
    '[disabled]': 'disabled()',
  },
  providers: [provideIcons({ lucideAArrowDown, lucideAArrowUp })],
})
export class SelectTrigger {
  /**
   * Host button element.
   */
  el = inject(ElementRef);

  /**
   * Emitted when the trigger is activated (click or key events).
   */
  buttonClicked = output<void>();

  /**
   * Whether the trigger is disabled.
   */
  readonly disabled = signal(false);

  /**
   * Whether the trigger is activated.
   */
  triggered = signal<boolean>(false);

  /**
   * Handle click events on the trigger.
   */
  handleClick(): void {
    this.buttonClicked.emit();
    this.triggered.set(!this.triggered());
  }

  /**
   * Handle keydown events on the trigger.
   * @param event - The keyboard event.
   */
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      this.buttonClicked.emit();
      this.triggered.set(event.key === 'ArrowUp');
    }
  }
}
