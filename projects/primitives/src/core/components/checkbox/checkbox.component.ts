import {
  Component,
  ElementRef,
  inject,
  model,
  output,
  AfterViewInit,
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
  },
})
export class Checkbox implements AfterViewInit {
  /**
   * Value of the checkbox.
   */
  readonly value = model<boolean>(false);

  /**
   * Reference to the checkbox element.
   */
  el = inject(ElementRef);

  /**
   * Event emitted when the value changes.
   */
  valueChange = output<boolean>();

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
