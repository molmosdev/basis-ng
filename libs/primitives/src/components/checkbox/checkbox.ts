import { AfterViewInit, Component, ElementRef, inject, model, output, signal } from '@angular/core';

/**
 * Custom checkbox control synced with the host input element.
 */
@Component({
  selector: 'input[b-checkbox]',
  template: ``,
  host: {
    '[attr.role]': '"checkbox"',
    '[attr.checked]': 'value()',
    '[attr.aria-checked]': 'value()',
    '(click)': 'toggleValue()',
    '(keydown.enter)': 'toggleValue()',
    '(keydown.space)': 'toggleValue()',
  },
})
export class Checkbox implements AfterViewInit {
  /**
   * Current boolean checked state.
   */
  readonly value = signal<boolean>(false);

  /**
   * The host input element reference.
   */
  el = inject(ElementRef);

  /**
   * Emitted when the checked state changes.
   */
  valueChange = output<boolean>();

  /**
   * Visual size of the checkbox.
   */
  readonly size = model<'sm' | 'md' | 'lg'>('md');

  ngAfterViewInit() {
    this.value.set(this.el.nativeElement.checked);
  }

  /**
   * Toggle the current value and emit the change.
   */
  toggleValue() {
    const newValue = !this.value();
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }
}
