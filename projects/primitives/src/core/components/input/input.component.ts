import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'input[b-input]',
  template: ``,
  host: {
    '[type]': 'type()',
    '[placeholder]': 'placeholder() || ""',
    '[class.ng-invalid]': 'invalid()',
    '[class.disabled]': 'disabled()',
    '[style.max-width]': 'maxWidth()',
    '(input)': 'onInput($event)',
    '(focus)': 'focused.set(true)',
    '(blur)': 'onBlur($event)',
  },
})
export class Input implements AfterViewInit {
  /**
   * The type of the input.
   */
  readonly type = input<'text' | 'number' | 'password' | 'email'>('text');

  /**
   * The placeholder text for the input.
   */
  readonly placeholder = input<string>('');

  /**
   * The value of the input.
   */
  readonly value = signal<string | number | null>(null);

  /**
   * Whether the input is invalid.
   */
  readonly invalid = model<boolean>(false);

  /**
   * Whether the input is disabled.
   */
  readonly disabled = model<boolean>(false);

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
   * Whether the input is focused.
   */
  readonly focused = signal<boolean>(false);

  /**
   * Event emitted when the value changes.
   */
  valueChange = output<string | number | null>();

  /**
   * Reference to the input element.
   */
  readonly el = inject<ElementRef<HTMLInputElement>>(ElementRef);

  /**
   * Reference to the ngModel directive.
   */
  private ngModel = inject(NgModel, { optional: true });

  /**
   * After the view has been initialized, set the value of the select.
   */
  ngAfterViewInit(): void {
    const value = this.el.nativeElement.value || this.ngModel?.model;
    this.value.set(this.isNumberType() ? this.formatNumber(value) : value);
  }

  /**
   * Handles the input event.
   * @param event The input event.
   */
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    // If the input is not of number type, update the value and emit the value change event.
    if (!this.isNumberType()) {
      this.value.set(target.value);
      this.valueChange.emit(target.value);
    }
  }

  /**
   * The blur event handler.
   * @param event - The blur event.
   */
  onBlur(event: any): void {
    this.focused.set(false);

    // If the input is of number type, format the value and emit the value change event.
    if (this.isNumberType()) {
      const formattedValue = this.formatNumber(event.target.value);
      this.el.nativeElement.value = formattedValue || '';
      this.value.set(formattedValue);
      this.valueChange.emit(formattedValue);
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
