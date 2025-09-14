import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import {
  ComboboxComponent,
  CommandComponent,
  CommandOptionsComponent,
  Option,
  Badge,
  Alert,
} from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { CodeBlock } from '../shared/components/code-block';
import { StepsButtons } from '../../shared/components/steps-buttons';

@Component({
  selector: 'article[app-combobox-documentation]',
  imports: [
    CodeBlock,
    ComboboxComponent,
    CommandComponent,
    CommandOptionsComponent,
    Option,
    FormsModule,
    ReactiveFormsModule,
    StepsButtons,
    Badge,
    Alert,
  ],
  template: `
    <app-steps-buttons
      [previous]="{
        label: 'Color Picker',
        path: '/docs/components/color-picker',
      }"
      [next]="{ label: 'Dialog', path: '/docs/components/dialog' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Combobox
      <span b-badge variant="outlined" size="sm"> New </span>
    </h1>
    <div class="flex flex-col gap-4">
      <span
        >Combobox is a dropdown component with advanced features like keyboard
        navigation and accessibility.</span
      >
      <code-block [code]="angularImport" />
      <span
        >Include this to apply predefined styles. The component is headless
        without it.</span
      >
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Basic Usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-combobox [(ngModel)]="selectedOption">
          <b-command>
            <ul b-command-options>
              <li b-option value="option1">Option 1</li>
              <li b-option value="option2">Option 2</li>
              <li b-option value="option3">Option 3</li>
            </ul>
          </b-command>
        </b-combobox>
      </div>
      <h2 class="font-semibold text-xl">Reactive Forms</h2>
      <code-block [code]="reactiveFormsUsage" />
      <form
        [formGroup]="formGroup"
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-combobox formControlName="comboboxControl">
          <b-command>
            <ul b-command-options>
              <li b-option value="option1">Option 1</li>
              <li b-option value="option2">Option 2</li>
              <li b-option value="option3">Option 3</li>
            </ul>
          </b-command>
        </b-combobox>
      </form>
      <h2 class="font-semibold text-xl">Custom Max Width</h2>
      <code-block [code]="customMaxWidthUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-combobox placeholder="Select an option" maxWidth="240px">
          <b-command>
            <ul b-command-options>
              <li b-option value="option1">Option 1</li>
              <li b-option value="option2">Option 2</li>
              <li b-option value="option3">Option 3</li>
            </ul>
          </b-command>
        </b-combobox>
      </div>
      <h2 class="font-semibold text-xl">With no options message</h2>
      <code-block [code]="noOptionsMessageUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-combobox placeholder="Select an option">
          <b-command>
            <ul b-command-options noOptionsMessage="No options available">
              <!-- No options -->
            </ul>
          </b-command>
        </b-combobox>
      </div>
      <h2 class="font-semibold text-xl">Multiple Selection</h2>
      <code-block [code]="multipleUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-combobox [(ngModel)]="selectedMultiple">
          <b-command>
            <ul b-command-options [multiple]="true">
              <li b-option value="option1">Option 1</li>
              <li b-option value="option2">Option 2</li>
              <li b-option value="option3">Option 3</li>
            </ul>
          </b-command>
        </b-combobox>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{
        label: 'Color Picker',
        path: '/docs/components/color-picker',
      }"
      [next]="{ label: 'Dialog', path: '/docs/components/dialog' }" />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class ComboboxDocumentation {
  angularImport = `import { ComboboxComponent, CommandComponent, CommandOptionsComponent, OptionComponent } from '@basis-ng/primitives';`;
  stylesImport = `@import '@basis-ng/styles/combobox';\n@import '@basis-ng/styles/command';\n@import '@basis-ng/styles/command-options';\n@import '@basis-ng/styles/option';`;
  selectedOption = ['option2'];
  selectedMultiple = ['option1', 'option3'];
  formGroup = new FormGroup({
    comboboxControl: new FormControl(['option3']),
  });
  basicUsage = `<b-combobox [(ngModel)]='selectedOption'>\n  <b-command>\n    <ul b-command-options>\n      <li b-option value='option1'>Option 1</li>\n      <li b-option value='option2'>Option 2</li>\n      <li b-option value='option3'>Option 3</li>\n    </ul>\n  </b-command>\n</b-combobox>`;
  reactiveFormsUsage = `<form [formGroup]='formGroup'>\n  <b-combobox formControlName='comboboxControl'>\n    <b-command>\n      <ul b-command-options>\n        <li b-option value='option1'>Option 1</li>\n        <li b-option value='option2'>Option 2</li>\n        <li b-option value='option3'>Option 3</li>\n      </ul>\n    </b-command>\n  </b-combobox>\n</form>`;
  customMaxWidthUsage = `<b-combobox placeholder='Select an option' maxWidth='240px'>\n  <b-command>\n    <ul b-command-options>\n      <li b-option value='option1'>Option 1</li>\n      <li b-option value='option2'>Option 2</li>\n      <li b-option value='option3'>Option 3</li>\n    </ul>\n  </b-command>\n</b-combobox>`;
  noOptionsMessageUsage = `<b-combobox placeholder='Select an option'>\n  <b-command>\n    <ul b-command-options noOptionsMessage='No options available'>\n      <!-- No options -->\n    </ul>\n  </b-command>\n</b-combobox>`;
  multipleUsage = `<b-combobox [(ngModel)]='selectedMultiple'>\n  <b-command>\n    <ul b-command-options [multiple]='true'>\n      <li b-option value='option1'>Option 1</li>\n      <li b-option value='option2'>Option 2</li>\n      <li b-option value='option3'>Option 3</li>\n    </ul>\n  </b-command>\n</b-combobox>`;
}
