import { Directive, output } from '@angular/core';

/**
 * Trigger directive that emits activation events for tooltips.
 */
@Directive({
  selector: '[bTooltipTrigger]',
  host: {
    '(mouseover)': 'activeEmitter.emit()',
    '(focus)': 'activeEmitter.emit()',
    '(mouseout)': 'inactiveEmitter.emit()',
    '(blur)': 'inactiveEmitter.emit()',
  },
})
export class TooltipTrigger {
  /**
   * Emitted when the trigger becomes active (hover/focus).
   */
  activeEmitter = output<void>();

  /**
   * Emitted when the trigger becomes inactive (mouseout/blur).
   */
  inactiveEmitter = output<void>();
}
