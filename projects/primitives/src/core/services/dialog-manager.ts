import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable, TemplateRef } from '@angular/core';
import { DialogContent } from '../components/dialog/dialog-content';
import { Utils } from '../../shared/services/utils';

/**
 * Represents the template and configuration registered for a dialog instance.
 */
export interface DialogData {
  /** Template reference rendered inside the dialog. */
  template: TemplateRef<any>;
  /** Configuration applied when opening the dialog. */
  config: DialogConfig;
}

/**
 * Configuration options that control dialog behavior and interaction.
 */
export interface DialogConfig {
  /** Whether a backdrop is displayed behind the dialog. */
  hasBackdrop: boolean;
  /** Whether focus is restored to the previously focused element after close. */
  restoreFocus: boolean;
  /** Delay in milliseconds before the dialog finishes closing. */
  closeDelay: number;
  /** Whether clicking the backdrop should request dialog closure. */
  closeOnBackdropClick: boolean;
  /** Whether pressing the Escape key should request dialog closure. */
  closeOnEscapeKey: boolean;
}

/**
 * Provides registration and lifecycle control for application dialogs.
 */
@Injectable({
  providedIn: 'root',
})
export class DialogManager {
  /** Angular CDK dialog service used to manage overlay instances. */
  private readonly dialog = inject(Dialog);

  /** Utility service used for debounced close behavior. */
  private readonly utils = inject(Utils);

  /** Registry mapping dialog identifiers to their data. */
  private readonly dialogs = new Map<string, DialogData>();

  /**
   * Registers a dialog definition under a unique identifier, overwriting any existing entry.
   *
   * @param id - Unique identifier for the dialog.
   * @param data - Template and configuration to register.
   */
  registerDialog(id: string, data: DialogData): void {
    if (this.dialogs.has(id)) {
      console.warn(
        `[DialogManager] Dialog with id "${id}" is already registered. Overwriting.`
      );
    }
    this.dialogs.set(id, data);
  }

  /**
   * Removes a previously registered dialog definition.
   *
   * @param id - Identifier of the dialog to remove.
   */
  removeDialog(id: string): void {
    this.dialogs.delete(id);
  }

  /**
   * Opens a dialog using its registered template and configuration.
   *
   * @param id - Identifier of the dialog to open.
   * @throws Error - When no dialog is registered with the provided identifier.
   */
  openDialog(id: string): void {
    const dialogData = this.dialogs.get(id);
    if (!dialogData) {
      throw new Error(
        `[DialogManager] Dialog with id "${id}" not found. Ensure the bDialog directive is applied correctly.`
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
   * Closes a dialog by identifier applying any configured close delay.
   *
   * @param id - Identifier of the dialog to close.
   */
  closeDialog(id: string): void {
    const config = this.dialogs.get(id)?.config;
    if (!config) {
      console.warn(
        `[DialogManager] Attempted to close dialog with id "${id}", but no open dialog with that id was found.`
      );
      return;
    }
    const dialogRef = this.dialog.getDialogById(id);
    if (dialogRef) {
      const container = dialogRef.containerInstance as any;
      if (container && container.leaving) {
        container.leaving.set(true);
      }
      this.utils.debounce(
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
        `[DialogManager] Attempted to close dialog with id "${id}", but no open dialog with that id was found.`
      );
    }
  }

  /**
   * Closes all currently open dialogs immediately.
   */
  closeAllDialogs(): void {
    this.dialog.closeAll();
  }
}
