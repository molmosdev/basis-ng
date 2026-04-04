import { Component, signal } from '@angular/core';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from '../../../../../../../../../libs/primitives/src/public-api';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-skeleton-documentation]',
  imports: [
    CodeBlock,
    StepsButtons,
    Alert,
    Skeleton,
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Select', path: '/docs/components/select' }"
      [next]="{ label: 'Spinner', path: '/docs/components/spinner' }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Skeleton</h1>
    <div class="flex flex-col gap-4">
      <span>
        Skeleton is a loading directive. Apply it directly to the element that will eventually
        render data, and the shimmer automatically adapts to that host's size.
      </span>
      <code-block [code]="angularImport" />
      <span>Include this to apply predefined styles. The directive is headless without them.</span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 mb-6"
      >
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Property
              </th>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                bSkeleton
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                boolean
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button class="b-variant-secondary" (click)="toggleLoading()">
          Toggle loading
        </button>
        <b-card [bSkeleton]="loading()" class="w-full max-w-md rounded-xl">
          <b-card-header>
            <b-card-title>Candidate profile</b-card-title>
          </b-card-header>
          <b-card-content>
            This content keeps its real size, and the skeleton overlays it until loading ends.
          </b-card-content>
        </b-card>
      </div>
      <h2 class="font-semibold text-xl">Inline wrapper</h2>
      <code-block [code]="inlineUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-3"
      >
        <span
          [bSkeleton]="true"
          class="inline-flex h-8 items-center rounded-size-md bg-surface px-3 text-sm dark:bg-surface-dark"
        >
          Loading label
        </span>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Select', path: '/docs/components/select' }"
      [next]="{ label: 'Spinner', path: '/docs/components/spinner' }"
    />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class SkeletonDocumentation {
  angularImport = `import { Skeleton } from '@basis-ng/primitives';`;
  stylesImport = `@import '@basis-ng/styles/skeleton';`;
  basicUsage = `<b-card [bSkeleton]="loading()" class="w-full max-w-md rounded-xl">
  <b-card-header>
    <b-card-title>Candidate profile</b-card-title>
  </b-card-header>
  <b-card-content>
    This content keeps its size while the skeleton is visible.
  </b-card-content>
</b-card>`;
  inlineUsage = `<span [bSkeleton]="true" class="inline-flex h-8 items-center rounded-size-md bg-surface px-3 text-sm">
  Loading label
</span>`;
  readonly loading = signal(true);

  toggleLoading() {
    this.loading.set(!this.loading());
  }
}
