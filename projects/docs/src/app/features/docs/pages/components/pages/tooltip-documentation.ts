import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import {
  Button,
  ConnectedOverlay,
  OverlayOrigin,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Badge,
  Alert,
} from 'primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';

@Component({
  selector: 'article[app-tooltip-documentation]',
  imports: [
    CodeBlock,
    Button,
    ConnectedOverlay,
    OverlayOrigin,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    StepsButtons,
    NgIcon,
    Badge,
    Alert,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Textarea', path: '/docs/components/textarea' }"
      [next]="{ label: 'Tree', path: '/docs/components/tree' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Tooltip
      <span b-badge variant="outlined" size="sm"> New </span>
    </h1>
    <div class="flex flex-col gap-4">
      <span>
        Tooltip is a flexible component for displaying contextual information on
        hover or focus. It supports variants, sizes, and custom content.
      </span>
      <code-block [code]="angularImport" />
      <span>
        Include the styles so the component looks correct. The component is
        headless without them.
      </span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Tooltip properties</h2>
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
                <b class="font-bold">'md'</b> | 'sm' | 'lg'
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                variant
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">'primary'</b> | 'secondary' | 'ghost' |
                'outlined' | 'destructive'
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerBasic="bOverlayOrigin"
            class="cursor-pointer">
            Hover me
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerBasic">
            <b-tooltip-content>Tooltip text</b-tooltip-content>
          </ng-template>
        </b-tooltip>
      </div>
      <h2 class="font-semibold text-xl">Variants</h2>
      <code-block [code]="variantsUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-row items-center justify-center gap-8">
        <b-tooltip variant="primary">
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerPrimary="bOverlayOrigin"
            class="cursor-pointer">
            Primary
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerPrimary">
            <b-tooltip-content>Primary tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip variant="secondary">
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerSecondary="bOverlayOrigin"
            class="cursor-pointer">
            Secondary
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerSecondary">
            <b-tooltip-content>Secondary tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip variant="ghost">
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerGhost="bOverlayOrigin"
            class="cursor-pointer">
            Ghost
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerGhost">
            <b-tooltip-content>Ghost tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip variant="outlined">
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerOutlined="bOverlayOrigin"
            class="cursor-pointer">
            Outlined
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerOutlined">
            <b-tooltip-content>Outlined tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip variant="destructive">
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerDestructive="bOverlayOrigin"
            class="cursor-pointer">
            Destructive
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerDestructive">
            <b-tooltip-content>Destructive tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-row items-center justify-center gap-8">
        <b-tooltip size="sm">
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerSm="bOverlayOrigin"
            class="cursor-pointer">
            Small
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerSm">
            <b-tooltip-content>Small tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip size="md">
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerMd="bOverlayOrigin"
            class="cursor-pointer">
            Medium
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerMd">
            <b-tooltip-content>Medium tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip size="lg">
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerLg="bOverlayOrigin"
            class="cursor-pointer">
            Large
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerLg">
            <b-tooltip-content>Large tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
      </div>
      <h2 class="font-semibold text-xl">With button and overlay trigger</h2>
      <code-block [code]="buttonOverlayUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-tooltip size="sm" variant="outlined">
          <button
            b-button
            bTooltipTrigger
            bOverlayOrigin
            #triggerButton="bOverlayOrigin">
            Get started
          </button>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerButton"
            [positions]="[
              'bottom-left',
              'bottom-right',
              'top-left',
              'top-right',
            ]"
            [focusTriggerOnClose]="false">
            <b-tooltip-content>Tooltip content goes here</b-tooltip-content>
          </ng-template>
        </b-tooltip>
      </div>
      <h2 class="font-semibold text-xl">Overlay properties (ng-template)</h2>
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
                positions
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap relative">
                <span class="group cursor-pointer inline-flex items-center">
                  Position[]
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
                        'top-left' | 'top-center' | 'top-right'<br />
                        'bottom-left' | 'bottom-center' | 'bottom-right'<br />
                        'left-top' | 'left-center' | 'left-bottom'<br />
                        'right-top' | 'right-center' | 'right-bottom'
                      </b-tooltip-content>
                    </ng-template>
                  </b-tooltip>
                </span>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                focusTriggerOnClose
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                boolean
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Positioning examples</h2>
      <code-block [code]="positionsUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-row items-center justify-center gap-8">
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerBottomLeft="bOverlayOrigin"
            class="cursor-pointer">
            Bottom left
          </span>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerBottomLeft"
            [positions]="['bottom-left']">
            <b-tooltip-content>Bottom left</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerBottomRight="bOverlayOrigin"
            class="cursor-pointer">
            Bottom right
          </span>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerBottomRight"
            [positions]="['bottom-right']">
            <b-tooltip-content>Bottom right</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerTopLeft="bOverlayOrigin"
            class="cursor-pointer">
            Top left
          </span>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerTopLeft"
            [positions]="['top-left']">
            <b-tooltip-content>Top left</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerTopRight="bOverlayOrigin"
            class="cursor-pointer">
            Top right
          </span>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerTopRight"
            [positions]="['top-right']">
            <b-tooltip-content>Top right</b-tooltip-content>
          </ng-template>
        </b-tooltip>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Textarea', path: '/docs/components/textarea' }"
      [next]="{ label: 'Tree', path: '/docs/components/tree' }" />
  `,
  providers: [provideIcons({ lucideInfo })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class TooltipDocumentation {
  angularImport = `import { Tooltip, TooltipContent, TooltipTrigger } from 'primitives';`;
  stylesImport = `@import '@basis-ng/styles/index.css';`;
  basicUsage = `<b-tooltip>
  <span bTooltipTrigger>Hover me</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content>Tooltip text</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
  variantsUsage = `<b-tooltip variant="primary">
  <span bTooltipTrigger>Primary</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content>Primary tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip variant="secondary">
  <span bTooltipTrigger>Secondary</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content>Secondary tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip variant="ghost">
  <span bTooltipTrigger>Ghost</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content>Ghost tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip variant="outlined">
  <span bTooltipTrigger>Outlined</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content>Outlined tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip variant="destructive">
  <span bTooltipTrigger>Destructive</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content>Destructive tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
  sizesUsage = `<b-tooltip size="sm">
  <span bTooltipTrigger>Small</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content>Small tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip size="md">
  <span bTooltipTrigger>Medium</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content>Medium tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip size="lg">
  <span bTooltipTrigger>Large</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content>Large tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
  buttonOverlayUsage = `<b-tooltip size="sm" variant="outlined">
  <button b-button bTooltipTrigger bOverlayOrigin #trigger="bOverlayOrigin">Get started</button>
  <ng-template bConnectedOverlay [trigger]="trigger" [positions]="[
    'bottom-left',
    'bottom-right',
    'top-left',
    'top-right',
  ]" [focusTriggerOnClose]="false">
    <b-tooltip-content>Tooltip content goes here</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
  positionsUsage = `<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #triggerBottomLeft="bOverlayOrigin">Bottom left</span>
  <ng-template bConnectedOverlay [trigger]="triggerBottomLeft" [positions]="['bottom-left']">
    <b-tooltip-content>Bottom left</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #triggerBottomRight="bOverlayOrigin">Bottom right</span>
  <ng-template bConnectedOverlay [trigger]="triggerBottomRight" [positions]="['bottom-right']">
    <b-tooltip-content>Bottom right</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #triggerTopLeft="bOverlayOrigin">Top left</span>
  <ng-template bConnectedOverlay [trigger]="triggerTopLeft" [positions]="['top-left']">
    <b-tooltip-content>Top left</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #triggerTopRight="bOverlayOrigin">Top right</span>
  <ng-template bConnectedOverlay [trigger]="triggerTopRight" [positions]="['top-right']">
    <b-tooltip-content>Top right</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
}
