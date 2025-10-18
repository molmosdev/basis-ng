import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Alert, Checkbox } from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-checkbox-documentation]',
  imports: [CodeBlock, Checkbox, FormsModule, ReactiveFormsModule, StepsButtons, Alert],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Card', path: '/docs/components/card' }"
      [next]="{
        label: 'Dialog',
        path: '/docs/components/dialog',
      }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Checkbox</h1>
    <div class="flex flex-col gap-4">
      <span>Checkbox is a custom toggle component.</span>
      <code-block [code]="angularImport" />
      <span>Include this to apply predefined styles. The component is headless without it.</span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Basic</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-checkbox [(ngModel)]="basicValue" (valueChange)="onValueChange($event)"></button>
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-checkbox class="b-size-sm"></button>
        <button b-checkbox class="b-size-md"></button>
        <button b-checkbox class="b-size-lg"></button>
      </div>
      <h2 class="font-semibold text-xl">Angular Forms with formControlName</h2>
      <code-block [code]="formControlUsage" />
      <form [formGroup]="form">
        <div
          class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
        >
          <button b-checkbox formControlName="checkboxControl"></button>
        </div>
      </form>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Card', path: '/docs/components/card' }"
      [next]="{
        label: 'Dialog',
        path: '/docs/components/dialog',
      }"
    />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class CheckboxDocumentation {
  angularImport = `import { Checkbox } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/checkbox';`;
  basicUsage = `<button b-checkbox [(ngModel)]="basicValue" (valueChange)="onValueChange($event)"></button>`;
  sizesUsage = `<button b-checkbox class="b-size-sm"></button>\n<button b-checkbox class="b-size-md"></button>\n<button b-checkbox class="b-size-lg"></button>`;
  formControlUsage = `<button b-checkbox formControlName="checkboxControl"></button>`;

  basicValue = false;
  form = new FormGroup({
    checkboxControl: new FormControl(false),
  });

  onValueChange(value: boolean) {
    console.log('Checkbox value changed:', value);
  }
}
