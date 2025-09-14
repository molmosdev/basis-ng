import {
  computed,
  Directive,
  inject,
  input,
  OnDestroy,
  OnInit,
  TemplateRef,
  output,
} from '@angular/core';
import { DialogData, DialogService } from '../services/dialog.service';

/**
 * Directive that registers and controls a dialog template instance.
 *
 * Registers itself in the {@link DialogService} on init and exposes open/close APIs.
 */
@Directive({
  selector: '[bDialog]',
  exportAs: 'bDialog',
  host: {
    '(keydown.escape)': 'closeOnEscapeKey() ? close() : null',
  },
})
export class Dialog implements OnInit, OnDestroy {
  /**
   * Unique dialog identifier bound from the `bDialog` attribute.
   */
  readonly id = input.required<string>({ alias: 'bDialog' });

  /**
   * Whether the dialog renders a backdrop element.
   *
   * @defaultValue true
   */
  readonly hasBackdrop = input<boolean>(true);

  /**
   * Closes the dialog when the user clicks on the backdrop.
   *
   * @defaultValue true
   */
  readonly closeOnBackdropClick = input<boolean>(true);

  /**
   * Closes the dialog when the Escape key is pressed while focused inside.
   *
   * @defaultValue true
   */
  readonly closeOnEscapeKey = input<boolean>(true);

  /**
   * Restores focus to the previously focused element after the dialog closes.
   *
   * @defaultValue true
   */
  readonly restoreFocus = input<boolean>(true);

  /**
   * Delay in milliseconds before the dialog is fully closed (useful for animations).
   *
   * @defaultValue 150
   */
  readonly closeDelay = input<number>(150);

  /**
   * Computed dialog data passed to the service containing template and configuration.
   */
  readonly data = computed<DialogData>(() => ({
    template: this.templateRef,
    config: {
      hasBackdrop: this.hasBackdrop(),
      restoreFocus: this.restoreFocus(),
      closeDelay: this.closeDelay(),
      closeOnBackdropClick: this.closeOnBackdropClick(),
      closeOnEscapeKey: this.closeOnEscapeKey(),
    },
  }));

  /**
   * Delay in milliseconds before opening the dialog (for entrance timing / animations).
   *
   * @defaultValue 0
   */
  readonly openDelay = input<number>(0);

  /**
   * Event emitted after the dialog has been programmatically or automatically closed.
   */
  readonly closed = output<void>();

  /**
   * Reference to the dialog service handling registration and state.
   */
  private readonly dialogService = inject(DialogService);

  /**
   * Template reference representing the dialog content projected when opened.
   */
  private readonly templateRef = inject(TemplateRef<any>);

  /**
   * Lifecycle hook that registers the dialog with the dialog service.
   */
  ngOnInit() {
    this.dialogService.registerDialog(this.id(), this.data());
  }

  /**
   * Opens the dialog via the dialog service using its identifier.
   */
  open(): void {
    this.dialogService.openDialog(this.id());
  }

  /**
   * Closes the dialog and emits the `closed` output.
   */
  close(): void {
    this.dialogService.closeDialog(this.id());
    this.closed.emit();
  }

  /**
   * Lifecycle hook that removes the dialog from the dialog service registry.
   */
  ngOnDestroy(): void {
    this.dialogService.removeDialog(this.id());
  }
}
