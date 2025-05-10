import { ClosingType, DialogService } from '../../services/dialog.service';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { CdkDialogContainer, DialogRef } from '@angular/cdk/dialog';

/**
 * DialogComponent acts as a custom container for dialogs opened via the Angular CDK Dialog module.
 * It provides custom close behavior (ESC key and outside click) and hosts the dialog content.
 *
 * @example
 * Used internally by DialogService. Not intended for direct use.
 */
@Component({
  selector: 'b-dialog',
  template: `<ng-template cdkPortalOutlet />`,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CdkPortalOutlet],
  host: {
    '(keydown.escape)': 'close("escapeKey")',
    '[class.leaving]': 'leaving()',
  },
})
export class DialogComponent extends CdkDialogContainer {
  /**
   * Injected instance of the DialogService.
   * @internal
   */
  dialogService = inject(DialogService);

  /**
   * Injected reference to the current DialogRef.
   * @internal
   */
  dialogRef = inject(DialogRef);

  /**
   * Injected reference to the host element.
   * @internal
   */
  private el = inject(ElementRef);

  /**
   * Signal indicating if the dialog is in the process of leaving (closing).
   */
  readonly leaving = signal(false);

  /**
   * Closes the dialog by calling the DialogService.
   */
  close(type: ClosingType) {
    this.dialogService.closeDialog(this.dialogRef.id, type);
  }

  /**
   * Listens for document click events and closes the dialog if the click occurs outside the dialog element.
   * @param event MouseEvent
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.close('outsideClick');
    }
  }
}
