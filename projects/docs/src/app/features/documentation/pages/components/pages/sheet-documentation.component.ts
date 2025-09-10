import { Component, signal } from '@angular/core';
import { AlertComponent, SheetComponent, Button } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

@Component({
  selector: 'article[app-sheet-documentation]',
  template: ` <b-alert
      type="info"
      title="Components are in alpha"
      icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Sheet</h1>
    <span>
      Sheet is a sliding panel that appears from the left or right side of the
      screen.
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
          <td>Indicates whether the sheet is open.</td>
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
          <td>The width of the sheet.</td>
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
          <td>Emitted when the sheet is closed.</td>
        </tr>
      </table>
    </div>

    <h2>Basic Usage</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <button b-button (click)="openLeftSheet()">Open Left Sheet</button>
      <button b-button (click)="openRightSheet()">Open Right Sheet</button>
    </div>

    <b-sheet
      [(isOpen)]="isLeftOpen"
      [width]="'300px'"
      [side]="'left'"
      (closeSheet)="isLeftOpen.set(false)">
      <div
        style="display: flex; justify-content: center; align-items: center; height: 100%;">
        This is the left sheet.
      </div>
    </b-sheet>

    <b-sheet
      [(isOpen)]="isRightOpen"
      [width]="'300px'"
      [side]="'right'"
      (closeSheet)="isRightOpen.set(false)">
      <div
        style="display: flex; justify-content: center; align-items: center; height: 100%;">
        This is the right sheet.
      </div>
    </b-sheet>

    <h2>Custom Width</h2>
    <code-block [code]="customWidthUsage" />
    <div class="documentation-playground">
      <button b-button (click)="openCustomWidthSheet()">
        Open Custom Width Sheet
      </button>
    </div>

    <b-sheet
      [(isOpen)]="isCustomWidthOpen"
      [width]="'500px'"
      [side]="'right'"
      (closeSheet)="isCustomWidthOpen.set(false)">
      <div
        style="display: flex; justify-content: center; align-items: center; height: 100%;">
        This is a custom width sheet.
      </div>
    </b-sheet>`,
  imports: [CodeBlockComponent, SheetComponent, Button, AlertComponent],
})
export default class SideSheetDocumentationComponent {
  angularImport = `import { SheetComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/sheet';`;
  basicUsage = `<button b-button (click)="openLeftSheet()">Open Left Sheet</button>
<button b-button (click)="openRightSheet()">Open Right Sheet</button>

<b-sheet
  [(isOpen)]="isLeftOpen"
  [width]="'300px'"
  [side]="'left'">
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This is the left sheet.
  </div>
</b-sheet>

<b-sheet
  [(isOpen)]="isRightOpen"
  [width]="'300px'"
  [side]="'right'">
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This is the right sheet.
  </div>
</b-sheet>`;

  customWidthUsage = `<button b-button (click)="openCustomWidthSheet()">Open Custom Width Sheet</button>

<b-sheet
  [(isOpen)]="isCustomWidthOpen"
  [width]="'500px'"
  [side]="'right'">
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This is a custom width sheet.
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

  openLeftSheet() {
    this.isLeftOpen.set(true);
  }

  openRightSheet() {
    this.isRightOpen.set(true);
  }

  openCustomWidthSheet() {
    this.isCustomWidthOpen.set(true);
  }
}
