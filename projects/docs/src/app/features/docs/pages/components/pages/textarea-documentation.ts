import { Component } from '@angular/core';
import { TextareaComponent, Alert } from 'primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { CodeBlock } from '../shared/components/code-block';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { StepsButtons } from '../../shared/components/steps-buttons';

@Component({
  selector: 'article[app-textarea-documentation]',
  imports: [
    CodeBlock,
    TextareaComponent,
    FormsModule,
    ReactiveFormsModule,
    StepsButtons,
    Alert,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Tabs', path: '/docs/components/tabs' }"
      [next]="{ label: 'Tooltip', path: '/docs/components/tooltip' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Textarea</h1>
    <div class="flex flex-col gap-4">
      <span>
        Textarea is a custom textarea component with additional features.
      </span>
      <code-block [code]="angularImport" />
      <span>
        Include this to apply predefined styles. The component is headless
        without it.
      </span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-700 dark:bg-neutral-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Prop
              </th>
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                size
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                'sm' | 'md' | 'lg'
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <textarea b-textarea placeholder="Enter text"></textarea>
      </div>
      <h2 class="font-semibold text-xl">Size Variants</h2>
      <code-block [code]="sizeUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <textarea b-textarea size="sm" placeholder="Small"></textarea>
        <textarea b-textarea size="md" placeholder="Medium"></textarea>
        <textarea b-textarea size="lg" placeholder="Large"></textarea>
      </div>
      <h2 class="font-semibold text-xl">Invalid Textarea</h2>
      <code-block [code]="invalidUsage" />
      <form
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4"
        [formGroup]="form">
        <textarea
          b-textarea
          placeholder="Invalid textarea"
          formControlName="invalidControl"></textarea>
      </form>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Tabs', path: '/docs/components/tabs' }"
      [next]="{ label: 'Tooltip', path: '/docs/components/tooltip' }" />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class TextareaDocumentation {
  angularImport = `import { TextareaComponent } from 'primitives'`;
  stylesImport = `@import '@basis-ng/styles/textarea';`;
  basicUsage = `<textarea b-textarea placeholder="Enter text"></textarea>`;
  sizeUsage = `<textarea b-textarea size="sm" placeholder="Small"></textarea>\n<textarea b-textarea size="md" placeholder="Medium"></textarea>\n<textarea b-textarea size="lg" placeholder="Large"></textarea>`;
  invalidUsage = `<form [formGroup]="form">
  <textarea b-textarea placeholder="Invalid textarea" formControlName="invalidControl"></textarea>
</form>`;
  form = new FormGroup({
    invalidControl: new FormControl('', {
      validators: () => ({ invalid: true }),
    }),
  });
}
