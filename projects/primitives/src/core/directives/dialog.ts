// dialog.directive.ts
import {
  computed,
  Directive,
  inject,
  input,
  OnDestroy,
  OnInit,
  TemplateRef,
  output,
} from '@angular/core';
import { DialogData, DialogService } from '../services/dialog.service';

/**
 * Directive used to register an `ng-template` as a dialog with the `DialogService`.
 * Apply this directive to an `<ng-template>` element, providing a unique ID.
 * The service can then open this template as a dialog by referencing the ID.
 *
 * @example
 * ```html
 * <ng-template bDialog="myModalId" [hasBackdrop]="false">
 * <h2>My Modal Content</h2>
 * <p>This is the content of the dialog.</p>
 * <button (click)="dialogService.closeDialog('myModalId')">Close</button>
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[bDialog]',
  exportAs: 'bDialog',
  host: {
    '(keydown.escape)': 'closeOnEscapeKey() ? close() : null',
  },
})
export class Dialog implements OnInit, OnDestroy {
  /**
   * The unique identifier for this dialog template. Used by the `DialogService` to open this specific dialog.
   * Applied as the value of the `bDialog` attribute.
   */
  readonly id = input.required<string>({ alias: 'bDialog' });

  /**
   * Determines whether the dialog should have a backdrop. Defaults to `true`.
   */
  readonly hasBackdrop = input<boolean>(true);

  /**
   * Determines whether the dialog should close when the backdrop is clicked. Defaults to `true`.
   */
  readonly closeOnBackdropClick = input<boolean>(true);

  /**
   * Determines whether the dialog should close when the escape key is pressed. Defaults to `true`.
   */
  readonly closeOnEscapeKey = input<boolean>(true);

  /**
   * Determines whether the dialog should close when the escape key is pressed or when a pointer event occurs outside the dialog.
   * Defaults to `false`.
   */
  readonly restoreFocus = input<boolean>(true);

  /**
   * Computed signal that combines the template reference and configuration inputs
   * into the `DialogData` structure expected by the `DialogService`.
   */
  readonly data = computed<DialogData>(() => ({
    template: this.templateRef,
    config: {
      hasBackdrop: this.hasBackdrop(),
      openDelay: this.openDelay(),
      closeDelay: this.closeDelay(),
      restoreFocus: this.restoreFocus(),
      closeOnBackdropClick: this.closeOnBackdropClick(),
      closeOnEscapeKey: this.closeOnEscapeKey(),
    },
  }));

  /**
   * Delay in milliseconds before the dialog opens. Defaults to `0`.
   */
  readonly openDelay = input<number>(0);

  /**
   * Delay in milliseconds before the dialog closes. Defaults to `150`.
   */
  readonly closeDelay = input<number>(150);

  /**
   * Emits when the dialog is closed.
   */
  readonly closed = output<void>();

  /**
   * Injected instance of the `DialogService`.
   * @internal
   */
  private readonly dialogService = inject(DialogService);

  /**
   * Injected reference to the `ng-template` element this directive is applied to.
   * @internal
   */
  private readonly templateRef = inject(TemplateRef<any>); // Specify type as any or a specific context type

  /**
   * Lifecycle hook called after Angular has initialized all data-bound properties of a directive.
   * Registers the dialog template and its configuration with the `DialogService`.
   */
  ngOnInit() {
    this.dialogService.addDialog(this.id(), this.data());
  }

  /**
   * Opens the dialog using the `DialogService`.
   * This method can be called to programmatically open the dialog.
   */
  open() {
    this.dialogService.openDialog(this.id());
  }

  /**
   * Closes the dialog using the `DialogService`.
   * This method can be called to programmatically close the dialog.
   */
  close() {
    this.dialogService.closeDialog(this.id(), 'closeButton');
    this.closed.emit();
  }

  /**
   * Lifecycle hook called once, before the directive is destroyed.
   * Removes the dialog registration from the `DialogService`.
   */
  ngOnDestroy() {
    this.dialogService.removeDialog(this.id());
  }
}
