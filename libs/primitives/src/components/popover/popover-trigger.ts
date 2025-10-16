import { Directive, ElementRef, inject, input, model } from '@angular/core';

/**
 * Directive to mark an element as the trigger for a popover.
 */
@Directive({
  selector: '[bPopoverTrigger]',
  host: {
    '(click)': '(mode() === "click" && !disabled()) && active.set(!active())',
    '(mouseenter)': '(mode() === "hover" && !disabled()) && active.set(true)',
  },
})
export class PopoverTrigger {
  /**
   * Host element reference.
   */
  el = inject(ElementRef);

  /**
   * Whether the trigger is active.
   */
  readonly active = model(false);

  /**
   * Trigger mode: click or hover.
   */
  readonly mode = input<'click' | 'hover'>('click');

  /**
   * Whether clicking outside should close the popover.
   */
  readonly closeOnOutsideClick = input(true);

  /**
   * Disabled state for the trigger.
   */
  readonly disabled = model(false);
}
