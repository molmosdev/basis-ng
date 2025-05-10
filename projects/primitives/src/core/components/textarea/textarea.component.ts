import {
  Component,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'textarea[b-textarea]',
  template: ``,
  host: {
    '[placeholder]': 'placeholder() || ""',
    '[rows]': 'rows()',
    '[cols]': 'cols()',
    '[class.ng-invalid]': 'invalid()',
    '[class.disabled]': 'disabled()',
    '(input)': 'onInput($event)',
    '(focus)': 'focused.set(true)',
    '(blur)': 'focused.set(false)',
  },
})
export class TextareaComponent {
  /**
   * The placeholder text for the textarea.
   */
  readonly placeholder = input<string>('');

  /**
   * The value of the textarea.
   */
  readonly value = signal<string | null>(null);

  /**
   * The number of rows for the textarea.
   */
  readonly rows = input<number>(3);

  /**
   * The number of columns for the textarea.
   */
  readonly cols = input<number>(30);

  /**
   * Whether the textarea is invalid.
   */
  readonly invalid = model<boolean>(false);

  /**
   * Whether the textarea is disabled.
   */
  readonly disabled = model<boolean>(false);

  /**
   * Whether the textarea is focused.
   * This will be used by the Label component.
   */
  readonly focused = signal<boolean>(false);

  /**
   * Event emitted when the value changes.
   */
  valueChange = output<string | null>();

  /**
   * Reference to the textarea element.
   */
  readonly el = inject<ElementRef<HTMLTextAreaElement>>(ElementRef);

  /**
   * Handles the input event.
   * @param event The input event.
   */
  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value.set(target.value);
    this.valueChange.emit(target.value);
  }
}
