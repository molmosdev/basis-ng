import {
  Component,
  AfterContentInit,
  forwardRef,
  output,
  contentChildren,
  model,
  computed,
} from '@angular/core';
import { ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'b-otp',
  template: `<ng-content />`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Otp),
      multi: true,
    },
  ],
})
export class Otp implements AfterContentInit, ControlValueAccessor {
  readonly length = computed(() => this.digitInputs().length);
  readonly otpChange = output<string>();
  readonly digitInputs = contentChildren(OtpDigitDirective);
  private values: string[] = [];
  readonly disabled = model(false);
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  ngAfterContentInit() {
    this.digitInputs().forEach((input, idx) => {
      const el = input.el.nativeElement;
      el.disabled = this.disabled();
      el.addEventListener('input', (event: Event) => {
        this.onInput(event, idx);
      });
      el.addEventListener('keydown', (event: KeyboardEvent) => {
        this.onKeyDown(event, idx);
      });
      el.addEventListener('paste', (event: ClipboardEvent) => {
        this.onPaste(event);
      });
    });
    this.resetValues();
  }

  private onInput(event: Event, idx: number) {
    const input = event.target as HTMLInputElement;
    const val = input.value;
    this.values[idx] = val;
    if (val && idx < this.length() - 1) {
      this.focusDigit(idx + 1);
    }
    this.emitValue();
  }

  private onKeyDown(event: KeyboardEvent, idx: number) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace') {
      if (!input.value && idx > 0) {
        this.focusDigit(idx - 1);
      }
      this.values[idx] = '';
      this.emitValue();
    } else if (event.key === 'ArrowLeft' && idx > 0) {
      this.focusDigit(idx - 1);
    } else if (event.key === 'ArrowRight' && idx < this.length() - 1) {
      this.focusDigit(idx + 1);
    }
  }

  private onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const paste = event.clipboardData?.getData('text') ?? '';
    const chars = paste.slice(0, this.length()).split('');
    chars.forEach((c, i) => {
      this.values[i] = c;
      const input = this.digitInputs()[i];
      if (input) {
        input.el.nativeElement.value = c;
      }
    });
    this.emitValue();
    this.focusDigit(chars.length - 1);
  }

  private focusDigit(idx: number) {
    const input = this.digitInputs()[idx];
    if (input) {
      input.el.nativeElement.focus();
    }
  }

  private emitValue() {
    const otp = this.values.join('');
    this.otpChange.emit(otp);
    this.onChange(otp);
    this.onTouched();
  }

  private resetValues() {
    this.values = Array(this.length()).fill('');
    this.digitInputs().forEach(input => {
      input.el.nativeElement.value = '';
    });
  }

  // ControlValueAccessor implementation

  writeValue(value: string): void {
    this.values = Array(this.length()).fill('');
    if (value) {
      value
        .slice(0, this.length())
        .split('')
        .forEach((c, i) => {
          this.values[i] = c;
          const input = this.digitInputs()[i];
          if (input) {
            input.el.nativeElement.value = c;
          }
        });
    } else {
      this.resetValues();
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
    this.digitInputs().forEach(input => {
      input.el.nativeElement.disabled = isDisabled;
    });
  }
}

import { Directive, inject } from '@angular/core';

@Directive({
  selector: 'input[b-otp-digit]',
  host: {
    maxlength: '1',
  },
})
export class OtpDigitDirective {
  el = inject(ElementRef<HTMLInputElement>);
}
