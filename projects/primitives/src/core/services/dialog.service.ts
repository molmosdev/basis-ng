import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable, TemplateRef } from '@angular/core';
import { DialogContent } from '../components/dialog/dialog-content';
import { UtilsService } from '../../shared/services/utils.service';

/**
 * Represents the data structure for a registered dialog, containing its template and configuration.
 */
export interface DialogData {
  /** The template reference (`ng-template`) to be rendered as the dialog content. */
  template: TemplateRef<any>;
  /** Configuration options for the dialog. */
  config: DialogConfig;
}

/**
 * Represents the configuration options for a dialog.
 */
export interface DialogConfig {
  /** Whether the dialog should have a backdrop. */
  hasBackdrop: boolean;
  /** Whether the dialog should restore focus to the previously focused element when closed. */
  restoreFocus: boolean;
  /** The delay before the dialog closes, in milliseconds. */
  closeDelay: number;
  /** Whether the dialog should be closed when the backdrop is clicked. */
  closeOnBackdropClick: boolean;
  /** Whether the dialog should be closed when the escape key is pressed. */
  closeOnEscapeKey: boolean;
}

/**
 * Type representing the closing type for dialogs.
 */
export type ClosingType = 'outsideClick' | 'escapeKey' | 'closeButton';

/**
 * Service responsible for managing and controlling dialogs registered via the `Dialog`.
 * It uses the Angular CDK Dialog module internally.
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  /**
   * Injected instance of the Angular CDK `Dialog` service.
   * @internal
   */
  private readonly dialog = inject(Dialog);

  /**
   * Injected instance of the `UtilsService`.
   */
  utilsService = inject(UtilsService);

  /**
   * A map storing the registered dialog templates and their data, keyed by their unique ID.
   * @internal
   */
  private readonly dialogs = new Map<string, DialogData>();

  /**
   * Registers a dialog template and its data with the service.
   * Typically called automatically by the `Dialog`.
   *
   * @param id - The unique identifier for the dialog.
   * @param data - The dialog data containing the template and configuration.
   */
  registerDialog(id: string, data: DialogData): void {
    if (this.dialogs.has(id)) {
      console.warn(
        `[DialogService] Dialog with id "${id}" is already registered. Overwriting.`
      );
    }
    this.dialogs.set(id, data);
  }

  /**
   * Removes a dialog registration from the service.
   * Typically called automatically by the `Dialog` when the template is destroyed.
   *
   * @param id - The unique identifier of the dialog to remove.
   */
  removeDialog(id: string): void {
    this.dialogs.delete(id);
  }

  /**
   * Opens the dialog associated with the given ID.
   *
   * @param id - The unique identifier of the dialog to open.
   * @throws Error if a dialog with the specified ID is not found.
   */
  openDialog(id: string) {
    const dialogData = this.dialogs.get(id);

    if (!dialogData) {
      throw new Error(
        `[DialogService] Dialog with id "${id}" not found. Ensure the bDialog directive is applied correctly.`
      );
    }

    this.dialog.open(dialogData.template, {
      id: id,
      disableClose: true,
      restoreFocus: dialogData.config.restoreFocus,
      backdropClass: 'b-dialog-content-backdrop',
      container: DialogContent,
      data: dialogData.config,
    });
  }

  /**
   * Closes the dialog associated with the given ID.
   * Does nothing if no dialog with the specified ID is currently open.
   *
   * @param id - The unique identifier of the dialog to close.
   */
  closeDialog(id: string): void {
    const config = this.dialogs.get(id)?.config;
    if (!config) {
      console.warn(
        `[DialogService] Attempted to close dialog with id "${id}", but no open dialog with that id was found.`
      );
      return;
    }

    const dialogRef = this.dialog.getDialogById(id);

    if (dialogRef) {
      const container = dialogRef.containerInstance as any;
      if (container && container.leaving) {
        container.leaving.set(true);
      }
      this.utilsService.debounce(
        'close-dialog-' + id,
        () => {
          dialogRef.close();
          if (container && container.leaving) {
            container.leaving.set(false);
          }
        },
        config.closeDelay
      );
    } else {
      console.warn(
        `[DialogService] Attempted to close dialog with id "${id}", but no open dialog with that id was found.`
      );
    }
  }

  /**
   * Closes all currently open dialogs managed by the CDK Dialog service.
   */
  closeAllDialogs(): void {
    this.dialog.closeAll();
  }
}
