import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkListbox, CdkOption, ListboxValueChangeEvent } from '@angular/cdk/listbox';
import {
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';

/**
 * Presents a list of selectable command options and manages keyboard navigation.
 */
@Component({
  selector: 'ul[b-command-options]',
  imports: [],
  template: `
    <ng-content />
    @if (options().length === 0) {
      <div class="no-options-message">
        {{ noOptionsMessage() }}
      </div>
    }
  `,
  hostDirectives: [
    {
      directive: CdkListbox,
      inputs: ['cdkListboxValue', 'cdkListboxMultiple: multiple'],
      outputs: ['cdkListboxValueChange'],
    },
  ],
  host: {
    '(cdkListboxValueChange)': 'handleValueChange($event)',
    '(keydown.enter)': 'onEnter()',
  },
})
export class CommandOptionsComponent implements OnInit {
  /**
   * Query list of option children.
   */
  readonly options = contentChildren(CdkOption);

  /**
   * Keyboard manager for option navigation.
   */
  readonly listKeyManager = computed(() =>
    new ActiveDescendantKeyManager(this.options()).withWrap().withVerticalOrientation(),
  );

  /**
   * Currently selected values.
   */
  readonly value = signal<string[]>([]);

  /**
   * Value of the currently highlighted option.
   */
  readonly highlightedOption = signal('1');

  /**
   * Message shown when there are no options.
   */
  readonly noOptionsMessage = input<string>('');

  cdkListbox = inject(CdkListbox);

  /**
   * Emitted when the options list should be closed (single-select or explicit clear).
   */
  closeEmitter = output();

  /**
   * Whether multiple options can be selected.
   */
  readonly multiple = input<boolean>(false);

  ngOnInit(): void {
    this.cdkListbox.multiple = this.multiple();
    this.cdkListbox.useActiveDescendant = true;
  }

  constructor() {
    effect(() => (this.cdkListbox.value = this.value()));
  }

  /**
   * Select the provided value(s) or the currently active option.
   * @param value - Optional array of values to select.
   */
  selectOption(value?: string[]): void {
    const selectValue = value ? value : (this.listKeyManager().activeItem?.value ?? []);
    //  If the selectValue is an empty array or contains only an empty string, clear the selection
    if (selectValue.length === 1 && selectValue[0] === '') {
      this.value.set([]);
      this.cdkListbox.value = [];
      this.closeEmitter.emit();
      return;
    }
    this.value.set(selectValue);
    this.cdkListbox.value = this.value();
    this.closeEmitter.emit();
  }

  /**
   * Move highlight to the next option.
   */
  nextOption(): void {
    this.listKeyManager().setNextItemActive();
    this.highlightedOption.set(this.listKeyManager().activeItem?.value ?? '');
    this.updateHighlightedOption();
  }

  /**
   * Move highlight to the previous option.
   */
  previousOption(): void {
    this.listKeyManager().setPreviousItemActive();
    this.highlightedOption.set(this.listKeyManager().activeItem?.value ?? '');
    this.updateHighlightedOption();
  }

  /**
   * Update DOM classes for the highlighted option.
   */
  updateHighlightedOption(): void {
    this.options().forEach((option) => {
      if (option.value === this.highlightedOption()) {
        option.element.classList.add('cdk-option-highlighted');
      } else {
        option.element.classList.remove('cdk-option-highlighted');
      }
    });
  }

  /**
   * Handle external value changes from the cdk listbox.
   * @param value - New array of selected values.
   */
  handleValueChange(event: ListboxValueChangeEvent<unknown>) {
    const value = event.value as string[];
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

  /**
   * Called on Enter key; closes the list for single-select.
   */
  onEnter() {
    if (!this.multiple()) {
      this.closeEmitter.emit();
    }
  }
}
