import { Component, ElementRef, inject, input, signal } from '@angular/core';

@Component({
  selector: 'b-select-value',
  template: `{{ content() || placeholder() }}`,
})
export class SelectValue {
  el = inject(ElementRef);
  readonly content = signal<string>('');
  readonly placeholder = input<string>('Select an option');
}
