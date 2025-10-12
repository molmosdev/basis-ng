import {
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { CdkDialogContainer, DialogRef } from '@angular/cdk/dialog';
import { DialogConfig, DialogManager } from '../../services/dialog-manager';

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
  dialogManager = inject(DialogManager);
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

  handleBackdropClose(data: DialogConfig): void {
    if (data.closeOnBackdropClick) {
      this.dialogRef.backdropClick.subscribe((): void => {
        this.dialogManager.closeDialog(this.dialogRef.id);
      });
    }
  }

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
