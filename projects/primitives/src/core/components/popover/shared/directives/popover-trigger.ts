import { Directive, ElementRef, inject, input, model } from '@angular/core';

/**
 * Directive that toggles a connected popover via click or hover interactions.
 */
@Directive({
  selector: '[bPopoverTrigger]',
  host: {
    '(click)': '(mode() === "click" && !disabled()) && active.set(!active())',
    '(mouseenter)': '(mode() === "hover" && !disabled()) && active.set(true)',
  },
})
export class PopoverTrigger {
  /** Reference to the trigger host element. */
  el = inject(ElementRef);

  /** Reactive open state of the associated popover. */
  readonly active = model(false);

  /** Interaction mode that determines whether the popover opens on click or hover.
   *
   * @defaultValue 'click'
   */
  readonly mode = input<'click' | 'hover'>('click');

  /** Whether clicking outside the popover should close it when managed by a parent component.
   *
   * @defaultValue true
   */
  readonly closeOnOutsideClick = input(true);

  /** Disables trigger interactions when true.
   *
   * @defaultValue false
   */
  readonly disabled = input(false);
}
