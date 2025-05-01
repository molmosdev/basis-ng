import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Directive to mark an element as a trigger for an overlay.
 * Integrates with Angular CDK's `CdkOverlayOrigin` to provide
 * a reference point for overlay positioning.
 */
@Directive({
  selector: '[bOverlayTrigger]',
  hostDirectives: [CdkOverlayOrigin],
  exportAs: 'bOverlayTrigger',
})
export class OverlayTriggerDirective {
  /**
   * Reference to the `CdkOverlayOrigin` instance.
   * Used as the origin point for overlay positioning.
   */
  trigger = inject(CdkOverlayOrigin);

  /**
   * Reference to the `ElementRef` of the host element.
   * This is used to access the native DOM element.
   */
  el = inject(ElementRef);
}
