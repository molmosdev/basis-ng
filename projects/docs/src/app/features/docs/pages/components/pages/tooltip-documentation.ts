import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { Button, Badge, Alert } from 'primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';
import { Tooltip } from '../../../../../../../../primitives/src/core/components/tooltip/tooltip';
import { TooltipContent } from '../../../../../../../../primitives/src/core/components/tooltip/tooltip-content';
import { TooltipTrigger } from '../../../../../../../../primitives/src/core/components/tooltip/tooltip-trigger';
import { ConnectedOverlay } from '../../../../../../../../primitives/src/core/directives/connected-overlay';
import { OverlayOrigin } from '../../../../../../../../primitives/src/core/directives/overlay-origin';

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
      <span b-badge class="b-variant-outlined b-size-sm"> New </span>
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
      <h2 class="font-semibold text-xl">Basic usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4">
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerBasic="bOverlayOrigin"
            class="cursor-pointer">
            Hover me
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerBasic">
            <b-tooltip-content class="b-size-md b-variant-primary">
              Tooltip text
            </b-tooltip-content>
          </ng-template>
        </b-tooltip>
      </div>
      <h2 class="font-semibold text-xl">Variants</h2>
      <code-block [code]="variantsUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-row items-center justify-center gap-8">
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerPrimary="bOverlayOrigin"
            class="cursor-pointer">
            Primary
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerPrimary">
            <b-tooltip-content class="b-variant-primary">
              Primary tooltip
            </b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerSecondary="bOverlayOrigin"
            class="cursor-pointer">
            Secondary
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerSecondary">
            <b-tooltip-content class="b-variant-secondary">
              Secondary tooltip
            </b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerGhost="bOverlayOrigin"
            class="cursor-pointer">
            Ghost
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerGhost">
            <b-tooltip-content class="b-variant-ghost">
              Ghost tooltip
            </b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerOutlined="bOverlayOrigin"
            class="cursor-pointer">
            Outlined
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerOutlined">
            <b-tooltip-content class="b-variant-outlined">
              Outlined tooltip
            </b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerDestructive="bOverlayOrigin"
            class="cursor-pointer">
            Destructive
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerDestructive">
            <b-tooltip-content class="b-variant-destructive">
              Destructive tooltip
            </b-tooltip-content>
          </ng-template>
        </b-tooltip>
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-row items-center justify-center gap-8">
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerSm="bOverlayOrigin"
            class="cursor-pointer">
            Small
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerSm">
            <b-tooltip-content class="b-size-sm">
              Small tooltip
            </b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerMd="bOverlayOrigin"
            class="cursor-pointer">
            Medium
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerMd">
            <b-tooltip-content class="b-size-md">
              Medium tooltip
            </b-tooltip-content>
          </ng-template>
        </b-tooltip>
        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerLg="bOverlayOrigin"
            class="cursor-pointer">
            Large
          </span>
          <ng-template bConnectedOverlay [trigger]="triggerLg">
            <b-tooltip-content class="b-size-lg">
              Large tooltip
            </b-tooltip-content>
          </ng-template>
        </b-tooltip>
      </div>
      <h2 class="font-semibold text-xl">With button and overlay trigger</h2>
      <code-block [code]="buttonOverlayUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4">
        <b-tooltip>
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
            <b-tooltip-content class="b-size-sm b-variant-outlined">
              Tooltip content goes here
            </b-tooltip-content>
          </ng-template>
        </b-tooltip>
      </div>
      <h2 class="font-semibold text-xl">Overlay properties (ng-template)</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Prop
              </th>
              <th
                class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap">
                positions
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap relative">
                <span class="group cursor-pointer inline-flex items-center">
                  Position[]
                  <b-tooltip>
                    <button
                      b-button
                      class="ml-1 flex items-center justify-center b-squared b-size-sm b-variant-ghost"
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
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap">
                focusTriggerOnClose
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap">
                boolean
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Positioning examples</h2>
      <code-block [code]="positionsUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 grid grid-cols-2 md:grid-cols-4 gap-6">
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
            #triggerTopCenter="bOverlayOrigin"
            class="cursor-pointer">
            Top center
          </span>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerTopCenter"
            [positions]="['top-center']">
            <b-tooltip-content>Top center</b-tooltip-content>
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
            #triggerBottomCenter="bOverlayOrigin"
            class="cursor-pointer">
            Bottom center
          </span>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerBottomCenter"
            [positions]="['bottom-center']">
            <b-tooltip-content>Bottom center</b-tooltip-content>
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
            #triggerLeftTop="bOverlayOrigin"
            class="cursor-pointer">
            Left top
          </span>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerLeftTop"
            [positions]="['left-top']">
            <b-tooltip-content>Left top</b-tooltip-content>
          </ng-template>
        </b-tooltip>

        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerLeftCenter="bOverlayOrigin"
            class="cursor-pointer">
            Left center
          </span>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerLeftCenter"
            [positions]="['left-center']">
            <b-tooltip-content>Left center</b-tooltip-content>
          </ng-template>
        </b-tooltip>

        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerLeftBottom="bOverlayOrigin"
            class="cursor-pointer">
            Left bottom
          </span>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerLeftBottom"
            [positions]="['left-bottom']">
            <b-tooltip-content>Left bottom</b-tooltip-content>
          </ng-template>
        </b-tooltip>

        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerRightTop="bOverlayOrigin"
            class="cursor-pointer">
            Right top
          </span>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerRightTop"
            [positions]="['right-top']">
            <b-tooltip-content>Right top</b-tooltip-content>
          </ng-template>
        </b-tooltip>

        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerRightCenter="bOverlayOrigin"
            class="cursor-pointer">
            Right center
          </span>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerRightCenter"
            [positions]="['right-center']">
            <b-tooltip-content>Right center</b-tooltip-content>
          </ng-template>
        </b-tooltip>

        <b-tooltip>
          <span
            bTooltipTrigger
            bOverlayOrigin
            #triggerRightBottom="bOverlayOrigin"
            class="cursor-pointer">
            Right bottom
          </span>
          <ng-template
            bConnectedOverlay
            [trigger]="triggerRightBottom"
            [positions]="['right-bottom']">
            <b-tooltip-content>Right bottom</b-tooltip-content>
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
    <b-tooltip-content class="b-size-md b-variant-primary">Tooltip text</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
  variantsUsage = `<b-tooltip>
  <span bTooltipTrigger>Primary</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content class="b-variant-primary">Primary tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger>Secondary</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content class="b-variant-secondary">Secondary tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger>Ghost</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content class="b-variant-ghost">Ghost tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger>Outlined</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content class="b-variant-outlined">Outlined tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger>Destructive</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content class="b-variant-destructive">Destructive tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
  sizesUsage = `<b-tooltip>
  <span bTooltipTrigger>Small</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content class="b-size-sm">Small tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger>Medium</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content class="b-size-md">Medium tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger>Large</span>
  <ng-template bConnectedOverlay>
    <b-tooltip-content class="b-size-lg">Large tooltip</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
  buttonOverlayUsage = `<b-tooltip>
  <button b-button bTooltipTrigger bOverlayOrigin #trigger="bOverlayOrigin">Get started</button>
  <ng-template bConnectedOverlay [trigger]="trigger" [positions]="[
    'bottom-left',
    'bottom-right',
    'top-left',
    'top-right',
  ]" [focusTriggerOnClose]="false">
    <b-tooltip-content class="b-size-sm b-variant-outlined">Tooltip content goes here</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
  positionsUsage = `<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #t1="bOverlayOrigin">Top left</span>
  <ng-template bConnectedOverlay [trigger]="t1" [positions]="['top-left']">
    <b-tooltip-content>Top left</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #t2="bOverlayOrigin">Top center</span>
  <ng-template bConnectedOverlay [trigger]="t2" [positions]="['top-center']">
    <b-tooltip-content>Top center</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #t3="bOverlayOrigin">Top right</span>
  <ng-template bConnectedOverlay [trigger]="t3" [positions]="['top-right']">
    <b-tooltip-content>Top right</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #t4="bOverlayOrigin">Bottom left</span>
  <ng-template bConnectedOverlay [trigger]="t4" [positions]="['bottom-left']">
    <b-tooltip-content>Bottom left</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #t5="bOverlayOrigin">Bottom center</span>
  <ng-template bConnectedOverlay [trigger]="t5" [positions]="['bottom-center']">
    <b-tooltip-content>Bottom center</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #t6="bOverlayOrigin">Bottom right</span>
  <ng-template bConnectedOverlay [trigger]="t6" [positions]="['bottom-right']">
    <b-tooltip-content>Bottom right</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #t7="bOverlayOrigin">Left top</span>
  <ng-template bConnectedOverlay [trigger]="t7" [positions]="['left-top']">
    <b-tooltip-content>Left top</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #t8="bOverlayOrigin">Left center</span>
  <ng-template bConnectedOverlay [trigger]="t8" [positions]="['left-center']">
    <b-tooltip-content>Left center</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #t9="bOverlayOrigin">Left bottom</span>
  <ng-template bConnectedOverlay [trigger]="t9" [positions]="['left-bottom']">
    <b-tooltip-content>Left bottom</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #t10="bOverlayOrigin">Right top</span>
  <ng-template bConnectedOverlay [trigger]="t10" [positions]="['right-top']">
    <b-tooltip-content>Right top</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #t11="bOverlayOrigin">Right center</span>
  <ng-template bConnectedOverlay [trigger]="t11" [positions]="['right-center']">
    <b-tooltip-content>Right center</b-tooltip-content>
  </ng-template>
</b-tooltip>
<b-tooltip>
  <span bTooltipTrigger bOverlayOrigin #t12="bOverlayOrigin">Right bottom</span>
  <ng-template bConnectedOverlay [trigger]="t12" [positions]="['right-bottom']">
    <b-tooltip-content>Right bottom</b-tooltip-content>
  </ng-template>
</b-tooltip>`;
}
