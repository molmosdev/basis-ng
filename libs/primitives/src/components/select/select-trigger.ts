import { Component, ElementRef, inject, output, signal } from '@angular/core';

/**
 * A button that acts as the trigger for a select dropdown.
 */
@Component({
  selector: 'button[b-select-trigger]',
  template: `
    <ng-content />
    <svg
      [class.b-select-triggered]="triggered()"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-chevron-down-icon lucide-chevron-down"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  `,
  host: {
    '(keydown.arrowUp)': 'buttonClicked.emit()',
    '(keydown.arrowDown)': 'buttonClicked.emit()',
    '(click)': 'buttonClicked.emit()',
    '[disabled]': 'disabled()',
  },
  styles: [
    `
      :host {
        .b-select-triggered {
          transform: rotate(180deg);
        }
      }
    `,
  ],
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
   * Whether the trigger has been activated to open the select.
   */
  triggered = signal(false);
}
