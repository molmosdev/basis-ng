import {
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { CdkDialogContainer, DialogRef } from '@angular/cdk/dialog';
import { DialogConfig, DialogService } from '@basis-ng/primitives';

/**
 * Hosts projected dialog content and manages close behaviors (backdrop and escape key).
 *
 * @public
 */
@Component({
  selector: 'b-dialog-content',
  template: `<ng-template cdkPortalOutlet />`,
  encapsulation: ViewEncapsulation.None,
  imports: [CdkPortalOutlet],
  host: {
    '[class.leaving]': 'leaving()',
  },
})
export class DialogContent extends CdkDialogContainer implements OnInit {
  /**
   * Reference to the active dialog instance for event subscriptions and closing.
   *
   * @internal
   */
  dialogRef = inject(DialogRef);
  /**
   * Service that orchestrates dialog lifecycle operations (open/close).
   *
   * @internal
   */
  dialogService = inject(DialogService);
  /**
   * Signal that indicates whether the dialog is in its leaving (closing) transition state.
   *
   * @public
   * @readonly
   */
  readonly leaving = signal(false);

  /**
   * Creates the dialog content container instance.
   *
   * @public
   */
  constructor() {
    super();
  }

  /**
   * Initializes dialog event handlers after component creation.
   *
   * @public
   */
  ngOnInit(): void {
    this.handleDialogEvents();
  }

  /**
   * Sets up conditional event handlers based on provided dialog configuration.
   *
   * @internal
   */
  handleDialogEvents(): void {
    const data = this._config?.data as DialogConfig | undefined;

    if (!data) {
      return;
    }

    this.handleBackdropClose(data);
    this.handleEscapeKeyClose(data);
  }

  /**
   * Attaches backdrop click handler to close the dialog when enabled in config.
   *
   * @param data - Dialog configuration containing backdrop close option.
   * @internal
   */
  handleBackdropClose(data: DialogConfig): void {
    if (data.closeOnBackdropClick) {
      this.dialogRef.backdropClick.subscribe((): void => {
        this.dialogService.closeDialog(this.dialogRef.id);
      });
    }
  }

  /**
   * Attaches escape key handler to close the dialog when enabled in config.
   *
   * @param data - Dialog configuration containing escape key close option.
   * @internal
   */
  handleEscapeKeyClose(data: DialogConfig): void {
    if (data.closeOnEscapeKey) {
      this.dialogRef.keydownEvents.subscribe((event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          this.dialogService.closeDialog(this.dialogRef.id);
        }
      });
    }
  }
}
