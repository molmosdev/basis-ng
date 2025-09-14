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
 * DialogContent acts as a custom container for dialogs opened via the Angular CDK Dialog module.
 * It provides custom close behavior (ESC key and outside click) and hosts the dialog content.
 *
 * @example
 * Used internally by DialogService. Not intended for direct use.
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
  dialogRef = inject(DialogRef);
  dialogService = inject(DialogService);
  readonly leaving = signal(false);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.handleDialogEvents();
  }

  handleDialogEvents(): void {
    const data = this._config?.data as DialogConfig | undefined;

    if (!data) {
      return;
    }

    this.handleBackdropClose(data);
    this.handleEscapeKeyClose(data);
  }

  /**
   * Suscribe al evento de cierre por click en el backdrop si está habilitado en la config.
   */
  handleBackdropClose(data: DialogConfig): void {
    if (data.closeOnBackdropClick) {
      this.dialogRef.backdropClick.subscribe(() => {
        this.dialogService.closeDialog(this.dialogRef.id);
      });
    }
  }

  /**
   * Suscribe al evento de cierre por tecla Escape si está habilitado en la config.
   */
  handleEscapeKeyClose(data: DialogConfig): void {
    if (data.closeOnEscapeKey) {
      this.dialogRef.keydownEvents.subscribe(event => {
        if (event.key === 'Escape') {
          this.dialogService.closeDialog(this.dialogRef.id);
        }
      });
    }
  }
}
