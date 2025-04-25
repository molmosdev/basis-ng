import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
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
import { Button } from '../button/button.component';
import { Icon } from '../icon/icon.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { CommandComponent } from '../command/command.component';

/**
 * Component representing a combobox dropdown.
 * This component provides a button to toggle the dropdown and displays the selected option(s) with an input field.
 */
@Component({
  selector: 'b-combobox',
  imports: [Button, Icon, CdkConnectedOverlay, CdkOverlayOrigin],
  template: ` <button
      b-button
      variant="outlined"
      (click)="isOpen() ? close() : open()"
      (keydown.arrowDown)="!isOpen() && open()"
      (keydown.arrowUp)="!isOpen() && open()"
      cdkOverlayOrigin
      [activeEnabled]="false"
      #trigger="cdkOverlayOrigin">
      {{ content() }}
      <i b-icon icon="ChevronDown" [size]="20"></i>
    </button>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayMinWidth]="buttonWidth()"
      [cdkConnectedOverlayHasBackdrop]="true"
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      [cdkConnectedOverlayPositions]="[
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 5,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -5,
        },
      ]"
      (backdropClick)="close()"
      (attach)="onOverlayAttached()"
      (detach)="close()">
      <ng-content />
    </ng-template>`,
  host: {
    '[class.disabled]': 'disabled()',
  },
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
   * Defaults to 'Select an option'.
   */
  readonly placeholder = input<string>('Select an option');

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
    if (selected && selected.length > 0) {
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
   * Signal representing the delay before closing the dropdown.
   * This is used to provide a smooth transition when closing the dropdown.
   */
  readonly closeDelay = signal(150);

  /**
   * Reference to the CdkConnectedOverlay directive.
   * This is used to manage the positioning and visibility of the dropdown overlay.
   */
  readonly cdkConnectedOverlay = viewChild(CdkConnectedOverlay);

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
        this.onChange(this.value()!); // Notify Angular Forms about the change
        this.onTouched(); // Mark the component as touched
        this.close(); // Close the dropdown
      });
  }

  /**
   * Opens the dropdown and focuses the listbox.
   * This method sets the `isOpen` signal to `true` and ensures the listbox gains focus.
   */
  open() {
    this.isOpen.set(true);
  }

  /**
   * Closes the dropdown with a transition effect and refocuses the button.
   * This method sets the `isOpen` signal to `false` after a delay and removes
   * the transition class from the overlay panel.
   */
  close() {
    this.cdkConnectedOverlay()?.overlayRef.addPanelClass(
      'cdk-overlay-pane-closing'
    );

    setTimeout(() => {
      this.isOpen.set(false);
      this.cdkConnectedOverlay()?.overlayRef.removePanelClass(
        'cdk-overlay-pane-closing'
      );
      this.button()?.el.nativeElement.focus();
    }, this.closeDelay());
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
   * This method is called by Angular Forms to update the value of the combobox component.
   * @param value - The new value to set.
   */
  writeValue(value: string[]): void {
    if (value) {
      value.forEach(value => {
        this.command()?.commandOptions()?.cdkListbox?.selectValue(value);
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
