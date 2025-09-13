import { Component, ElementRef, inject, input, signal } from '@angular/core';

/**
 * Component for displaying the selected value or a placeholder in the select dropdown.
 */
@Component({
  selector: 'b-select-value',
  template: `{{ content() || placeholder() }}`,
})
export class SelectValue {
  /**
   * Reference to the host element of the value display.
   */
  el = inject(ElementRef);

  /**
   * Signal holding the display content for the selected value.
   */
  readonly content = signal<string>('');

  /**
   * Input signal for the placeholder text when no value is selected.
   * @param value - The placeholder string to display.
   */
  readonly placeholder = input<string>('Select an option');
}
