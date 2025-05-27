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
import { OptionComponent } from '../../../shared/components/option.component';

/**
 * Component representing the list of options in a select.
 * This component integrates with Angular CDK Listbox to manage options and their selection.
 */
@Component({
  selector: 'ul[b-select-options]',
  imports: [],
  template: `<ng-content />
    @if (options().length === 0) {
      <div class="no-options-message">
        {{ noOptionsMessage() }}
      </div>
    }`,
  hostDirectives: [
    {
      directive: CdkListbox,
      inputs: ['cdkListboxValue', 'cdkListboxMultiple: multiple'],
      outputs: ['cdkListboxValueChange'],
    },
  ],
  host: {
    '[cdkListboxValue]': 'value()',
    '(cdkListboxValueChange)': 'handleValueChange($event.value)',
    '[style.max-height]': 'maxHeight()',
    '(keydown.enter)': 'onEnter()',
  },
})
export class SelectOptionsComponent {
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
   * No options message displayed when there are no available options in the dropdown.
   */
  readonly noOptionsMessage = input<string>('');

  /**
   * Signal indicating whether multiple selections are allowed.
   * If true, the select component allows selecting multiple options.
   */
  readonly multiple = input<boolean>(false);

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
    // If the value is an empty array or contains a single empty string, clear the selection.
    if (value.length === 1 && value[0] === '') {
      this.value.set([]);
      if (!this.multiple()) {
        this.closeEmitter.emit();
      }
      return;
    }
    this.value.set(value);
    if (!this.multiple()) {
      this.closeEmitter.emit();
    }
  }

  onEnter() {
    if (!this.multiple()) {
      this.closeEmitter.emit();
    }
  }
}
