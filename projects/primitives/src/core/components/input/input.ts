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
  },
  exportAs: 'bInput',
})
export class Input implements AfterViewInit {
  readonly type = input<'text' | 'number' | 'password' | 'email'>('text');
  readonly decimals = input<number>(2);
  readonly numberType = input<'integer' | 'decimal'>('integer');
  readonly isNumberType = computed(() => this.type() === 'number');
  readonly el = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private ngModel = inject(NgModel, { optional: true });

  ngAfterViewInit(): void {
    const value = this.el.nativeElement.value || this.ngModel?.model;
    if (this.isNumberType()) {
      const formattedValue = this.formatNumber(value) || '';
      this.setValue(formattedValue);
    }
  }

  setValue(value: string): void {
    this.el.nativeElement.value = value;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    // If the input is not of number type, update the value and emit the value change event.
    if (!this.isNumberType()) {
      this.setValue(target.value);
    }
  }

  onBlur(event: any): void {
    // If the input is of number type, format the value and emit the value change event.
    if (this.isNumberType()) {
      const formattedValue = this.formatNumber(event.target.value);
      this.setValue(formattedValue || '');
    }
  }

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

  blur(): void {
    if (this.isNumberType()) {
      const value = this.el.nativeElement.value;
      const formattedValue = this.formatNumber(value);
      this.setValue(formattedValue || '');
    }
  }
}
