import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import {
  Component,
  computed,
  contentChildren,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';

/**
 * Component representing a list of command options.
 * It uses Angular CDK's listbox and option utilities for accessibility and keyboard navigation.
 */
@Component({
  selector: 'ul[b-command-options]',
  imports: [],
  template: `<ng-content />`,
  hostDirectives: [
    {
      directive: CdkListbox,
      outputs: ['cdkListboxValueChange'],
    },
  ],
  host: {
    '(cdkListboxValueChange)': 'selectOption($event.value)',
    '(keydown.enter)': 'closeEmitter.emit()',
  },
})
export class CommandOptionsComponent implements OnInit {
  /**
   * Collection of child options within the listbox.
   */
  readonly options = contentChildren(CdkOption);

  /**
   * Key manager for handling keyboard navigation and active descendant management.
   */
  readonly listKeyManager = computed(() =>
    new ActiveDescendantKeyManager(this.options())
      .withWrap()
      .withVerticalOrientation()
  );

  /**
   * Signal representing the currently selected values.
   */
  readonly value = signal<string[]>([]);

  /**
   * Signal representing the currently highlighted option.
   */
  readonly highlightedOption = signal('1');

  /**
   * Reference to the injected CDK Listbox instance.
   */
  cdkListbox = inject(CdkListbox);

  /**
   * Emitter for closing the command options.
   */
  closeEmitter = output();

  /**
   * Lifecycle hook that initializes the component.
   * Enables the use of active descendant for the listbox.
   */
  ngOnInit(): void {
    this.cdkListbox.useActiveDescendant = true;
  }

  /**
   * Selects the currently active option and updates the listbox value.
   */
  selectOption(value?: string[]): void {
    const selectValue = value
      ? value
      : (this.listKeyManager().activeItem?.value ?? []);
    this.value.set(selectValue);
    this.cdkListbox.value = this.value();
    this.closeEmitter.emit();
  }

  /**
   * Moves the active item to the next option and updates the highlighted option.
   */
  nextOption(): void {
    this.listKeyManager().setNextItemActive();
    this.highlightedOption.set(this.listKeyManager().activeItem?.value ?? '');
    this.updateHighlightedOption();
  }

  /**
   * Moves the active item to the previous option and updates the highlighted option.
   */
  previousOption(): void {
    this.listKeyManager().setPreviousItemActive();
    this.highlightedOption.set(this.listKeyManager().activeItem?.value ?? '');
    this.updateHighlightedOption();
  }

  /**
   * Updates the CSS class of options to reflect the currently highlighted option.
   */
  updateHighlightedOption(): void {
    this.options().forEach(option => {
      if (option.value === this.highlightedOption()) {
        option.element.classList.add('cdk-option-highlighted');
      } else {
        option.element.classList.remove('cdk-option-highlighted');
      }
    });
  }
}
