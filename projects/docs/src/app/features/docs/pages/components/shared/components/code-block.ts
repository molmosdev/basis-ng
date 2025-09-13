import { Component, input } from '@angular/core';
import { Button } from '@basis-ng/primitives';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideCopy } from '@ng-icons/lucide';
import { HighlightAuto } from 'ngx-highlightjs';

@Component({
  selector: 'code-block',
  imports: [HighlightAuto, Button, NgIcon],
  template: `
    <pre
      class="flex relative rounded-lg overflow-auto inset-ring-1 inset-ring-secondary dark:inset-ring-secondary-dark">
      @if (highlight()) {
        <code class="text-sm !bg-neutral-900 !dark:bg-neutral-900 p-2 min-w-full no-scrollbar" [highlightAuto]="code()"></code>
      } @else {
        <code class="text-sm bg-neutral-900 dark:bg-neutral-900 text-white/90 p-3.5 min-w-full no-scrollbar">{{ code() }}</code>
      }
      <button
      b-button
      size="sm"
      class="absolute top-2 right-2"
      variant="ghost"
      [squared]="true">
        <ng-icon name="lucideCopy" size="14" color="currentColor" />
      </button>
    </pre>
  `,
  providers: [provideIcons({ lucideCopy })],
})
export class CodeBlock {
  readonly code = input<string>('');
  readonly highlight = input<boolean>(true);
}
