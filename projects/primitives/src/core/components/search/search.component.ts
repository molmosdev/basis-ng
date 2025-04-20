import {
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  output,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { Icon } from '../icon/icon.component';
import { Option } from '../../../public-api';
import { UtilsService } from '../../../shared/services/utils.service';

@Component({
  selector: 'b-search',
  imports: [Icon],
  templateUrl: './search.component.html',
  host: {
    '[style.max-width]': 'maxWidth()',
    '[class.invalid]': 'invalid()',
    '[class.disabled]': 'disabled()',
    '[class.label-up]':
      '(searchValue() || selectedValue() || placeholder() || focused()) && label()',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class Search {
  /**
   * The label associated with the search component.
   */
  readonly label = input<string>();

  /**
   * The maximum width of the search component.
   */
  readonly maxWidth = input('');

  /**
   * The placeholder of the text field.
   */
  readonly placeholder = input<string>('');

  /**
   * Indicates whether the search component is searching.
   */
  readonly searching = model<boolean>(false);

  /**
   * Indicates whether the search component is in an invalid state.
   */
  readonly invalid = model(false);

  /**
   * Indicates whether the search component is disabled.
   */
  readonly disabled = model(false);

  /**
   * The value of the selected option.
   */
  readonly selectedValue = model<string | null>(null);

  /**
   * The search value.
   */
  readonly searchValue = model<string>('');

  /**
   * Emits the value of the search component when the value changes.
   */
  searchChange = output<string>();

  /**
   * Emits when the search component is focused.
   */
  readonly focused = signal<boolean>(false);

  /**
   * Indicates whether the options dropdown is open.
   */
  readonly isOpen = signal(false);

  /**
   * The options available for selection.
   */
  readonly options = contentChildren(Option);

  /**
   * Indicates whether the search component has no options.
   */
  readonly noOptions = computed(
    () => !this.options() || this.options().length === 0
  );

  /**
   * Reference to the select element within the component
   * @private
   */
  private readonly select = viewChild<ElementRef>('select');

  /**
   * Reference to the renderer
   * @private
   */
  private readonly renderer = inject(Renderer2);

  /**
   * The icon name to display.
   */
  readonly selectIconName = computed(() => {
    return this.searching()
      ? 'LoaderCircle'
      : this.selectedValue()
        ? 'X'
        : 'ChevronDown';
  });

  /**
   * The icon size to display.
   */
  readonly selectIconSize = computed(() => {
    return this.searching() ? 17 : this.selectedValue() ? 18 : 20;
  });

  /**
   * The debounce time for the search input.
   */
  readonly debounceTime = input<number>(300);

  /**
   * Reference to the UtilsService
   * @private
   */
  private readonly utilsService = inject(UtilsService);

  /**
   * Initializes the search component.
   */
  constructor() {
    effect(() => this.renderOptions());
  }

  /**
   * Renders the options within the select element.
   * @private
   */
  private renderOptions(): void {
    const select = this.select()?.nativeElement;
    const options = this.options();

    if (!select || !options || options.length === 0) {
      return;
    }

    // Clear the existing options
    select.innerHTML = '';

    // Append the options to the select
    options.forEach(option => {
      this.renderer.appendChild(select, option.el.nativeElement);
    });
  }

  /**
   * Handles the change event of the input text.
   */
  onInputValueChange(event: any): void {
    this.searching.set(true);
    const value = event.target.value as string;
    this.searchValue.set(value);

    // Use the debounce method from UtilsService
    this.utilsService.debounce(() => {
      this.searchChange.emit(value);
    }, this.debounceTime());
  }

  /**
   * Resets the search component.
   */
  reset(): void {
    this.selectedValue.set(null);
    this.searchValue.set('');
  }

  /**
   * Handles the selection change event from the native select element.
   * @param event The selection change event.
   */
  onSelectValueChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value === 'null' ? null : select.value;

    this.selectedValue.set(value);
    this.isOpen.set(false);
  }

  /**
   * Handles click events outside the select component to close the options dropdown.
   * @param event The mouse click event.
   */
  @HostListener('document:click', ['$event'])
  protected onOutsideClick(event: MouseEvent): void {
    if (!this.select()!.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  /**
   * Handles keyboard events to open or close the options dropdown.
   * @param event The keyboard event.
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.isOpen.set(false);
    }
  }

  /**
   * Handles the icon click event.
   */
  handleIconClick(): void {
    if (this.selectedValue()) {
      this.reset();
    }
  }
}
