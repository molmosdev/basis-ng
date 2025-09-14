import { Component, ViewEncapsulation } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { CdkDialogContainer } from '@angular/cdk/dialog';

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
export class DialogContent extends CdkDialogContainer {}
