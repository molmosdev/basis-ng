import {
  Component,
  contentChild,
  forwardRef,
  signal,
  input,
  OnInit,
  effect,
} from '@angular/core';
import { ConnectedOverlay } from '../../directives/connected-overlay';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectTrigger } from './shared/components/select-trigger';
import { SelectValue } from './shared/components/select-value';
import { SelectContent } from './shared/components/select-content';

/**
 * Select component that provides a customizable dropdown selection interface.
 * Implements ControlValueAccessor for form integration.
 */
@Component({
  selector: 'b-select',
  template: `<ng-content />`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
  host: {
    '[class.b-size-sm]': 'size() === "sm"',
    '[class.b-size-md]': 'size() === "md"',
    '[class.b-size-lg]': 'size() === "lg"',
  },
})
export class Select implements ControlValueAccessor, OnInit {
  /**
   * Reference to the overlay directive instance.
   * Used to control the dropdown overlay for the select component.
   */
  readonly overlay = contentChild(ConnectedOverlay);

  /**
   * Reference to the select trigger component.
   * Used to handle trigger events (click, keydown) for opening/closing the select.
   */
  readonly selectTrigger = contentChild(SelectTrigger);

  /**
   * Reference to the select value component.
   * Used to display the selected value(s).
   */
  readonly selectValue = contentChild(SelectValue);

  /**
   * Reference to the select content component.
   * Used to manage the list of selectable options.
   */
  readonly selectContent = contentChild(SelectContent);

  /**
   * Input signal for the size of the select component.
   * Can be 'sm', 'md', or 'lg'. Default is 'md'.
   */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /**
   * Input signal for a function to display the selected value(s).
   * This function receives the value array and returns a string for display.
   */
  readonly displayWith = input.required<(value: string[]) => string>();

  /**
   * Signal holding the current selected value(s).
   */
  readonly value = signal<string[]>([]);

  /**
   * Initializes effects for value changes and content width adjustment.
   */
  constructor() {
    effect(() => {
      this.handleValueChanges();
      this.handleSelectContentWidth();
    });
  }

  /**
   * Subscribes to value changes from the select content and updates the model.
   * Closes the overlay if not in multiple selection mode.
   */
  handleValueChanges(): void {
    this.selectContent()?.changeValueEmitter.subscribe((value: string[]) => {
      this.onChange(value);
      if (!this.selectContent()?.listBox.multiple) {
        this.overlay()?.closeOverlay();
      }
      this.onTouched();
    });
  }

  /**
   * Sets the minimum width of the select content to match the trigger width.
   */
  handleSelectContentWidth(): void {
    const selectContentEl = this.selectContent()?.el.nativeElement;
    if (selectContentEl) {
      selectContentEl.style.minWidth = `${
        this.selectTrigger()?.el.nativeElement.offsetWidth
      }px`;
    }
  }

  /**
   * Angular lifecycle hook. Sets up event handlers for overlay and trigger interactions.
   */
  ngOnInit(): void {
    this.handleTriggerClicks();
    this.handleOverlayAttached();
    this.handleOverlayDetached();
    this.handleOverlayOutsideClick();
    this.handleOverlayBackdropClick();
    this.handlePanelSizeClass();
  }

  /**
   * Handles clicks and keydown events on the select trigger to toggle the overlay.
   */
  handleTriggerClicks(): void {
    this.selectTrigger()!.buttonClicked.subscribe(() => {
      this.overlay()?.toggleOverlay();
    });
  }

  /**
   * Handles overlay attachment event. Selects current values and focuses the content.
   */
  handleOverlayAttached(): void {
    this.overlay()?.attachEmitter.subscribe(() => {
      if (this.value().length === 0) {
        this.selectContent()?.el.nativeElement.focus();
        return;
      }

      this.value().forEach(val => {
        this.selectContent()?.listBox?.selectValue(val);

        // Focus the selected option
        this.selectContent()
          ?.options()
          .find(opt => opt.value === val)
          ?.focus();
      });
    });
  }

  /**
   * Handles overlay detachment event. Closes the overlay.
   */
  handleOverlayDetached(): void {
    this.overlay()?.detachEmitter.subscribe(() => {
      this.overlay()?.closeOverlay();
    });
  }

  /**
   * Handles outside click event on the overlay. Closes the overlay.
   */
  handleOverlayOutsideClick(): void {
    this.overlay()?.outsideClickEmitter.subscribe(() => {
      this.overlay()?.closeOverlay();
    });
  }

  /**
   * Handles backdrop click event on the overlay. Closes the overlay.
   */
  handleOverlayBackdropClick(): void {
    this.overlay()?.backdropClickEmitter.subscribe(() => {
      this.overlay()?.closeOverlay();
    });
  }

  /**
   * Sets the panel size class on the overlay based on the select size input.
   */
  handlePanelSizeClass(): void {
    this.overlay()!.cdkConnectedOverlay.panelClass = `b-size-${this.size()}`;
  }

  // Control value accessor methods

  /**
   * Writes a new value to the select component.
   * @param value - The new value array to set.
   */
  writeValue(value: string[]): void {
    this.setValue(value);
  }

  /**
   * Callback for value changes. Set by registerOnChange.
   */
  private onChange: (value: string[]) => void = () => undefined;

  /**
   * Registers a callback function to be called when the value changes.
   * @param fn - The callback function.
   */
  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = (val: string[]) => {
      fn(val);
      this.setValue(val);
    };
  }

  /**
   * Callback for touch events. Set by registerOnTouched.
   */
  private onTouched: () => void = () => undefined;

  /**
   * Registers a callback function to be called when the component is touched.
   * @param fn - The callback function.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the select trigger.
   * @param isDisabled - Whether the select should be disabled.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.selectTrigger()?.disabled.set(isDisabled);
  }

  /**
   * Sets the value signal and updates the display value.
   * @param value - The new value array to set.
   */
  setValue(value: string[]): void {
    this.value.set(value);
    this.selectValue()?.content.set(this.displayWith()(value));
  }
}
