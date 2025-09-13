import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import {
  CardComponent,
  CardHeaderComponent,
  CardSubtitleComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent,
  Button,
  InputComponent,
  Badge,
} from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';

@Component({
  selector: 'article[app-card-documentation]',
  imports: [
    CodeBlock,
    CardComponent,
    CardHeaderComponent,
    CardSubtitleComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent,
    Button,
    InputComponent,
    StepsButtons,
    Badge,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Button', path: '/docs/components/button' }"
      [next]="{ label: 'Checkbox', path: '/docs/components/checkbox' }" />
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
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Prop
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
                maxWidth
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                string <strong>'80vw'</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic Usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
        <b-card [maxWidth]="'400px'">
          <b-card-header>
            <b-card-title>Card Title</b-card-title>
            <b-card-subtitle>Card Subtitle</b-card-subtitle>
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
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
        <b-card [maxWidth]="'300px'">
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
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
        <b-card [maxWidth]="'350px'">
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
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
        <b-card [maxWidth]="'350px'">
          <b-card-header>
            <b-card-title>Login</b-card-title>
            <b-card-subtitle />
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
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class CardDocumentation {
  angularImport = `import { CardComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/card';`;
  inputsCardUsage = `<b-card [maxWidth]="'350px'">
  <b-card-header>
    <b-card-title>Login</b-card-title>
    <b-card-subtitle></b-card-subtitle>
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

  basicUsage = `<b-card [maxWidth]="'400px'">
  <b-card-header>
    <b-card-title>Card Title</b-card-title>
    <b-card-subtitle>Card Subtitle</b-card-subtitle>
    <b-card-description>This is a description for the card.</b-card-description>
  </b-card-header>
  <b-card-content>
    Here is some content inside the card. This is a longer text to demonstrate how the card handles multiple lines of content. You can add as much information as needed, and the card will expand accordingly to fit the content.
  </b-card-content>
  <b-card-footer>
    <button b-button>Action</button>
  </b-card-footer>
</b-card>`;

  contentOnlyUsage = `<b-card [maxWidth]="'300px'">
  <b-card-content>
    <span>
      This card only uses <code>&lt;b-card-content&gt;</code> for simple layouts.
    </span>
  </b-card-content>
</b-card>`;

  multiActionUsage = `<b-card [maxWidth]="'350px'">
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
