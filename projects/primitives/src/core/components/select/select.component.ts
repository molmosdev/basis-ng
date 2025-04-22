import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Component,
  computed,
  contentChild,
  effect,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { SelectContentComponent } from './select-content.component';
import { Button } from '../button/button.component';
import { Icon } from '../icon/icon.component';

/**
 * Component representing a custom select dropdown.
 * It provides a button to toggle the dropdown and displays the selected option.
 */
@Component({
  selector: 'b-select',
  imports: [Button, Icon, CdkConnectedOverlay, CdkOverlayOrigin],
  template: ` <button
      b-button
      variant="outlined"
      (click)="isOpen() ? close() : open()"
      (keydown.arrowUp)="!isOpen() && open()"
      (keydown.arrowDown)="!isOpen() && open()"
      cdkOverlayOrigin
      [activeEnabled]="false"
      #trigger="cdkOverlayOrigin">
      {{ value() && value()!.length === 0 ? placeholder() : content() }}
      <i b-icon icon="ChevronDown" [size]="20"></i>
    </button>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayWidth]="buttonWidth()"
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
      (detach)="close()">
      <ng-content />
    </ng-template>`,
  host: {
    '[style.max-width]': 'maxWidth()',
    '[class.ng-invalid]': 'invalid()',
    '[class.disabled]': 'disabled()',
  },
})
export class SelectComponent {
  /**
   * Placeholder text displayed when no option is selected.
   * Defaults to 'Select an option'.
   */
  readonly placeholder = input<string>('Select an option');

  /**
   * Signal indicating whether the dropdown is open.
   */
  readonly isOpen = signal(false);

  /**
   * Reference to the button element used to toggle the dropdown.
   */
  readonly button = viewChild(Button);

  /**
   * Reference to the content component of the dropdown.
   */
  readonly listBox = contentChild(SelectContentComponent);

  /**
   * Computed signal representing the selected values from the dropdown.
   */
  readonly value = computed(() => this.listBox()?.value());

  /**
   * Computed signal representing the content of the selected option.
   */
  readonly content = computed(() => this.listBox()?.content());

  /**
   * Input for setting the maximum width of the dropdown.
   * Defaults to '100%'.
   */
  readonly maxWidth = input('100%');

  /**
   * Computed signal for the width of the button element.
   */
  readonly buttonWidth = computed(
    () => this.button()?.el.nativeElement.offsetWidth
  );

  /**
   * Model indicating whether the select component is invalid.
   */
  readonly invalid = model(false);

  /**
   * Model indicating whether the select component is disabled.
   */
  readonly disabled = model(false);

  constructor() {
    /**
     * Effect to handle changes in the selected value.
     */
    effect(() => this.handleSelectedValueChange());
  }

  /**
   * Handles changes to the selected value by subscribing to the close event of the listbox.
   */
  handleSelectedValueChange() {
    this.listBox()?.closeEmitter.subscribe(() => this.close());
  }

  /**
   * Opens the dropdown and focuses the listbox.
   */
  open() {
    this.isOpen.set(true);
    setTimeout(() => this.listBox()?.el.nativeElement.focus(), 0);
  }

  /**
   * Closes the dropdown and focuses the button.
   */
  close() {
    setTimeout(() => this.button()?.el.nativeElement.focus(), 0);
    this.isOpen.set(false);
  }
}
