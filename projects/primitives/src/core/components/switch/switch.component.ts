import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'input[b-switch]',
  template: ``,
  host: {
    '[attr.role]': 'switch',
    '[attr.checked]': 'value()',
    '[attr.aria-checked]': 'value()',
    '(click)': 'toggleValue()',
    '[class.b-size-sm]': 'size() === "sm"',
    '[class.b-size-md]': 'size() === "md"',
    '[class.b-size-lg]': 'size() === "lg"',
    '(keydown.enter)': 'toggleValue()',
    '(keydown.arrowleft)': 'setValue(false)',
    '(keydown.arrowright)': 'setValue(true)',
  },
})
export class SwitchComponent implements AfterViewInit {
  /**
   * Value of the switch.
   */
  readonly value = signal<boolean>(false);

  /**
   * The size of the switch.
   */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /**
   * Reference to the switch element.
   */
  el = inject(ElementRef);

  /**
   * Event emitted when the value changes.
   */
  valueChange = output<boolean>();

  /**
   * Initializes the switch value after the view is initialized.
   */
  ngAfterViewInit() {
    this.value.set(this.el.nativeElement.checked);
  }

  /**
   * Toggles the value of the switch.
   */
  toggleValue() {
    const newValue = !this.value();
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }

  /**
   * Sets the value of the switch.
   * @param newValue - The new value to set.
   */
  setValue(newValue: boolean) {
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }
}
