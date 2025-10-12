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
  activeEmitter = output<void>();
  inactiveEmitter = output<void>();
}
