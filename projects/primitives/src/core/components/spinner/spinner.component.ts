import { Component, input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'b-spinner',
  imports: [NgStyle],
  templateUrl: './spinner.component.html',
})
export class Spinner {
  readonly active = input<boolean>(true);
  readonly color = input<string>('var(--foreground)');
  readonly backgroundColor = input<string>('transparent');
  readonly size = input<number>(20);
}
