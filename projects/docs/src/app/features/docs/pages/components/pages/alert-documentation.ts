import { Component } from '@angular/core';
import {
  Alert,
  Button,
  ConnectedOverlay,
  OverlayOrigin,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@basis-ng/primitives';
import { CodeBlock } from '../shared/components/code-block';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideInfo,
  lucideCircleCheck,
  lucideCircleX,
  lucideOctagonAlert,
  lucideRocket,
} from '@ng-icons/lucide';

@Component({
  selector: 'article[app-alert-documentation]',
  imports: [
    Alert,
    CodeBlock,
    StepsButtons,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    ConnectedOverlay,
    OverlayOrigin,
    Button,
    NgIcon,
    Alert,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Badge', path: '/docs/components/badge' }"
      [next]="{ label: 'Badge', path: '/docs/components/badge' }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Alert</h1>
    <div class="flex flex-col gap-4">
      <span>Alert is a component used to display important messages to the user.</span>
      <code-block [code]="angularImport" />
      <span>Include this to apply predefined styles. The component is headless without it.</span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 mb-6"
      >
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Prop
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
                title
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                string |
                <strong>null</strong>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                icon
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <span class="group cursor-pointer inline-flex items-center">
                  string | null
                  <b-tooltip>
                    <button
                      b-button
                      class="ml-1 flex items-center justify-center b-squared b-variant-ghost b-size-sm"
                      tabindex="0"
                      aria-label="Show Position[] values"
                      bTooltipTrigger
                      bOverlayOrigin
                      #tooltipInfo="bOverlayOrigin"
                      type="button"
                    >
                      <ng-icon name="lucideInfo" size="14" color="currentColor" />
                    </button>
                    <ng-template
                      bConnectedOverlay
                      [trigger]="tooltipInfo"
                      [focusTriggerOnClose]="false"
                    >
                      <b-tooltip-content class="b-size-sm b-variant-secondary">
                        The icon should be provided using the provideIcons method from ng-icons.
                        <br />
                        {{ iconProvideExample }}
                      </b-tooltip-content>
                    </ng-template>
                  </b-tooltip>
                </span>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                dismissible
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                boolean |
                <strong>false</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Events</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 mb-6"
      >
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Event
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
                dismissed
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                void
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Default</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center"
      >
        <b-alert title="Info Alert" icon="lucideInfo">This is a basic informational alert.</b-alert>
      </div>
      <h2 class="font-semibold text-xl">Types</h2>
      <code-block [code]="typesUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center"
      >
        <b-alert class="b-type-success" title="Success" icon="lucideCircleCheck">
          This is a success alert.
        </b-alert>
        <b-alert class="b-type-error" title="Error" icon="lucideCircleX">
          This is an error alert.
        </b-alert>
        <b-alert class="b-type-warning" title="Warning" icon="lucideOctagonAlert">
          This is a warning alert.
        </b-alert>
        <b-alert class="b-type-info" title="Info" icon="lucideInfo">
          This is an informational alert.
        </b-alert>
      </div>
      <h2 class="font-semibold text-xl">Dismissible</h2>
      <code-block [code]="dismissibleUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center"
      >
        <b-alert class="b-type-info" [dismissible]="true" title="Info" icon="lucideInfo">
          This alert can be dismissed.
        </b-alert>
      </div>
      <!-- Sección Max Width eliminada -->
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Badge', path: '/docs/components/badge' }"
      [next]="{ label: 'Badge', path: '/docs/components/badge' }"
    />
  `,
  providers: [
    provideIcons({
      lucideInfo,
      lucideCircleCheck,
      lucideCircleX,
      lucideOctagonAlert,
      lucideRocket,
    }),
  ],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class AlertDocumentation {
  angularImport = `import { Alert } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/alert';`;
  basicUsage = `<b-alert title="Info Alert" icon="Info">\n  This is a basic informational alert.\n</b-alert>`;
  typesUsage = `<b-alert class="b-type-success" title="Success" icon="CircleCheck">\n  This is a success alert.\n</b-alert>\n<b-alert class="b-type-error" title="Error" icon="CircleX">\n  This is an error alert.\n</b-alert>\n<b-alert class="b-type-warning" title="Warning" icon="OctagonAlert">\n  This is a warning alert.\n</b-alert>\n<b-alert class="b-type-info" title="Info" icon="Info">\n  This is an informational alert.\n</b-alert>`;
  dismissibleUsage = `<b-alert class="b-type-info" [dismissible]="true" title="Info" icon="Info">\n  This alert can be dismissed.\n</b-alert>`;
  iconProvideExample = `providers: [provideIcons({ lucideSearch })]`;
}
