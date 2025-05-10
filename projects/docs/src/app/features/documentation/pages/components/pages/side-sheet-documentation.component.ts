import { Component, signal } from '@angular/core';
import {
  AlertComponent,
  SheetComponent,
  ButtonComponent,
} from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

@Component({
  selector: 'article[app-side-sheet-documentation]',
  template: ` <b-alert
      type="info"
      title="Components are in alpha"
      icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Side Sheet</h1>
    <span>
      Side Sheet is a sliding panel that appears from the left or right side of
      the screen.
    </span>

    <code-block [code]="angularImport" />
    <span
      >Include this to apply predefined styles. The component is headless
      without it.</span
    >
    <code-block [code]="stylesImport" />

    <h2>Properties</h2>
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>isOpen</strong></td>
          <td><code>boolean</code></td>
          <td>Indicates whether the side sheet is open.</td>
        </tr>
        <tr>
          <td><strong>side</strong></td>
          <td><code>'left' | 'right'</code></td>
          <td>
            Specifies the side of the screen where the sheet is positioned.
          </td>
        </tr>
        <tr>
          <td><strong>width</strong></td>
          <td><code>string</code></td>
          <td>The width of the side sheet.</td>
        </tr>
      </table>
    </div>

    <h2>Events</h2>
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Event</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>closeSheet</strong></td>
          <td>Emitted when the side sheet is closed.</td>
        </tr>
      </table>
    </div>

    <h2>Basic Usage</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <button b-button (click)="openLeftSideSheet()">
        Open Left Side Sheet
      </button>
      <button b-button (click)="openRightSideSheet()">
        Open Right Side Sheet
      </button>
    </div>

    <b-sheet
      [(isOpen)]="isLeftOpen"
      [width]="'300px'"
      [side]="'left'"
      (closeSheet)="isLeftOpen.set(false)">
      <div
        style="display: flex; justify-content: center; align-items: center; height: 100%;">
        This is the left side sheet.
      </div>
    </b-sheet>

    <b-sheet
      [(isOpen)]="isRightOpen"
      [width]="'300px'"
      [side]="'right'"
      (closeSheet)="isRightOpen.set(false)">
      <div
        style="display: flex; justify-content: center; align-items: center; height: 100%;">
        This is the right side sheet.
      </div>
    </b-sheet>

    <h2>Custom Width</h2>
    <code-block [code]="customWidthUsage" />
    <div class="documentation-playground">
      <button b-button (click)="openCustomWidthSideSheet()">
        Open Custom Width Side Sheet
      </button>
    </div>

    <b-sheet
      [(isOpen)]="isCustomWidthOpen"
      [width]="'500px'"
      [side]="'right'"
      (closeSheet)="isCustomWidthOpen.set(false)">
      <div
        style="display: flex; justify-content: center; align-items: center; height: 100%;">
        This is a custom width side sheet.
      </div>
    </b-sheet>`,
  imports: [
    CodeBlockComponent,
    SheetComponent,
    ButtonComponent,
    AlertComponent,
  ],
})
export default class SideSheetDocumentationComponent {
  angularImport = `import { SideSheet } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/side-sheet';`;
  basicUsage = `<button b-button (click)="openLeftSideSheet()">Open Left Side Sheet</button>
<button b-button (click)="openRightSideSheet()">Open Right Side Sheet</button>

<b-sheet
  [(isOpen)]="isLeftOpen"
  [width]="'300px'"
  [side]="'left'">
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This is the left side sheet.
  </div>
</b-sheet>

<b-sheet
  [(isOpen)]="isRightOpen"
  [width]="'300px'"
  [side]="'right'">
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This is the right side sheet.
  </div>
</b-sheet>`;

  customWidthUsage = `<button b-button (click)="openCustomWidthSideSheet()">Open Custom Width Side Sheet</button>

<b-sheet
  [(isOpen)]="isCustomWidthOpen"
  [width]="'500px'"
  [side]="'right'">
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This is a custom width side sheet.
  </div>
</b-sheet>`;

  readonly isOpen = signal<boolean>(false);
  readonly width = signal<string>('300px');
  readonly side = signal<'left' | 'right'>('right');
  readonly isLeftOpen = signal<boolean>(false);
  readonly isRightOpen = signal<boolean>(false);
  readonly isCustomWidthOpen = signal<boolean>(false);

  openSideSheet(width: string, side: 'left' | 'right') {
    this.width.set(width);
    this.side.set(side);
    this.isOpen.set(true);
  }

  openLeftSideSheet() {
    this.isLeftOpen.set(true);
  }

  openRightSideSheet() {
    this.isRightOpen.set(true);
  }

  openCustomWidthSideSheet() {
    this.isCustomWidthOpen.set(true);
  }
}
