import {
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { CdkDialogContainer, DialogRef } from '@angular/cdk/dialog';
import { DialogConfig, DialogService } from '../../services/dialog.service';

/** Dialog content container that renders projected portal content for a dialog instance.
 *
 * @remarks Extends CdkDialogContainer to integrate with Angular CDK dialog infrastructure.
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
  /** Reference to the active dialog instance used to control lifecycle and closing. */
  dialogRef = inject(DialogRef);

  /** Service that orchestrates opening and closing of dialog instances. */
  dialogService = inject(DialogService);

  /** Tracks whether the dialog is in its leaving (closing) animation state. */
  readonly leaving = signal(false);

  /** Initializes the dialog content component by calling the superclass constructor. */
  constructor() {
    super();
  }

  /** Initializes component logic and subscribes to dialog events. */
  ngOnInit(): void {
    this.handleDialogEvents();
  }

  /** Handles all dialog behavioral event subscriptions based on provided configuration data. */
  handleDialogEvents(): void {
    const data = this._config?.data as DialogConfig | undefined;

    if (!data) {
      return;
    }

    this.handleBackdropClose(data);
    this.handleEscapeKeyClose(data);
  }

  /** Subscribes to backdrop clicks to close the dialog when enabled in config.
   *
   * @param data - Dialog configuration containing close behavior flags.
   */
  handleBackdropClose(data: DialogConfig): void {
    if (data.closeOnBackdropClick) {
      this.dialogRef.backdropClick.subscribe((): void => {
        this.dialogService.closeDialog(this.dialogRef.id);
      });
    }
  }

  /** Subscribes to keydown events to close the dialog on Escape key when enabled.
   *
   * @param data - Dialog configuration containing close behavior flags.
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
