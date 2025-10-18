import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Custom checkbox control synced with the host input element.
 */
@Component({
  selector: 'button[b-checkbox]',
  template: `
    <span class="b-checkbox-indicator" aria-hidden="true">
      @if (checked()) {
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.53547 0.62293C8.88226 0.849446 8.97976 1.3142 8.75325 1.66099L4.5083 8.1599C4.38833 8.34356 4.19397 8.4655 3.9764 8.49358C3.75883 8.52167 3.53987 8.45309 3.3772 8.30591L0.616113 5.80777C0.308959 5.52987 0.285246 5.05559 0.563148 4.74844C0.84105 4.44128 1.31533 4.41757 1.62249 4.69547L3.73256 6.60459L7.49741 0.840706C7.72393 0.493916 8.18868 0.396414 8.53547 0.62293Z"
          />
        </svg>
      }
    </span>
  `,
  host: {
    type: '"button"',
    '[attr.role]': '"checkbox"',
    '[attr.aria-checked]': 'checked()',
    '[attr.data-state]': 'checked() ? "checked" : "unchecked"',
    '[attr.aria-disabled]': 'isDisabled()',
    '[disabled]': 'isDisabled()',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[class.b-size-sm]': 'size() === "sm"',
    '[class.b-size-md]': 'size() === "md"',
    '[class.b-size-lg]': 'size() === "lg"',
    '(click)': 'onToggle()',
    '(keydown.space)': 'suppressSpace($event)',
    '(blur)': 'markTouched()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Checkbox),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox implements ControlValueAccessor {
  /**
   * Internal checked state for the checkbox.
   */
  private readonly internalValue = signal(false);

  /**
   * Public checked state exposed to the template bindings.
   */
  readonly checked = computed(() => this.internalValue());

  /**
   * Public two-way binding output emitted on user interaction.
   */
  readonly valueChange = output<boolean>();

  /**
   * Visual size of the checkbox.
   */
  readonly size = model<'sm' | 'md' | 'lg'>('md');

  /**
   * Disabled flag coming from template bindings.
   */
  readonly disabledBinding = input(false, { transform: booleanAttribute });

  /**
   * Disabled flag controlled by Angular forms APIs.
   */
  private readonly disabledFromControl = signal(false);

  /**
   * Combined disabled state exposed to the template bindings.
   */
  readonly isDisabled = computed(() => this.disabledBinding() || this.disabledFromControl());

  /**
   * Internal change handler for the checkbox.
   */
  private onChange: (value: boolean) => void = () => undefined;

  /**
   * Internal touched handler for the checkbox.
   */
  private onTouched: () => void = () => undefined;

  /**
   * Toggle the checkbox when the user clicks on it.
   */
  onToggle(): void {
    if (this.isDisabled()) {
      return;
    }

    const next = !this.checked();
    this.setChecked(next, true);
    this.markTouched();
  }

  /**
   * Prevent the page from scrolling when pressing the space key.
   */
  suppressSpace(event: Event): void {
    if (!this.isDisabled()) {
      event.preventDefault();
    }
  }

  /**
   * Mark the control as touched.
   */
  markTouched(): void {
    this.onTouched();
  }

  /**
   * Write the value to the internal form control.
   * @param value - New value to write.
   */
  writeValue(value: boolean | null): void {
    this.internalValue.set(!!value);
  }

  /**
   * Register a change handler for the checkbox.
   * @param fn - Change callback.
   */
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  /**
   * Register a touched handler for the checkbox.
   * @param fn - Touched callback.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Toggle disabled state on the checkbox.
   * @param isDisabled - Whether the control is disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabledFromControl.set(isDisabled);
  }

  /**
   * Set the checked state internally and emit change events if needed.
   * @param value - New checked value.
   * @param emitChange - Whether to emit change events.
   */
  private setChecked(value: boolean, emitChange: boolean): void {
    const normalized = !!value;

    if (this.internalValue() !== normalized) {
      this.internalValue.set(normalized);
    }

    if (emitChange) {
      this.onChange(normalized);
      this.valueChange.emit(normalized);
    }
  }
}
