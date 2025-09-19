import {
  Component,
  ElementRef,
  inject,
  model,
  input,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'input[b-range]',
  template: ``,
  host: {
    '[attr.value]': 'value()',
    '[style.max-width]': 'maxWidth()',
    '(input)': 'onInput($event)',
    '[class.b-size-sm]': 'size() === "sm"',
    '[class.b-size-md]': 'size() === "md"',
    '[class.b-size-lg]': 'size() === "lg"',
  },
})
export class Range implements AfterViewInit {
  /**
   * Current value of the range.
   */
  readonly value = model<string>('0');

  /**
   * Maximum width of the range slider.
   */
  readonly maxWidth = input<string>('100%');

  /**
   * Size of the range slider (sm, md, lg)
   */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /**
   * Reference to the range element.
   */
  el = inject(ElementRef);

  /**
   * Initializes the range value after the view is initialized.
   */
  ngAfterViewInit() {
    this.value.set(this.el.nativeElement.value);
  }

  /**
   * Handles the input event to update the value.
   */
  onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
