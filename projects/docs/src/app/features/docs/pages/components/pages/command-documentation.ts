import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { CommandComponent } from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';

@Component({
  selector: 'article[app-command-documentation]',
  imports: [CodeBlock, CommandComponent, StepsButtons],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Combobox', path: '/docs/components/combobox' }"
      [next]="{ label: 'Dialog', path: '/docs/components/dialog' }" />
    <h1 class="font-bold text-2xl">Command</h1>
    <div class="flex flex-col gap-4">
      <span>Command is a custom command palette component.</span>
      <code-block [code]="angularImport" />
      <span
        >Include this to apply predefined styles. The component is headless
        without it.</span
      >
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Property
              </th>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                maxHeight
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                string
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic Usage</h2>
      <span>
        Use <strong>Arrow Up</strong> and <strong>Arrow Down</strong> keys to
        navigate between options, and press <strong>Enter</strong> to select an
        option. The input remains focused, making it ideal for building CDK
        components or autocomplete dropdowns.
      </span>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-command [style.max-width.px]="350" [maxHeight]="'200px'">
          <ul b-command-options>
            <li b-option value="option1">Option 1</li>
            <li b-option value="option2">Option 2</li>
            <li b-option value="option3">Option 3</li>
            <li b-option value="option4">Option 4</li>
            <li b-option value="option5">Option 5</li>
            <li b-option value="option6">Option 6</li>
          </ul>
        </b-command>
      </div>
      <h2 class="font-semibold text-xl">Options Example</h2>
      <code-block [code]="optionsExample" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-command [style.max-width.px]="350" [maxHeight]="'200px'">
          <ul b-command-options>
            <li b-option value="option1">Option 1</li>
            <li b-option value="option2">Option 2</li>
            <li b-option value="option3">Option 3</li>
          </ul>
        </b-command>
      </div>
      <!-- Aquí irían los ejemplos adicionales y el playground -->
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Combobox', path: '/docs/components/combobox' }"
      [next]="{ label: 'Dialog', path: '/docs/components/dialog' }" />
  `,
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class CommandDocumentation {
  angularImport = `import { CommandComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/command';`;
  basicUsage = `<b-command [style.max-width.px]='350' [maxHeight]='200px'>\n  <ul b-command-options>\n    <li b-option value='option1'>Option 1</li>\n    <li b-option value='option2'>Option 2</li>\n    <li b-option value='option3'>Option 3</li>\n    <li b-option value='option4'>Option 4</li>\n    <li b-option value='option5'>Option 5</li>\n    <li b-option value='option6'>Option 6</li>\n  </ul>\n</b-command>`;
  optionsExample = `<b-command [style.max-width.px]='350' [maxHeight]='200px'>\n  <ul b-command-options>\n    <li b-option value='option1'>Option 1</li>\n    <li b-option value='option2'>Option 2</li>\n    <li b-option value='option3'>Option 3</li>\n  </ul>\n</b-command>`;

  onOptionSelected(event: any) {
    const option = event?.detail ?? event;
    console.log('Selected option:', option);
  }
}
