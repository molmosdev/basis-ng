import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Alert,
  Badge,
} from 'primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { Popover } from '../../../../../../../../primitives/src/core/components/popover/popover';
import { PopoverTrigger } from '../../../../../../../../primitives/src/core/components/popover/shared/directives/popover-trigger';
import { PopoverContent } from '../../../../../../../../primitives/src/core/components/popover/shared/components/popover-content';
import { signal } from '@angular/core';

@Component({
  selector: 'article[app-popover-documentation]',
  imports: [
    CodeBlock,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Input,
    StepsButtons,
    Alert,
    Badge,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Spinner', path: '/docs/components/spinner' }"
      [next]="{ label: 'Switch', path: '/docs/components/switch' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Popover
      <span b-badge variant="outlined" size="sm"> New </span>
    </h1>
    <div class="flex flex-col gap-4">
      <span>
        Popover is a floating panel positioned relative to a trigger. It uses
        CSS Anchor Positioning for layout and supports click or hover triggers
        with fully custom content.
      </span>
      <code-block [code]="angularImport" />
      <span>
        Include the styles so the component looks correct. The component is
        headless without them.
      </span>
      <code-block [code]="stylesImport" />

      <h2 class="font-semibold text-xl">Popover properties</h2>
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
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                open
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">false</b> | boolean (model)
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                Two-way bindable signal to control popover state externally
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                closeOnOutsideClick
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">true</b> | boolean
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                Close popover when clicking outside
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                hasBackdrop
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">false</b> | boolean
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                Show a backdrop behind the popover
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                backdropClass
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                string | string[]
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                CSS classes for the backdrop
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                disableScroll
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">false</b> | boolean
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                Disable page scroll when popover is open
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                trapFocus
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">false</b> | boolean
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                Keep focus trapped inside popover (for modals)
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                restoreFocus
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">false</b> | boolean
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                Restore focus to trigger when closing
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                autoFocus
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">false</b> | boolean
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                Auto focus content when opening
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                closeOnScroll
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">false</b> | boolean
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                Close popover when user scrolls
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                panelClass
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                string | string[]
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                CSS classes for the popover content panel
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="font-semibold text-xl">Popover outputs</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-700 dark:bg-neutral-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Output
              </th>
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Type
              </th>
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                opened
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                void
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                Emits when popover opens
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                closed
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                void
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                Emits when popover closes
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                backdropClick
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                void
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                Emits when backdrop is clicked
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="font-semibold text-xl">PopoverTrigger properties</h2>
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
                mode
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">'click'</b> | 'hover'
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                disabled
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">false</b> | boolean
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="font-semibold text-xl">PopoverContent properties</h2>
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
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                position
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">required</b> | 'top' | 'bottom' | 'left' |
                'right' | 'top left' | 'top right' | 'bottom left' | 'bottom
                right'
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                Position relative to trigger
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                closeOnEscape
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">true</b> | boolean
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2">
                Close when Escape key is pressed
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="font-semibold text-xl">Basic (click)</h2>
      <code-block [code]="basicClickUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-popover>
          <button b-button bPopoverTrigger>Open popover</button>
          <ng-template #popoverContent>
            <b-popover-content position="bottom">
              <b-card class="w-[220px]">
                <b-card-header>
                  <b-card-title>Title</b-card-title>
                  <b-card-description>Short description.</b-card-description>
                </b-card-header>
              </b-card>
            </b-popover-content>
          </ng-template>
        </b-popover>
      </div>

      <h2 class="font-semibold text-xl">Hover trigger</h2>
      <code-block [code]="hoverUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-popover>
          <button b-button variant="secondary" bPopoverTrigger mode="hover">
            Hover me
          </button>
          <ng-template #popoverContent>
            <b-popover-content position="top">
              <span class="block p-2 text-sm">I'm a hover popover</span>
            </b-popover-content>
          </ng-template>
        </b-popover>
      </div>

      <h2 class="font-semibold text-xl">Positions</h2>
      <code-block [code]="positionsUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
        <b-popover>
          <button b-button variant="outlined" mode="hover" bPopoverTrigger>
            Top
          </button>
          <ng-template #popoverContent>
            <b-popover-content position="top">
              <span class="p-2 text-xs block">Top</span>
            </b-popover-content>
          </ng-template>
        </b-popover>
        <b-popover>
          <button b-button variant="outlined" mode="hover" bPopoverTrigger>
            Bottom
          </button>
          <ng-template #popoverContent>
            <b-popover-content position="bottom">
              <span class="p-2 text-xs block">Bottom</span>
            </b-popover-content>
          </ng-template>
        </b-popover>
        <b-popover>
          <button b-button variant="outlined" mode="hover" bPopoverTrigger>
            Left
          </button>
          <ng-template #popoverContent>
            <b-popover-content position="left">
              <span class="p-2 text-xs block">Left</span>
            </b-popover-content>
          </ng-template>
        </b-popover>
        <b-popover>
          <button b-button variant="outlined" mode="hover" bPopoverTrigger>
            Right
          </button>
          <ng-template #popoverContent>
            <b-popover-content position="right">
              <span class="p-2 text-xs block">Right</span>
            </b-popover-content>
          </ng-template>
        </b-popover>
        <b-popover>
          <button b-button variant="outlined" mode="hover" bPopoverTrigger>
            Top left
          </button>
          <ng-template #popoverContent>
            <b-popover-content position="top left">
              <span class="p-2 text-xs block">Top left</span>
            </b-popover-content>
          </ng-template>
        </b-popover>
        <b-popover>
          <button b-button variant="outlined" mode="hover" bPopoverTrigger>
            Top right
          </button>
          <ng-template #popoverContent>
            <b-popover-content position="top right">
              <span class="p-2 text-xs block">Top right</span>
            </b-popover-content>
          </ng-template>
        </b-popover>
        <b-popover>
          <button b-button variant="outlined" mode="hover" bPopoverTrigger>
            Bottom left
          </button>
          <ng-template #popoverContent>
            <b-popover-content position="bottom left">
              <span class="p-2 text-xs block">Bottom left</span>
            </b-popover-content>
          </ng-template>
        </b-popover>
        <b-popover>
          <button b-button variant="outlined" mode="hover" bPopoverTrigger>
            Bottom right
          </button>
          <ng-template #popoverContent>
            <b-popover-content position="bottom right">
              <span class="p-2 text-xs block">Bottom right</span>
            </b-popover-content>
          </ng-template>
        </b-popover>
      </div>

      <h2 class="font-semibold text-xl">Inside a Card</h2>
      <code-block [code]="cardUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-card class="w-full max-w-[360px]">
          <b-card-header>
            <b-card-title>Profile</b-card-title>
            <b-card-description>User quick actions.</b-card-description>
          </b-card-header>
          <b-card-content>
            <b-popover>
              <button b-button variant="outlined" bPopoverTrigger>
                Actions
              </button>
              <ng-template #popoverContent>
                <b-popover-content position="bottom">
                  <div class="flex flex-col text-sm p-2 gap-1">
                    <button class="text-left hover:underline">View</button>
                    <button class="text-left hover:underline">Edit</button>
                    <button class="text-left hover:underline text-red-600">
                      Delete
                    </button>
                  </div>
                </b-popover-content>
              </ng-template>
            </b-popover>
          </b-card-content>
        </b-card>
      </div>

      <h2 class="font-semibold text-xl">Manual control with model signal</h2>
      <code-block [code]="noOutsideCloseUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-popover [closeOnOutsideClick]="false">
          <button b-button bPopoverTrigger [(active)]="isManualPopoverOpen">
            Manual close
          </button>
          <ng-template #popoverContent>
            <b-popover-content position="bottom">
              <div class="p-2 flex flex-col gap-2 text-sm">
                <span>Click outside won't close me.</span>
                <button
                  b-button
                  size="sm"
                  variant="outlined"
                  (click)="isManualPopoverOpen.set(false)">
                  Close with model signal
                </button>
              </div>
            </b-popover-content>
          </ng-template>
        </b-popover>
      </div>

      <h2 class="font-semibold text-xl">Advanced content (Form)</h2>
      <code-block [code]="formUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-popover>
          <button b-button bPopoverTrigger>Login form</button>
          <ng-template #popoverContent>
            <b-popover-content position="bottom">
              <b-card class="w-[250px]">
                <b-card-header>
                  <b-card-title>Sign in</b-card-title>
                  <b-card-description>Access your account.</b-card-description>
                </b-card-header>
                <b-card-content>
                  <div class="flex flex-col gap-2">
                    <input b-input placeholder="Email" type="email" />
                    <input b-input placeholder="Password" type="password" />
                  </div>
                </b-card-content>
                <b-card-footer>
                  <button b-button size="sm">Submit</button>
                </b-card-footer>
              </b-card>
            </b-popover-content>
          </ng-template>
        </b-popover>
      </div>

      <h2 class="font-semibold text-xl">With Backdrop</h2>
      <code-block [code]="backdropUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-popover [hasBackdrop]="true">
          <button b-button bPopoverTrigger>Open with backdrop</button>
          <ng-template #popoverContent>
            <b-popover-content position="bottom">
              <b-card class="w-[280px]">
                <b-card-header>
                  <b-card-title>Modal-like Popover</b-card-title>
                  <b-card-description>
                    With backdrop and blur effect.
                  </b-card-description>
                </b-card-header>
                <b-card-content>
                  <p class="text-sm">This popover has a backdrop behind it.</p>
                </b-card-content>
              </b-card>
            </b-popover-content>
          </ng-template>
        </b-popover>
      </div>

      <h2 class="font-semibold text-xl">Focus Management</h2>
      <code-block [code]="focusUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-popover
          [hasBackdrop]="true"
          [trapFocus]="true"
          [autoFocus]="true"
          [restoreFocus]="true">
          <button b-button bPopoverTrigger>Open with focus trap</button>
          <ng-template #popoverContent>
            <b-popover-content position="bottom">
              <b-card class="w-[280px]">
                <b-card-header>
                  <b-card-title>Focus Trapped</b-card-title>
                  <b-card-description>
                    Try to Tab outside - you can't!
                  </b-card-description>
                </b-card-header>
                <b-card-content>
                  <div class="flex flex-col gap-2">
                    <input b-input placeholder="First field" />
                    <input b-input placeholder="Second field" />
                    <button b-button size="sm">Submit</button>
                  </div>
                </b-card-content>
              </b-card>
            </b-popover-content>
          </ng-template>
        </b-popover>
      </div>

      <h2 class="font-semibold text-xl">With Events</h2>
      <code-block [code]="eventsUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <div class="flex flex-col gap-2 items-center">
          <b-popover
            [hasBackdrop]="true"
            (opened)="onPopoverOpened()"
            (closed)="onPopoverClosed()"
            (backdropClick)="onBackdropClick()">
            <button b-button bPopoverTrigger>Open with events</button>
            <ng-template #popoverContent>
              <b-popover-content position="bottom">
                <b-card class="w-[280px]">
                  <b-card-header>
                    <b-card-title>Events Example</b-card-title>
                    <b-card-description>
                      Check the console for events.
                    </b-card-description>
                  </b-card-header>
                  <b-card-content>
                    <p class="text-sm">
                      Open, close, or click the backdrop to see events.
                    </p>
                  </b-card-content>
                </b-card>
              </b-popover-content>
            </ng-template>
          </b-popover>
          @if (lastEvent) {
            <span class="text-sm text-muted-foreground">
              Last event: <b>{{ lastEvent }}</b>
            </span>
          }
        </div>
      </div>

      <h2 class="font-semibold text-xl">Custom Panel Classes</h2>
      <code-block [code]="panelClassUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-popover [panelClass]="'shadow-2xl border-2 border-blue-500'">
          <button b-button variant="outlined" bPopoverTrigger>
            Custom styled
          </button>
          <ng-template #popoverContent>
            <b-popover-content position="bottom">
              <div
                class="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
                <p class="text-sm font-semibold">Custom Styled Popover!</p>
                <p class="text-xs mt-1">With panelClass property</p>
              </div>
            </b-popover-content>
          </ng-template>
        </b-popover>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Spinner', path: '/docs/components/spinner' }"
      [next]="{ label: 'Switch', path: '/docs/components/switch' }" />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class PopoverDocumentation {
  lastEvent: string | null = null;
  readonly isManualPopoverOpen = signal(false);

  angularImport = `import { Popover, PopoverTrigger, PopoverContent } from 'primitives';`;
  stylesImport = `@import '@basis-ng/styles/index.css';`;
  basicClickUsage = `<b-popover>
  <button b-button bPopoverTrigger>Open popover</button>
  <ng-template #popoverContent>
    <b-popover-content position="bottom">
      <b-card class="w-[220px]">
        <b-card-header>
          <b-card-title>Title</b-card-title>
          <b-card-description>Short description.</b-card-description>
        </b-card-header>
      </b-card>
    </b-popover-content>
  </ng-template>
</b-popover>`;
  hoverUsage = `<b-popover>
  <button b-button bPopoverTrigger mode="hover">Hover me</button>
  <ng-template #popoverContent>
    <b-popover-content position="top">
      <span class="block p-2 text-sm">I'm a hover popover</span>
    </b-popover-content>
  </ng-template>
</b-popover>`;
  positionsUsage = `<b-popover>
  <button b-button bPopoverTrigger>Top</button>
  <ng-template #popoverContent>
    <b-popover-content position="top">...</b-popover-content>
  </ng-template>
</b-popover>
<!-- Repeat for other positions: bottom, left, right, top left, top right, bottom left, bottom right -->`;
  cardUsage = `<b-card class="w-full max-w-[360px]">
  <b-card-header>
    <b-card-title>Profile</b-card-title>
    <b-card-description>User quick actions.</b-card-description>
  </b-card-header>
  <b-card-content>
    <b-popover>
      <button b-button variant="outlined" bPopoverTrigger>Actions</button>
      <ng-template #popoverContent>
        <b-popover-content position="bottom">
          <div class="flex flex-col text-sm p-2 gap-1">
            <button class="text-left hover:underline">View</button>
            <button class="text-left hover:underline">Edit</button>
            <button class="text-left hover:underline text-red-600">Delete</button>
          </div>
        </b-popover-content>
      </ng-template>
    </b-popover>
  </b-card-content>
</b-card>`;
  noOutsideCloseUsage = `// Component
isManualPopoverOpen = signal(false);

// Template
<b-popover [closeOnOutsideClick]="false">
  <button b-button bPopoverTrigger [(active)]="isManualPopoverOpen">Manual close</button>
  <ng-template #popoverContent>
    <b-popover-content position="bottom">
      <div class="p-2 flex flex-col gap-2 text-sm">
        <span>Click outside won't close me.</span>
        <button 
          b-button 
          size="sm" 
          variant="outlined"
          (click)="isManualPopoverOpen.set(false)">
          Close with model signal
        </button>
      </div>
    </b-popover-content>
  </ng-template>
</b-popover>`;
  formUsage = `<b-popover>
  <button b-button bPopoverTrigger>Login form</button>
  <ng-template #popoverContent>
    <b-popover-content position="bottom">
      <b-card class="w-[250px]">
        <b-card-header>
          <b-card-title>Sign in</b-card-title>
          <b-card-description>Access your account.</b-card-description>
        </b-card-header>
        <b-card-content>
          <div class="flex flex-col gap-2">
            <input b-input placeholder="Email" type="email" />
            <input b-input placeholder="Password" type="password" />
          </div>
        </b-card-content>
        <b-card-footer>
          <button b-button size="sm">Submit</button>
        </b-card-footer>
      </b-card>
    </b-popover-content>
  </ng-template>
</b-popover>`;
  backdropUsage = `<b-popover [hasBackdrop]="true" [backdropClass]="'b-backdrop-blur'">
  <button b-button bPopoverTrigger>Open with backdrop</button>
  <ng-template #popoverContent>
    <b-popover-content position="bottom">
      <b-card class="w-[280px]">
        <b-card-header>
          <b-card-title>Modal-like Popover</b-card-title>
          <b-card-description>With backdrop and blur effect.</b-card-description>
        </b-card-header>
        <b-card-content>
          <p class="text-sm">This popover has a backdrop behind it.</p>
        </b-card-content>
      </b-card>
    </b-popover-content>
  </ng-template>
</b-popover>`;
  focusUsage = `<b-popover
  [hasBackdrop]="true"
  [trapFocus]="true"
  [autoFocus]="true"
  [restoreFocus]="true">
  <button b-button bPopoverTrigger>Open with focus trap</button>
  <ng-template #popoverContent>
    <b-popover-content position="bottom">
      <b-card class="w-[280px]">
        <b-card-header>
          <b-card-title>Focus Trapped</b-card-title>
          <b-card-description>Try to Tab outside - you can't!</b-card-description>
        </b-card-header>
        <b-card-content>
          <div class="flex flex-col gap-2">
            <input b-input placeholder="First field" />
            <input b-input placeholder="Second field" />
            <button b-button size="sm">Submit</button>
          </div>
        </b-card-content>
      </b-card>
    </b-popover-content>
  </ng-template>
</b-popover>`;
  eventsUsage = `<b-popover
  [hasBackdrop]="true"
  (opened)="onPopoverOpened()"
  (closed)="onPopoverClosed()"
  (backdropClick)="onBackdropClick()">
  <button b-button bPopoverTrigger>Open with events</button>
  <ng-template #popoverContent>
    <b-popover-content position="bottom">
      <b-card class="w-[280px]">
        <b-card-header>
          <b-card-title>Events Example</b-card-title>
          <b-card-description>Check the console for events.</b-card-description>
        </b-card-header>
      </b-card>
    </b-popover-content>
  </ng-template>
</b-popover>`;
  panelClassUsage = `<b-popover [panelClass]="'shadow-2xl border-2 border-blue-500'">
  <button b-button variant="outlined" bPopoverTrigger>Custom styled</button>
  <ng-template #popoverContent>
    <b-popover-content position="bottom">
      <div class="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
        <p class="text-sm font-semibold">Custom Styled Popover!</p>
        <p class="text-xs mt-1">With panelClass property</p>
      </div>
    </b-popover-content>
  </ng-template>
</b-popover>`;

  onPopoverOpened() {
    this.lastEvent = 'opened';
    console.log('Popover opened!');
  }

  onPopoverClosed() {
    this.lastEvent = 'closed';
    console.log('Popover closed!');
  }

  onBackdropClick() {
    this.lastEvent = 'backdrop clicked';
    console.log('Backdrop clicked!');
  }
}
