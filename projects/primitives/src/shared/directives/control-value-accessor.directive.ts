import { Directive, ElementRef, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[bCva]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlValueAccessorDirective),
      multi: true,
    },
  ],
  host: {
    '(input)': 'handleChange($event.target.value)',
    '(change)': 'handleChange($event.target.value)',
    '(blur)': 'onTouched()',
  },
})
export class ControlValueAccessorDirective implements ControlValueAccessor {
  /**
   * The callback function to call when the control's value changes in the UI.
   */
  private onChange: (value: unknown) => void = () => undefined;

  /**
   * The callback function to call when the control is touched.
   */
  private onTouched: () => void = () => undefined;

  /**
   * The element reference.
   */
  private el = inject(ElementRef<HTMLInputElement>);

  /**
   * Writes a new value to the element.
   * @param value The new value.
   */
  writeValue(value: unknown): void {
    this.el.nativeElement.value = value as string | number | null | undefined;
  }

  /**
   * Registers a callback function that should be called when the control's value changes in the UI.
   * @param fn The callback function.
   */
  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the control is touched.
   * @param fn The callback function.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the host component.
   * @param isDisabled The disabled state.
   */
  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  handleChange(value: unknown): void {
    this.onChange(value);
    this.el.nativeElement.value = value as string | number | null | undefined;
  }
}
