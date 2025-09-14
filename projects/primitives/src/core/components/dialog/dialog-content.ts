import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { CdkDialogContainer, Dialog } from '@angular/cdk/dialog';
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
    'animate.enter': 'entering',
    'animate.leave': 'leaving',
  },
})
export class DialogContent extends CdkDialogContainer implements OnInit {
  dialog = inject(Dialog);
  dialogService = inject(DialogService);

  constructor() {
    super();
  }

  ngOnInit(): void {
    const config = this._config;
    const data = config?.['data'] as DialogConfig | undefined;
    const id = config?.id;
    if (id !== undefined) {
      const dialogRef = this.dialog.getDialogById(id);
      if (data?.close) {
        dialogRef?.backdropClick.subscribe(() => {
          this.dialogService.closeDialog(id);
        });
        dialogRef?.keydownEvents.subscribe(event => {
          if (event.key === 'Escape') {
            this.dialogService.closeDialog(id);
          }
        });
      }
    } else {
      console.warn('Dialog id is undefined.');
    }
  }
}
