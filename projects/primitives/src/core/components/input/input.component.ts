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
    '[style.max-width]': 'maxWidth()',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur($event)',
    '[class]': ' "size-" + size() ',
  },
})
export class Input implements AfterViewInit {
  /**
   * The type of the input.
   */
  readonly type = input<'text' | 'number' | 'password' | 'email'>('text');

  /**
   * The maximum width of the input.
   */
  readonly maxWidth = input<string>('');

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
  readonly size = input<'1' | '2' | '3'>('2');

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
}
