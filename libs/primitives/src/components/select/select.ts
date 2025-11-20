import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  effect,
  input,
  model,
  OnInit,
  output,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { ConnectedOverlay } from '../../directives/connected-overlay';
import { SelectContent } from './select-content';
import { SelectTrigger } from './select-trigger';
import { SelectValue } from './select-value';

/**
 * Select component that wires trigger, content and value together using signals.
 */
@Component({
  selector: 'b-select',
  template: ` <ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-invalid]': 'invalid() ? "" : null',
  },
})
export class Select implements OnInit, FormValueControl<string[]> {
  /** Connected overlay instance used to show the dropdown. */
  readonly overlay = contentChild(ConnectedOverlay);

  /** Trigger that toggles the select overlay. */
  readonly selectTrigger = contentChild(SelectTrigger);

  /** Visual value display component. */
  readonly selectValue = contentChild(SelectValue);

  /** Content pane that contains options. */
  readonly selectContent = contentChild(SelectContent);

  /** Function to display the selected value(s). */
  readonly displayWith = input.required<(value: string[]) => string>();

  /** Whether the select is in an invalid state. */
  readonly invalid = input<boolean>(false);

  /** Current value array for the select. */
  readonly value = model<string[]>([]);

  /** Emitted when the value changes. */
  readonly valueChange = output<string[]>();

  constructor() {
    effect(() => this.updateDisplayedValue());
    effect(() => this.handleContentValueChanges());
  }

  ngOnInit(): void {
    this.setupTriggerEvents();
    this.setupOverlayEvents();
  }

  /**
   * Update the displayed value when value or displayWith changes.
   */
  private updateDisplayedValue(): void {
    const currentValue = this.value();
    const displayFn = this.displayWith();
    this.selectValue()?.content.set(displayFn(currentValue));
  }

  /**
   * Subscribe to content value changes (content is recreated each time overlay opens).
   */
  private handleContentValueChanges(): void {
    const content = this.selectContent();
    if (!content) return;

    content.changeValueEmitter.subscribe((value: string[]) => {
      this.value.set(value);
      this.valueChange.emit(value);
      if (!content.listBox.multiple) {
        this.overlay()?.closeOverlay();
      }
    });
  }

  /**
   * Wire trigger click to toggle overlay (trigger persists across lifecycle).
   */
  private setupTriggerEvents(): void {
    this.selectTrigger()?.buttonClicked.subscribe(() => {
      this.overlay()?.toggleOverlay();
    });
  }

  /**
   * Wire overlay events (overlay persists across lifecycle).
   */
  private setupOverlayEvents(): void {
    const overlay = this.overlay();
    if (!overlay) return;

    overlay.attachEmitter.subscribe(() => {
      this.selectTrigger()?.triggered.set(true);

      // Update select content width after DOM is rendered
      const selectContentEl = this.selectContent()?.el.nativeElement;
      const triggerEl = this.selectTrigger()?.el.nativeElement;
      if (selectContentEl && triggerEl) {
        selectContentEl.style.minWidth = `${triggerEl.offsetWidth}px`;
      }

      if (this.value().length === 0) {
        this.selectContent()?.el.nativeElement.focus();
        return;
      }

      this.value().forEach((val) => {
        this.selectContent()?.listBox?.selectValue(val);
        this.selectContent()
          ?.options()
          .find((opt) => opt.value === val)
          ?.focus();
      });
    });

    overlay.detachEmitter.subscribe(() => {
      overlay.closeOverlay();
      this.selectTrigger()?.triggered.set(false);
    });

    overlay.outsideClickEmitter.subscribe(() => {
      overlay.closeOverlay();
    });

    overlay.backdropClickEmitter.subscribe(() => {
      overlay.closeOverlay();
    });
  }

  /**
   * Toggle disabled state on the select trigger.
   * @param isDisabled - Whether the control is disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this.selectTrigger()?.disabled.set(isDisabled);
  }

  /**
   * Update the current value.
   * @param value - New value array to apply.
   */
  setValue(value: string[]): void {
    this.value.set(value);
    this.valueChange.emit(value);
  }
}
