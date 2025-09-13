import { Directive, output } from '@angular/core';

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
   * Emits when the tooltip should become active/visible (mouseover or focus).
   */
  activeEmitter = output<void>();

  /**
   * Emits when the tooltip should become inactive/hidden (mouseout or blur).
   */
  inactiveEmitter = output<void>();
}
