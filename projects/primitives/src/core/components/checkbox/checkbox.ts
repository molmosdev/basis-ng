import {
  Component,
  ElementRef,
  inject,
  model,
  output,
  AfterViewInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'input[b-checkbox]',
  template: ``,
  host: {
    '[attr.role]': 'checkbox',
    '[attr.checked]': 'value()',
    '[attr.aria-checked]': 'value()',
    '(click)': 'toggleValue()',
    '(keydown.enter)': 'toggleValue()',
    '(keydown.space)': 'toggleValue()',
    '[class.b-checkbox-size-sm]': 'size() === "sm"',
    '[class.b-checkbox-size-md]': 'size() === "md"',
    '[class.b-checkbox-size-lg]': 'size() === "lg"',
  },
})
export class Checkbox implements AfterViewInit {
  /**
   * Value of the checkbox.
   */
  readonly value = signal<boolean>(false);

  /**
   * Reference to the checkbox element.
   */
  el = inject(ElementRef);

  /**
   * Event emitted when the value changes.
   */
  valueChange = output<boolean>();

  /**
   * Tamaño del checkbox: 'sm', 'md', 'lg'.
   */
  readonly size = model<'sm' | 'md' | 'lg'>('md');

  /**
   * Initializes the checkbox value after the view is initialized.
   */
  ngAfterViewInit() {
    this.value.set(this.el.nativeElement.checked);
  }

  /**
   * Toggles the value of the checkbox.
   */
  toggleValue() {
    const newValue = !this.value();
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }
}
