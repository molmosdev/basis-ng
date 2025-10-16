import { AfterViewInit, Component, ElementRef, inject, output, signal } from '@angular/core';

/**
 * A switch component that toggles between on and off states.
 */
@Component({
  selector: 'input[b-switch]',
  template: ``,
  host: {
    '[attr.role]': '"switch"',
    '[attr.checked]': 'value()',
    '[attr.aria-checked]': 'value()',
    '(click)': 'toggleValue()',
    '(keydown.enter)': 'toggleValue()',
    '(keydown.arrowleft)': 'setValue(false)',
    '(keydown.arrowright)': 'setValue(true)',
  },
})
export class SwitchComponent implements AfterViewInit {
  /**
   * Current boolean state of the switch.
   */
  readonly value = signal<boolean>(false);

  /**
   * Host input element.
   */
  el = inject(ElementRef);

  /**
   * Emitted when the value changes.
   */
  valueChange = output<boolean>();

  ngAfterViewInit(): void {
    this.value.set(this.el.nativeElement.checked);
  }

  /**
   * Toggles the switch value.
   */
  toggleValue(): void {
    const newValue = !this.value();
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }

  /**
   * Sets the switch to a specific value.
   * @param newValue The new boolean value to set.
   */
  setValue(newValue: boolean): void {
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }
}
