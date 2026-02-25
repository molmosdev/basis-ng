import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

/**
 * Custom checkbox control synced with the host input element.
 */
@Component({
  selector: 'button[b-checkbox]',
  template: `
    <span class="b-checkbox-indicator" aria-hidden="true">
      @if (value()) {
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
    '[attr.aria-checked]': 'value()',
    '[attr.data-state]': 'value() ? "checked" : "unchecked"',
    '[attr.aria-disabled]': 'disabled()',
    '[disabled]': 'disabled()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[class.b-size-sm]': 'size() === "sm"',
    '[class.b-size-md]': 'size() === "md"',
    '[class.b-size-lg]': 'size() === "lg"',
    '(click)': 'onToggle()',
    '(keydown.space)': 'suppressSpace($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox implements FormValueControl<boolean> {
  /**
   * Current value of the checkbox.
   */
  readonly value = model<boolean>(false);

  /**
   * Emitted when the value changes.
   */
  readonly valueChange = output<boolean>();

  /**
   * Visual size of the checkbox.
   */
  readonly size = model<'sm' | 'md' | 'lg'>('md');

  /**
   * Whether the checkbox is disabled. Automatically bound by Signal Forms.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Toggle the checkbox when the user clicks on it.
   */
  onToggle(): void {
    if (this.disabled()) {
      return;
    }

    const newValue = !this.value();
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }

  /**
   * Prevent the page from scrolling when pressing the space key.
   */
  suppressSpace(event: Event): void {
    if (!this.disabled()) {
      event.preventDefault();
    }
  }

  /**
   * Update the current value (FormValueControl API).
   * @param value - New boolean value to apply.
   */
  setValue(value: boolean): void {
    this.value.set(value);
    this.valueChange.emit(value);
  }
}
