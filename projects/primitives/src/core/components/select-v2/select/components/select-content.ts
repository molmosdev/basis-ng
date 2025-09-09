import { CdkListbox } from '@angular/cdk/listbox';
import {
  Component,
  contentChildren,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { Option } from '@basis-ng/primitives';

@Component({
  selector: 'ul[b-select-content]',
  imports: [],
  template: `<ng-content />`,
  hostDirectives: [
    {
      directive: CdkListbox,
      inputs: ['cdkListboxValue', 'cdkListboxMultiple: multiple'],
      outputs: ['cdkListboxValueChange'],
    },
  ],
  host: {
    '(cdkListboxValueChange)': 'handleValueChange($event.value)',
  },
})
export class SelectContent {
  /**
   * Reference to the host element of the component.
   * This provides access to the DOM element of the options list.
   */
  el = inject(ElementRef);

  /**
   * Reference to the CDK Listbox directive.
   * This is used to manage the options and their selection state.
   */
  listBox = inject(CdkListbox);

  /**
   * Signal indicating whether multiple selections are allowed.
   * If true, the select component allows selecting multiple options.
   */
  readonly multiple = input<boolean>(false);

  /**
   * Event emitter that emits when the value changes.
   */
  changeValueEmitter = output<string[]>();

  /**
   * Event emitter that emits when the options list should be closed.
   * This is typically triggered after a selection is made in single-select mode.
   */
  closeEmitter = output<void>();

  /**
   * Reference to the list of options in the dropdown.
   * This is a collection of `OptionComponent` instances representing the available options.
   */
  readonly options = contentChildren(Option);

  /**
   * Handles changes to the selected value in the listbox.
   * This method updates the `value` signal, emits the `closeEmitter` event,
   * and ensures the parent component is notified of the selection change.
   *
   * @param value - The new array of selected values.
   */
  handleValueChange(value: string[]) {
    console.log(value);
    // If the value is an empty array or contains a single empty string, clear the selection.
    if (value.length === 1 && value[0] === '') {
      this.changeValueEmitter.emit([]);
      if (!this.multiple()) {
        this.closeEmitter.emit();
      }
      return;
    }
    this.changeValueEmitter.emit(value);
    if (!this.multiple()) {
      this.closeEmitter.emit();
    }
  }
}
