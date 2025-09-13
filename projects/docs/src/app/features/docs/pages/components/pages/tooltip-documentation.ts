import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import {
  Button,
  OverlayDirective,
  OverlayTriggerDirective,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Badge,
} from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';

@Component({
  selector: 'article[app-tooltip-documentation]',
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Textarea', path: '/docs/components/textarea' }"
      [next]="{ label: 'Tree', path: '/docs/components/tree' }" />
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
                size
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                <b class="font-bold">'md'</b> | 'sm' | 'lg'
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                variant
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
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
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayTrigger
            #triggerBasic="bOverlayTrigger"
            class="cursor-pointer">
            Hover me
          </span>
          <ng-template bOverlay [trigger]="triggerBasic">
            <b-tooltip-content>Tooltip text</b-tooltip-content>
          </ng-template>
        </b-tooltip>
      </div>
      <h2 class="font-semibold text-xl">Variants</h2>
      <code-block [code]="variantsUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-row items-center justify-center gap-8">
        <b-tooltip variant="primary">
          <span
            bTooltipTrigger
            bOverlayTrigger
            #triggerPrimary="bOverlayTrigger"
            class="cursor-pointer">
            Primary
          </span>
          <ng-template bOverlay [trigger]="triggerPrimary">
            <b-tooltip-content>Primary tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip variant="secondary">
          <span
            bTooltipTrigger
            bOverlayTrigger
            #triggerSecondary="bOverlayTrigger"
            class="cursor-pointer">
            Secondary
          </span>
          <ng-template bOverlay [trigger]="triggerSecondary">
            <b-tooltip-content>Secondary tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip variant="ghost">
          <span
            bTooltipTrigger
            bOverlayTrigger
            #triggerGhost="bOverlayTrigger"
            class="cursor-pointer">
            Ghost
          </span>
          <ng-template bOverlay [trigger]="triggerGhost">
            <b-tooltip-content>Ghost tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip variant="outlined">
          <span
            bTooltipTrigger
            bOverlayTrigger
            #triggerOutlined="bOverlayTrigger"
            class="cursor-pointer">
            Outlined
          </span>
          <ng-template bOverlay [trigger]="triggerOutlined">
            <b-tooltip-content>Outlined tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip variant="destructive">
          <span
            bTooltipTrigger
            bOverlayTrigger
            #triggerDestructive="bOverlayTrigger"
            class="cursor-pointer">
            Destructive
          </span>
          <ng-template bOverlay [trigger]="triggerDestructive">
            <b-tooltip-content>Destructive tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-row items-center justify-center gap-8">
        <b-tooltip size="sm">
          <span
            bTooltipTrigger
            bOverlayTrigger
            #triggerSm="bOverlayTrigger"
            class="cursor-pointer">
            Small
          </span>
          <ng-template bOverlay [trigger]="triggerSm">
            <b-tooltip-content>Small tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip size="md">
          <span
            bTooltipTrigger
            bOverlayTrigger
            #triggerMd="bOverlayTrigger"
            class="cursor-pointer">
            Medium
          </span>
          <ng-template bOverlay [trigger]="triggerMd">
            <b-tooltip-content>Medium tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip size="lg">
          <span
            bTooltipTrigger
            bOverlayTrigger
            #triggerLg="bOverlayTrigger"
            class="cursor-pointer">
            Large
          </span>
          <ng-template bOverlay [trigger]="triggerLg">
            <b-tooltip-content>Large tooltip</b-tooltip-content>
          </ng-template>
        </b-tooltip>
      </div>
      <h2 class="font-semibold text-xl">With button and overlay trigger</h2>
      <code-block [code]="buttonOverlayUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-tooltip size="sm" variant="outlined">
          <button
            b-button
            bTooltipTrigger
            bOverlayTrigger
            #triggerButton="bOverlayTrigger">
            Get started
          </button>
          <ng-template
            bOverlay
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
                positions
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono relative">
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
                      bOverlayTrigger
                      #tooltipInfo="bOverlayTrigger"
                      type="button">
                      <ng-icon
                        name="lucideInfo"
                        size="14"
                        color="currentColor" />
                    </button>
                    <ng-template
                      bOverlay
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
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                focusTriggerOnClose
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                boolean
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Positioning examples</h2>
      <code-block [code]="positionsUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-row items-center justify-center gap-8">
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayTrigger
            #triggerBottomLeft="bOverlayTrigger"
            class="cursor-pointer">
            Bottom left
          </span>
          <ng-template
            bOverlay
            [trigger]="triggerBottomLeft"
            [positions]="['bottom-left']">
            <b-tooltip-content>Bottom left</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayTrigger
            #triggerBottomRight="bOverlayTrigger"
            class="cursor-pointer">
            Bottom right
          </span>
          <ng-template
            bOverlay
            [trigger]="triggerBottomRight"
            [positions]="['bottom-right']">
            <b-tooltip-content>Bottom right</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayTrigger
            #triggerTopLeft="bOverlayTrigger"
            class="cursor-pointer">
            Top left
          </span>
          <ng-template
            bOverlay
            [trigger]="triggerTopLeft"
            [positions]="['top-left']">
            <b-tooltip-content>Top left</b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayTrigger
            #triggerTopRight="bOverlayTrigger"
            class="cursor-pointer">
            Top right
          </span>
          <ng-template
            bOverlay
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
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
  imports: [
    CodeBlock,
    Button,
    OverlayDirective,
    OverlayTriggerDirective,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    StepsButtons,
    NgIcon,
    Badge,
  ],
  providers: [provideIcons({ lucideInfo })],
})
export class TooltipDocumentation {
  angularImport = `import { Tooltip, TooltipContent, TooltipTrigger } from '@basis-ng/primitives';`;
  stylesImport = `@import '@basis-ng/styles/index.css';`;
  basicUsage = `<b-tooltip>
  <span bTooltipTrigger>Hover me</span>
  <ng-template bOverlay>
    <b-tooltip-content>Tooltip text</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
  variantsUsage = `<b-tooltip variant="primary">
  <span bTooltipTrigger>Primary</span>
  <ng-template bOverlay>
    <b-tooltip-content>Primary tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip variant="secondary">
  <span bTooltipTrigger>Secondary</span>
  <ng-template bOverlay>
    <b-tooltip-content>Secondary tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip variant="ghost">
  <span bTooltipTrigger>Ghost</span>
  <ng-template bOverlay>
    <b-tooltip-content>Ghost tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip variant="outlined">
  <span bTooltipTrigger>Outlined</span>
  <ng-template bOverlay>
    <b-tooltip-content>Outlined tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip variant="destructive">
  <span bTooltipTrigger>Destructive</span>
  <ng-template bOverlay>
    <b-tooltip-content>Destructive tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
  sizesUsage = `<b-tooltip size="sm">
  <span bTooltipTrigger>Small</span>
  <ng-template bOverlay>
    <b-tooltip-content>Small tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip size="md">
  <span bTooltipTrigger>Medium</span>
  <ng-template bOverlay>
    <b-tooltip-content>Medium tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip size="lg">
  <span bTooltipTrigger>Large</span>
  <ng-template bOverlay>
    <b-tooltip-content>Large tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
  buttonOverlayUsage = `<b-tooltip size="sm" variant="outlined">
  <button b-button bTooltipTrigger bOverlayTrigger #trigger="bOverlayTrigger">Get started</button>
  <ng-template bOverlay [trigger]="trigger" [positions]="[
    'bottom-left',
    'bottom-right',
    'top-left',
    'top-right',
  ]" [focusTriggerOnClose]="false">
    <b-tooltip-content>Tooltip content goes here</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
  positionsUsage = `<b-tooltip>
  <span bTooltipTrigger bOverlayTrigger #triggerBottomLeft="bOverlayTrigger">Bottom left</span>
  <ng-template bOverlay [trigger]="triggerBottomLeft" [positions]="['bottom-left']">
    <b-tooltip-content>Bottom left</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayTrigger #triggerBottomRight="bOverlayTrigger">Bottom right</span>
  <ng-template bOverlay [trigger]="triggerBottomRight" [positions]="['bottom-right']">
    <b-tooltip-content>Bottom right</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayTrigger #triggerTopLeft="bOverlayTrigger">Top left</span>
  <ng-template bOverlay [trigger]="triggerTopLeft" [positions]="['top-left']">
    <b-tooltip-content>Top left</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayTrigger #triggerTopRight="bOverlayTrigger">Top right</span>
  <ng-template bOverlay [trigger]="triggerTopRight" [positions]="['top-right']">
    <b-tooltip-content>Top right</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
}
