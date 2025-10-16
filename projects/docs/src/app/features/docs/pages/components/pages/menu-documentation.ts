import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import {
  Menu,
  MenuItem,
  MenuGroup,
  MenuLabel,
  MenuTriggerDirective,
  Button,
  Badge,
  Alert,
} from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';

@Component({
  selector: 'article[app-menu-documentation]',
  imports: [
    CodeBlock,
    Menu,
    MenuItem,
    MenuGroup,
    MenuLabel,
    MenuTriggerDirective,
    Button,
    StepsButtons,
    Badge,
    Alert,
  ],
  template: `
    <app-steps-buttons
      [previous]="{
        label: 'Input Group',
        path: '/docs/components/input-group',
      }"
      [next]="{ label: 'OTP', path: '/docs/components/otp' }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Menu
      <span b-badge class="b-variant-outlined b-size-sm">New</span>
    </h1>
    <div class="flex flex-col gap-4">
      <span>
        The Menu component provides a flexible and accessible way to create dropdown menus with
        support for nested menus and various configurations.
      </span>
      <code-block [code]="angularImport" />
      <span>Include this to apply predefined styles. The component is headless without it.</span>
      <code-block [code]="stylesImport" />
      <code-block [code]="sizesUsage" />
      <h2 class="font-semibold text-xl">MenuItem properties</h2>
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
                Tipo
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                disabled
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <strong>false</strong>
                | true
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                typeaheadLabel
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                string
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                squared
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <strong>false</strong>
                | true
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                destructive
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <strong>false</strong>
                | true
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="font-semibold text-xl">MenuItemCheckbox properties</h2>
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
                Tipo
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                disabled
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <strong>false</strong>
                | true
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                typeaheadLabel
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                string
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                active
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <strong>false</strong>
                | true
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                squared
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <strong>false</strong>
                | true
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="font-semibold text-xl">MenuItemRadio properties</h2>
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
                Tipo
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                disabled
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <strong>false</strong>
                | true
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                typeaheadLabel
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                string
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                active
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <strong>false</strong>
                | true
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                squared
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <strong>false</strong>
                | true
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="font-semibold text-xl">MenuTriggerDirective properties</h2>
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
                Tipo
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                menuTriggerFor
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                TemplateRef&lt;any&gt;
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                menuTriggerPosition
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <strong>'right-top'</strong>
                | Position | Position[]
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                submenu
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <strong>false</strong>
                | true
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
                triggered
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                Event
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic Example</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 items-center dark:border-neutral-700 rounded-lg p-6 mb-6 flex flex-col gap-4"
      >
        <b-menu>
          <b-menu-label>Basic Menu</b-menu-label>
          <button b-menu-item>Item 1</button>
          <button b-menu-item>Item 2</button>
          <button b-menu-item>Item 3</button>
        </b-menu>
      </div>
      <h2 class="font-semibold text-xl">With Nested Menus</h2>
      <code-block [code]="nestedUsage" />
      <div
        class="border border-gray-200 items-center dark:border-neutral-700 rounded-lg p-6 mb-6 flex flex-col gap-4"
      >
        <b-menu>
          <b-menu-label>Main Menu</b-menu-label>
          <button b-menu-item>Item 1</button>
          <button b-menu-item [menuTriggerFor]="subMenu" [submenu]="true">
            <div style="display: flex; justify-content: space-between; width: 100%">Item 2</div>
          </button>
          <ng-template #subMenu>
            <b-menu>
              <b-menu-label>Submenu</b-menu-label>
              <b-menu-group>
                <button b-menu-item>Subitem 1</button>
                <button b-menu-item>Subitem 2</button>
              </b-menu-group>
              <b-menu-group>
                <button b-menu-item>Subitem 3</button>
                <button b-menu-item>Subitem 4</button>
              </b-menu-group>
            </b-menu>
          </ng-template>
        </b-menu>
      </div>
      <h2 class="font-semibold text-xl">With b-button Trigger</h2>
      <code-block [code]="buttonTriggerUsage" />
      <div
        class="border border-gray-200 items-center dark:border-neutral-700 rounded-lg p-6 mb-6 flex flex-col gap-4"
      >
        <button
          b-button
          class="b-variant-outlined"
          [menuTriggerFor]="menu"
          [menuTriggerPosition]="['bottom-left', 'top-left']"
        >
          Open Menu
        </button>
        <ng-template #menu>
          <b-menu>
            <b-menu-label>Menu</b-menu-label>
            <button b-menu-item>Item 1</button>
            <button b-menu-item>Item 2</button>
            <button b-menu-item [menuTriggerFor]="subMenu" [submenu]="true">
              <div style="display: flex; justify-content: space-between; width: 100%">Item 3</div>
            </button>
            <ng-template #subMenu>
              <b-menu>
                <b-menu-label>Submenu</b-menu-label>
                <b-menu-group>
                  <button b-menu-item>Subitem 1</button>
                  <button b-menu-item>Subitem 2</button>
                </b-menu-group>
              </b-menu>
            </ng-template>
          </b-menu>
        </ng-template>
      </div>
      <h2 class="font-semibold text-xl">With Different Trigger Positions</h2>
      <code-block [code]="triggerPositionExamples" />
      <div
        class="border border-gray-200 items-center dark:border-neutral-700 rounded-lg p-6 mb-6 flex flex-col gap-4"
      >
        <button
          b-button
          class="b-variant-outlined"
          [menuTriggerFor]="menuTopLeft"
          [menuTriggerPosition]="'top-left'"
        >
          Top Left
        </button>
        <ng-template #menuTopLeft>
          <b-menu>
            <b-menu-label>Top Left Menu</b-menu-label>
            <button b-menu-item>Item 1</button>
            <button b-menu-item>Item 2</button>
          </b-menu>
        </ng-template>
        <button
          b-button
          class="b-variant-outlined"
          [menuTriggerFor]="menuBottomCenter"
          [menuTriggerPosition]="'bottom-center'"
        >
          Bottom Center
        </button>
        <ng-template #menuBottomCenter>
          <b-menu>
            <b-menu-label>Bottom Center Menu</b-menu-label>
            <button b-menu-item>Item 1</button>
            <button b-menu-item>Item 2</button>
          </b-menu>
        </ng-template>
        <button
          b-button
          class="b-variant-outlined"
          [menuTriggerFor]="menuRightTop"
          [menuTriggerPosition]="'right-top'"
        >
          Right Top
        </button>
        <ng-template #menuRightTop>
          <b-menu>
            <b-menu-label>Right Top Menu</b-menu-label>
            <b-menu-group>
              <button b-menu-item>Item 1</button>
              <button b-menu-item>Item 2</button>
            </b-menu-group>
          </b-menu>
        </ng-template>
        <button
          b-button
          class="b-variant-outlined"
          [menuTriggerFor]="menuLeftCenter"
          [menuTriggerPosition]="'left-center'"
        >
          Left Center
        </button>
        <ng-template #menuLeftCenter>
          <b-menu>
            <b-menu-label>Left Center Menu</b-menu-label>
            <button b-menu-item>Item 1</button>
            <button b-menu-item>Item 2</button>
          </b-menu>
        </ng-template>
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 items-center dark:border-neutral-700 rounded-lg p-6 mb-6 flex flex-col md:flex-row justify-center gap-4"
      >
        <div class="flex flex-col items-center gap-2">
          <button
            b-button
            [menuTriggerFor]="menuSm"
            [menuTriggerPosition]="['bottom-left', 'top-left']"
          >
            Small
          </button>
          <ng-template #menuSm>
            <b-menu class="b-size-sm">
              <b-menu-label>Small</b-menu-label>
              <b-menu-group>
                <button b-menu-item>Item 1</button>
                <button b-menu-item>Item 2</button>
                <button b-menu-item>Item 3</button>
              </b-menu-group>
            </b-menu>
          </ng-template>
        </div>
        <div class="flex flex-col items-center gap-2">
          <button
            b-button
            [menuTriggerFor]="menuMd"
            [menuTriggerPosition]="['bottom-left', 'top-left']"
          >
            Medium (default)
          </button>
          <ng-template #menuMd>
            <b-menu class="b-size-md">
              <b-menu-label>Medium (default)</b-menu-label>
              <b-menu-group>
                <button b-menu-item>Item 1</button>
                <button b-menu-item>Item 2</button>
                <button b-menu-item>Item 3</button>
              </b-menu-group>
            </b-menu>
          </ng-template>
        </div>
        <div class="flex flex-col items-center gap-2">
          <button
            b-button
            [menuTriggerFor]="menuLg"
            [menuTriggerPosition]="['bottom-left', 'top-left']"
          >
            Large
          </button>
          <ng-template #menuLg>
            <b-menu class="b-size-lg">
              <b-menu-label>Large</b-menu-label>
              <b-menu-group>
                <button b-menu-item>Item 1</button>
                <button b-menu-item>Item 2</button>
                <button b-menu-item>Item 3</button>
              </b-menu-group>
            </b-menu>
          </ng-template>
        </div>
      </div>
      <h2 class="font-semibold text-xl">Squared Menu Items</h2>
      <code-block [code]="squaredUsage" />
      <div
        class="border border-gray-200 items-center dark:border-neutral-700 rounded-lg p-6 mb-6 flex flex-col md:flex-row justify-center gap-4"
      >
        <div class="flex flex-col items-center gap-2">
          <button
            b-button
            [menuTriggerFor]="menuSquaredSm"
            [menuTriggerPosition]="['bottom-left', 'top-left']"
          >
            Small Squared
          </button>
          <ng-template #menuSquaredSm>
            <b-menu class="b-size-sm">
              <button b-menu-item class="b-squared">A</button>
              <button b-menu-item class="b-squared">B</button>
              <button b-menu-item class="b-squared">C</button>
            </b-menu>
          </ng-template>
        </div>
        <div class="flex flex-col items-center gap-2">
          <button
            b-button
            [menuTriggerFor]="menuSquaredMd"
            [menuTriggerPosition]="['bottom-left', 'top-left']"
          >
            Medium Squared
          </button>
          <ng-template #menuSquaredMd>
            <b-menu class="b-size-md">
              <button b-menu-item class="b-squared">A</button>
              <button b-menu-item class="b-squared">B</button>
              <button b-menu-item class="b-squared">C</button>
            </b-menu>
          </ng-template>
        </div>
        <div class="flex flex-col items-center gap-2">
          <button
            b-button
            [menuTriggerFor]="menuSquaredLg"
            [menuTriggerPosition]="['bottom-left', 'top-left']"
          >
            Large Squared
          </button>
          <ng-template #menuSquaredLg>
            <b-menu class="b-size-lg">
              <button b-menu-item class="b-squared">A</button>
              <button b-menu-item class="b-squared">B</button>
              <button b-menu-item class="b-squared">C</button>
            </b-menu>
          </ng-template>
        </div>
      </div>
      <h2 class="font-semibold text-xl">Destructive Menu Items</h2>
      <code-block [code]="destructiveUsage" />
      <div
        class="border border-gray-200 items-center dark:border-neutral-700 rounded-lg p-6 mb-6 flex flex-col gap-4"
      >
        <button
          b-button
          [menuTriggerFor]="menuDestructive"
          [menuTriggerPosition]="['bottom-left', 'top-left']"
        >
          Open Menu
        </button>
        <ng-template #menuDestructive>
          <b-menu>
            <b-menu-label>Actions</b-menu-label>
            <b-menu-group>
              <button b-menu-item>Edit</button>
              <button b-menu-item>Duplicate</button>
              <button b-menu-item>Archive</button>
            </b-menu-group>
            <b-menu-group>
              <button b-menu-item class="b-destructive">Delete</button>
            </b-menu-group>
          </b-menu>
        </ng-template>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{
        label: 'Input Group',
        path: '/docs/components/input-group',
      }"
      [next]="{ label: 'OTP', path: '/docs/components/otp' }"
    />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class MenuDocumentation {
  sizesUsage = `<button b-button [menuTriggerFor]=menuSm [menuTriggerPosition]="['bottom-left', 'top-left']">Small</button>\n<ng-template #menuSm>\n  <b-menu class="b-size-sm">\n    <b-menu-label>Small</b-menu-label>\n    <button b-menu-item>Item 1</button>\n    <button b-menu-item>Item 2</button>\n    <button b-menu-item>Item 3</button>\n  </b-menu>\n</ng-template>\n\n<button b-button [menuTriggerFor]=menuMd [menuTriggerPosition]="['bottom-left', 'top-left']">Medium (default)</button>\n<ng-template #menuMd>\n  <b-menu class="b-size-md">\n    <b-menu-label>Medium (default)</b-menu-label>\n    <button b-menu-item>Item 1</button>\n    <button b-menu-item>Item 2</button>\n    <button b-menu-item>Item 3</button>\n  </b-menu>\n</ng-template>\n\n<button b-button [menuTriggerFor]=menuLg [menuTriggerPosition]="['bottom-left', 'top-left']">Large</button>\n<ng-template #menuLg>\n  <b-menu class="b-size-lg">\n    <b-menu-label>Large</b-menu-label>\n    <button b-menu-item>Item 1</button>\n    <button b-menu-item>Item 2</button>\n    <button b-menu-item>Item 3</button>\n  </b-menu>\n</ng-template>`;
  sizeUsage = `<b-menu class='b-size-sm'>...</b-menu>\n<b-menu class='b-size-md'>...</b-menu>\n<b-menu class='b-size-lg'>...</b-menu>`;
  angularImport = `import { Menu, MenuItem, MenuGroup, MenuLabel, MenuTriggerDirective } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/menu';`;
  basicUsage = `<b-menu>\n  <b-menu-label>Basic Menu</b-menu-label>\n  <button b-menu-item>Item 1</button>\n  <button b-menu-item>Item 2</button>\n  <button b-menu-item>Item 3</button>\n</b-menu>`;
  nestedUsage = `<b-menu>\n  <b-menu-label>Main Menu</b-menu-label>\n  <button b-menu-item>Item 1</button>\n  <button b-menu-item [menuTriggerFor]=subMenu [submenu]=true>\n    <div style='display: flex; justify-content: space-between; width: 100%'>\n      Item 2\n    </div>\n  </button>\n  <ng-template #subMenu>\n    <b-menu>\n      <b-menu-label>Submenu</b-menu-label>\n      <b-menu-group>\n        <button b-menu-item>Subitem 1</button>\n        <button b-menu-item>Subitem 2</button>\n      </b-menu-group>\n      <b-menu-group>\n        <button b-menu-item>Subitem 3</button>\n        <button b-menu-item>Subitem 4</button>\n      </b-menu-group>\n    </b-menu>\n  </ng-template>\n</b-menu>`;
  buttonTriggerUsage = `<button\n  b-button\n  class="b-variant-outlined"\n  [menuTriggerFor]=menu\n  [menuTriggerPosition]='bottom-left'>\n  Open Menu\n</button>\n<ng-template #menu>\n  <b-menu>\n    <b-menu-label>Menu</b-menu-label>\n    <button b-menu-item>Item 1</button>\n    <button b-menu-item>Item 2</button>\n    <button b-menu-item [menuTriggerFor]=subMenu [submenu]=true>\n      <div style='display: flex; justify-content: space-between; width: 100%'>\n        Item 3\n      </div>\n    </button>\n    <ng-template #subMenu>\n      <b-menu>\n        <b-menu-label>Submenu</b-menu-label>\n        <b-menu-group>\n          <button b-menu-item>Subitem 1</button>\n          <button b-menu-item>Subitem 2</button>\n        </b-menu-group>\n      </b-menu>\n    </ng-template>\n  </b-menu>\n</ng-template>`;
  triggerPositionExamples = `<button\n  b-button\n  class="b-variant-outlined"\n  [menuTriggerFor]=menuTopLeft\n  [menuTriggerPosition]='top-left'>\n  Top Left\n</button>\n<ng-template #menuTopLeft>\n  <b-menu>\n    <b-menu-label>Top Left Menu</b-menu-label>\n    <button b-menu-item>Item 1</button>\n    <button b-menu-item>Item 2</button>\n  </b-menu>\n</ng-template>\n\n<button\n  b-button\n  class="b-variant-outlined"\n  [menuTriggerFor]=menuBottomCenter\n  [menuTriggerPosition]='bottom-center'>\n  Bottom Center\n</button>\n<ng-template #menuBottomCenter>\n  <b-menu>\n    <b-menu-label>Bottom Center Menu</b-menu-label>\n    <button b-menu-item>Item 1</button>\n    <button b-menu-item>Item 2</button>\n  </b-menu>\n</ng-template>\n\n<button\n  b-button\n  class="b-variant-outlined"\n  [menuTriggerFor]=menuRightTop\n  [menuTriggerPosition]='right-top'>\n  Right Top\n</button>\n<ng-template #menuRightTop>\n  <b-menu>\n    <b-menu-label>Right Top Menu</b-menu-label>\n    <b-menu-group>\n      <button b-menu-item>Item 1</button>\n      <button b-menu-item>Item 2</button>\n    </b-menu-group>\n  </b-menu>\n</ng-template>\n\n<button\n  b-button\n  class="b-variant-outlined"\n  [menuTriggerFor]=menuLeftCenter\n  [menuTriggerPosition]='left-center'>\n  Left Center\n</button>\n<ng-template #menuLeftCenter>\n  <b-menu>\n    <b-menu-label>Left Center Menu</b-menu-label>\n    <button b-menu-item>Item 1</button>\n    <button b-menu-item>Item 2</button>\n  </b-menu>\n</ng-template>`;
  squaredUsage = `<button b-button [menuTriggerFor]=menuSquaredSm [menuTriggerPosition]="['bottom-left', 'top-left']">Small Squared</button>
<ng-template #menuSquaredSm>
  <b-menu class="b-size-sm">
    <button b-menu-item class="b-squared">A</button>
    <button b-menu-item class="b-squared">B</button>
    <button b-menu-item class="b-squared">C</button>
  </b-menu>
</ng-template>

<button b-button [menuTriggerFor]=menuSquaredMd [menuTriggerPosition]="['bottom-left', 'top-left']">Medium Squared</button>
<ng-template #menuSquaredMd>
  <b-menu class="b-size-md">
    <button b-menu-item class="b-squared">A</button>
    <button b-menu-item class="b-squared">B</button>
    <button b-menu-item class="b-squared">C</button>
  </b-menu>
</ng-template>

<button b-button [menuTriggerFor]=menuSquaredLg [menuTriggerPosition]="['bottom-left', 'top-left']">Large Squared</button>
<ng-template #menuSquaredLg>
  <b-menu class="b-size-lg">
    <button b-menu-item class="b-squared">A</button>
    <button b-menu-item class="b-squared">B</button>
    <button b-menu-item class="b-squared">C</button>
  </b-menu>
</ng-template>`;
  destructiveUsage = `<button b-button [menuTriggerFor]=menuDestructive [menuTriggerPosition]="['bottom-left', 'top-left']">Open Menu</button>
<ng-template #menuDestructive>
  <b-menu>
    <b-menu-label>Actions</b-menu-label>
    <b-menu-group>
      <button b-menu-item>Edit</button>
      <button b-menu-item>Duplicate</button>
      <button b-menu-item>Archive</button>
    </b-menu-group>
    <b-menu-group>
      <button b-menu-item [destructive]="true">Delete</button>
    </b-menu-group>
  </b-menu>
</ng-template>`;
}
