import { Directive, OnInit } from '@angular/core';
import { Overlay } from '../../directives/overlay-v2/overlay';

/**
 * Tooltip directive that configures an overlay for displaying tooltip content.
 */
@Directive({
  selector: '[bTooltip]',
})
export class Tooltip extends Overlay implements OnInit {
  ngOnInit() {
    this.setCloseOnTypeEscapeToFalse();
  }

  /**
   * Sets the closeOnTypeEscape property to false for tooltips.
   */
  private setCloseOnTypeEscapeToFalse(): void {
    this.closeOnTypeEscape.set(false);
  }
}
