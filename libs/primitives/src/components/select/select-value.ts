import { Component, ElementRef, inject, input, signal } from '@angular/core';

/**
 * Displays the selected value or a placeholder in a select component.
 */
@Component({
  selector: 'b-select-value',
  template: ` {{ content() || placeholder() }} `,
})
export class SelectValue {
  /**
   * Host element reference.
   */
  el = inject(ElementRef);

  /**
   * Computed selected content to display.
   */
  readonly content = signal<string>('');

  /**
   * Placeholder shown when no selection exists.
   */
  readonly placeholder = input<string>('Select an option');
}
