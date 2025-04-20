import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  model,
  output,
  Renderer2,
  signal,
  input,
} from '@angular/core';

@Component({
  selector: 'select[b-select]',
  template: ` <ng-content />`,
  host: {
    '[class.ng-invalid]': 'invalid()',
    '[class.disabled]': 'disabled()',
    '[style.max-width]': 'maxWidth()',
    '(change)': 'change($event.target.value)',
  },
})
export class Select implements AfterViewInit {
  /**
   * The value of the input.
   */
  readonly value = signal<string | null>(null);

  /**
   * Whether the input is invalid.
   */
  readonly invalid = model<boolean>(false);

  /**
   * Whether the input is disabled.
   */
  readonly disabled = model<boolean>(false);

  /**
   * The maximum width of the input.
   */
  readonly maxWidth = input<string>('');

  /**
   * Event emitted when the value changes.
   */
  valueChange = output<string | null>();

  /**
   * Reference to the input element.
   */
  readonly el = inject<ElementRef<HTMLSelectElement>>(ElementRef);

  /**
   * Indicates whether the options dropdown is open.
   */
  readonly isOpen = signal(false);

  /**
   * Reference to the renderer
   * @private
   */
  readonly renderer = inject(Renderer2);

  /**
   * After the view has been initialized, set the value of the select.
   */
  ngAfterViewInit(): void {
    this.value.set(this.el.nativeElement.value);
  }

  /**
   * Handles the select change event.
   * @param value - The value of the select.
   */
  change(value: string): void {
    this.valueChange.emit(value);
    this.value.set(value);
  }
}
