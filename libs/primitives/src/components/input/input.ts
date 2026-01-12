import { AfterViewInit, Component, computed, ElementRef, inject, input } from '@angular/core';

/**
 * Enhanced native input with optional numeric formatting and integrations.
 */
@Component({
  selector: 'input[b-input]',
  template: ``,
  host: {
    '[type]': 'type()',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur($event)',
  },
  exportAs: 'bInput',
})
export class Input implements AfterViewInit {
  /**
   * Input type.
   */
  readonly type = input<'text' | 'number' | 'password' | 'email'>('text');

  /**
   * Number of decimals when formatting decimal numbers.
   */
  readonly decimals = input<number>(2);

  /**
   * Whether number formatting uses integer or decimal logic.
   */
  readonly numberType = input<'integer' | 'decimal'>('integer');

  /**
   * Computed signal indicating if the current type is numeric.
   */
  readonly isNumberType = computed(() => this.type() === 'number');

  /**
   * Host input element.
   */
  readonly el = inject<ElementRef<HTMLInputElement>>(ElementRef);

  ngAfterViewInit(): void {
    const value = this.el.nativeElement.value;
    if (this.isNumberType()) {
      const formattedValue = this.formatNumber(value) || '';
      this.setValue(formattedValue);
    }
  }

  /**
   * Set the native input value.
   * @param value - String value to set on the element.
   */
  setValue(value: string): void {
    this.el.nativeElement.value = value;
  }

  /**
   * Handle native input events.
   * @param event - Input event.
   */
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    // If the input is not of number type, update the value and emit the value change event.
    if (!this.isNumberType()) {
      this.setValue(target.value);
    }
  }

  /**
   * Handle blur events and format numeric values when applicable.
   * @param event - Focus event.
   */
  onBlur(event: FocusEvent): void {
    // If the input is of number type, format the value and emit the value change event.
    if (this.isNumberType()) {
      const target = event.target as HTMLInputElement;
      const formattedValue = this.formatNumber(target.value);
      this.setValue(formattedValue || '');
    }
  }

  /**
   * Format a numeric string according to the current numberType and decimals.
   * @param value - Raw input string.
   * @returns Formatted string or null when input is empty.
   */
  formatNumber(value: string | null) {
    if (value) {
      const numericValue = Number(value);
      return this.numberType() === 'integer'
        ? Math.round(numericValue).toString()
        : numericValue.toFixed(this.decimals());
    } else {
      return null;
    }
  }

  /**
   * Programmatically blur and format numeric value if applicable.
   */
  blur(): void {
    if (this.isNumberType()) {
      const value = this.el.nativeElement.value;
      const formattedValue = this.formatNumber(value);
      this.setValue(formattedValue || '');
    }
  }
}
