import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, ElementRef, inject, signal } from '@angular/core';

/**
 * Directive that marks an element as an overlay trigger and toggles its active state on click.
 */
@Directive({
  selector: '[bOverlayTrigger]',
  hostDirectives: [CdkOverlayOrigin],
  exportAs: 'bOverlayTrigger',
})
export class OverlayTrigger extends CdkOverlayOrigin {
  /**
   * Signal that holds whether the overlay trigger is active.
   *
   * @defaultValue false
   */
  active = signal(false);

  /**
   * Reference to the `ElementRef` of the host element.
   * This is used to access the native DOM element.
   */
  el = inject(ElementRef);
}
