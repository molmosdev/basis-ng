import {
  Component,
  computed,
  contentChild,
  HostListener,
  input,
  linkedSignal,
  model,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { CommandComponent } from '../command/command.component';
import { OverlayTriggerDirective } from '../../directives/overlay-trigger.directive';
import { OverlayDirective } from '../../directives/overlay.directive';
import { Button } from '../button/button';

/**
 * Component representing a combobox dropdown.
 * This component provides a button to toggle the dropdown and displays the selected option(s) with an input field.
 */
@Component({
  selector: 'b-combobox',
  imports: [Button, OverlayTriggerDirective, OverlayDirective],
  template: ` <button
      b-button
      variant="outlined"
      (click)="isOpen.set(!isOpen())"
      (keydown.arrowUp)="!isOpen() && isOpen.set(true)"
      (keydown.arrowDown)="!isOpen() && isOpen.set(true)"
      bOverlayTrigger
      #trigger="bOverlayTrigger"
      [disabled]="disabled()">
      <span>{{ content() }}</span>
      <!-- <i b-icon icon="ChevronDown" [size]="16"></i> -->
    </button>
    <ng-template
      bOverlay
      [trigger]="trigger"
      [open]="isOpen()"
      [minWidth]="buttonWidth()"
      [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']"
      (attach)="onOverlayAttached()"
      (outsideClick)="isOpen.set(false)"
      (detach)="isOpen.set(false)">
      <ng-content />
    </ng-template>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxComponent),
      multi: true,
    },
  ],
})
export class ComboboxComponent implements OnInit, ControlValueAccessor {
  /**
   * Placeholder text displayed when no option is selected.
   */
  readonly placeholder = input<string>('');

  /**
   * Signal indicating whether the dropdown is currently open.
   */
  readonly isOpen = signal(false);

  /**
   * Reference to the button element used to toggle the dropdown.
   * This is used for managing focus and interactions.
   */
  readonly button = viewChild(Button);

  /**
   * Reference to the content component of the dropdown.
   * This contains the list of selectable options.
   */
  readonly command = contentChild(CommandComponent);

  /**
   * Computed signal representing the selected values from the dropdown.
   * This is linked to the value of the `CommandComponent`.
   */
  readonly value = linkedSignal(() => this.command()?.value());

  /**
   * Linked signal for the width of the button element.
   * This is used to set the width of the dropdown overlay.
   */
  readonly buttonWidth = linkedSignal(
    () => this.button()?.el.nativeElement.offsetWidth
  );

  /**
   * Model indicating whether the combobox component is disabled.
   * When disabled, the dropdown cannot be opened or interacted with.
   */
  readonly disabled = model(false);

  /**
   * Computed signal representing the options available in the dropdown.
   * This retrieves the options from the `CommandComponent`.
   */
  readonly options = computed(() => this.command()?.options());

  /**
   * Computed signal representing the content of the selected option(s).
   * If no option is selected, it returns the placeholder text.
   */
  readonly content = computed(() => {
    const selected = this.value();
    if (
      selected &&
      selected.length > 0 &&
      !(selected.length === 1 && selected[0] === '')
    ) {
      return this.options()?.reduce((acc, option) => {
        if (selected.includes(option.value)) {
          return acc ? acc + ', ' + option.getLabel() : option.getLabel();
        }
        return acc;
      }, '');
    } else {
      return this.placeholder();
    }
  });

  /**
   * Lifecycle hook that is called after the component is initialized.
   * It sets up the necessary subscriptions for handling value changes.
   */
  ngOnInit(): void {
    this.handleSelectedValueChange();
  }

  /**
   * Subscribes to the `closeEmitter` of the `CommandComponent` to handle
   * changes to the selected value. This ensures the dropdown closes and the
   * value is propagated to Angular Forms.
   */
  handleSelectedValueChange() {
    this.command()
      ?.commandOptions()
      ?.closeEmitter.subscribe(() => {
        this.onChange(this.value()!);
        this.onTouched();
        this.isOpen.set(false);
      });
  }

  /**
   * Focuses the input element within the command component when the overlay is attached.
   */
  onOverlayAttached() {
    this.buttonWidth.set(this.button()?.el.nativeElement.offsetWidth);
    this.command()?.el.nativeElement.querySelector('input')?.focus();
  }

  /**
   * Sets the width of the button element when the window is resized.
   * This ensures that the dropdown overlay matches the width of the button.
   */
  @HostListener('window:resize')
  setButtonWidth() {
    this.buttonWidth.set(this.button()?.el.nativeElement.offsetWidth);
  }

  /**
   * Computed signal indicando si se permite selección múltiple.
   * Se obtiene de CommandOptionsComponent.
   */
  readonly multiple = computed(
    () => this.command()?.commandOptions()?.multiple() ?? false
  );

  // Control Value Accessor methods

  /**
   * Callback function to propagate changes to the model.
   * This is called whenever the value changes.
   */
  private onChange: (value: string[]) => void = () => undefined;

  /**
   * Callback function to mark the component as touched.
   * This is called when the component loses focus.
   */
  private onTouched: () => void = () => undefined;

  /**
   * Writes a new value to the component.
   * Este método ahora soporta selección múltiple.
   */
  writeValue(value: string | string[]): void {
    if (!value) {
      return;
    }
    const values = this.multiple()
      ? Array.isArray(value)
        ? value
        : [value]
      : [typeof value === 'string' ? value : value?.[0]];
    if (values) {
      values.forEach(val => {
        this.command()?.commandOptions()?.cdkListbox?.selectValue(val);
      });
      this.value.set(values);
    }
  }

  /**
   * Registers a callback function to be called when the value changes.
   * Ahora soporta selección múltiple.
   */
  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = (val: string[]) => {
      if (this.multiple()) {
        fn(val);
      } else {
        fn(val?.[0] ?? '');
      }
    };
  }

  /**
   * Registers a callback function to be called when the component is touched.
   * @param fn - The callback function.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the component.
   * This method is called by Angular Forms to enable or disable the component.
   * @param isDisabled - A boolean indicating whether the component should be disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
