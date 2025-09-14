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
 * Structural directive that registers a dialog template and manages its open/close lifecycle via the DialogService.
 *
 * @public
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
   * Unique identifier of the dialog used for registration and lookup.
   *
   * @readonly
   */
  readonly id = input.required<string>({ alias: 'bDialog' });

  /**
   * Indicates whether a backdrop is displayed behind the dialog.
   *
   * @defaultValue true
   * @readonly
   */
  readonly hasBackdrop = input<boolean>(true);

  /**
   * Determines if a click on the backdrop should close the dialog.
   *
   * @defaultValue true
   * @readonly
   */
  readonly closeOnBackdropClick = input<boolean>(true);

  /**
   * Determines if pressing the Escape key should close the dialog.
   *
   * @defaultValue true
   * @readonly
   */
  readonly closeOnEscapeKey = input<boolean>(true);

  /**
   * Indicates whether focus returns to the previously focused element after the dialog closes.
   *
   * @defaultValue true
   * @readonly
   */
  readonly restoreFocus = input<boolean>(true);

  /**
   * Delay in milliseconds applied before the dialog fully closes (useful for exit animations).
   *
   * @defaultValue 150
   * @readonly
   */
  readonly closeDelay = input<number>(150);

  /**
   * Computed dialog data including the template and current configuration flags.
   *
   * @readonly
   */
  readonly data = computed<DialogData>(() => ({
    template: this.templateRef,
    config: {
      hasBackdrop: this.hasBackdrop(),
      restoreFocus: this.restoreFocus(),
      closeDelay: this.closeDelay(),
      closeOnBackdropClick: this.closeOnBackdropClick(),
      closeOnEscapeKey: this.closeOnEscapeKey(),
    },
  }));

  /**
   * Delay in milliseconds applied before the dialog opens (useful for entrance animations or sequencing).
   *
   * @defaultValue 0
   * @readonly
   */
  readonly openDelay = input<number>(0);
  /**
   * Emits when the dialog has been closed.
   *
   * @readonly
   */
  readonly closed = output<void>();
  /**
   * Reference to the dialog coordination service that manages registration,
   * opening and closing of this dialog instance.
   *
   * @private
   * @readonly
   */
  private readonly dialogService = inject(DialogService);

  /**
   * Captured structural template representing the dialog content. Provided to
   * the service through the computed `data` property so it can be rendered in
   * the appropriate overlay container.
   *
   * @private
   * @readonly
   */
  private readonly templateRef = inject(TemplateRef<any>);

  /**
   * Registers the dialog with the DialogService when the directive initializes.
   *
   * @public
   */
  ngOnInit() {
    this.dialogService.registerDialog(this.id(), this.data());
  }

  /**
   * Opens the dialog via the DialogService.
   *
   * @public
   */
  open(): void {
    this.dialogService.openDialog(this.id());
  }

  /**
   * Closes the dialog via the DialogService and emits the closed event.
   *
   * @public
   */
  close(): void {
    this.dialogService.closeDialog(this.id());
    this.closed.emit();
  }

  /**
   * Removes the dialog registration from the DialogService on destruction.
   *
   * @public
   */
  ngOnDestroy(): void {
    this.dialogService.removeDialog(this.id());
  }
}
