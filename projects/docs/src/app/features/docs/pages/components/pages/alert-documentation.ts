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
      [next]="{ label: 'Badge', path: '/docs/components/badge' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Alert</h1>
    <div class="flex flex-col gap-4">
      <span>
        Alert is a component used to display important messages to the user.
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
                type
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                'success' | 'error' | 'warning' | <strong>'info'</strong>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                title
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                string | <strong>null</strong>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                icon
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                <span class="group cursor-pointer inline-flex items-center">
                  string | null
                  <b-tooltip size="sm" variant="secondary">
                    <button
                      b-button
                      [squared]="true"
                      variant="ghost"
                      size="sm"
                      class="ml-1 flex items-center justify-center"
                      tabindex="0"
                      aria-label="Show Position[] values"
                      bTooltipTrigger
                      bOverlayOrigin
                      #tooltipInfo="bOverlayOrigin"
                      type="button">
                      <ng-icon
                        name="lucideInfo"
                        size="14"
                        color="currentColor" />
                    </button>
                    <ng-template
                      bConnectedOverlay
                      [trigger]="tooltipInfo"
                      [focusTriggerOnClose]="false">
                      <b-tooltip-content>
                        The icon should be provided using the provideIcons
                        method from ng-icons.
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
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                dismissible
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                boolean | <strong>false</strong>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                maxWidth
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                string | <strong>null</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Events</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Event
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
                dismissed
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                void
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
        <b-alert type="info" title="Info Alert" icon="lucideInfo">
          This is a basic informational alert.
        </b-alert>
      </div>
      <h2 class="font-semibold text-xl">Types</h2>
      <code-block [code]="typesUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
        <b-alert type="success" title="Success" icon="lucideCircleCheck">
          This is a success alert.
        </b-alert>
        <b-alert type="error" title="Error" icon="lucideCircleX">
          This is an error alert.
        </b-alert>
        <b-alert type="warning" title="Warning" icon="lucideOctagonAlert">
          This is a warning alert.
        </b-alert>
        <b-alert type="info" title="Info" icon="lucideInfo">
          This is an informational alert.
        </b-alert>
      </div>
      <h2 class="font-semibold text-xl">Dismissible</h2>
      <code-block [code]="dismissibleUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
        <b-alert
          type="info"
          [dismissible]="true"
          title="Info"
          icon="lucideInfo">
          This alert can be dismissed.
        </b-alert>
      </div>
      <h2 class="font-semibold text-xl">Max Width</h2>
      <code-block [code]="maxWidthUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
        <b-alert
          type="info"
          title="Info Alert"
          icon="lucideInfo"
          [maxWidth]="'300px'">
          This alert has a maximum width of 300px.
        </b-alert>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Badge', path: '/docs/components/badge' }"
      [next]="{ label: 'Badge', path: '/docs/components/badge' }" />
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
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class AlertDocumentation {
  angularImport = `import { Alert } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/alert';`;
  basicUsage = `<b-alert type="info" title="Info Alert" icon="Info">\n  This is a basic informational alert.\n</b-alert>`;
  typesUsage = `<b-alert type="success" title="Success" icon="CircleCheck">\n  This is a success alert.\n</b-alert>\n<b-alert type="error" title="Error" icon="CircleX">\n  This is an error alert.\n</b-alert>\n<b-alert type="warning" title="Warning" icon="OctagonAlert">\n  This is a warning alert.\n</b-alert>\n<b-alert type="info" title="Info" icon="Info">\n  This is an informational alert.\n</b-alert>`;
  dismissibleUsage = `<b-alert type="info" [dismissible]="true" title="Info" icon="Info">\n  This alert can be dismissed.\n</b-alert>`;
  maxWidthUsage = `<b-alert type="info" title="Info Alert" icon="Info" [maxWidth]="'300px'">\n  This alert has a maximum width of 300px.\n</b-alert>`;
  iconProvideExample = `providers: [provideIcons({ lucideSearch })]`;
}
