import {
  AfterContentInit,
  Component,
  computed,
  contentChildren,
  ElementRef,
  input,
  model,
  output,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

/**
 * OTP (One-Time Password) input component that manages multiple digit inputs.
 */
@Component({
  selector: 'b-otp',
  template: ` <ng-content /> `,
  host: {
    '[attr.data-invalid]': 'invalid() ? "" : null',
  },
})
export class Otp implements AfterContentInit, FormValueControl<string> {
  /**
   * Number of digit inputs.
   */
  readonly length = computed(() => this.digitInputs().length);

  /**
   * Current OTP value.
   */
  readonly value = model<string>('');

  /**
   * Emitted when the OTP value changes.
   */
  readonly valueChange = output<string>();

  /**
   * Whether the OTP is in an invalid state.
   */
  readonly invalid = input<boolean>(false);

  /**
   * Query list of digit input directives.
   */
  readonly digitInputs = contentChildren(OtpDigitDirective);

  private values: string[] = [];

  /**
   * Whether the OTP inputs are disabled.
   */
  readonly disabled = model(false);

  ngAfterContentInit(): void {
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

  /**
   * Callback invoked when the OTP value changes.
   */
  private onInput(event: Event, idx: number) {
    const input = event.target as HTMLInputElement;
    const val = input.value;
    this.values[idx] = val;
    if (val && idx < this.length() - 1) {
      this.focusDigit(idx + 1);
    }
    this.emitValue();
  }

  /**
   * Callback invoked on keydown events for navigation and deletion.
   */
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

  /**
   * Callback invoked on paste events to fill multiple digits.
   */
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

  /**
   * Focus the digit input at the specified index.
   * @param idx - Index of the digit input to focus.
   */
  private focusDigit(idx: number) {
    const input = this.digitInputs()[idx];
    if (input) {
      input.el.nativeElement.focus();
    }
  }

  /**
   * Emit the current OTP value to all listeners.
   */
  private emitValue() {
    const otp = this.values.join('');
    this.value.set(otp);
    this.valueChange.emit(otp);
  }

  /**
   * Reset the OTP input values.
   */
  private resetValues() {
    this.values = Array(this.length()).fill('');
    this.digitInputs().forEach((input) => {
      input.el.nativeElement.value = '';
    });
  }

  /**
   * Set the disabled state of the OTP inputs.
   * @param isDisabled - Whether inputs should be disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
    this.digitInputs().forEach((input) => {
      input.el.nativeElement.disabled = isDisabled;
    });
  }

  /**
   * Update the current OTP value (FormValueControl API).
   * @param value - New otp string to apply.
   */
  setValue(value: string): void {
    this.value.set(value);
    this.valueChange.emit(value);
    // Update individual digit inputs to reflect new value
    const chars = value.split('');
    this.digitInputs().forEach((inputRef, idx) => {
      const char = chars[idx] ?? '';
      inputRef.el.nativeElement.value = char;
      this.values[idx] = char;
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
  /**
   * Host input element for the OTP digit.
   */
  el = inject(ElementRef<HTMLInputElement>);
}
