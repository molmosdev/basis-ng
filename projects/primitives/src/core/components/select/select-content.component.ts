import { CdkListbox } from '@angular/cdk/listbox';
import {
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

/**
 * Component representing the content of a select dropdown.
 * It integrates with Angular CDK Listbox for managing options and their selection.
 */
@Component({
  selector: 'ul[b-select-content]',
  imports: [],
  template: `<ng-content />`,
  hostDirectives: [
    {
      directive: CdkListbox,
      inputs: ['cdkListboxValue'],
      outputs: ['cdkListboxValueChange'],
    },
  ],
  host: {
    '[cdkListboxValue]': 'value()',
    '(cdkListboxValueChange)': 'handleValueChange($event)',
    '[style.max-height]': 'maxHeight()',
  },
})
export class SelectContentComponent {
  /**
   * Signal representing the selected values in the listbox.
   */
  readonly value = signal<string[]>([]);

  /**
   * Signal representing the content of the selected option.
   */
  readonly content = signal<string>('');

  /**
   * Event emitter triggered when the dropdown should close.
   */
  closeEmitter = output();

  /**
   * Reference to the host element of the component.
   */
  el = inject(ElementRef);

  /**
   * Input for setting the maximum height of the dropdown.
   * Defaults to '300px'.
   */
  readonly maxHeight = input<string>('300px');

  /**
   * Handles changes to the selected value in the listbox.
   * Updates the `value` and `content` signals and emits the `closeEmitter` event.
   *
   * @param $event - The event object containing the new value and option details.
   */
  handleValueChange($event: any) {
    const value = $event.value;
    this.content.set($event.option.element.innerText);
    this.value.set(
      value.length === 0 || (value.length === 1 && value[0] === '') ? [] : value
    );
    this.closeEmitter.emit();
  }
}
