import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'button[b-button]',
  template: `
    <ng-content />
  `,
})
export class Button {
  el = inject(ElementRef);
}
