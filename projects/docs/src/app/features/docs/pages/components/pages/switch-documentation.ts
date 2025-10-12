import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { SwitchComponent, Alert } from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'article[app-switch-documentation]',
  imports: [CodeBlock, SwitchComponent, StepsButtons, FormsModule, ReactiveFormsModule, Alert],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Spinner', path: '/docs/components/spinner' }"
      [next]="{ label: 'Tabs', path: '/docs/components/tabs' }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Switch</h1>
    <div class="flex flex-col gap-4">
      <span>
        Switch is a custom toggle component with headless design and signal-based state. It supports
        keyboard navigation and emits value changes.
      </span>
      <code-block [code]="angularImport" />
      <span>Include this to apply predefined styles. The component is headless without it.</span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Basic</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-row items-center justify-center gap-8"
      >
        <input type="checkbox" b-switch class="b-size-sm" [(ngModel)]="ngModelValue" />
        <input type="checkbox" b-switch class="b-size-md" [(ngModel)]="ngModelValue" />
        <input type="checkbox" b-switch class="b-size-lg" [(ngModel)]="ngModelValue" />
      </div>
      <h2 class="font-semibold text-xl">Angular Forms with formControlName</h2>
      <code-block [code]="formControlUsage" />
      <form [formGroup]="form">
        <div
          class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-row items-center justify-center gap-8"
        >
          <input type="checkbox" b-switch class="b-size-md" formControlName="switchControl" />
        </div>
      </form>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Spinner', path: '/docs/components/spinner' }"
      [next]="{ label: 'Tabs', path: '/docs/components/tabs' }"
    />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class SwitchDocumentation {
  angularImport = `import { SwitchComponent } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/switch';`;
  sizesUsage = `<input type="checkbox" b-switch class="b-size-sm" [(ngModel)]="ngModelValue" />\n<input type="checkbox" b-switch class="b-size-md" [(ngModel)]="ngModelValue" />\n<input type="checkbox" b-switch class="b-size-lg" [(ngModel)]="ngModelValue" />`;
  formControlUsage = `<form [formGroup]="form">\n  <input type="checkbox" b-switch formControlName="switchControl" />\n</form>`;
  ngModelValue = false;
  form = new FormGroup({ switchControl: new FormControl(false) });
}
