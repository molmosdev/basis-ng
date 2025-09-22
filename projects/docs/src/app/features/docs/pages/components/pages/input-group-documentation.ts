import { InputGroup, Input, Button, Badge, Alert } from '@basis-ng/primitives';
import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideEye, lucideEyeOff, lucideRocket } from '@ng-icons/lucide';

@Component({
  selector: 'article[app-input-group-documentation]',
  imports: [
    CodeBlock,
    InputGroup,
    Input,
    Button,
    StepsButtons,
    Badge,
    Alert,
    NgIcon,
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
      <span b-badge variant="secondary" size="sm"> New </span>
    </h1>
    <div class="flex flex-col gap-4">
      <span>Input Group allows you to group one or more <code>b-input</code> elements together with additional elements such as text or buttons, before or after the input.</span>
      <code-block [code]="angularImport" />
      <span>Include this to apply the styles</span>
      <code-block [code]="stylesImport" />
      
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-input-group>
          <span>@</span>
          <input b-input type="text" size="sm" placeholder="username (sm)" />
        </b-input-group>
        <b-input-group>
          <input b-input type="text" size="md" placeholder="Amount (md)" />
          <span>USD</span>
        </b-input-group>
        <b-input-group>
          <button b-button variant="secondary" size="md">Search</button>
          <input b-input type="text" size="lg" placeholder="Search... (lg)" />
        </b-input-group>
      </div>
      <h2 class="font-semibold text-xl">With prepended text</h2>
      <code-block [code]="prependTextUsage" />
      <div class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-input-group>
          <span>@</span>
          <input b-input type="text" placeholder="username" />
        </b-input-group>
      </div>
      <h2 class="font-semibold text-xl">With appended text</h2>
      <code-block [code]="appendTextUsage" />
      <div class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-input-group>
          <input b-input type="text" placeholder="Amount" />
          <span>USD</span>
        </b-input-group>
      </div>
      <h2 class="font-semibold text-xl">With prepended button</h2>
      <code-block [code]="prependButtonUsage" />
      <div class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-input-group>
          <button b-button variant="primary" size="sm">Search</button>
          <input b-input type="text" placeholder="Search..." />
        </b-input-group>
      </div>
      <h2 class="font-semibold text-xl">With appended button</h2>
      <code-block [code]="appendButtonUsage" />
      <div class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-input-group>
          <input b-input type="email" placeholder="Email address" />
          <button b-button variant="primary" size="sm">Send</button>
        </b-input-group>
      </div>
      <h2 class="font-semibold text-xl">Combining elements</h2>
      <code-block [code]="combinedUsage" />
      <div class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-input-group>
          <span>+52</span>
          <input b-input type="number" placeholder="Phone" />
          <button b-button variant="primary" size="sm">Verify</button>
        </b-input-group>
      </div>
      <h2 class="font-semibold text-xl">Password input with show/hide button</h2>
      <code-block [code]="passwordToggleUsage" />
      <div class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-input-group>
          <input b-input [type]="showPassword ? 'text' : 'password'" placeholder="Password" type="password" />
          <button b-button variant="ghost" size="sm" type="button" [squared]="true" (click)="showPassword = !showPassword" [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
            <ng-icon [name]="showPassword ? 'lucideEyeOff' : 'lucideEye'" size="15" color="currentColor" />
          </button>
        </b-input-group>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Input', path: '/docs/components/input' }"
      [next]="{ label: 'Menu', path: '/docs/components/menu' }" />
  `,
  providers: [provideIcons({ lucideRocket, lucideEyeOff, lucideEye })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class InputGroupDocumentation {
  angularImport = `import { InputGroup, Input } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/input-group';`;
  sizesUsage = `<b-input-group>\n  <span>@</span>\n  <input b-input type="text" size="sm" placeholder="username (sm)" />\n</b-input-group>\n<b-input-group>\n  <input b-input type="text" size="md" placeholder="Amount (md)" />\n  <span>USD</span>\n</b-input-group>\n<b-input-group>\n  <button b-button variant="secondary" size="md">Search</button>\n  <input b-input type="text" size="lg" placeholder="Search... (lg)" />\n</b-input-group>`;
  prependTextUsage = `<b-input-group>\n  <span>@</span>\n  <input b-input type="text" placeholder="username" />\n</b-input-group>`;
  appendTextUsage = `<b-input-group>\n  <input b-input type="text" placeholder="Amount" />\n  <span>USD</span>\n</b-input-group>`;
  prependButtonUsage = `<b-input-group>\n  <button b-button variant="primary" size="sm">Search</button>\n  <input b-input type="text" placeholder="Search..." />\n</b-input-group>`;
  appendButtonUsage = `<b-input-group>\n  <input b-input type="email" placeholder="Email address" />\n  <button b-button variant="primary" size="sm">Send</button>\n</b-input-group>`;
  combinedUsage = `<b-input-group>\n  <span>+52</span>\n  <input b-input type="number" placeholder="Phone" />\n  <button b-button variant="primary" size="sm">Verify</button>\n</b-input-group>`;
  showPassword = false;
  passwordToggleUsage = `<b-input-group>\n  <input\n    b-input\n    [type]="showPassword ? 'text' : 'password'"\n    placeholder="Password"\n    type="password"/>\n  <button\n    b-button\n    variant="ghost"\n    size="sm"\n    type="button"\n    [squared]="true"\n    (click)="showPassword = !showPassword"\n    [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">\n    <!-- <i b-icon [icon]="showPassword ? 'EyeOff' : 'Eye'" [size]="15"></i> -->\n  </button>\n</b-input-group>`;
}
