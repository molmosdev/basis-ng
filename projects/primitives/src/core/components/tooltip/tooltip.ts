import {
  AfterContentInit,
  Component,
  contentChild,
  input,
} from '@angular/core';
import { TooltipTrigger } from './shared/directives/tooltip-trigger';
import { TooltipContent } from './shared/components/tooltip-content';
import { ConnectedOverlay } from '../../directives/connected-overlay';

/**
 * Defines the available visual variants for the tooltip component.
 * @public
 */
type TooltipVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outlined'
  | 'destructive';

/**
 * Defines the available sizes for the tooltip component.
 * @public
 */
type TooltipSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'b-tooltip',
  template: `<ng-content />`,
  host: {
    '[class.b-tooltip-size-sm]': 'size() === "sm"',
    '[class.b-tooltip-size-md]': 'size() === "md"',
    '[class.b-tooltip-size-lg]': 'size() === "lg"',
    '[class.b-tooltip-variant-primary]': 'variant() === "primary"',
    '[class.b-tooltip-variant-secondary]': 'variant() === "secondary"',
    '[class.b-tooltip-variant-ghost]': 'variant() === "ghost"',
    '[class.b-tooltip-variant-outlined]': 'variant() === "outlined"',
    '[class.b-tooltip-variant-destructive]': 'variant() === "destructive"',
  },
})
export class Tooltip implements AfterContentInit {
  /**
   * Reference to the overlay directive instance.
   * Used to control the dropdown overlay for the select component.
   *
   * @readonly
   */
  readonly overlay = contentChild(ConnectedOverlay);

  /**
   * Reference to the tooltip trigger directive.
   * Used to handle trigger events (click, keydown) for opening/closing the tooltip.
   *
   * @readonly
   */
  readonly tooltipTrigger = contentChild(TooltipTrigger);

  /**
   * Reference to the tooltip content component.
   * Used to manage the content of the tooltip.
   *
   * @readonly
   */
  readonly tooltipContent = contentChild(TooltipContent);

  /**
   * Input signal to set the size of the tooltip.
   * Can be 'sm', 'md', or 'lg'. Default is 'md'.
   *
   * @readonly
   * @defaultValue 'md'
   */
  readonly size = input<TooltipSize>('md');

  /**
   * Input signal to set the visual variant of the tooltip.
   * Can be 'primary', 'secondary', 'ghost', 'outlined', or 'destructive'.
   * Default is 'primary'.
   *
   * @readonly
   * @defaultValue 'primary'
   */
  readonly variant = input<TooltipVariant>('primary');
  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Sets up mouse event handling for the tooltip trigger.
   */
  ngAfterContentInit(): void {
    this.handleTooltipEvents();
    this.handlePanelClasses();
  }

  /**
   * Sets up subscriptions to mouse events from the tooltip trigger.
   * Logs messages to the console on mouse over and mouse out events.
   *
   * @private
   */
  private handleTooltipEvents(): void {
    this.tooltipTrigger()?.activeEmitter.subscribe(() => {
      this.overlay()?.openOverlay();
    });

    this.tooltipTrigger()?.inactiveEmitter.subscribe(() => {
      this.overlay()?.closeOverlay();
    });
  }

  /**
   * Sets the panel size class on the overlay based on the tooltip size input.
   */
  handlePanelClasses(): void {
    this.overlay()!.cdkConnectedOverlay.panelClass = [
      `b-tooltip-size-${this.size()}`,
      `b-tooltip-variant-${this.variant()}`,
    ];
  }
}
