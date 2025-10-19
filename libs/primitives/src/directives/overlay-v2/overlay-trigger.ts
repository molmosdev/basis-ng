import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, signal } from '@angular/core';

/**
 * Directive that marks an element as an overlay trigger and toggles its active state on click.
 */
@Directive({
  selector: '[bOverlayTrigger]',
  exportAs: 'bOverlayTrigger',
  hostDirectives: [CdkOverlayOrigin],
})
export class OverlayTrigger extends CdkOverlayOrigin {
  /**
   * Signal that holds whether the overlay trigger is active.
   *
   * @defaultValue false
   */
  active = signal(false);
}
