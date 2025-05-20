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
import { SelectOptionsComponent } from './select-options.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { OverlayTriggerDirective } from '../../directives/overlay-trigger.directive';
import { OverlayDirective } from '../../directives/overlay.directive';

/**
 * Component representing a custom select dropdown.
 * This component provides a button to toggle the dropdown and displays the selected option(s).
 */
@Component({
  selector: 'b-select',
  imports: [
    ButtonComponent,
    IconComponent,
    OverlayTriggerDirective,
    OverlayDirective,
  ],
  template: ` <button
      b-button
      variant="outlined"
      (click)="isOpen.set(!isOpen())"
      (keydown.arrowUp)="!isOpen() && isOpen.set(true)"
      (keydown.arrowDown)="!isOpen() && isOpen.set(true)"
      [activeEnabled]="false"
      bOverlayTrigger
      #trigger="bOverlayTrigger">
      {{ content() }}
      <i b-icon icon="ChevronDown" [size]="16"></i>
    </button>
    <ng-template
      bOverlay
      [trigger]="trigger"
      [open]="isOpen()"
      [minWidth]="buttonWidth()"
      [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']"
      [closeDelay]="closeDelay()"
      (attach)="onOverlayAttached()"
      (outsideClick)="isOpen.set(false)"
      (detach)="isOpen.set(false)">
      <ng-content />
    </ng-template>`,
  host: {
    '[class.disabled]': 'disabled()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit, ControlValueAccessor {
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
  readonly button = viewChild(ButtonComponent);

  /**
   * Reference to the content component of the dropdown.
   * This contains the list of selectable options.
   */
  readonly optionsList = contentChild(SelectOptionsComponent);

  /**
   * Computed signal representing the selected values from the dropdown.
   * This is linked to the value of the `OptionsListComponent`.
   */
  readonly value = linkedSignal(() => this.optionsList()?.value());

  /**
   * Linked signal for the width of the button element.
   * This is used to set the width of the dropdown overlay.
   */
  readonly buttonWidth = linkedSignal(
    () => this.button()?.el.nativeElement.offsetWidth
  );

  /**
   * Model indicating whether the select component is disabled.
   * When disabled, the dropdown cannot be opened or interacted with.
   */
  readonly disabled = model(false);

  /**
   * Computed signal representing the options available in the dropdown.
   * This retrieves the options from the `OptionsListComponent`.
   */
  readonly options = computed(() => this.optionsList()?.options());

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
        if (selected.includes(option.cdkOption.value)) {
          return acc
            ? acc + ', ' + option.el.nativeElement.innerText
            : option.el.nativeElement.innerText;
        }
        return acc;
      }, '');
    } else {
      return this.placeholder();
    }
  });

  /**
   * Signal representing the delay before closing the dropdown.
   * This is used to provide a smooth transition when closing the dropdown.
   */
  readonly closeDelay = signal(150);

  /**
   * Lifecycle hook that is called after the component is initialized.
   * It sets up the necessary subscriptions for handling value changes.
   */
  ngOnInit(): void {
    this.handleSelectedValueChange();
  }

  /**
   * Subscribes to the `closeEmitter` of the `OptionsListComponent` to handle
   * changes to the selected value. This ensures the dropdown closes and the
   * value is propagated to Angular Forms.
   */
  handleSelectedValueChange() {
    this.optionsList()?.closeEmitter.subscribe(() => {
      this.onChange(this.value()!);
      this.onTouched();
      this.isOpen.set(false);
    });
  }

  /**
   * Focuses the options list when the overlay is attached.
   */
  onOverlayAttached() {
    this.buttonWidth.set(this.button()?.el.nativeElement.offsetWidth);
    this.optionsList()?.el.nativeElement.focus();
  }

  /**
   * Sets the width of the dropdown overlay based on the button's width.
   * This ensures that the dropdown aligns properly with the button.
   */
  @HostListener('window:resize')
  setButtonWidth() {
    this.buttonWidth.set(this.button()?.el.nativeElement.offsetWidth);
  }

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
   * This method is called by Angular Forms to update the value of the select component.
   * @param value - The new value to set.
   */
  writeValue(value: string[]): void {
    if (value) {
      value.forEach(value => {
        this.optionsList()?.listBox?.selectValue(value);
      });
      this.value.set(value);
    }
  }

  /**
   * Registers a callback function to be called when the value changes.
   * @param fn - The callback function.
   */
  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
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
