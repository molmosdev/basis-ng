import { Component, contentChild, effect, forwardRef, input, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConnectedOverlay } from '../../directives/connected-overlay';
import { SelectContent } from './select-content';
import { SelectTrigger } from './select-trigger';
import { SelectValue } from './select-value';

/**
 * Select component that wires trigger, content and value together and implements ControlValueAccessor.
 */
@Component({
  selector: 'b-select',
  template: ` <ng-content /> `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
})
export class Select implements ControlValueAccessor, OnInit {
  /** Connected overlay instance used to show the dropdown. */
  readonly overlay = contentChild(ConnectedOverlay);

  /** Trigger that toggles the select overlay. */
  readonly selectTrigger = contentChild<SelectTrigger>(SelectTrigger);

  /** Visual value display component. */
  readonly selectValue = contentChild<SelectValue>(SelectValue);

  /** Content pane that contains options. */
  readonly selectContent = contentChild<SelectContent>(SelectContent);

  /** Function to display the selected value(s). */
  readonly displayWith = input.required<(value: string[]) => string>();

  /** Current value array for the select. */
  readonly value = signal<string[]>([]);

  constructor() {
    effect(() => {
      this.handleValueChanges();
      this.handleSelectContentWidth();
    });
  }

  /**
   * Subscribe to content value changes and update the form value.
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
   * Ensure the select content width matches the trigger width when opened.
   */
  handleSelectContentWidth(): void {
    const selectContentEl = this.selectContent()?.el.nativeElement;
    if (selectContentEl) {
      selectContentEl.style.minWidth = `${this.selectTrigger()?.el.nativeElement.offsetWidth}px`;
    }
  }

  /**
   * Initialize event wiring for trigger and overlay events.
   */
  ngOnInit(): void {
    this.handleTriggerClicks();
    this.handleOverlayAttached();
    this.handleOverlayDetached();
    this.handleOverlayOutsideClick();
    this.handleOverlayBackdropClick();
  }

  /**
   * Wire trigger click to toggle overlay.
   */
  handleTriggerClicks(): void {
    this.selectTrigger()!.buttonClicked.subscribe(() => {
      this.overlay()?.toggleOverlay();
    });
  }

  /**
   * Focus selected option when overlay attaches.
   */
  handleOverlayAttached(): void {
    this.overlay()?.attachEmitter.subscribe(() => {
      this.selectTrigger()?.triggered.set(true);

      if (this.value().length === 0) {
        this.selectContent()?.el.nativeElement.focus();
        return;
      }

      this.value().forEach((val) => {
        this.selectContent()?.listBox?.selectValue(val);

        // Focus the selected option
        this.selectContent()
          ?.options()
          .find((opt) => opt.value === val)
          ?.focus();
      });
    });
  }

  /**
   * Close overlay when detached.
   */
  handleOverlayDetached(): void {
    this.overlay()?.detachEmitter.subscribe(() => {
      this.overlay()?.closeOverlay();
      this.selectTrigger()?.triggered.set(false);
    });
  }

  /**
   * Close overlay when an outside click occurs.
   */
  handleOverlayOutsideClick(): void {
    this.overlay()?.outsideClickEmitter.subscribe(() => {
      this.overlay()?.closeOverlay();
    });
  }

  /**
   * Close overlay when backdrop is clicked.
   */
  handleOverlayBackdropClick(): void {
    this.overlay()?.backdropClickEmitter.subscribe(() => {
      this.overlay()?.closeOverlay();
    });
  }

  // Control value accessor methods

  /**
   * Write a new value to the element.
   * @param value - New value array to set.
   */
  writeValue(value: string[]): void {
    this.setValue(value);
  }

  private onChange: (value: string[]) => void = () => undefined;

  /**
   * Register a callback to be fired when the value changes.
   * @param fn - Callback that receives the new value.
   */
  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = (val: string[]) => {
      fn(val);
      this.setValue(val);
    };
  }

  private onTouched: () => void = () => undefined;

  /**
   * Register a callback to be fired when the control is touched.
   * @param fn - Touch callback.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Toggle disabled state on the select trigger.
   * @param isDisabled - Whether the control is disabled.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.selectTrigger()?.disabled.set(isDisabled);
  }

  /**
   * Update the current value and displayed content.
   * @param value - New value array to apply.
   */
  setValue(value: string[]): void {
    this.value.set(value);
    this.selectValue()?.content.set(this.displayWith()(value));
  }
}
