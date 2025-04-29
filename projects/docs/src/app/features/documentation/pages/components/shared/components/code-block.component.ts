import { Component, input } from '@angular/core';
import { HighlightAuto } from 'ngx-highlightjs';

@Component({
  selector: 'code-block',
  imports: [HighlightAuto],
  template: `<pre><code [highlightAuto]="code()"></code></pre>`,
  styles: `
    :host {
      font-size: 90%;
      scrollbar-width: thin;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background-color: color-mix(
        in srgb,
        var(--bg-color),
        var(--text-color) 1%
      );
      margin: 0;
      overflow-x: auto;
      max-width: 100%;
      scrollbar-width: thin;
      scrollbar-color: var(--border-color, transparent) var(--bg-color, #ffffff);

      pre {
        margin: 0;
      }
    }
  `,
})
export class CodeBlockComponent {
  readonly code = input<string>('');
}
