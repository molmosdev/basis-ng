import { Directive, ElementRef, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[b-cva]',
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
  private onChange: any = () => undefined;

  /**
   * The callback function to call when the control is touched.
   */
  private onTouched: any = () => undefined;

  /**
   * The element reference.
   */
  private el = inject(ElementRef<HTMLInputElement>);

  /**
   * Writes a new value to the element.
   * @param value The new value.
   */
  writeValue(value: any): void {
    this.el.nativeElement.value = value;
  }

  /**
   * Registers a callback function that should be called when the control's value changes in the UI.
   * @param fn The callback function.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the control is touched.
   * @param fn The callback function.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the host component.
   * @param isDisabled The disabled state.
   */
  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  handleChange(value: any): void {
    this.onChange(value);
    this.el.nativeElement.value = value;
  }
}
