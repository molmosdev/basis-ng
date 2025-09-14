import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable, TemplateRef } from '@angular/core';
import { DialogContent } from '../components/dialog/dialog-content';
import { UtilsService } from '../../shared/services/utils.service';

/** Provides dialog template reference and runtime configuration.
 *
 * @public
 */
export interface DialogData {
  /** Template to render inside the dialog. */
  template: TemplateRef<any>;
  /** Configuration controlling dialog behavior. */
  config: DialogConfig;
}

/** Describes configurable dialog behavior flags and timings.
 *
 * @public
 */
export interface DialogConfig {
  /** Whether a backdrop is displayed behind the dialog. */
  hasBackdrop: boolean;
  /** Whether focus returns to the previously focused element on close. */
  restoreFocus: boolean;
  /** Delay in milliseconds before the dialog closes after requesting close. */
  closeDelay: number;
  /** Whether clicking on the backdrop triggers dialog close. */
  closeOnBackdropClick: boolean;
  /** Whether pressing the Escape key triggers dialog close. */
  closeOnEscapeKey: boolean;
}

/** Central registry and controller for application dialogs. Manages registration, opening and closing instances.
 *
 * @public
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  /** Reference to Angular CDK dialog service. */
  private readonly dialog = inject(Dialog);
  /** Utility service used for debounced close actions. */
  utilsService = inject(UtilsService);
  /** Internal map of dialog identifiers to their data. */
  private readonly dialogs = new Map<string, DialogData>();

  /** Registers or replaces a dialog definition.
   * @param id - Unique dialog identifier.
   * @param data - Dialog data including template and configuration.
   * @public
   */
  registerDialog(id: string, data: DialogData): void {
    if (this.dialogs.has(id)) {
      console.warn(
        `[DialogService] Dialog with id "${id}" is already registered. Overwriting.`
      );
    }
    this.dialogs.set(id, data);
  }

  /** Removes a dialog definition from the registry.
   * @param id - Unique dialog identifier to remove.
   * @public
   */
  removeDialog(id: string): void {
    this.dialogs.delete(id);
  }

  /** Opens a registered dialog by id.
   * @param id - Unique dialog identifier to open.
   * @throws Error When the id is not registered.
   * @public
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

  /** Closes a specific dialog instance using its id.
   * @param id - Unique dialog identifier to close.
   * @public
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

  /** Closes all currently open dialogs.
   * @public
   */
  closeAllDialogs(): void {
    this.dialog.closeAll();
  }
}
