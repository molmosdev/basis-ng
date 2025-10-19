import { Component } from '@angular/core';
import {
  Alert,
  Badge,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@basis-ng/primitives';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo, lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-tooltip-documentation]',
  imports: [
    CodeBlock,
    Button,
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
      [next]="{ label: 'Tree', path: '/docs/components/tree' }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Tooltip
      <span b-badge class="b-variant-outlined b-size-sm">New</span>
    </h1>
    <div class="flex flex-col gap-4">
      <span>
        Tooltip is a flexible component for displaying contextual information on hover or focus. It
        supports variants, sizes, and custom content.
      </span>
      <code-block [code]="angularImport" />
      <span>
        Include the styles so the component looks correct. The component is headless without them.
      </span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Basic usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <span bTooltipTrigger #triggerBasic="bTooltipTrigger" class="cursor-pointer">Hover me</span>
        <ng-template bTooltip [trigger]="triggerBasic" [open]="triggerBasic.active()">
          <b-tooltip-content class="b-size-md b-variant-primary">Tooltip text</b-tooltip-content>
        </ng-template>
      </div>
      <h2 class="font-semibold text-xl">Variants</h2>
      <code-block [code]="variantsUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-row items-center justify-center gap-8"
      >
        <span bTooltipTrigger #triggerPrimary="bTooltipTrigger" class="cursor-pointer"
          >Primary</span
        >
        <ng-template bTooltip [trigger]="triggerPrimary" [open]="triggerPrimary.active()">
          <b-tooltip-content class="b-variant-primary">Primary tooltip</b-tooltip-content>
        </ng-template>
        <span bTooltipTrigger #triggerSecondary="bTooltipTrigger" class="cursor-pointer"
          >Secondary</span
        >
        <ng-template bTooltip [trigger]="triggerSecondary" [open]="triggerSecondary.active()">
          <b-tooltip-content class="b-variant-secondary">Secondary tooltip</b-tooltip-content>
        </ng-template>
        <span bTooltipTrigger #triggerGhost="bTooltipTrigger" class="cursor-pointer">Ghost</span>
        <ng-template bTooltip [trigger]="triggerGhost" [open]="triggerGhost.active()">
          <b-tooltip-content class="b-variant-ghost">Ghost tooltip</b-tooltip-content>
        </ng-template>
        <span bTooltipTrigger #triggerOutlined="bTooltipTrigger" class="cursor-pointer"
          >Outlined</span
        >
        <ng-template bTooltip [trigger]="triggerOutlined" [open]="triggerOutlined.active()">
          <b-tooltip-content class="b-variant-outlined">Outlined tooltip</b-tooltip-content>
        </ng-template>
        <span bTooltipTrigger #triggerDestructive="bTooltipTrigger" class="cursor-pointer"
          >Destructive</span
        >
        <ng-template bTooltip [trigger]="triggerDestructive" [open]="triggerDestructive.active()">
          <b-tooltip-content class="b-variant-destructive">Destructive tooltip</b-tooltip-content>
        </ng-template>
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-row items-center justify-center gap-8"
      >
        <span bTooltipTrigger #triggerSm="bTooltipTrigger" class="cursor-pointer">Small</span>
        <ng-template bTooltip [trigger]="triggerSm" [open]="triggerSm.active()">
          <b-tooltip-content class="b-size-sm">Small tooltip</b-tooltip-content>
        </ng-template>
        <span bTooltipTrigger #triggerMd="bTooltipTrigger" class="cursor-pointer">Medium</span>
        <ng-template bTooltip [trigger]="triggerMd" [open]="triggerMd.active()">
          <b-tooltip-content class="b-size-md">Medium tooltip</b-tooltip-content>
        </ng-template>
        <span bTooltipTrigger #triggerLg="bTooltipTrigger" class="cursor-pointer">Large</span>
        <ng-template bTooltip [trigger]="triggerLg" [open]="triggerLg.active()">
          <b-tooltip-content class="b-size-lg">Large tooltip</b-tooltip-content>
        </ng-template>
      </div>
      <h2 class="font-semibold text-xl">With button and overlay trigger</h2>
      <code-block [code]="buttonOverlayUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button bTooltipTrigger #triggerButton="bTooltipTrigger">Get started</button>
        <ng-template bTooltip [trigger]="triggerButton" [open]="triggerButton.active()">
          <b-tooltip-content class="b-size-sm b-variant-outlined">
            Tooltip content goes here
          </b-tooltip-content>
        </ng-template>
      </div>
      <h2 class="font-semibold text-xl">Overlay properties (ng-template)</h2>
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
                positions
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap relative"
              >
                <span class="group cursor-pointer inline-flex items-center">
                  Position[]
                  <button
                    b-button
                    class="ml-1 flex items-center justify-center b-squared b-size-sm b-variant-ghost"
                    tabindex="0"
                    aria-label="Show Position[] values"
                    bTooltipTrigger
                    #tooltipInfo="bTooltipTrigger"
                    type="button"
                  >
                    <ng-icon name="lucideInfo" size="14" color="currentColor" />
                  </button>
                  <ng-template bTooltip [trigger]="tooltipInfo" [open]="tooltipInfo.active()">
                    <div
                      class=" bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-900 px-4 py-2 w-100 rounded-lg"
                    >
                      'top-left' | 'top-center' | 'top-right'
                      <br />
                      'bottom-left' | 'bottom-center' | 'bottom-right'
                      <br />
                      'left-top' | 'left-center' | 'left-bottom'
                      <br />
                      'right-top' | 'right-center' | 'right-bottom'
                    </div>
                  </ng-template>
                </span>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                trigger
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                OverlayTrigger
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                open
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
      <h2 class="font-semibold text-xl">Positioning examples</h2>
      <code-block [code]="positionsUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <span bTooltipTrigger #triggerTopLeft="bTooltipTrigger" class="cursor-pointer"
          >Top left</span
        >
        <ng-template
          bTooltip
          [trigger]="triggerTopLeft"
          [open]="triggerTopLeft.active()"
          [positions]="['top-left']"
        >
          <b-tooltip-content>Top left</b-tooltip-content>
        </ng-template>

        <span bTooltipTrigger #triggerTopCenter="bTooltipTrigger" class="cursor-pointer"
          >Top center</span
        >
        <ng-template
          bTooltip
          [trigger]="triggerTopCenter"
          [open]="triggerTopCenter.active()"
          [positions]="['top-center']"
        >
          <b-tooltip-content>Top center</b-tooltip-content>
        </ng-template>

        <span bTooltipTrigger #triggerTopRight="bTooltipTrigger" class="cursor-pointer"
          >Top right</span
        >
        <ng-template
          bTooltip
          [trigger]="triggerTopRight"
          [open]="triggerTopRight.active()"
          [positions]="['top-right']"
        >
          <b-tooltip-content>Top right</b-tooltip-content>
        </ng-template>

        <span bTooltipTrigger #triggerBottomLeft="bTooltipTrigger" class="cursor-pointer"
          >Bottom left</span
        >
        <ng-template
          bTooltip
          [trigger]="triggerBottomLeft"
          [open]="triggerBottomLeft.active()"
          [positions]="['bottom-left']"
        >
          <b-tooltip-content>Bottom left</b-tooltip-content>
        </ng-template>

        <span bTooltipTrigger #triggerBottomCenter="bTooltipTrigger" class="cursor-pointer"
          >Bottom center</span
        >
        <ng-template
          bTooltip
          [trigger]="triggerBottomCenter"
          [open]="triggerBottomCenter.active()"
          [positions]="['bottom-center']"
        >
          <b-tooltip-content>Bottom center</b-tooltip-content>
        </ng-template>

        <span bTooltipTrigger #triggerBottomRight="bTooltipTrigger" class="cursor-pointer"
          >Bottom right</span
        >
        <ng-template
          bTooltip
          [trigger]="triggerBottomRight"
          [open]="triggerBottomRight.active()"
          [positions]="['bottom-right']"
        >
          <b-tooltip-content>Bottom right</b-tooltip-content>
        </ng-template>

        <span bTooltipTrigger #triggerLeftTop="bTooltipTrigger" class="cursor-pointer"
          >Left top</span
        >
        <ng-template
          bTooltip
          [trigger]="triggerLeftTop"
          [open]="triggerLeftTop.active()"
          [positions]="['left-top']"
        >
          <b-tooltip-content>Left top</b-tooltip-content>
        </ng-template>

        <span bTooltipTrigger #triggerLeftCenter="bTooltipTrigger" class="cursor-pointer"
          >Left center</span
        >
        <ng-template
          bTooltip
          [trigger]="triggerLeftCenter"
          [open]="triggerLeftCenter.active()"
          [positions]="['left-center']"
        >
          <b-tooltip-content>Left center</b-tooltip-content>
        </ng-template>

        <span bTooltipTrigger #triggerLeftBottom="bTooltipTrigger" class="cursor-pointer"
          >Left bottom</span
        >
        <ng-template
          bTooltip
          [trigger]="triggerLeftBottom"
          [open]="triggerLeftBottom.active()"
          [positions]="['left-bottom']"
        >
          <b-tooltip-content>Left bottom</b-tooltip-content>
        </ng-template>

        <span bTooltipTrigger #triggerRightTop="bTooltipTrigger" class="cursor-pointer"
          >Right top</span
        >
        <ng-template
          bTooltip
          [trigger]="triggerRightTop"
          [open]="triggerRightTop.active()"
          [positions]="['right-top']"
        >
          <b-tooltip-content>Right top</b-tooltip-content>
        </ng-template>

        <span bTooltipTrigger #triggerRightCenter="bTooltipTrigger" class="cursor-pointer"
          >Right center</span
        >
        <ng-template
          bTooltip
          [trigger]="triggerRightCenter"
          [open]="triggerRightCenter.active()"
          [positions]="['right-center']"
        >
          <b-tooltip-content>Right center</b-tooltip-content>
        </ng-template>

        <span bTooltipTrigger #triggerRightBottom="bTooltipTrigger" class="cursor-pointer"
          >Right bottom</span
        >
        <ng-template
          bTooltip
          [trigger]="triggerRightBottom"
          [open]="triggerRightBottom.active()"
          [positions]="['right-bottom']"
        >
          <b-tooltip-content>Right bottom</b-tooltip-content>
        </ng-template>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Textarea', path: '/docs/components/textarea' }"
      [next]="{ label: 'Tree', path: '/docs/components/tree' }"
    />
  `,
  providers: [provideIcons({ lucideInfo, lucideRocket })],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class TooltipDocumentation {
  angularImport = `import { Tooltip, TooltipContent, TooltipTrigger } from '@basis-ng/primitives' ;`;
  stylesImport = `@import '@basis-ng/styles/index.css';`;
  basicUsage = `<span bTooltipTrigger #trigger="bTooltipTrigger">Hover me</span>
<ng-template bTooltip [trigger]="trigger" [open]="trigger.active()">
  <b-tooltip-content class="b-size-md b-variant-primary">Tooltip text</b-tooltip-content>
</ng-template>`;
  variantsUsage = `<span bTooltipTrigger #t1="bTooltipTrigger">Primary</span>
<ng-template bTooltip [trigger]="t1" [open]="t1.active()">
  <b-tooltip-content class="b-variant-primary">Primary tooltip</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t2="bTooltipTrigger">Secondary</span>
<ng-template bTooltip [trigger]="t2" [open]="t2.active()">
  <b-tooltip-content class="b-variant-secondary">Secondary tooltip</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t3="bTooltipTrigger">Ghost</span>
<ng-template bTooltip [trigger]="t3" [open]="t3.active()">
  <b-tooltip-content class="b-variant-ghost">Ghost tooltip</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t4="bTooltipTrigger">Outlined</span>
<ng-template bTooltip [trigger]="t4" [open]="t4.active()">
  <b-tooltip-content class="b-variant-outlined">Outlined tooltip</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t5="bTooltipTrigger">Destructive</span>
<ng-template bTooltip [trigger]="t5" [open]="t5.active()">
  <b-tooltip-content class="b-variant-destructive">Destructive tooltip</b-tooltip-content>
</ng-template>`;
  sizesUsage = `<span bTooltipTrigger #s1="bTooltipTrigger">Small</span>
<ng-template bTooltip [trigger]="s1" [open]="s1.active()">
  <b-tooltip-content class="b-size-sm">Small tooltip</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #s2="bTooltipTrigger">Medium</span>
<ng-template bTooltip [trigger]="s2" [open]="s2.active()">
  <b-tooltip-content class="b-size-md">Medium tooltip</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #s3="bTooltipTrigger">Large</span>
<ng-template bTooltip [trigger]="s3" [open]="s3.active()">
  <b-tooltip-content class="b-size-lg">Large tooltip</b-tooltip-content>
</ng-template>`;
  buttonOverlayUsage = `<button b-button bTooltipTrigger #triggerButton="bTooltipTrigger">Get started</button>
<ng-template bTooltip [trigger]="triggerButton" [open]="triggerButton.active()" [positions]="['bottom-left','bottom-right','top-left','top-right']">
  <b-tooltip-content class="b-size-sm b-variant-outlined">Tooltip content goes here</b-tooltip-content>
</ng-template>`;
  positionsUsage = `<span bTooltipTrigger #t1="bTooltipTrigger">Top left</span>
<ng-template bTooltip [trigger]="t1" [open]="t1.active()" [positions]="['top-left']">
  <b-tooltip-content>Top left</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t2="bTooltipTrigger">Top center</span>
<ng-template bTooltip [trigger]="t2" [open]="t2.active()" [positions]="['top-center']">
  <b-tooltip-content>Top center</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t3="bTooltipTrigger">Top right</span>
<ng-template bTooltip [trigger]="t3" [open]="t3.active()" [positions]="['top-right']">
  <b-tooltip-content>Top right</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t4="bTooltipTrigger">Bottom left</span>
<ng-template bTooltip [trigger]="t4" [open]="t4.active()" [positions]="['bottom-left']">
  <b-tooltip-content>Bottom left</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t5="bTooltipTrigger">Bottom center</span>
<ng-template bTooltip [trigger]="t5" [open]="t5.active()" [positions]="['bottom-center']">
  <b-tooltip-content>Bottom center</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t6="bTooltipTrigger">Bottom right</span>
<ng-template bTooltip [trigger]="t6" [open]="t6.active()" [positions]="['bottom-right']">
  <b-tooltip-content>Bottom right</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t7="bTooltipTrigger">Left top</span>
<ng-template bTooltip [trigger]="t7" [open]="t7.active()" [positions]="['left-top']">
  <b-tooltip-content>Left top</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t8="bTooltipTrigger">Left center</span>
<ng-template bTooltip [trigger]="t8" [open]="t8.active()" [positions]="['left-center']">
  <b-tooltip-content>Left center</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t9="bTooltipTrigger">Left bottom</span>
<ng-template bTooltip [trigger]="t9" [open]="t9.active()" [positions]="['left-bottom']">
  <b-tooltip-content>Left bottom</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t10="bTooltipTrigger">Right top</span>
<ng-template bTooltip [trigger]="t10" [open]="t10.active()" [positions]="['right-top']">
  <b-tooltip-content>Right top</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t11="bTooltipTrigger">Right center</span>
<ng-template bTooltip [trigger]="t11" [open]="t11.active()" [positions]="['right-center']">
  <b-tooltip-content>Right center</b-tooltip-content>
</ng-template>

<span bTooltipTrigger #t12="bTooltipTrigger">Right bottom</span>
<ng-template bTooltip [trigger]="t12" [open]="t12.active()" [positions]="['right-bottom']">
  <b-tooltip-content>Right bottom</b-tooltip-content>
</ng-template>`;
}
