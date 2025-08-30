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

/**
 * Component representing a One-Time Password (OTP) input group.
 *
 * This component manages a set of digit inputs for entering OTP codes, handling keyboard navigation,
 * paste events, and integration with Angular Forms via ControlValueAccessor.
 *
 * @example
 * <b-otp>
 *   <input b-otp-digit />
 *   <input b-otp-digit />
 *   <input b-otp-digit />
 *   <input b-otp-digit />
 * </b-otp>
 */
@Component({
  selector: 'b-otp',
  template: `<ng-content />`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpComponent),
      multi: true,
    },
  ],
})
/**
 * OtpComponent manages a group of digit inputs for OTP entry.
 * Implements keyboard navigation, paste handling, and ControlValueAccessor for Angular Forms.
 */
export class OtpComponent implements AfterContentInit, ControlValueAccessor {
  /**
   * The visual size of the OTP inputs. Accepts '1', '2', or '3'. Default is '2'.
   */
  readonly size = model<'1' | '2' | '3'>('2');

  /**
   * Computed signal for the number of digit inputs.
   */
  readonly length = computed(() => this.digitInputs().length);

  /**
   * Emits the full OTP value when changed.
   */
  readonly otpChange = output<string>();

  /**
   * Query for all child digit inputs (OtpDigitDirective).
   */
  readonly digitInputs = contentChildren(OtpDigitDirective);

  /**
   * Internal array holding the current values of each digit input.
   */
  private values: string[] = [];

  /**
   * Model indicating whether the OTP input group is disabled.
   */
  readonly disabled = model(false);

  /**
   * Callback for propagating value changes to Angular Forms.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: string) => void = () => {};

  /**
   * Callback for marking the component as touched in Angular Forms.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  ngAfterContentInit() {
    // Inicializar listeners en los inputs hijos
    this.digitInputs().forEach((input, idx) => {
      const el = input.el.nativeElement;
      // maxLength y type se aplican por la directiva
      el.disabled = this.disabled();
      el.classList.remove('size-1', 'size-2', 'size-3');
      el.classList.add(`size-${this.size()}`);
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
   * Handles input event for each digit input.
   * Moves focus to next input if value entered.
   *
   * @param event - Input event
   *
   * @param idx - Index of the digit input
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
   * Handles keyboard navigation for digit inputs.
   * Supports Backspace, ArrowLeft, ArrowRight.
   *
   * @param event - Keyboard event
   *
   * @param idx - Index of the digit input
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
   * Handles paste event for the OTP input group.
   * Distributes pasted characters across digit inputs.
   *
   * @param event - Clipboard event
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
   * Focuses the digit input at the given index.
   *
   * @param idx - Index of the digit input to focus
   */
  private focusDigit(idx: number) {
    const input = this.digitInputs()[idx];
    if (input) {
      input.el.nativeElement.focus();
    }
  }

  /**
   * Emits the full OTP value via output and ControlValueAccessor.
   */
  private emitValue() {
    const otp = this.values.join('');
    this.otpChange.emit(otp);
    this.onChange(otp);
    this.onTouched();
  }

  /**
   * Resets all digit input values to empty.
   */
  private resetValues() {
    this.values = Array(this.length()).fill('');
    this.digitInputs().forEach(input => {
      input.el.nativeElement.value = '';
    });
  }

  // ControlValueAccessor implementation

  /**
   * Writes a new value to the OTP input group.
   * Called by Angular Forms to update the value.
   *
   * @param value - New OTP value
   */
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

  /**
   * Registers a callback to be called when the value changes.
   *
   * @param fn - Callback function
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback to be called when the component is touched.
   *
   * @param fn - Callback function
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the OTP input group.
   * Called by Angular Forms to enable/disable the component.
   *
   * @param isDisabled - Boolean indicating disabled state
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
    this.digitInputs().forEach(input => {
      input.el.nativeElement.disabled = isDisabled;
      input.el.nativeElement.classList.remove('size-1', 'size-2', 'size-3');
      input.el.nativeElement.classList.add(`size-${this.size()}`);
    });
  }
}

/**
 * Directive for individual OTP digit input.
 *
 * Apply to <input> elements to mark them as part of the OTP group.
 * Sets maxlength to 1 and provides access to the native element.
 */
import { Directive, inject } from '@angular/core';

@Directive({
  selector: 'input[b-otp-digit]',
  host: {
    maxlength: '1',
  },
})
export class OtpDigitDirective {
  /** Reference to the native input element. */
  el = inject(ElementRef<HTMLInputElement>);
}
