import { CdkDialogContainer, DialogRef } from '@angular/cdk/dialog';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { DialogConfig, DialogManager } from '../../services/dialog-manager';

/**
 * Internal dialog container that wires backdrop and escape-key behavior.
 */
@Component({
  selector: 'b-dialog-content',
  template: ` <ng-template cdkPortalOutlet /> `,
  encapsulation: ViewEncapsulation.None,
  imports: [CdkPortalOutlet],
  host: {
    '[class.leaving]': 'leaving()',
  },
})
export class DialogContent extends CdkDialogContainer implements OnInit {
  dialogRef = inject(DialogRef);
  dialogManager = inject(DialogManager);

  /**
   * Signal used to animate or flag leaving state.
   */
  readonly leaving = signal(false);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.handleDialogEvents();
  }

  /**
   * Attach backdrop and keyboard handlers based on dialog config.
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
   * Close dialog on backdrop click when configured.
   * @param data - Dialog configuration.
   */
  handleBackdropClose(data: DialogConfig): void {
    if (data.closeOnBackdropClick) {
      this.dialogRef.backdropClick.subscribe((): void => {
        this.dialogManager.closeDialog(this.dialogRef.id);
      });
    }
  }

  /**
   * Close dialog on Escape key when configured.
   * @param data - Dialog configuration.
   */
  handleEscapeKeyClose(data: DialogConfig): void {
    if (data.closeOnEscapeKey) {
      this.dialogRef.keydownEvents.subscribe((event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          this.dialogManager.closeDialog(this.dialogRef.id);
        }
      });
    }
  }
}
