import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import {
  Component,
  computed,
  contentChildren,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';

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
    '[cdkListboxValue]': 'value()',
    '[cdkListboxMultiple]': 'multiple()',
    '(cdkListboxValueChange)': 'handleValueChange($event.value)',
    '(keydown.enter)': 'onEnter()',
  },
})
export class CommandOptionsComponent implements OnInit {
  readonly options = contentChildren(CdkOption);
  readonly listKeyManager = computed(() =>
    new ActiveDescendantKeyManager(this.options()).withWrap().withVerticalOrientation(),
  );
  readonly value = signal<string[]>([]);
  readonly highlightedOption = signal('1');
  readonly noOptionsMessage = input<string>('');
  cdkListbox = inject(CdkListbox);
  closeEmitter = output();
  readonly multiple = input<boolean>(false);

  ngOnInit(): void {
    this.cdkListbox.useActiveDescendant = true;
  }

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

  nextOption(): void {
    this.listKeyManager().setNextItemActive();
    this.highlightedOption.set(this.listKeyManager().activeItem?.value ?? '');
    this.updateHighlightedOption();
  }

  previousOption(): void {
    this.listKeyManager().setPreviousItemActive();
    this.highlightedOption.set(this.listKeyManager().activeItem?.value ?? '');
    this.updateHighlightedOption();
  }

  updateHighlightedOption(): void {
    this.options().forEach((option) => {
      if (option.value === this.highlightedOption()) {
        option.element.classList.add('cdk-option-highlighted');
      } else {
        option.element.classList.remove('cdk-option-highlighted');
      }
    });
  }

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
