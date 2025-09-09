import { Component, ElementRef, inject, output, signal } from '@angular/core';
import { OverlayTriggerDirective } from 'projects/primitives/src/core/directives/overlay-trigger.directive';

@Component({
  selector: 'button[b-select-trigger]',
  template: `<ng-content />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-chevron-down-icon lucide-chevron-down">
      <path d="m6 9 6 6 6-6" />
    </svg> `,
  styleUrl: './select-trigger.css',
  host: {
    '(keydown.arrowUp)': 'buttonClicked.emit()',
    '(keydown.arrowDown)': 'buttonClicked.emit()',
    '(click)': 'buttonClicked.emit()',
    '[disabled]': 'disabled()',
  },
  hostDirectives: [OverlayTriggerDirective],
})
export class SelectTrigger {
  el = inject(ElementRef);
  trigger = inject(OverlayTriggerDirective);
  buttonClicked = output<void>();
  readonly disabled = signal(false);
}
