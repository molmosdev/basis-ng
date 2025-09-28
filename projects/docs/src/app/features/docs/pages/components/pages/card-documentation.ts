import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Badge,
  Alert,
} from 'primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';

@Component({
  selector: 'article[app-card-documentation]',
  imports: [
    CodeBlock,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Button,
    Input,
    StepsButtons,
    Badge,
    Alert,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Button', path: '/docs/components/button' }"
      [next]="{ label: 'Checkbox', path: '/docs/components/checkbox' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Card
      <span b-badge variant="outlined" size="sm"> New </span>
    </h1>
    <div class="flex flex-col gap-4">
      <span>
        Card is a flexible container for grouping related content and actions.
      </span>
      <code-block [code]="angularImport" />
      <span>
        Include this to apply predefined styles. The component is headless
        without it.
      </span>
      <code-block [code]="stylesImport" />

      <h2 class="font-semibold text-xl mt-6">Basic Usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col gap-4 items-center">
        <b-card class="w-full max-w-[400px]">
          <b-card-header>
            <b-card-title>Card Title</b-card-title>
            <b-card-description>
              This is a description for the card.
            </b-card-description>
          </b-card-header>
          <b-card-content>
            Here is some content inside the card. This is a longer text to
            demonstrate how the card handles multiple lines of content. You can
            add as much information as needed, and the card will expand
            accordingly to fit the content.
          </b-card-content>
          <b-card-footer>
            <button b-button>Action</button>
          </b-card-footer>
        </b-card>
      </div>
      <h2 class="font-semibold text-xl">Card with Only Content</h2>
      <code-block [code]="contentOnlyUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col gap-4 items-center">
        <b-card class="w-full max-w-[300px]">
          <b-card-content>
            <span>
              This card only uses <code>&lt;b-card-content&gt;</code> for simple
              layouts.
            </span>
          </b-card-content>
        </b-card>
      </div>
      <h2 class="font-semibold text-xl">Card with Multiple Actions</h2>
      <code-block [code]="multiActionUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col gap-4 items-center">
        <b-card class="w-full max-w-[350px]">
          <b-card-header>
            <b-card-title>Card with Actions</b-card-title>
          </b-card-header>
          <b-card-content>
            <span> You can add multiple actions in the footer. </span>
          </b-card-content>
          <b-card-footer>
            <button b-button variant="outlined">Cancel</button>
            <button b-button>Accept</button>
          </b-card-footer>
        </b-card>
      </div>
      <h2 class="font-semibold text-xl">Card with Inputs</h2>
      <code-block [code]="inputsCardUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col gap-4 items-center">
        <b-card class="w-full max-w-[350px]">
          <b-card-header>
            <b-card-title>Login</b-card-title>
            <b-card-description>
              Enter your credentials to continue.
            </b-card-description>
          </b-card-header>
          <b-card-content>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <input b-input placeholder="Email" type="email" />
              <input b-input placeholder="Password" type="password" />
            </div>
          </b-card-content>
          <b-card-footer>
            <button b-button>Login</button>
          </b-card-footer>
        </b-card>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Button', path: '/docs/components/button' }"
      [next]="{ label: 'Checkbox', path: '/docs/components/checkbox' }" />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class CardDocumentation {
  angularImport = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'primitives'`;
  stylesImport = `@import '@basis-ng/styles/card';`;
  inputsCardUsage = `<b-card class="w-full max-w-[350px]">
  <b-card-header>
    <b-card-title>Login</b-card-title>
    <b-card-description>
      Enter your credentials to continue.
    </b-card-description>
  </b-card-header>
  <b-card-content>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <input b-input placeholder="Email" type="email" />
      <input b-input placeholder="Password" type="password" />
    </div>
  </b-card-content>
  <b-card-footer>
    <button b-button>Login</button>
  </b-card-footer>
</b-card>`;

  basicUsage = `<b-card class="w-full max-w-[400px]">
  <b-card-header>
    <b-card-title>Card Title</b-card-title>
    <b-card-description>This is a description for the card.</b-card-description>
  </b-card-header>
  <b-card-content>
    Here is some content inside the card. This is a longer text to demonstrate how the card handles multiple lines of content. You can add as much information as needed, and the card will expand accordingly to fit the content.
  </b-card-content>
  <b-card-footer>
    <button b-button>Action</button>
  </b-card-footer>
</b-card>`;

  contentOnlyUsage = `<b-card class="w-full max-w-[300px]">
  <b-card-content>
    <span>
      This card only uses <code>&lt;b-card-content&gt;</code> for simple layouts.
    </span>
  </b-card-content>
</b-card>`;

  multiActionUsage = `<b-card class="w-full max-w-[350px]">
  <b-card-header>
    <b-card-title>Card with Actions</b-card-title>
  </b-card-header>
  <b-card-content>
    <span>
      You can add multiple actions in the footer.
    </span>
  </b-card-content>
  <b-card-footer>
    <button b-button variant="outlined">Cancel</button>
    <button b-button>Accept</button>
  </b-card-footer>
</b-card>`;
}
