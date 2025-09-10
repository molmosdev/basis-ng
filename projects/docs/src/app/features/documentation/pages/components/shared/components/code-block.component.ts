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
      <code class="!bg-secondary/5 !dark:bg-secondary-dark/10 p-2 min-w-full" [highlightAuto]="code()"></code>
      <button
      b-button
      size="md"
      class="absolute top-2 right-2"
      variant="ghost"
      [squared]="true">
        <ng-icon name="lucideCopy" size="18" color="currentColor" />
      </button>
    </pre>
  `,
  providers: [provideIcons({ lucideCopy })],
})
export class CodeBlockComponent {
  readonly code = input<string>('');
}
