import {
  InputGroupComponent,
  InputComponent,
  Button,
  Badge,
  Alert,
} from '@basis-ng/primitives';
import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';

@Component({
  selector: 'article[app-input-group-documentation]',
  imports: [
    CodeBlock,
    InputGroupComponent,
    InputComponent,
    Button,
    StepsButtons,
    Badge,
    Alert,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Input', path: '/docs/components/input' }"
      [next]="{ label: 'Menu', path: '/docs/components/menu' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Input Group
      <span b-badge variant="outlined" size="sm"> New </span>
    </h1>
    <div class="flex flex-col gap-4">
      <span>Input Group allows you to group one or more <code>b-input</code> elements together with additional elements such as text or buttons, before or after the input.</span>
      <code-block [code]="angularImport" />
      <span>Include this to apply the styles</span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">Property</th>
              <th class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">maxWidth</td>
              <td class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">string</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">With prepended text</h2>
      <code-block [code]="prependTextUsage" />
      <div class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-input-group maxWidth="240px">
          <span>@</span>
          <input b-input type="text" placeholder="username" />
        </b-input-group>
      </div>
      <h2 class="font-semibold text-xl">With appended text</h2>
      <code-block [code]="appendTextUsage" />
      <div class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-input-group maxWidth="240px">
          <input b-input type="text" placeholder="Amount" />
          <span>USD</span>
        </b-input-group>
      </div>
      <h2 class="font-semibold text-xl">With prepended button</h2>
      <code-block [code]="prependButtonUsage" />
      <div class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-input-group maxWidth="240px">
          <button b-button variant="primary" size="sm">Search</button>
          <input b-input type="text" placeholder="Search..." />
        </b-input-group>
      </div>
      <h2 class="font-semibold text-xl">With appended button</h2>
      <code-block [code]="appendButtonUsage" />
      <div class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-input-group maxWidth="240px">
          <input b-input type="email" placeholder="Email address" />
          <button b-button variant="primary" size="sm">Send</button>
        </b-input-group>
      </div>
      <h2 class="font-semibold text-xl">Combining elements</h2>
      <code-block [code]="combinedUsage" />
      <div class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-input-group maxWidth="240px">
          <span>+52</span>
          <input b-input type="number" placeholder="Phone" />
          <button b-button variant="primary" size="sm">Verify</button>
        </b-input-group>
      </div>
      <h2 class="font-semibold text-xl">Password input with show/hide button</h2>
      <code-block [code]="passwordToggleUsage" />
      <div class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-input-group maxWidth="240px">
          <input b-input [type]="showPassword ? 'text' : 'password'" placeholder="Password" type="password" />
          <button b-button variant="ghost" size="sm" type="button" [squared]="true" (click)="showPassword = !showPassword" [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
            <!-- <i b-icon [icon]="showPassword ? 'EyeOff' : 'Eye'" [size]="15"></i> -->
          </button>
        </b-input-group>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Input', path: '/docs/components/input' }"
      [next]="{ label: 'Menu', path: '/docs/components/menu' }" />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class InputGroupDocumentation {
  angularImport = `import { InputGroupComponent, InputComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/input-group';`;
  prependTextUsage = `<b-input-group maxWidth="240px">\n  <span>@</span>\n  <input b-input type="text" placeholder="username" />\n</b-input-group>`;
  appendTextUsage = `<b-input-group maxWidth="240px">\n  <input b-input type="text" placeholder="Amount" />\n  <span>USD</span>\n</b-input-group>`;
  prependButtonUsage = `<b-input-group maxWidth="240px">\n  <button b-button variant="primary" size="sm">Search</button>\n  <input b-input type="text" placeholder="Search..." />\n</b-input-group>`;
  appendButtonUsage = `<b-input-group maxWidth="240px">\n  <input b-input type="email" placeholder="Email address" />\n  <button b-button variant="primary" size="sm">Send</button>\n</b-input-group>`;
  combinedUsage = `<b-input-group maxWidth="240px">\n  <span>+52</span>\n  <input b-input type="number" placeholder="Phone" />\n  <button b-button variant="primary" size="sm">Verify</button>\n</b-input-group>`;
  showPassword = false;
  passwordToggleUsage = `<b-input-group maxWidth="240px">\n  <input\n    b-input\n    [type]="showPassword ? 'text' : 'password'"\n    placeholder="Password"\n    type="password"/>\n  <button\n    b-button\n    variant="ghost"\n    size="sm"\n    type="button"\n    [squared]="true"\n    (click)="showPassword = !showPassword"\n    [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">\n    <!-- <i b-icon [icon]="showPassword ? 'EyeOff' : 'Eye'" [size]="15"></i> -->\n  </button>\n</b-input-group>`;
}
