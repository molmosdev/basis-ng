import { Component } from '@angular/core';
import {
  Alert,
  Badge,
  Button,
  Menu,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuTriggerDirective,
} from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-menu-documentation]',
  standalone: true,
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
                <strong>false</strong> | true
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
                <strong>false</strong> | true
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
                <strong>false</strong> | true
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
                <strong>'right-top'</strong> | Position | Position[]
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
                <strong>false</strong> | true
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

      <h2 class="font-semibold text-xl">Orientation</h2>
      <span>Use <code>b-orientation-horizontal</code> to align items in a row.</span>
      <code-block [code]="orientationUsage" />
      <div
        class="border border-gray-200 items-center dark:border-neutral-700 rounded-lg p-6 mb-6 flex flex-col gap-4 overflow-x-auto"
      >
        <b-menu class="b-orientation-horizontal">
          <button b-menu-item>Home</button>
          <button b-menu-item>Settings</button>
          <button b-menu-item>Profile</button>
          <button b-menu-item>Logout</button>
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
            <button b-menu-item [menuTriggerFor]="subMenuInner" [submenu]="true">
              <div style="display: flex; justify-content: space-between; width: 100%">Item 2</div>
            </button>
            <ng-template #subMenuInner>
              <b-menu><button b-menu-item>Subitem 1</button></b-menu>
            </ng-template>
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
          <ng-template #menuSm
            ><b-menu class="b-size-sm"
              ><b-menu-label>Small</b-menu-label><button b-menu-item>Item 1</button></b-menu
            ></ng-template
          >
        </div>
        <div class="flex flex-col items-center gap-2">
          <button
            b-button
            [menuTriggerFor]="menuMd"
            [menuTriggerPosition]="['bottom-left', 'top-left']"
          >
            Medium
          </button>
          <ng-template #menuMd
            ><b-menu class="b-size-md"
              ><b-menu-label>Medium</b-menu-label><button b-menu-item>Item 1</button></b-menu
            ></ng-template
          >
        </div>
        <div class="flex flex-col items-center gap-2">
          <button
            b-button
            [menuTriggerFor]="menuLg"
            [menuTriggerPosition]="['bottom-left', 'top-left']"
          >
            Large
          </button>
          <ng-template #menuLg
            ><b-menu class="b-size-lg"
              ><b-menu-label>Large</b-menu-label><button b-menu-item>Item 1</button></b-menu
            ></ng-template
          >
        </div>
      </div>

      <h2 class="font-semibold text-xl">Squared Menu Items</h2>
      <code-block [code]="squaredUsage" />
      <div
        class="border border-gray-200 items-center dark:border-neutral-700 rounded-lg p-6 mb-6 flex flex-col md:flex-row justify-center gap-4"
      >
        <b-menu class="b-orientation-horizontal b-size-md">
          <button b-menu-item class="b-squared">A</button>
          <button b-menu-item class="b-squared">B</button>
          <button b-menu-item class="b-squared">C</button>
        </b-menu>
      </div>

      <h2 class="font-semibold text-xl">Destructive Menu Items</h2>
      <code-block [code]="destructiveUsage" />
      <div
        class="border border-gray-200 items-center dark:border-neutral-700 rounded-lg p-6 mb-6 flex flex-col gap-4"
      >
        <b-menu>
          <b-menu-label>Actions</b-menu-label>
          <button b-menu-item>Edit</button>
          <button b-menu-item class="b-destructive">Delete</button>
        </b-menu>
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
  angularImport = `import { Menu, MenuItem, MenuGroup, MenuLabel, MenuTriggerDirective } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/menu';`;

  basicUsage = `<b-menu>
  <b-menu-label>Basic Menu</b-menu-label>
  <button b-menu-item>Item 1</button>
  <button b-menu-item>Item 2</button>
  <button b-menu-item>Item 3</button>
</b-menu>`;

  orientationUsage = `<b-menu class="b-orientation-horizontal">
  <button b-menu-item>Home</button>
  <button b-menu-item>Settings</button>
  <button b-menu-item>Profile</button>
  <button b-menu-item>Logout</button>
</b-menu>`;

  nestedUsage = `<b-menu>
  <b-menu-label>Main Menu</b-menu-label>
  <button b-menu-item>Item 1</button>
  <button b-menu-item [menuTriggerFor]="subMenu" [submenu]="true">
    Item 2
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
</b-menu>`;

  buttonTriggerUsage = `<button b-button class="b-variant-outlined" [menuTriggerFor]="menu" [menuTriggerPosition]="['bottom-left', 'top-left']">
  Open Menu
</button>
<ng-template #menu>
  <b-menu>
    <b-menu-label>Menu</b-menu-label>
    <button b-menu-item>Item 1</button>
    <button b-menu-item [menuTriggerFor]="subMenuInner" [submenu]="true">Item 2</button>
    <ng-template #subMenuInner>
      <b-menu><button b-menu-item>Subitem 1</button></b-menu>
    </ng-template>
  </b-menu>
</ng-template>`;

  sizesUsage = `<b-menu class="b-size-sm">
  <b-menu-label>Small</b-menu-label>
  <button b-menu-item>Item 1</button>
</b-menu>

<b-menu class="b-size-md">
  <b-menu-label>Medium</b-menu-label>
  <button b-menu-item>Item 1</button>
</b-menu>

<b-menu class="b-size-lg">
  <b-menu-label>Large</b-menu-label>
  <button b-menu-item>Item 1</button>
</b-menu>`;

  squaredUsage = `<b-menu class="b-orientation-horizontal b-size-md">
  <button b-menu-item class="b-squared">A</button>
  <button b-menu-item class="b-squared">B</button>
  <button b-menu-item class="b-squared">C</button>
</b-menu>`;

  destructiveUsage = `<b-menu>
  <b-menu-label>Actions</b-menu-label>
  <button b-menu-item>Edit</button>
  <button b-menu-item class="b-destructive">Delete</button>
</b-menu>`;
}
