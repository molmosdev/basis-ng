import { CdkListbox } from '@angular/cdk/listbox';
import {
  Component,
  contentChildren,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { OptionComponent } from './option.component';

/**
 * Component representing the list of options in a select or combobox.
 * This component integrates with Angular CDK Listbox to manage options and their selection.
 */
@Component({
  selector: 'ul[b-options-list]',
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
    '(cdkListboxValueChange)': 'handleValueChange($event.value)',
    '[style.max-height]': 'maxHeight()',
  },
})
export class OptionsListComponent {
  /**
   * Signal representing the selected values in the listbox.
   * This is an array of strings corresponding to the selected option values.
   */
  readonly value = signal<string[]>([]);

  /**
   * Event emitter triggered when the dropdown should close.
   * This is used to notify the parent component to close the dropdown.
   */
  closeEmitter = output();

  /**
   * Reference to the host element of the component.
   * This provides access to the DOM element of the options list.
   */
  el = inject(ElementRef);

  /**
   * Input for setting the maximum height of the dropdown.
   * Defaults to '300px'. This controls the vertical size of the dropdown.
   */
  readonly maxHeight = input<string>('300px');

  /**
   * Reference to the CDK Listbox directive.
   * This is used to manage the options and their selection state.
   */
  listBox = inject(CdkListbox);

  /**
   * Reference to the list of options in the dropdown.
   * This is a collection of `OptionComponent` instances representing the available options.
   */
  readonly options = contentChildren(OptionComponent);

  /**
   * Handles changes to the selected value in the listbox.
   * This method updates the `value` signal, emits the `closeEmitter` event,
   * and ensures the parent component is notified of the selection change.
   *
   * @param value - The new array of selected values.
   */
  handleValueChange(value: string[]) {
    this.value.set(value);
    this.closeEmitter.emit();
  }
}
