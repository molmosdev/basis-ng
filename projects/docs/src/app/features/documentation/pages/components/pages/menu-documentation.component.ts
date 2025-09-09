import { Component } from '@angular/core';
import {
  MenuGroupComponent,
  MenuItemComponent,
  AlertComponent,
  MenuLabelComponent,
  MenuComponent,
  ButtonComponent,
  MenuTriggerDirective,
} from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

@Component({
  selector: 'article[app-menu-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Menu</h1>
    <span>
      The Menu component provides a flexible and accessible way to create
      dropdown menus with support for nested menus and various configurations.
    </span>

    <code-block [code]="angularImport" />
    <span
      >Include this to apply predefined styles. The component is headless
      without it.</span
    >
    <code-block [code]="stylesImport" />

    <h2>Properties</h2>
    <span
      >This section applies to the <strong>Menu Item</strong> component.</span
    >
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>disabled</strong></td>
          <td><code>boolean</code></td>
          <td>Disables the menu item, making it unselectable.</td>
        </tr>
        <tr>
          <td><strong>typeaheadLabel</strong></td>
          <td><code>string</code></td>
          <td>Specifies a label for typeahead navigation within the menu.</td>
        </tr>
      </table>
    </div>

    <h2>Events</h2>
    <span
      >This section lists the events emitted by the
      <strong>Menu Item</strong> component.</span
    >
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Event</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>triggered</strong></td>
          <td><code>Event</code></td>
          <td>Emitted when a menu item is triggered.</td>
        </tr>
      </table>
    </div>

    <h2>Basic Example</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <b-menu>
        <b-menu-label>Basic Menu</b-menu-label>
        <button b-menu-item>Item 1</button>
        <button b-menu-item>Item 2</button>
        <button b-menu-item>Item 3</button>
      </b-menu>
    </div>

    <h2>With Nested Menus</h2>
    <code-block [code]="nestedUsage" />
    <div class="documentation-playground">
      <b-menu>
        <b-menu-label>Main Menu</b-menu-label>
        <button b-menu-item>Item 1</button>
        <button b-menu-item [menuTriggerFor]="subMenu" [submenu]="true">
          <div
            style="display: flex; justify-content: space-between; width: 100%">
            Item 2
            <!-- <i b-icon icon="ChevronRight" [size]="16"></i> -->
          </div>
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

    <h2>With b-button Trigger</h2>
    <code-block [code]="buttonTriggerUsage" />
    <div class="documentation-playground">
      <button
        b-button
        variant="outlined"
        [menuTriggerFor]="menu"
        [menuTriggerPosition]="'bottom-left'">
        Open Menu
      </button>
      <ng-template #menu>
        <b-menu>
          <b-menu-label>Menu</b-menu-label>
          <button b-menu-item>Item 1</button>
          <button b-menu-item>Item 2</button>
          <button b-menu-item [menuTriggerFor]="subMenu" [submenu]="true">
            <div
              style="display: flex; justify-content: space-between; width: 100%">
              Item 3
              <!-- <i b-icon icon="ChevronRight" [size]="16"></i> -->
            </div>
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

    <h2>With Different Trigger Positions</h2>
    <code-block [code]="triggerPositionExamples" />
    <div class="documentation-playground">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <button
          b-button
          variant="outlined"
          [menuTriggerFor]="menuTopLeft"
          [menuTriggerPosition]="'top-left'">
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
          variant="outlined"
          [menuTriggerFor]="menuBottomCenter"
          [menuTriggerPosition]="'bottom-center'">
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
          variant="outlined"
          [menuTriggerFor]="menuRightTop"
          [menuTriggerPosition]="'right-top'">
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
          variant="outlined"
          [menuTriggerFor]="menuLeftCenter"
          [menuTriggerPosition]="'left-center'">
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
    </div>`,
  standalone: true,
  imports: [
    MenuComponent,
    MenuItemComponent,
    MenuGroupComponent,
    MenuLabelComponent,
    MenuTriggerDirective,
    CodeBlockComponent,
    // IconComponent,
    ButtonComponent,
    AlertComponent,
  ],
})
export default class MenuDocumentationComponent {
  angularImport = `import { MenuComponent, MenuItemComponent, MenuGroupComponent, MenuLabelComponent, MenuTrigger } from '@basis-ng/primitives';`;

  stylesImport = `@import '@basis-ng/styles/menu';
@import '@basis-ng/styles/menu-item';
@import '@basis-ng/styles/menu-group';
@import '@basis-ng/styles/menu-label';
`;

  basicUsage = `<b-menu>
  <b-menu-label>Basic Menu</b-menu-label>
  <button b-menu-item>Item 1</button>
  <button b-menu-item>Item 2</button>
  <button b-menu-item>Item 3</button>
</b-menu>`;

  nestedUsage = `<b-menu>
  <b-menu-label>Main Menu</b-menu-label>
  <button b-menu-item>Item 1</button>
  <button b-menu-item [menuTriggerFor]="subMenu" [submenu]="true">
    <div style="display: flex; justify-content: space-between; width: 100%">
      Item 2
      <i b-icon icon="ChevronRight" [size]="16"></i>
    </div>
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
</b-menu>`;

  buttonTriggerUsage = `<button
  b-button
  variant="outlined"
  [menuTriggerFor]="menu"
  [menuTriggerPosition]="'bottom-left'">
  Open Menu
</button>
<ng-template #menu>
  <b-menu>
    <b-menu-label>Menu</b-menu-label>
    <button b-menu-item>Item 1</button>
    <button b-menu-item>Item 2</button>
    <button b-menu-item [menuTriggerFor]="subMenu" [submenu]="true">
      <div style="display: flex; justify-content: space-between; width: 100%">
        Item 3
        <i b-icon icon="ChevronRight" [size]="16"></i>
      </div>
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
</ng-template>`;

  triggerPositionExamples = `<button
  b-button
  variant="outlined"
  [menuTriggerFor]="menuTopLeft"
  [menuTriggerPosition]="'top-left'">
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
  variant="outlined"
  [menuTriggerFor]="menuBottomCenter"
  [menuTriggerPosition]="'bottom-center'">
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
  variant="outlined"
  [menuTriggerFor]="menuRightTop"
  [menuTriggerPosition]="'right-top'">
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
  variant="outlined"
  [menuTriggerFor]="menuLeftCenter"
  [menuTriggerPosition]="'left-center'">
  Left Center
</button>
<ng-template #menuLeftCenter>
  <b-menu>
    <b-menu-label>Left Center Menu</b-menu-label>
    <button b-menu-item>Item 1</button>
    <button b-menu-item>Item 2</button>
  </b-menu>
</ng-template>`;
}
