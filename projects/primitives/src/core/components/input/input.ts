import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'input[b-input]',
  template: ``,
  host: {
    '[type]': 'type()',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur($event)',
    '[class.b-input-size-sm]': 'size() === "sm"',
    '[class.b-input-size-md]': 'size() === "md"',
    '[class.b-input-size-lg]': 'size() === "lg"',
  },
  exportAs: 'bInput',
})
export class Input implements AfterViewInit {
  /**
   * The type of the input.
   */
  readonly type = input<'text' | 'number' | 'password' | 'email'>('text');

  /**
   * The number of decimal places for number input.
   */
  readonly decimals = input<number>(2);

  /**
   * The type of number input (integer or decimal).
   */
  readonly numberType = input<'integer' | 'decimal'>('integer');

  /**
   * Whether the input type is number.
   */
  readonly isNumberType = computed(() => this.type() === 'number');

  /**
   * Reference to the input element.
   */
  readonly el = inject<ElementRef<HTMLInputElement>>(ElementRef);

  /**
   * Reference to the ngModel directive.
   */
  private ngModel = inject(NgModel, { optional: true });

  /**
   * The size of the input.
   */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /**
   * After the view has been initialized, set the value of the select.
   */
  ngAfterViewInit(): void {
    const value = this.el.nativeElement.value || this.ngModel?.model;
    if (this.isNumberType()) {
      const formattedValue = this.formatNumber(value) || '';
      this.setValue(formattedValue);
    }
  }

  /**
   * Sets the value of the input element.
   * @param value The value to set.
   */
  setValue(value: string): void {
    this.el.nativeElement.value = value;
  }

  /**
   * Handles the input event.
   * @param event The input event.
   */
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    // If the input is not of number type, update the value and emit the value change event.
    if (!this.isNumberType()) {
      this.setValue(target.value);
    }
  }

  /**
   * The blur event handler.
   * @param event - The blur event.
   */
  onBlur(event: any): void {
    // If the input is of number type, format the value and emit the value change event.
    if (this.isNumberType()) {
      const formattedValue = this.formatNumber(event.target.value);
      this.setValue(formattedValue || '');
    }
  }

  /**
   * Formats the number value.
   * @param value - The value to format.
   * @returns The formatted value.
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
   * Método público para disparar el formateo como si se hiciera blur.
   */
  blur(): void {
    if (this.isNumberType()) {
      const value = this.el.nativeElement.value;
      const formattedValue = this.formatNumber(value);
      this.setValue(formattedValue || '');
    }
  }
}
