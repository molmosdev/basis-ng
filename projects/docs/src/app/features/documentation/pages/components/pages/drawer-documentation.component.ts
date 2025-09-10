import { Component, signal } from '@angular/core';
import { AlertComponent, Button, DrawerComponent } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

@Component({
  selector: 'article[app-drawer-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Drawer</h1>
    <span>
      Drawer is a sliding panel that appears from the bottom of the screen.
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
          <td>Indicates whether the drawer is open.</td>
        </tr>
        <tr>
          <td><strong>height</strong></td>
          <td><code>string</code></td>
          <td>The height of the drawer.</td>
        </tr>
        <tr>
          <td><strong>closeThreshold</strong></td>
          <td><code>number</code></td>
          <td>The threshold for closing the drawer, in percentage.</td>
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
          <td>Emitted when the drawer is closed.</td>
        </tr>
      </table>
    </div>

    <h2>Basic Usage</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <button b-button (click)="openDrawer('50dvh', 50)">Open Drawer</button>
    </div>

    <h2>Angular Binding with ngModel</h2>
    <code-block [code]="ngModelUsage" />
    <div class="documentation-playground">
      <button b-button (click)="openDrawer('50dvh', 50)">Open Drawer</button>
    </div>

    <h2>Angular Signals</h2>
    <code-block [code]="signalsUsage" />
    <div class="documentation-playground">
      <button b-button (click)="openDrawer('50dvh', 50)">Open Drawer</button>
    </div>

    <h2>Custom Height</h2>
    <code-block [code]="customHeightUsage" />
    <div class="documentation-playground">
      <button b-button (click)="openDrawer('70dvh', 50)">Open Drawer</button>
    </div>

    <h2>Custom Close Threshold</h2>
    <code-block [code]="customCloseThresholdUsage" />
    <div class="documentation-playground">
      <button b-button (click)="openDrawer('50dvh', 70)">Open Drawer</button>
    </div>

    <b-drawer
      [(isOpen)]="isOpen"
      [height]="height()"
      [closeThreshold]="closeThreshold()">
      <div
        style="display: flex; justify-content: center; align-items: center; height: 100%;">
        This is the content of the drawer.
      </div>
    </b-drawer>`,
  imports: [CodeBlockComponent, DrawerComponent, Button, AlertComponent],
})
export default class DrawerDocumentationComponent {
  angularImport = `import { DrawerComponent } from '@basis-ng/primitives';`;
  stylesImport = `@import '@basis-ng/styles/drawer';`;
  basicUsage = `<button b-button (click)="openSheet()">Open Drawer</button>
<b-drawer
  [isOpen]="isOpen"
  [height]="'50dvh'"
  (closeSheet)="closeSheet()"
>
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This is the content of the drawer.
  </div>
</b-drawer>`;

  customHeightUsage = `<button b-button (click)="isOpen = true">Open Drawer</button>
<b-drawer
  [(isOpen)]="isOpen"
  [height]="'70dvh'">
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This is a taller drawer.
  </div>
</b-drawer>`;

  customCloseThresholdUsage = `<button b-button (click)="isOpen = true">Open Drawer</button>
<b-drawer
  [(isOpen)]="isOpen"
  [closeThreshold]="70">
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This drawer requires dragging down 70% to close.
  </div>
</b-drawer>`;

  ngModelUsage = `<button b-button (click)="ngModelOpen = true">Open Drawer</button>
<b-drawer
  [(isOpen)]="ngModelOpen"
  [height]="'50dvh'"
  (closeSheet)="ngModelOpen = false">
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This is the content of the drawer.
  </div>
</b-drawer>`;

  signalsUsage = `<button b-button (click)="signalOpen.set(true)">Open Drawer</button>
<b-drawer
  [(isOpen)]="signalOpen"
  [height]="'50dvh'"
  (closeSheet)="signalOpen.set(false)">
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This is the content of the drawer.
  </div>
</b-drawer>`;

  readonly isOpen = signal<boolean>(false);
  readonly height = signal<string>('50dvh');
  readonly closeThreshold = signal<number>(50);

  openDrawer(height: string, closeThreshold: number) {
    this.height.set(height);
    this.closeThreshold.set(closeThreshold);
    this.isOpen.set(true);
  }
}
